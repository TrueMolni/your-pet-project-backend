const { Schema, model } = require('mongoose');

const NewsSchema = Schema({
  title: {
    type: String,
    required: [true, 'Add title'],
  },
  text: {
    type: String,
    require: true,
  },
  date: { type: String },
  imgUrl: { type: String },
});

const News = model('new', NewsSchema);

module.exports = {
  News,
};
