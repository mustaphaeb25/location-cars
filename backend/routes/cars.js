// const express = require('express');
// const bcrypt = require('bcrypt');
// const router=express.Router();
// const db=require("../data/db")
// const multer = require('multer');
// // Multer pour images
// const allowedTypes = ['image/jpeg', 'image/jpg', 'image/jfif', 'image/png'];

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
// },
//   filename: function (req, file, cb) {
//     let mimetype = file.mimetype;

//     // Normalize.jfif to image/jpeg if needed
//     if (file.originalname.endsWith('.jfif')) {
//       mimetype = 'image/jpeg';
// }

//     console.log('Type MIME reçu (normalisé):', mimetype);

//     // ✅ Check mimetype against allowedTypes
//     if (allowedTypes.includes(mimetype)) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, uniqueSuffix + path.extname(file.originalname));
// } else {
//       cb(new Error('Type de fichier non autorisé'), false);
// }
// }
// });


// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 } 
// });

// /*  VOITURES */

// router.get('/voitures', (req, res) => {
//     db.query('SELECT * FROM voitures ', (err, results) => {
//         if (err) return res.status(500).json({ erreur: 'Erreur serveur' });
//         res.json(results);
//     });
// });
// router.get('/voitures/:id', (req, res) => {
//     const voitureId = req.params.id;

//     db.query('SELECT * FROM voitures WHERE id = ?', [voitureId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ erreur: 'Erreur serveur' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Voiture non trouvée' });
//         }

//         res.json(results[0]); 
//     });
// });


// router.post('/voitures', upload.single('image'), (req, res) => {
//   const { marque, modele, statut, prix_par_jour, description } = req.body;
//   const image_url = req.file?.filename || null;

//   const sql = `
//     INSERT INTO voitures 
//       (marque, modele, statut, prix_par_jour, image_url, description) 
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   const values = [marque, modele, statut, prix_par_jour, image_url, description];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting car:', err);
//       return res.status(500).json({ erreur: 'Erreur serveur' });
//     }

//     res.status(201).json({
//       message: 'Voiture ajoutée avec succès',
//       voiture_id: result.insertId
//     });
//   });
// });
// router.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ erreur: 'Erreur Multer', details: err.message });
//   } else if (err) {
//     return res.status(400).json({ erreur: err.message });
//   }
//   next();
// });


// // Correction dans l'endpoint PUT pour les voitures
// router.put('/voitures/:id', upload.single('image'), (req, res) => {
//     const voitureId = req.params.id;
//     //    const image_url = req.file ? req.file.filename : null;
//     const { marque, modele, statut, prix_par_jour, description,image_url = req.file ? req.file.filename : null } = req.body;
 

//     let sql, params;

//     if (image_url) {
//         sql = 'UPDATE voitures SET marque=?, modele=?, statut=?, prix_par_jour=?, image_url=?, description=? WHERE id=?';
//         params = [marque, modele, statut, prix_par_jour, image_url, description, voitureId];
//     } else {
//         sql = 'UPDATE voitures SET marque=?, modele=?, statut=?, prix_par_jour=?, description=? WHERE id=?';
//         params = [marque, modele, statut, prix_par_jour, description, voitureId];
//     }

//     db.query(sql, params, (err, results) => {
//         if (err) {
//             return res.status(500).json({ erreur: 'Erreur serveur' });
//         }

//         if (results.affectedRows === 0) {
//             return res.status(404).json({ message: 'Voiture non trouvée' });
//         }

//         res.json({ message: 'Voiture modifiée' });
//     });
// });



// router.delete('/voitures/:id', (req, res) => {
//     db.query('DELETE FROM voitures WHERE id =?', [req.params.id], (err,results) => {
//         if (err) return res.status(500).json({ erreur: 'Erreur serveur' });
//          if (results.affectedRows === 0) {
//             return res.status(404).json({ message: 'Voiture non trouvée' });
//         }
//         res.json({ message: 'Voiture supprimée' });
//     });
// });

// module.exports=router
// backend/routes/cars.js

const express = require('express');
const router = express.Router();
const db = require("../data/db");
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import fs for file operations (e.g., deleting old images)

// Multer configuration
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/jfif', 'image/png'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let mimetype = file.mimetype;

    if (file.originalname.endsWith('.jfif')) {
      mimetype = 'image/jpeg';
    }

    if (allowedTypes.includes(mimetype)) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    } else {
      cb(new Error('Type de fichier non autorisé'), false);
    }
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }
});

/* VOITURES ROUTES */

router.get('/voitures', (req, res) => {
  db.query('SELECT * FROM voitures', (err, results) => {
    if (err) {
      console.error("Error fetching cars:", err); // Log the error
      return res.status(500).json({ erreur: 'Erreur serveur lors de la récupération des voitures' });
    }
    res.json(results);
  });
});

router.get('/voitures/:id', (req, res) => {
  const voitureId = req.params.id;
  db.query('SELECT * FROM voitures WHERE id = ?', [voitureId], (err, results) => {
    if (err) {
      console.error("Error fetching car by ID:", err); // Log the error
      return res.status(500).json({ erreur: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.json(results[0]);
  });
});

router.post('/voitures', upload.single('image'), (req, res) => {
  const { marque, modele, statut, prix_par_jour, description } = req.body;
  const image_url = req.file?.filename || null; // Use optional chaining for safety

  if (!marque || !modele || !statut || !prix_par_jour || !description) {
      // Basic validation: ensure required text fields are present
      // Note: Multer might put these into req.body even for form-data
      if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path); // Clean up uploaded file if validation fails
      }
      return res.status(400).json({ erreur: 'Tous les champs texte requis doivent être remplis.' });
  }

  const sql = `
    INSERT INTO voitures
      (marque, modele, statut, prix_par_jour, image_url, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [marque, modele, statut, prix_par_jour, image_url, description];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting car:', err);
      // If error occurs after file upload, clean up
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ erreur: 'Erreur serveur lors de l\'ajout de la voiture' });
    }

    res.status(201).json({
      message: 'Voiture ajoutée avec succès',
      voiture_id: result.insertId
    });
  });
});

// Multer error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer Error:", err.message);
    return res.status(400).json({ erreur: 'Erreur d\'upload de fichier', details: err.message });
  } else if (err) {
    console.error("General Error during upload:", err.message);
    return res.status(400).json({ erreur: err.message });
  }
  next();
});

// Corrected PUT endpoint for cars
router.put('/voitures/:id', upload.single('image'), (req, res) => {
  const voitureId = req.params.id;
  const { marque, modele, statut, prix_par_jour, description } = req.body;
  console.log(`Backend: Received PUT request for car ID: ${voitureId}`);
  console.log("Backend: Request Body (text fields):", req.body);
  console.log("Backend: New file uploaded (if any):", req.file?.filename);
  if (!marque || !modele || !statut || !prix_par_jour || !description) {
      if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path); // Clean up uploaded file if validation fails
      }
      return res.status(400).json({ erreur: 'Tous les champs texte requis doivent être remplis.' });
  }

  let sql = 'UPDATE voitures SET marque=?, modele=?, statut=?, prix_par_jour=?, description=?';
  let params = [marque, modele, statut, prix_par_jour, description];

  // Logic to handle image update: only update image_url if a new file is uploaded
  if (req.file) {
    const newImageUrl = req.file.filename;

    // Optional: Get old image path from DB and delete it
    // This requires another DB query to get the current image_url before updating
    // For simplicity, we'll just update for now. Implementing old image deletion is more complex
    // and might involve fetching the car first, then updating.

    sql += ', image_url=?';
    params.push(newImageUrl);
  }

  sql += ' WHERE id=?';
  params.push(voitureId);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error updating car:", err); // Log the error
      // If a new file was uploaded but DB update failed, delete the new file
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ erreur: 'Erreur serveur lors de la modification de la voiture' });
    }

    if (results.affectedRows === 0) {
      // If car not found, and a new file was uploaded, delete it.
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }

    res.json({ message: 'Voiture modifiée avec succès' });
  });
});

router.delete('/voitures/:id', (req, res) => {
  const carId = req.params.id;
  db.query('SELECT image_url FROM voitures WHERE id = ?', [carId], (err, results) => {
    if (err) {
      console.error("Error fetching car image for deletion:", err);
      return res.status(500).json({ erreur: 'Erreur serveur' });
    }
    const imageUrlToDelete = results[0]?.image_url;

    db.query('DELETE FROM voitures WHERE id =?', [carId], (err, results) => {
      if (err) {
        console.error("Error deleting car:", err);
        return res.status(500).json({ erreur: 'Erreur serveur' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Voiture non trouvée' });
      }

      // If car deleted successfully, try to delete the associated image file
      if (imageUrlToDelete) {
        const imagePath = path.join(__dirname, '../uploads', imageUrlToDelete);
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) {
            console.warn(`Could not delete image file: ${imagePath}`, unlinkErr);
            // Don't block the response for file deletion errors
          }
        });
      }
      res.json({ message: 'Voiture supprimée avec succès' });
    });
  });
});

module.exports = router;