// const express = require('express');
// const bcrypt = require('bcrypt');
// const router=express.Router();
// const db=require("../data/db")
// const SECRET_KEY = 'maCleSecreteUltraSolide';
// const jwt = require('jsonwebtoken');






// router.post('/register', async (req, res) => {
//     const { nom, email, mot_de_passe } = req.body;
//     db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
//         if (results.length > 0) return res.status(400).json({ message: 'Email déjà utilisé' });
//         const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
//         const role ='client'
//         db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe,role) VALUES (?,?,?,?)',
//             [nom, email, hashedPassword,role], (err, result) => {
//                 if (err) return res.status(500).json({ error: 'Erreur serveur' });
//                 res.status(201).json({ message: 'Inscription réussie', userId: result.insertId });
//             });
//     });
// });
// router.post('/login', (req, res) => {
//     const { email, mot_de_passe } = req.body;
//     db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
//         if (err) return res.status(500).json({ error: 'Erreur serveur' });
//         if (results.length === 0) return res.status(401).json({ message: 'Utilisateur non trouvé' });
//         const user = results[0];
//         const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
//         if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' });
//         const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
//         res.json({ message: 'Connexion réussie', token });
//     });
// });






// module.exports=router

// const express = require('express');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const db = require("../data/db"); // Assuming this is your database connection
// const SECRET_KEY = 'maCleSecreteUltraSolide'; // Consider moving to environment variables
// const jwt = require('jsonwebtoken');

// router.post('/register', async (req, res) => {
//     const { nom, email, mot_de_passe } = req.body;

//     db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
//         if (err) {
//             console.error("Database error during registration check:", err);
//             return res.status(500).json({ error: 'Erreur serveur lors de la vérification de l\'email.' });
//         }
//         if (results.length > 0) {
//             return res.status(400).json({ message: 'Email déjà utilisé' });
//         }

//         try {
//             const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
//             const role = 'client'; // Default role for new registrations

//             db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?,?,?,?)',
//                 [nom, email, hashedPassword, role], (insertErr, result) => {
//                     if (insertErr) {
//                         console.error("Database error during user insertion:", insertErr);
//                         return res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
//                     }

//                     // --- UX Improvement: Log in user automatically after registration ---
//                     // Retrieve the newly created user (or directly use the data if available)
//                     const newUser = {
//                         id: result.insertId,
//                         nom: nom, // Use the nom from req.body
//                         email: email,
//                         role: role
//                     };

//                     const token = jwt.sign(
//                         { id: newUser.id, email: newUser.email, role: newUser.role, nom: newUser.nom }, // INCLUDE 'nom' here
//                         SECRET_KEY,
//                         { expiresIn: '1h' }
//                     );

//                     res.status(201).json({ message: 'Inscription réussie', token, user: newUser });
//                     // Optionally, you might send a success message and let the frontend redirect to login
//                     // but sending the token is more common for auto-login.
//                 });
//         } catch (hashError) {
//             console.error("Error hashing password:", hashError);
//             return res.status(500).json({ error: 'Erreur serveur lors du hachage du mot de passe.' });
//         }
//     });
// });

// router.post('/login', (req, res) => {
//     const { email, mot_de_passe } = req.body;

//     db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
//         if (err) {
//             console.error("Database error during login query:", err);
//             return res.status(500).json({ error: 'Erreur serveur' });
//         }
//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Utilisateur non trouvé' });
//         }

//         const user = results[0];
//         const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

//         if (!isValid) {
//             return res.status(401).json({ message: 'Mot de passe incorrect' });
//         }

//         // --- FIX: Include user.nom in the JWT token payload ---
//         const token = jwt.sign(
//             { id: user.id, email: user.email, role: user.role, nom: user.nom }, // 'nom' is now included!
//             SECRET_KEY,
//             { expiresIn: '1h' }
//         );

//         res.json({ message: 'Connexion réussie', token });
//     });
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require("../data/db"); // Assuming this is your database connection
const SECRET_KEY = 'maCleSecreteUltraSolide'; // Consider moving to environment variables
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;

    db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
        if (err) {
            console.error("Database error during registration check:", err);
            return res.status(500).json({ error: 'Erreur serveur lors de la vérification de l\'email.' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        try {
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            const role = 'client'; // Default role for new registrations

            db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?,?,?,?)',
                [nom, email, hashedPassword, role], (insertErr, result) => {
                    if (insertErr) {
                        console.error("Database error during user insertion:", insertErr);
                        return res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
                    }

                    // Log in user automatically after registration
                    const newUser = {
                        id: result.insertId,
                        nom: nom, // Use the nom from req.body for the new user
                        email: email,
                        role: role
                    };

                    const token = jwt.sign(
                        { id: newUser.id, email: newUser.email, role: newUser.role, nom: newUser.nom }, // <--- CRUCIAL: 'nom' IS INCLUDED HERE
                        SECRET_KEY,
                        { expiresIn: '1h' }
                    );

                    res.status(201).json({ message: 'Inscription réussie', token, user: newUser });
                });
        } catch (hashError) {
            console.error("Error hashing password:", hashError);
            return res.status(500).json({ error: 'Erreur serveur lors du hachage du mot de passe.' });
        }
    });
});

router.post('/login', (req, res) => {
    const { email, mot_de_passe } = req.body;

    db.query('SELECT * FROM utilisateurs WHERE email =?', [email], async (err, results) => {
        if (err) {
            console.error("Database error during login query:", err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const user = results[0];
        const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

        if (!isValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // <--- CRUCIAL FIX: Include user.nom in the JWT token payload ---
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, nom: user.nom }, // <--- 'nom' MUST BE INCLUDED HERE
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Connexion réussie', token });
    });
});

module.exports = router;