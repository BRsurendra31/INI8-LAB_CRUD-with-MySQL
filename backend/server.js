const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Import the DB connection
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Create
// Create
app.post('/register', (req, res) => {
    const { name, email, dateOfBirth, phoneNumber } = req.body;

    // Check if the email already exists
    const checkEmailQuery = `SELECT * FROM Registration WHERE Email = ?`;
    db.query(checkEmailQuery, [email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.length > 0) {
            // Email already exists
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

        // If email does not exist, proceed to insert the new user
        const sql = `INSERT INTO Registration (Name, Email, DateOfBirth, PhoneNumber) VALUES (?, ?, ?, ?)`;
        db.query(sql, [name, email, dateOfBirth, phoneNumber], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User registered successfully', id: result.insertId });
        });
    });
});


// Read
app.get('/register', (req, res) => {
    const sql = `SELECT * FROM Registration`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/register/:id', (req, res) => {
    const sql = `SELECT * FROM Registration WHERE ID = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result[0]);
    });
});

// Update
app.put('/register/:id', (req, res) => {
    const { name, email, dateOfBirth, phoneNumber } = req.body;
    const sql = `UPDATE Registration SET Name = ?, Email = ?, DateOfBirth = ?, PhoneNumber = ? WHERE ID = ?`;
    db.query(sql, [name, email, dateOfBirth, phoneNumber, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated successfully' });
    });
});

// Delete
app.delete('/register/:id', (req, res) => {
    const sql = `DELETE FROM Registration WHERE ID = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted successfully' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
