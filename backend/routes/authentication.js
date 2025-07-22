const express = require('express');
const bcrypt = require('bcrypt');
const router=express.Router();
const db=require("../data/db")
const SECRET_KEY = 'maCleSecreteUltraSolide';
const jwt = require('jsonwebtoken');






router.post('/register', async (req, res) => {
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
router.post('/login', (req, res) => {
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






module.exports=router