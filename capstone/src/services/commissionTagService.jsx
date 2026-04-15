export const getCommissionTags = () => {
  return fetch(`http://localhost:8088/commissionTags`).then((res) => res.json())
}

export const getCommissionTagsByCommission = (commissionId) => {
  return fetch(
    `http://localhost:8088/commissionTags?commissionId=${commissionId}`,
  ).then((res) => res.json())
}

export const createCommissionTag = async (newCommissionTag) => {
  const response = await fetch(
    `http://localhost:8088/commissionTags?commissionId=${newCommissionTag.commissionId}&tagId=${newCommissionTag.tagId}`,
  )

  const existingCommissionTags = await response.json()

  if (existingCommissionTags.length > 0) {
    return existingCommissionTags[0]
  }

  return fetch("http://localhost:8088/commissionTags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCommissionTag),
  }).then((res) => res.json())
}

export const deleteCommissionTag = (tagId) => {
  return fetch(`http://localhost:8088/commissionTags/${tagId}`, {
    method: "DELETE",
  })
}