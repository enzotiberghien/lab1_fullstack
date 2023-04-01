// @desc Get albums
// @route GET/api/albums
const getAlbums = () => {
  console.log("Get the albums")
}


// @desc Add an album
// @route POST/api/
const addAlbum = () => {
  console.log("Add an album")
}


// @desc Get an album
// @route GET/api/albums/:title
const getAlbum = (title) => {
  console.log("Get an album")
}


// @desc Update an album
// @route PUT/api/albums/:id
const updateAlbum = () => {
  console.log("Update and album")
}


// @desc Delete an album
// @route DELETE/api/albums/:id
const deleteAlbum = () => {
  console.log("Delete an album")
}


module.exports = {
  getAlbums,
  addAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum
}