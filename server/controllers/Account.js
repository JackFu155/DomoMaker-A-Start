const models = require('../models');

const { Account } = models;

//Loads Login Page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

//Logs out
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

//Loads tetris scoreboard
const tetrisPage = (req, res) => {
  res.render('tetris', { csrfToken: req.csrfToken() });
};

//Loads Forgot Password Page
const forgotPage = (req, res) => {
  res.render('forgot', { csrfToken: req.csrfToken() });
};

//Loads Profile Page
const profilePage = (req, res) => {
  res.render('profile', { csrfToken: req.csrfToken() });
};

//Loads Links Page
const linksPage = (req, res) => {
  res.render('links', { csrfToken: req.csrfToken() });
};

//Login Function
const login = (request, response) => {
  const req = request;
  const res = response;

  // force cast to strings to cover up some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'Sorry! All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ err: 'Wrong email, username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/links' });
  });
};

//Signup Page
const signup = (request, response) => {
  const req = request;
  const res = response;

  // Cast to strings to cover up some security flaws
  req.body.email = `${req.body.email}`;
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.email || !req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'Sorry! All Fields are Required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Sorry! Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      email: req.body.email,
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.profilePage = profilePage;
module.exports.forgotPage = forgotPage;
module.exports.tetrisPage = tetrisPage;
module.exports.loginPage = loginPage;
module.exports.linksPage = linksPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
