import { getAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum } from "./fetchAPI.js";
import { $, $all } from "./selectors.js"

// Load the albums in the table
const loadAlbums = async () => {
  const albums = await getAlbums()

  let html = ""
  albums.forEach(album => {
    html += `
      <tr>
        <td class="id">${album.id}</td>
        <td class="title">${album.title}</td>
        <td class="artist">${album.artist}</td>
        <td class="year">${album.year}</td>
        <td class="buttons"><button>Edit</button></td>
        <td class="buttons"><button>Delete</button></td>
      </tr>
    `
  })
  $("#albums-container").innerHTML = html

  addClickEvents()
}


// Add the event listeners to buttons
const addClickEvents = () => {
  const btns = $all(".buttons button")
  const album = {}

  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const parent = btn.closest("tr")
      const props = ["id", "title", "artist", "year"]
      props.forEach(prop => {
        album[prop] = parent.querySelector(`.${prop}`).textContent;
      });

      console.log(album)

      // Create modal
      if (e.target.textContent === "Edit") editModal(album)
      else if (e.target.textContent === "Delete") deleteModal(album)
    })
  })
}


const editModal = (album) => {
  $("main").innerHTML += `
  <div class="overlay" id="edit-overlay"></div>
  <form action="" id="edit-form" class="invisible">
    <h2>Edit</h2>
    <input type="text" name="title" placeholder="Title" value="${album.title}">
    <input type="text" name="artist" placeholder="Artist" value="${album.artist}">
    <input type="text" name="year" placeholder="Year" value="${album.year}">
    <button type="submit">Submit</button>
  </form>
  `

  $("#delete-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const updatedAlbum = {
      id: parseInt($("#edit-form input[name='id']").value),
      title: $("#edit-form input[name='title']").value,
      artist: $("#edit-form input[name='artist']").value,
      year: parseInt($("#edit-form input[name='year']").value)
    }

    updateAlbum(updatedAlbum)

    $(".overlay").remove()
    $("#edit-form").remove()

    location.reload()
  })
}


const deleteModal = (album) => {
  $("main").innerHTML += `
  <div class="overlay" id="delete-overlay"></div>
  <div id="delete-modal">
    <h2>Are you sure you want to delete this album ?</h2>
    <h3>${album.title} - ${album.artist}</h3>
    <button>Delete</button>
  </div>
  `

  $("#delete-modal button").addEventListener("click", (e) => {
    e.preventDefault()

    album.id = parseInt(album.id)
    album.year = parseInt(album.year)

    deleteAlbum(album)

    $(".overlay").remove()
    $("#delete-modal").remove()

    location.reload()
  })
}


const addModal = () => {
  $("main").innerHTML += `
  <div class="overlay" id="add-overlay"></div>
  <form action="" id="add-form" class="invisible">
    <h2>Add</h2>
    <input type="text" name="title" placeholder="Title" value="${album.title}">
    <input type="text" name="artist" placeholder="Artist" value="${album.artist}">
    <input type="text" name="year" placeholder="Year" value="${album.year}">
    <button type="submit">Add</button>
  </form>
  `

  $("#delete-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const updatedAlbum = {
      id: parseInt($("#edit-form input[name='id']").value),
      title: $("#edit-form input[name='title']").value,
      artist: $("#edit-form input[name='artist']").value,
      year: parseInt($("#edit-form input[name='year']").value)
    }

    updateAlbum(updatedAlbum)

    $(".overlay").remove()
    $("#add-form").remove()

    location.reload()
  })
}


loadAlbums()
