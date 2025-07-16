const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./data/db');

const app = express();
const port = 3000;
const SECRET_KEY = 'maCleSecreteUltraSolide';

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer pour images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
    storage: storage ,
    limits: { fileSize: 2 * 1024 * 1024 }, 
 });
/*  AUTHENTIFICATION */

app.post('/register', async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;
    db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
        if (results.length > 0) return res.status(400).json({ message: 'Email déjà utilisé' });
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const role ='client'
        db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe,role) VALUES (?,?,?,?)',
            [nom, email, hashedPassword,role], (err, result) => {
                if (err) return res.status(500).json({ error: 'Erreur serveur' });
                res.status(201).json({ message: 'Inscription réussie', userId: result.insertId });
            });
    });
});

app.post('/login', (req, res) => {
    const { email, mot_de_passe } = req.body;
    db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.length === 0) return res.status(401).json({ message: 'Utilisateur non trouvé' });
        const user = results[0];
        const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' });
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    });
});

/*  VOITURES */

app.get('/voitures', (req, res) => {
    db.query('SELECT * FROM voitures WHERE statut = "disponible"', (err, results) => {
        if (err) return res.status(500).json({ erreur: 'Erreur serveur' });
        res.json(results);
    });
});
app.get('/voitures/:id', (req, res) => {
    const voitureId = req.params.id;

    db.query('SELECT * FROM voitures WHERE id = ?', [voitureId], (err, results) => {
        if (err) {
            return res.status(500).json({ erreur: 'Erreur serveur' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }

        res.json(results[0]); 
    });
});


app.post('/voitures', upload.single('image'), (req, res) => {
    const { marque, modele, statut, prix_par_jour, description } = req.body;
    const image_url = req.file ? req.file.filename : null;
    db.query('INSERT INTO voitures (marque, modele, statut, prix_par_jour, image_url, description) VALUES (?,?,?,?,?,?)',
        [marque, modele, statut, prix_par_jour, image_url, description], (err, result) => {
            if (err) return res.status(500).json({ erreur: 'Erreur serveur' });
            res.status(201).json({ message: 'Voiture ajoutée', voiture_id: result.insertId });
        });
});

// Correction dans l'endpoint PUT pour les voitures
app.put('/voitures/:id', upload.single('image'), (req, res) => {
    const voitureId = req.params.id;
    const { marque, modele, statut, prix_par_jour, description } = req.body;
    const image_url = req.file ? req.file.filename : null;

    let sql, params;

    if (image_url) {
        sql = 'UPDATE voitures SET marque=?, modele=?, statut=?, prix_par_jour=?, image_url=?, description=? WHERE id=?';
        params = [marque, modele, statut, prix_par_jour, image_url, description, voitureId];
    } else {
        sql = 'UPDATE voitures SET marque=?, modele=?, statut=?, prix_par_jour=?, description=? WHERE id=?';
        params = [marque, modele, statut, prix_par_jour, description, voitureId];
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ erreur: 'Erreur serveur' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }

        res.json({ message: 'Voiture modifiée' });
    });
});



app.delete('/voitures/:id', (req, res) => {
    db.query('DELETE FROM voitures WHERE id =?', [req.params.id], (err,results) => {
        if (err) return res.status(500).json({ erreur: 'Erreur serveur' });
         if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }
        res.json({ message: 'Voiture supprimée' });
    });
});

/*  RÉSERVATIONS */

app.post('/reservations', (req, res) => {
  const { id_utilisateur, id_voiture, date_debut, date_fin, statut} = req.body;

  db.query(
    'INSERT INTO reservations (id_utilisateur, id_voiture, date_debut, date_fin, statut) VALUES (?,?,?,?,"en attente")',
    [id_utilisateur, id_voiture, date_debut, date_fin, statut],
    (err, result) => {
      if (err) return res.status(500).json({ erreur: 'Erreur serveur'});
      res.status(201).json({ message: 'Réservation enregistrée', reservation_id: result.insertId});
}
);
});
app.put('/reservations/:id/statut', (req, res) => {
  const { statut} = req.body;
  const { id} = req.params;

  // Optionnel: vérifier si le statut est valide
  const statuts_valides = ['en attente', 'validée', 'refusée'];
  if (!statuts_valides.includes(statut)) {
    return res.status(400).json({ erreur: 'Statut invalide'});
}

  db.query(
    'UPDATE reservations SET statut =? WHERE id =?',
    [statut, id],
    (err, result) => {
      if (err) return res.status(500).json({ erreur: 'Erreur serveur'});
      if (result.affectedRows === 0) return res.status(404).json({ erreur: 'Réservation non trouvée'});

      res.status(200).json({ message: 'Statut mis à jour'});
}
);
});

app.listen(port, () => {
    console.log(` Serveur démarré sur http://localhost:${port}`);
});