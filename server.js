require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Movie System Reservation API....!");
});

app.listen(port, () => {
  console.log(`Serveur en marche sur http://localhost:${port}`);
});
