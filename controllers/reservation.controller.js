const { Op } = require("sequelize");
const db = require("../models");
const Reservation = db.Reservation;
const ReservationSiege = db.ReservationSiege;
const Siege = db.Siege;
const Seance = db.Seance;
const User = db.User;

// créer une reservation (user)
exports.createReservation = async (req, res) => {
  try {
    const { seance_id, sieges, date_reservation } = req.body;

    if (!seance_id || !sieges || sieges.length === 0 || !date_reservation) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Étape 1 : Vérifier les sièges déjà réservés pour cette séance
    const siegesDejaReserves = await ReservationSiege.findAll({
      include: [
        {
          model: Reservation,
          as: "reservation",
          where: { seance_id },
        },
      ],
      where: { siege_id: { [Op.in]: sieges } },
    });

    if (siegesDejaReserves.length > 0) {
      const siegesOccupes = siegesDejaReserves.map((s) => s.siege_id);
      return res.status(400).json({
        success: false,
        message: "certaines sièges sont déjà reservés",
        siegesOccupes,
      });
    }

    // Étape 2 : Créer la réservation
    const reservation = await Reservation.create({
      user_id: req.user.id,
      seance_id,
      date_reservation,
    });

    const siegesPromises = sieges.map((siege_id) =>
      ReservationSiege.create({
        reservation_id: reservation.id,
        siege_id,
      })
    );

    await Promise.all(siegesPromises);

    res.status(201).json({
      success: true,
      message: "Réservation effectuée avec succès",
      data: {
        reservation,
        sieges,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur de serveur",
      error: error.message,
    });
  }
};

// obtenir une reservation (user)
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id, {
      include: [
        {
          model: Siege,
          as: "sieges",
          through: { attributes: [] }, // Ne pas afficher reservationSiege
        },
        {
          model: Seance,
          as: "seance",
        },
      ],
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée",
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur de serveur",
      error: error.message,
    });
  }
};

// toutes les reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "nom", "email"],
        },

        {
          model: Seance,
          as: "seance",
        },
        {
          model: Siege,
          as: "sieges",
          through: { attributes: [] }, // Ignore les données de la table pivot
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    console.error("Erreur admin - getAllReservations :", error);
    res.status(500).json({
      success: false,
      message: "Erreur de serveur",
      error: error.message,
    });
  }
};

// modifier le statut de la reservation (admin)
exports.updateReservationStatut = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    if (!["en attente", "confirmée", "annulée"].includes(statut)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const reservation = await db.Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    reservation.statut = statut;
    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Statut mis à jour avec succès",
      data: reservation,
    });
  } catch (error) {
    console.error("Erreur updateReservationStatut:", error);
    res.status(500).json({
      success: false,
      message: "Erreur de serveur",
      error: error.message,
    });
  }
};

// Annuler une réservation (user)
exports.cancelReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await Reservation.findOne({
      where: {
        id: reservationId,
        user_id: req.user.id,
      },
      include: {
        model: Seance,
        as: "seance",
        attributes: ["heure_debut", "heure_fin"],
      },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    const now = new Date();
    const heureDebut = new Date(reservation.seance.heure_debut);
    const heureFin = new Date(reservation.seance.heure_fin);

    // Séance déjà terminée ?
    if (now > heureFin) {
      return res.status(400).json({
        success: false,
        message: "Cette séance est déjà passée, annulation impossible.",
      });
    }

    // Moins de 2h avant la séance ?
    const diffHeures = (heureDebut - now) / (1000 * 60 * 60);
    if (diffHeures < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Vous ne pouvez plus annuler cette réservation (moins de 2h avant la séance)",
      });
    }

    // Supprimer les sièges liés
    await ReservationSiege.destroy({
      where: { reservation_id: reservationId },
    });

    // Supprimer la réservation
    await reservation.destroy();

    res.status(200).json({
      success: true,
      message: "Réservation annulée avec succès",
    });
  } catch (error) {
    console.error("Erreur cancelReservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur de serveur",
      error: error.message,
    });
  }
};

// supprimer une reservations (admin)
exports.deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    // Vérifier si la réservation existe
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    // Supprimer les sièges liés
    await ReservationSiege.destroy({
      where: { reservation_id: reservationId },
    });

    // Supprimer la réservation
    await reservation.destroy();

    res.status(200).json({
      success: true,
      message: "Réservation supprimée avec succès",
    });
  } catch (error) {
    console.error("Erreur deleteReservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur de serveur",
      error: error.message,
    });
  }
};
