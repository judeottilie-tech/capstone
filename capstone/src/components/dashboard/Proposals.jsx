import { useEffect, useState } from "react"
import {
  getProposalsByArtist,
  updateProposal,
  deleteProposal,
} from "../../services/proposalService"

export const Proposals = ({ currentArtist }) => {
  const [proposals, setProposals] = useState([])

  const fetchProposals = () => {
    getProposalsByArtist(currentArtist.id).then(setProposals)
  }

  useEffect(() => {
    fetchProposals()
  }, [currentArtist])

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

  const activeProposals = sortedProposals.filter(
    (proposal) =>
      proposal.status !== "denied" && proposal.status !== "complete",
  )

  const resolvedProposals = sortedProposals.filter(
    (proposal) =>
      proposal.status === "denied" || proposal.status === "complete",
  )

  const handleStatusChange = (proposal, newStatus) => {
    const { commission, ...proposalToSave } = proposal

    updateProposal({
      ...proposalToSave,
      status: newStatus,
    }).then(fetchProposals)
  }

  
  const handleToggleResponded = (proposal) => {
    const { commission, ...proposalToSave } = proposal

    updateProposal({
      ...proposalToSave,
      isResponded: !proposal.isResponded,
    }).then(fetchProposals)
  }

  const handleDelete = (proposalId) => {
    const confirmed = window.confirm(
      "are you sure you want to delete this proposal?",
    )
    if (!confirmed) return
    deleteProposal(proposalId).then(fetchProposals)
  }

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

  const renderProposalCard = (proposal) => {
    const isResolved =
      proposal.status === "complete" || proposal.status === "denied"

    return (
      <div
        key={proposal.id}
        className={`border rounded-xl p-4 flex flex-col gap-3 transition ${
          isResolved
            ? "border-neutral-border bg-neutral-soft opacity-75"
            : proposal.isResponded
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
                  : proposal.status === "complete"
                    ? "bg-gray-light text-gray-main"
                    : "bg-neutral-soft text-blue-mid"
            }`}
          >
            {proposal.status}
          </span>
        </div>

        <p className="text-sm text-blue-dark">{proposal.description}</p>
        {/*
        {proposal.estimatedPrice && (
          <p className="text-xs text-blue-mid">
            estimate: ${proposal.estimatedPrice}
          </p>
        )}
        */}

        {proposal.referenceImageUrl && (
          <img
            src={proposal.referenceImageUrl}
            alt="reference"
            className="max-h-32 max-w-32 rounded-xl object-cover"
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
            onChange={(event) =>
              handleStatusChange(proposal, event.target.value)
            }
            className="text-xs border border-neutral-border rounded-pill px-3 py-1 text-blue-dark outline-none focus:border-pink-main bg-white"
          >
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="denied">denied</option>
            <option value="awaiting response">
              awaiting response from commissioner
            </option>
            <option value="complete">complete</option>
          </select>
          <button
            onClick={() => handleDelete(proposal.id)}
            className="ml-auto text-xs bg-pink-light text-pink-dark px-3 py-1 rounded-pill hover:bg-pink-mid transition"
          >
            delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-pink-dark ">incoming proposals</h2>
      <div className="bg-white border border-neutral-border rounded-2xl p-6">
        {activeProposals.length === 0 ? (
          <p className="text-sm text-blue-mid">no new proposals!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {activeProposals.map((proposal) => renderProposalCard(proposal))}
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold text-pink-dark">completed proposals</h2>
      {resolvedProposals.length > 0 && (
        <div className="bg-white border border-neutral-border rounded-2xl p-6">
          <div className="flex flex-col gap-4">
            {resolvedProposals.map((proposal) => renderProposalCard(proposal))}
          </div>
        </div>
      )}
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
