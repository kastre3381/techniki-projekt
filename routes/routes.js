const express = require('express');
const { Client } = require('pg');
const router = express.Router();
const path = require('path');

const client = new Client({
  user: 'whvezcgt',
  host: 'cornelius.db.elephantsql.com',
  database: 'whvezcgt',
  password: 'Uj-HIhvRwQWv_3cYuh6qgVwBDr8NzIOF',
  port: 5432,
});

const isAuthenticated = require('../middleware/authMiddleware');

// Route to get user authentication status


client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

router.get('/authStatus', isAuthenticated, (req, res) => {
  // Send the authentication status to the client
  const username = req.session.user ? req.session.user.username : null;
  res.json({ isAuthenticated: true, username: username });
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});

router.get('/logout', isAuthenticated, (req, res) => {
  // Destroy the session to log out
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Send JSON response indicating successful logout
      res.json({ success: true });
    }
  });
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

router.get('/simulation', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'simulation.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html'));
});

// routes.js
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM ti.user WHERE username = $1 AND passwd = $2', [username, password]);

    if (result.rows.length > 0) {
      // User is authenticated, redirect to the main page
      req.session.user = { username: username };
      res.redirect('/');
    } else {
      // Authentication failed, redirect to the login page
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
});


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM ti.user WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      // Username already taken, redirect to the registration page
      res.redirect('/register');
    } else {
      // Registration successful, redirect to the main page
      await client.query('INSERT INTO ti.user(username, passwd) VALUES($1, $2)', [username, password]);
      req.session.user = { username: username };
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
});


module.exports = router;
