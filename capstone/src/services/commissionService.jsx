export const getAllCommissions = () => {
  return fetch(
    `http://localhost:8088/commissions?_embed=commissionTags&_expand=artist&_embed=proposals`,
  ).then((res) => res.json())
}

export const getCommissionById = (id) => {
  return fetch(`http://localhost:8088/commissions/${id}?_expand=artist`).then(
    (res) => res.json(),
  )
}

export const getCommissionsByArtist = (artistId) => {
  return fetch(
    `http://localhost:8088/commissions?artistId=${artistId}&_embed=proposals`,
  ).then((res) => res.json())
}

export const createCommission = (commission) => {
  return fetch(`http://localhost:8088/commissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commission),
  }).then((res) => res.json())
}

export const updateCommission = (commission) => {
  return fetch(`http://localhost:8088/commissions/${commission.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commission),
  }).then((res) => res.json())
}

export const deleteCommission = (commissionId) => {
  return fetch(`http://localhost:8088/commissions/${commissionId}`, {
    method: "DELETE",
  })
}
