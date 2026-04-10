export const getTags = () => {
  return fetch(`http://localhost:8088/tags`).then((res) => res.json())
}

export const createTag = (tag) => {
  return fetch(`http://localhost:8088/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  }).then((res) => res.json())
}

export const getTagByName = (name) => {
  return fetch(`http://localhost:8088/tags?name=${name}`).then((res) =>
    res.json(),
  )
}
