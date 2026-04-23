export const getProposalsByCommission = (commissionId) => {
  return fetch(
    `http://localhost:8088/proposals?commissionId=${commissionId}`,
  ).then((res) => res.json())
}

export const getProposalsByArtist = (artistId) => {
  return fetch(`http://localhost:8088/proposals?_expand=commission`)
    .then((res) => res.json())
    .then((proposals) => {
      return proposals.filter(
        (proposal) => proposal.commission?.artistId === artistId,
      )
    })
}

export const createProposal = (proposal) => {
  return fetch(`http://localhost:8088/proposals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proposal),
  })
}

export const updateProposal = (proposal) => {
  return fetch(`http://localhost:8088/proposals/${proposal.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proposal),
  }).then((res) => res.json())
}

export const deleteProposal = (proposalId) => {
  return fetch(`http://localhost:8088/proposals/${proposalId}`, {
    method: "DELETE",
  })
}
