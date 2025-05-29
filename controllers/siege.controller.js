const db = require("../models");
const Seance = db.Seance;
const Siege = db.Siege;
const Reservation = db.Reservation;
const ReservationSiege = db.ReservationSiege;

exports.getSiegesDisponibles = async (req, res) => {
  try {
    const seanceId = req.params.id;

    // Vérifier si la séance existe
    const seance = await Seance.findByPk(seanceId);
    if (!seance) {
      return res.status(404).json({ message: "Séance introuvable" });
    }

    const salleId = seance.salle_id;

    // Récupérer tous les sièges de la salle
    const tousLesSieges = await Siege.findAll({
      where: { salle_id: salleId },
      attributes: ["id", "row", "col"],
      order: [
        ["row", "ASC"],
        ["col", "ASC"],
      ],
    });

    // Récupérer les sièges déjà réservés pour cette séance
    const reservationsSieges = await ReservationSiege.findAll({
      include: {
        model: Reservation,
        where: { seance_id: seanceId },
        attributes: [],
      },
      attributes: ["siege_id"],
    });

    const siegesReservesIds = reservationsSieges.map((r) => r.siege_id);

    // Filtrer les sièges disponibles
    const siegesDisponibles = tousLesSieges.filter(
      (siege) => !siegesReservesIds.includes(siege.id)
    );

    res.status(200).json({
      success: true,
      data: siegesDisponibles,
    });
  } catch (error) {
    console.error("Erreur getSiegesDisponibles:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};
