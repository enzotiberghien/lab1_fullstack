const getAlbums = async () => {
  try {
    const response = await fetch('/api/albums');
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}


const getAlbum = async (title) => {
  try {
    const response = await fetch(`/api/albums/${title}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}


const addAlbum = async (album) => {
  try {
    const response = await fetch(`/api/albums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(album)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}


const updateAlbum = async (album) => {
  try {
    const response = await fetch(`/api/albums/${album.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(album)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}


const deleteAlbum = async (album) => {
  try {
    const response = await fetch(`/api/albums/${album.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(album)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}


export {
  getAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum
}