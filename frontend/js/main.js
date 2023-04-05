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
        <td class="buttons"><button class="button button-show">Show</button></td>
        <td class="buttons"><button class="button button-edit">Edit</button></td>
        <td class="buttons"><button class="button button-delete">Delete</button></td>
      </tr>
    `
  })
  $("#albums-container").innerHTML = html

  addClickEvents()
}


// Add the event listeners to buttons
const addClickEvents = () => {
  const btns = $all("button")
  const album = { id: null, title: null, artist: null, year: null }

  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (e.target.textContent !== "Add album") {
        const parent = btn.closest("tr")
        const props = ["id", "title", "artist", "year"]
        props.forEach(prop => {
          album[prop] = parent.querySelector(`.${prop}`).textContent;
        });
      }


      console.log(album)

      // Create modal
      if (e.target.textContent === "Edit") editModal(album)
      else if (e.target.textContent === "Delete") deleteModal(album)
      else if (e.target.textContent === "Add album") addModal()
      else if (e.target.textContent === "Show") showModal(album.title)
    })
  })
}


const editModal = (album) => {
  $("main").innerHTML += `
  <div class="overlay" id="edit-overlay"></div>
  <form action="" id="edit-form" class="invisible modal" novalidate>
    <h2>Edit</h2>
    <input type="text" name="title" placeholder="Title" value="${album.title}">
    <input type="text" name="artist" placeholder="Artist" value="${album.artist}">
    <input type="text" name="year" placeholder="Year" value="${album.year}">
    <button type="submit" class="button button-edit">Submit</button>
  </form>
  `

  $("#edit-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const updatedAlbum = {
      id: parseInt(album.id),
      title: $("#edit-form input[name='title']").value,
      artist: $("#edit-form input[name='artist']").value,
      year: parseInt($("#edit-form input[name='year']").value)
    }

    updateAlbum(updatedAlbum).then(() => {
      loadAlbums()
    })

    $(".overlay").remove()
    $("#edit-form").remove()

  })

  $(".overlay").addEventListener("click", () => {
    $(".overlay").remove()
    $("#edit-form").remove()
    addClickEvents()
  })
}


const deleteModal = (album) => {
  $("main").innerHTML += `
  <div class="overlay" id="delete-overlay"></div>
  <div id="delete-modal" class="modal">
    <h2>Are you sure you want to delete this album ?</h2>
    <h3>${album.title} - ${album.artist}</h3>
    <button class="button button-delete">Delete</button>
  </div>
  `

  $("#delete-modal button").addEventListener("click", (e) => {
    e.preventDefault()

    album.id = parseInt(album.id)
    album.year = parseInt(album.year)

    deleteAlbum(album).then(() => {
      loadAlbums()
    })

    $(".overlay").remove()
    $("#delete-modal").remove()
  })

  $(".overlay").addEventListener("click", () => {
    $(".overlay").remove()
    $("#delete-modal").remove()
    addClickEvents()
  })
}


const addModal = () => {
  try {
    $("main").innerHTML += `
    <div class="overlay" id="add-overlay"></div>
    <form action="" id="add-modal" class="invisible modal modal--add" novalidate>
      <h2>Add</h2>
      <input type="text" name="title" placeholder="Title">
      <input type="text" name="artist" placeholder="Artist">
      <input type="text" name="year" placeholder="Year">
      <button type="submit" class="button button-add">Add</button>
    </form>
    `

    $("#add-modal").addEventListener("submit", (e) => {
      e.preventDefault()

      const lastRowTd = $("tbody tr:last-of-type td");
      const lastRowId = lastRowTd ? parseInt(lastRowTd.textContent) : 0;
      const newAlbum = {
        id: lastRowId + 1 || 1,
        title: $("#add-modal input[name='title']").value,
        artist: $("#add-modal input[name='artist']").value,
        year: parseInt($("#add-modal input[name='year']").value)
      };

      addAlbum(newAlbum).then(() => {
        loadAlbums()
      })

      $(".overlay").remove()
      $("#add-modal").remove()
    })

    $(".overlay").addEventListener("click", () => {
      $(".overlay").remove()
      $("#add-modal").remove()
      addClickEvents()
    })
  } catch (error) {
    console.log("error: ", error)
  }
}

const showModal = async (title) => {
  console.log("Title: ", title)
  const album = await getAlbum(title)
  console.log("Album:", album)

  $("main").innerHTML += `
  <div class="overlay" id="add-overlay"></div>
  <div id="show-modal" class="modal">
    <h2>Details</h2>
    <h3>ID: ${album.id}</h3>
    <h3>Title: ${album.title}</h3>
    <h3>Artist: ${album.artist}</h3>
    <h3>Year: ${album.year}</h3>
  </div>
  `

  $(".overlay").addEventListener("click", () => {
    $(".overlay").remove()
    $("#show-modal").remove()
    addClickEvents()
  })
}


loadAlbums()
