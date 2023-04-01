const express = require("express")
const router = express.Router()
const { getAlbums, addAlbum, getAlbum, updateAlbum, deleteAlbum } = require("../controllers/albumsController")


router.route("/").get(getAlbums).post(addAlbum)
router.route("/:title").get(getAlbum)
router.route("/:id").put(updateAlbum).delete(deleteAlbum)


module.exports = router