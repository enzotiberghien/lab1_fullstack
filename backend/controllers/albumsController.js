const Album = require("../models/albumModel")


// @desc Get albums
// @route GET/api/albums
const getAlbums = (async (req, res) => {
  try {
    const albums = await Album.find()
    res.json(albums)
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
})


// @desc Add an album
// @route POST/api/
const addAlbum = async (req, res) => {
  try {
    const { id, title, artist, year } = req.body;
    const albumExist = await Album.findOne({ $or: [{ title }, { id }] });

    if (albumExist) {
      return res.status(409).json({ error: "Album already exists" });
    }

    const album = await Album.create({ id, title, artist, year });
    res.status(201).json(album);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}


// @desc Get an album
// @route GET/api/albums/:title
const getAlbum = (async (req, res) => {
  try {
    const { title } = req.params
    const album = await Album.findOne({ title });

    if (!album) {
      return res.status(404).json({ error: `The Album ${title} does not exists` });
    }

    res.status(200).json(album)

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
})


// @desc Update an album
// @route PUT/api/albums/:id
const updateAlbum = (async (req, res) => {
  try {
    const { id } = req.params
    const album = await Album.findOne({ id })

    if (!album) {
      return res.status(404).json({ error: `The Album of id ${id} does not exists` });
    }

    const updatedAlbum = await Album.findOneAndUpdate({ id }, req.body, { new: true })

    res.status(200).json(updatedAlbum)

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }

})


// @desc Delete an album
// @route DELETE/api/albums/:id
const deleteAlbum = (async (req, res) => {
  try {
    const { id } = req.params
    const album = await Album.findOne({ id })

    if (!album) {
      return res.status(404).json({ error: `The Album of id ${id} does not exists` });
    }

    const deletedAlbum = await Album.findOneAndDelete({id})

    res.status(200).json(deletedAlbum)

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
})


module.exports = {
  getAlbums,
  addAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum
}