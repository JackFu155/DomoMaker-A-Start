const models = require('../models');

const { Tetris } = models;

const TetrisPage = (req, res) => {
  Tetris.TetrisModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), tetriss: docs });
  });
};

const makeTetris = (req, res) => {
  if (!req.body.name || !req.body.score) {
    return res.status(400).json({ error: 'Sorry! Name and Score are required' });
  }

  const TetrisData = {
    name: req.body.name,
    score: req.body.score,
    owner: req.session.account._id,
  };

  const newTetris = new Tetris.TetrisModel(TetrisData);

  const TetrisPromise = newTetris.save();

  TetrisPromise.then(() => res.json({ redirect: '/tetris' }));

  TetrisPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Module already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return TetrisPromise;
};

const getTetriss = (request, response) => {
  const req = request;
  const res = response;

  return Tetris.TetrisModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ tetriss: docs });
  });
};

module.exports.TetrisPage = TetrisPage;
module.exports.getTetriss = getTetriss;
module.exports.makeTetris = makeTetris;
