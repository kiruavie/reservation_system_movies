const { body, validationResult } = require("express-validator");

// --------------- Film validation  -----------------------
exports.createFilmValidation = [
  body("titre")
    .notEmpty()
    .withMessage("Le titre est requis")
    .isLength({ min: 2 })
    .withMessage("Le titre doit contenir au moins 2 caractères"),

  body("description")
    .notEmpty()
    .withMessage("La description est requise")
    .isLength({ min: 10 })
    .withMessage("La description doit contenir au moins 10 caractères"),

  body("post_url")
    .notEmpty()
    .withMessage("L’URL du poster est requise")
    .isURL()
    .withMessage("L’URL du poster doit être une URL valide"),

  body("genre")
    .isArray({ min: 1 })
    .withMessage("Le genre doit être un tableau contenant au moins un élément")
    .custom((value) => value.every((g) => typeof g === "string"))
    .withMessage("Chaque genre doit être une chaîne de caractères"),

  body("duree")
    .notEmpty()
    .withMessage("La durée est requise")
    .isInt({ min: 1, max: 600 })
    .withMessage("La durée doit être un entier entre 1 et 600 minutes"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

exports.updateFilmValidation = [
  body("titre")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Le titre doit contenir au moins 2 caractères"),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("La description doit contenir au moins 10 caractères"),

  body("post_url")
    .optional()
    .isURL()
    .withMessage("L’URL du poster doit être une URL valide"),

  body("genre")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Le genre doit être un tableau contenant au moins un élément")
    .custom((value) => value.every((g) => typeof g === "string"))
    .withMessage("Chaque genre doit être une chaîne de caractères"),

  body("duree")
    .optional()
    .notEmpty()
    .withMessage("La durée est requise")
    .isInt({ min: 1, max: 600 })
    .withMessage("La durée doit être un entier entre 1 et 600 minutes"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

// ------------------------------------------------------------------------------------------------

// ------------------------------- Séance Validation  --------------------------------------------
exports.seanceValidation = [
  body("film_id")
    .notEmpty()
    .withMessage("Le film_id est requis")
    .isInt()
    .withMessage("Le film_id doit être un entier"),

  body("salle_id")
    .notEmpty()
    .withMessage("Le salle_id est requis")
    .isInt()
    .withMessage("Le salle_id doit être un entier"),

  body("date")
    .notEmpty()
    .withMessage("La date est requise")
    .isISO8601()
    .withMessage("La date doit être au format valide (YYYY-MM-DD)"),

  body("heure_debut")
    .notEmpty()
    .withMessage("L'heure de début est requise")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("L'heure de début doit être au format HH:mm"),

  body("heure_fin")
    .notEmpty()
    .withMessage("L'heure de fin est requise")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("L'heure de fin doit être au format HH:mm"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

exports.updateSeanceValidation = [
  body("film_id")
    .optional()
    .isInt()
    .withMessage("Le film_id doit être un entier"),

  body("salle_id")
    .optional()
    .isInt()
    .withMessage("Le salle_id doit être un entier"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("La date doit être au format valide (YYYY-MM-DD)"),

  body("heure_debut")
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("L'heure de début doit être au format HH:mm"),

  body("heure_fin")
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("L'heure de fin doit être au format HH:mm"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

// -------------------------------------------------------------------------------------
// ------------------------------- auth validation  -------------------------------------------

exports.registerValidator = [
  body("nom")
    .notEmpty()
    .withMessage("Le nom est requis")
    .isLength({ min: 2 })
    .withMessage("Le nom doit avoir au moins 2 caractères"),

  body("email")
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email invalide"),

  body("mot_de_passe")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 5 })
    .withMessage("Le mot de passe doit avoir au moins 5 caractères"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Le rôle doit être 'user' ou 'admin'"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

exports.loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email invalide"),

  body("mot_de_passe").notEmpty().withMessage("Le mot de passe est requis"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];
