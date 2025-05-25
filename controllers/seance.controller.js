// CRUD SEANCES
const db = require("../models");
const Seances = db.Seances;
// create seance

exports.createSeance = async (req, res) => {
  try {
    const { film_id, salle_id, date, heure_debut, heure_fin } = req.body;

    if (!film_id || !salle_id || !date || !heure_debut || !heure_fin) {
      return res.status(400).json("Tous les champs sont réquis");
    }
    const newSeance = await Seances.create({
      film_id,
      salle_id,
      date,
      heure_debut,
      heure_fin,
    });

    res.status(201).json({
      success: true,
      message: "Une nouvelle séance vient d'être créée avec succès",
      data: newSeance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// obtenir une séance
exports.getSeanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const seance = await Seances.findByPk(id);

    if (!seance) {
      return res.status(404).json("La séance est introuvable");
    }

    res.status(200).json({
      success: true,
      seance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// obtenir toutes les séances
exports.getAllSeances = async (req, res) => {
  try {
    const seances = await Seances.findAll({
      include: ["film", "salle"],
    });

    res.status(200).json({
      success: true,
      message: "Toutes les séances disponible sont ici",
      data: seances,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// modifier une seance
exports.updateSeanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { film_id, salle_id, date, heure_debut, heure_fin } = req.body;
    const seance = await Seances.findByPk(id);

    if (!seance) {
      return res.status(404).json("La séance est introuvable");
    }

    const updatedSeance = await seance.update({
      film_id,
      salle_id,
      date,
      heure_debut,
      heure_fin,
    });

    res.status(200).json({
      success: true,
      message: "La séance a été modifié avec succès",
      data: updatedSeance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: true,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// supprimer une séance

exports.deleteSeanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const seance = await Seances.findByPk(id);

    if (!seance) {
      return res.status(404).json("séance introuvable");
    }

    await seance.destroy();

    res
      .status(200)
      .json({ success: true, message: "Séance supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};
