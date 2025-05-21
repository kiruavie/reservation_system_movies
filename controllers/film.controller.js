const db = require("../models");
const Films = db.Films;

// Créer un film (admin)

exports.createFilm = async (req, res) => {
  try {
    const { titre, description, post_url, genre } = req.body;

    if (!titre || !description || !post_url || !genre) {
      return res.status(400).json("Tous les champs sont réquis");
    }

    if (!Array.isArray(genre)) {
      return res.status(400).json({
        success: false,
        message: "Le genre doit être un tableau de chaîne",
      });
    }
    const newFilm = await Films.create({ titre, description, post_url, genre });

    res.status(201).json({
      success: true,
      message: "Film enregistré avec succès !",
      data: newFilm,
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

// obtenir tous les films (admin)
exports.getAllFilms = async (req, res) => {
  try {
    const films = await Films.findAll({
      order: [["created_at", "DESC"]],
    });
    res.status(200).json({
      success: true,
      message: "Tous les films disponibles",
      data: films,
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

// obtenir un film en particulier (admin)

exports.getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Films.findByPk(id);

    if (!film) {
      return res
        .status(404)
        .json({ success: false, message: "Film introuvable." });
    }
    res.status(200).json({ success: true, message: "Film trouvé", data: film });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// mettre à jour un film (admin)

exports.updateFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, post_url, genre } = req.body;

    const film = await Films.findByPk(id);

    if (!film) {
      return res
        .status(404)
        .json({ success: false, message: "Film introuvable." });
    }

    const updatedFilm = await film.update({
      titre,
      description,
      post_url,
      genre,
    });

    res.status(200).json({
      success: true,
      message: "Film modifié avec succès",
      data: updatedFilm,
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

// Supprimer un film (admin)

exports.deleteFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Films.findByPk(id);

    if (!film) {
      return res
        .status(404)
        .json({ success: false, message: "Film introuvable." });
    }

    await film.destroy();
    res
      .status(200)
      .json({ success: true, message: "Film supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};
