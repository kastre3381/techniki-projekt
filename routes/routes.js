const express = require('express');
const router = express.Router();
const path = require('path');
const { Client } = require('pg');
const jwt = require('jsonwebtoken');


const client = new Client({
  user: 'whvezcgt',
  host: 'cornelius.db.elephantsql.com',
  database: 'whvezcgt',
  password: 'Uj-HIhvRwQWv_3cYuh6qgVwBDr8NzIOF',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

const isAuthenticated = require('../middleware/authMiddleware');


router.get('/authStatus', isAuthenticated, (req, res) => {
  const username = req.session.user ? req.session.user.username : null;
  res.json({ isAuthenticated: true, username: username });
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM ti.user WHERE username = $1 AND passwd = $2', [username, password]);

    if (result.rows.length > 0) {
      req.session.user = { username: username };
      res.redirect('/');
    } else {
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
      // res.json({success: false});
      res.redirect('/register');
    } else {
      await client.query('INSERT INTO ti.user(username, passwd) VALUES($1, $2)', [username, password]);
      req.session.user = { username: username };
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
});

router.get('/getOption', isAuthenticated, async (req, res) => {
  try{
    const resultat = await client.query('SELECT * FROM ti.data WHERE username = $1', [req.session.user.username]);
    console.log('res: ', resultat.rows);
    return res.json({success: true, data: resultat.rows});
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error });
}
})

router.post('/saveOption', isAuthenticated, async (req, res) => {
  try {
      if(req.body.orbitCheckbox == 'on') req.body.orbitCheckbox = true;
      else req.body.orbitCheckbox = false;
      console.log('saving to db: ', req.body);
      await client.query('INSERT INTO ti.data(username, speedVal, showOrbit) VALUES($1, $2, $3)', [req.session.user.username, req.body.speedVal, req.body.orbitCheckbox]);
      res.redirect('/simulation');
    } catch (error) {
      console.log(error);
      return res.status(500).json({ "error": error });
  }
});

module.exports = router;
