const express = require('express');
const bcrypt = require('bcrypt');
const router=express.Router();
const db=require("../data/db")


/*  RÉSERVATIONS */

// router.get('/reservations', (req, res) => {
//   // You would typically get the user ID from the authenticated token
//   // For demonstration, let's assume a query parameter or from a auth middleware
//   const userId = req.query.id_utilisateur; // Example: ?id_utilisateur=X

//   let query = `
//     SELECT
//       r.id AS reservation_id,
//       r.date_debut,
//       r.date_fin,
//       r.statut,
//       u.nom AS user_nom,
//       u.prenom AS user_prenom,
//       c.marque,
//       c.modele,
//       c.annee,
//       c.prix_par_jour,
//       c.image_url
//     FROM reservations r
//     JOIN utilisateurs u ON r.id_utilisateur = u.id
//     JOIN voitures c ON r.id_voiture = c.id
//   `;
//   const queryParams = [];

//   if (userId) {
//     query += ' WHERE r.id_utilisateur = ?';
//     queryParams.push(userId);
//   }

//   db.query(query, queryParams, (err, results) => {
//     if (err) {
//       console.error("Error fetching reservations:", err);
//       return res.status(500).json({ erreur: 'Erreur serveur lors de la récupération des réservations' });
//     }
//     res.status(200).json(results);
//   });
// });
router.get('/reservations', (req, res) => {
    db.query('SELECT * FROM reservations ', (err, results) => {
        if (err) return res.status(500).json({ erreur: 'Erreur serveur' });
        res.json(results);
    });
});


router.post('/reservations', (req, res) => {
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
router.put('/reservations/:id/statut', (req, res) => {
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
module.exports=router