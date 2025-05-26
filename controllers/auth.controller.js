const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// inscription utilisateurs
exports.RegisterController = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;

    if (!nom || !email || !mot_de_passe) {
      return res.status(400).json("Tous les champs sont réquis");
    }

    // verifier si l'utilisateur existe
    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      return res.status(400).json("L'adresse email existe déjà");
    }
    const newUser = await User.create({
      nom,
      email,
      mot_de_passe,
      role: req.body.role || "user",
    });

    // supprimer le mot de passe avant de renvoyer la réponse JSON
    const sanitzedUser = { ...newUser.toJSON() };
    delete sanitzedUser.mot_de_passe;

    res.status(201).json({
      success: true,
      message: "Inscription réussi",
      data: sanitzedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// connexion utilisateur
exports.LoginController = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const existUser = await User.findOne({
      where: { email },
      attributes: ["id", "nom", "email", "mot_de_passe", "role"],
    });

    if (!existUser) {
      return res.status(400).json("Adresse Email ou mot de passe incorrect");
    }

    // verifier si le mot de passe est correcte (comparaison)
    const isMatch = await bcrypt.compare(mot_de_passe, existUser.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json("Adresse email ou mot de passe incorrecte");
    }
    // Access token (1h) et refresh token (7j)
    // Génerer un token

    const accessToken = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
        role: existUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
        role: existUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Supprimer le mot de passe de la réponse
    const sanitzedUser = { ...existUser.toJSON() };
    delete sanitzedUser.mot_de_passe;

    res.status(200).json({
      success: true,
      message: "Connecté avec succès",
      accessToken,
      refreshToken,
      user: sanitzedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};
