export const getArtists = () => {
  return fetch("http://localhost:8088/artists").then((res) => res.json())
}

export const getArtistById = (id) => {
  return fetch(
    `http://localhost:8088/artists/${id}`,
  ).then((res) => res.json())
}


export const getArtistByUsername = (username) => {
  return fetch(`http://localhost:8088/artists?username=${username}`).then(
    (res) => res.json(),
  )
}

export const getArtistByEmail = (email) => {
  return fetch(`http://localhost:8088/artists?email=${email}`).then((res) =>
    res.json(),
  )
}

export const createArtist = (artist) => {
  return fetch(`http://localhost:8088/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  }).then((res) => res.json())
}

export const updateArtist = (artist) => {
  return fetch(`http://localhost:8088/artists/${artist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  }).then((res) => res.json())
}
