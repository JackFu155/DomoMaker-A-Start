const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let TetrisModel = {};

// mongoose.Types.ObjectID is a function that converts string ID to real mongo ID
const convertID = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const TetrisSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  score: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

TetrisSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  score: doc.score,
});

TetrisSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertID(ownerId),
  };

  return TetrisModel.find(search).select('name score').lean().exec(callback);
};

TetrisModel = mongoose.model('Tetris', TetrisSchema);

module.exports.TetrisModel = TetrisModel;
module.exports.TetrisSchema = TetrisSchema;
