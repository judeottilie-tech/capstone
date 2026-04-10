export const getProposalsByCommission = (commissionId) => {
  return fetch(
    `http://localhost:8088/proposals?commissionTypeId=${commissionId}`,
  ).then((res) => res.json())
}

export const createProposal = (proposal) => {
  return fetch(`http://localhost:8088/proposals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposal),
  }).then((res) => res.json())
}

export const updateProposal = (proposal) => {
  return fetch(`http://localhost:8088/proposals/${proposal.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposal),
  }).then((res) => res.json())
}
