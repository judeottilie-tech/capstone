import { useEffect, useState } from "react"
import { getProposalsByArtist, updateProposal, deleteProposal } from "../../services/proposalService"

export const Proposals = ({ currentArtist }) => {
  const [proposals, setProposals] = useState([])

  const fetchProposals = () => {
    getProposalsByArtist(currentArtist.id).then(setProposals)
  }

  useEffect(() => {
    fetchProposals()
  }, [currentArtist])

  const handleStatusChange = (proposal, newStatus) => {
    updateProposal({ ...proposal, status: newStatus }).then(fetchProposals)
  }

  const handleToggleResponded = (proposal) => {
    updateProposal({
      ...proposal,
      isResponded: !proposal.isResponded,
    }).then(fetchProposals)
  }

  const handleDelete = (proposalId) => {
    deleteProposal(proposalId).then(fetchProposals)
  }

  const sortedProposals = [...proposals].sort((a, b) => {
    const order = {
      pending: 0,
      "awaiting response": 1,
      accepted: 2,
      "in progress": 3,
      sketching: 4,
      complete: 5,
      denied: 6,
    }

    return order[a.status] - order[b.status]
  })

  if (proposals.length === 0) {
    return (
      <div className="bg-white border border-neutral-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-pink-dark mb-4">
          commission proposals
        </h2>
        <p className="text-sm text-blue-mid">no proposals yet!</p>
      </div>
    )
  }



  return (
    <div className="bg-white border border-neutral-border rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-pink-dark mb-4">
        incoming proposals
      </h2>

      <div className="flex flex-col gap-4">
        {sortedProposals.map((proposal) => (
          <div
            key={proposal.id}
            className={`border rounded-xl p-4 flex flex-col gap-3 transition ${
              proposal.isResponded
                ? "border-neutral-border bg-neutral-soft opacity-75"
                : "border-pink-mid bg-white"
            }`}
          >
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <p className="text-sm font-semibold text-blue-dark">
                  {proposal.contactEmail}
                </p>

                {proposal.commission && (
                  <p className="text-xs text-blue-mid">
                    re: {proposal.commission.title}
                  </p>
                )}
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-pill font-medium ${
                  proposal.status === "accepted"
                    ? "bg-blue-light text-blue-dark"
                    : proposal.status === "denied"
                      ? "bg-pink-light text-pink-dark"
                      : "bg-neutral-soft text-blue-mid"
                }`}
              >
                {proposal.status}
              </span>
            </div>

            <p className="text-sm text-blue-dark">{proposal.description}</p>

            {(proposal.minPrice > 0 || proposal.maxPrice > 0) && (
              <p className="text-xs text-blue-mid">
                budget: ${proposal.minPrice} — ${proposal.maxPrice}
              </p>
            )}

            {proposal.referenceImageUrl && (
              <img
                src={proposal.referenceImageUrl}
                alt="reference"
                className="max-h-32 rounded-xl object-cover"
              />
            )}

            <label className="flex items-center gap-2 text-xs text-blue-mid cursor-pointer">
              <input
                type="checkbox"
                checked={proposal.isResponded}
                onChange={() => handleToggleResponded(proposal)}
                className="accent-pink-main"
              />
              responded
            </label>

            <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-neutral-border">
              <select
                value={proposal.status}
                onChange={(e) => handleStatusChange(proposal, e.target.value)}
                className="text-xs border border-neutral-border rounded-pill px-3 py-1 text-blue-dark outline-none focus:border-pink-main bg-white"
              >
                <option value="pending">pending</option>
                <option value="accepted">accepted</option>
                <option value="denied">denied</option>
                <option value="sketching">sketching</option>
                <option value="awaiting response">
                  awaiting response from commissioner
                </option>
                <option value="in progress">in progress</option>
                <option value="complete">complete</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* <button
onClick={() => handleDelete(proposal.id)}
className="ml-auto text-xs bg-pink-light text-pink-dark px-3 py-1 rounded-pill hover:bg-pink-mid transition"
>
remove
</button>
*/