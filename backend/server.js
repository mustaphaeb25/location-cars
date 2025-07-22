const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const bcrypt = require('bcrypt');

const db = require('./data/db');
const authRoutes = require("./routes/authentication");
const authCars= require("./routes/cars")
const authRes = require("./routes/RÉSERVATIONS")
const contactRoutes = require("./routes/contact");

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/*  AUTHENTIFICATION */
app.use("/api/auth", authRoutes);
app.use("/api/auth", authCars);
app.use("/api", authRes);
app.use("/api", contactRoutes); 





app.listen(port, () => {
    console.log(` Serveur démarré sur http://localhost:${port}`);
});