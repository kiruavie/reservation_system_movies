const db = require("../models");
const Film = db.Film;
const Seance = db.Seance;

// Créer un film (admin)

exports.createFilm = async (req, res) => {
  try {
    const { titre, description, post_url, genre, duree } = req.body;

    if (!titre || !description || !post_url || !genre || !duree) {
      return res.status(400).json("Tous les champs sont réquis");
    }

    if (!Array.isArray(genre)) {
      return res.status(400).json({
        success: false,
        message: "Le genre doit être un tableau de chaîne",
      });
    }
    const newFilm = await Film.create({
      titre,
      description,
      post_url,
      genre,
      duree: duree || "90",
    });

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
    const films = await Film.findAll({
      order: [["created_at", "DESC"]],
    });

    // grouper par genre
    const grouped = {};
    films.forEach((film) => {
      const genre = film.genre || "Inconnue";
      if (!grouped[genre]) grouped[genre] = [];
      grouped[genre].push(film);
    });
    res.status(200).json({
      success: true,
      message: "Tous les films disponibles",
      data: grouped,
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

exports.getFilmsWithSeancesByDate = async (req, res) => {
  try {
    // Si aucune date n'est fournie, on prend la date actuelle
    const date = req.query.date || new Date().toISOString().split("T")[0]; // format YYYY-MM-DD

    const films = await Film.findAll({
      include: {
        model: Seance,
        as: "seances",
        where: db.sequelize.where(
          db.sequelize.fn("DATE", db.sequelize.col("seances.date")),
          date
        ),
        required: false, // pour inclure les films même s'ils n'ont pas de séance ce jour-là
      },
    });

    res.status(200).json({
      success: true,
      data: films,
    });
  } catch (error) {
    console.error("Erreur getFilmsWithSeancesByDate:", error);
    res.status(500).json({
      success: false,
      message: "Erreur de serveur",
      error: error.message,
    });
  }
};

// obtenir un film en particulier (admin)

exports.getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);

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
    const { titre, description, post_url, genre, duree } = req.body;

    const film = await Film.findByPk(id);

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
      duree,
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
    const film = await Film.findByPk(id);

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
