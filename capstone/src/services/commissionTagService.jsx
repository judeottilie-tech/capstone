export const getCommissionTags = () => {
  return fetch(`http://localhost:8088/commissionTags`).then((res) => res.json())
}


export const createCommissionTag = (commissionTag) => {
  return fetch(`http://localhost:8088/commissionTags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commissionTag),
  }).then((res) => res.json())
}

export const deleteCommissionTag = (tagId) => {
  return fetch(`http://localhost:8088/commissionTags/${tagId}`, {
    method: "DELETE",
  })
}