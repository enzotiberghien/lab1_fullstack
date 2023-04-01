const mongoose = require("mongoose")

const albumSchema = mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Please add an id"]
  },
  title: {
    type: String,
    required: [true, "Please add a title"]
  },
  artist: {
    type: String,
    required: [true, "Please add an artist"]
  },
  year: {
    type: Number,
    required: [true, "Please add a year"]
  }
}, {timestamps: true})

module.exports = mongoose.model("Album", albumSchema)