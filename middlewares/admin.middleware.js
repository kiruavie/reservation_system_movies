exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "role") {
    return res.status(403).json({ success: false, message: "Accès interdit." });
  }
  next();
};
