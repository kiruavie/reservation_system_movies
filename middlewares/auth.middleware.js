const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message:
        "Token manquant ou format invalide. Utilisez le format 'Bearer Token'",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json("Token manquant après Bearer");
  }
  try {
    // decoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token expiré ou invalide" });
  }
};
