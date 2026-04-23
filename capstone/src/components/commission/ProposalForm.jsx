import { useState } from "react"
import { createProposal } from "../../../src/services/proposalService"

export const ProposalForm = ({ commission }) => {
  const [submitted, setSubmitted] = useState(false)
  const [characterCount, setCharacterCount] = useState(1)
  const [hasBackground, setHasBackground] = useState(false)

  const [proposal, setProposal] = useState({
    contactEmail: "",
    description: "",
    selectedOptions: "",
    estimatedPrice: "",
    referenceImageUrl: "",
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!commission || !commission.id) {
      console.error("Missing commission ID")
      window.alert("Something went wrong. Please refresh the page.")
      return
    }

    if (!proposal.contactEmail || !proposal.description) {
      window.alert(
        "please fill out your email and description of your commission proposal!",
      )
      return
    }

    const newProposal = {
      contactEmail: proposal.contactEmail,
      description: proposal.description,
      referenceImageUrl: proposal.referenceImageUrl,

      estimatedPrice: Math.round(estimate), 

      commissionId: commission.id,
      isResponded: false,
      status: "pending",
    }

    createProposal(newProposal).then(() => {
      setSubmitted(true)
    })
  }
  

  if (submitted) {
    return (
      <div className="bg-pink-light border border-neutral-border rounded-xl p-6 text-center">
        <p className="text-pink-dark font-semibold text-lg mb-2">
          thank you for your commission inquiry!
        </p>
        <p className="text-sm text-pink-dark">
          the artist will get back to you soon!
        </p>
      </div>
    )
  }

  const base = commission?.basePrice || commission?.price || 0
  const extraCharacters = Math.max(characterCount - 1, 0)

  let estimate = base + base * 0.25 * extraCharacters
  if (hasBackground) estimate += base * 0.5

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-blue-dark">
        request a commission
      </h2>

      <div>
        <label className="text-xs text-blue-mid mb-1 block">
          your email *
        </label>
        <input
          type="email"
          required
          value={proposal.contactEmail}
          onChange={(event) =>
            setProposal({ ...proposal, contactEmail: event.target.value })
          }
          placeholder="youremailhere@email.com"
          className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-pink-main"
        />
      </div>

      <div>
        <label className="text-xs text-blue-mid mb-1 block">
          describe your commission request *
        </label>
        <textarea
          required
          value={proposal.description}
          onChange={(event) =>
            setProposal({
              ...proposal,
              description: event.target.value,
            })
          }
          rows={4}
          placeholder="what do you have in mind?"
          className="w-full border border-neutral-border rounded-xl px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-pink-main resize-none"
        />
      </div>

      <div>
        <label className="text-xs text-blue-mid mb-1 block">
          reference image url
        </label>
        <input
          type="text"
          value={proposal.referenceImageUrl}
          onChange={(event) =>
            setProposal({
              ...proposal,
              referenceImageUrl: event.target.value,
            })
          }
          placeholder="https://..."
          className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-pink-main"
        />
        {proposal.referenceImageUrl && (
          <img
            src={proposal.referenceImageUrl}
            alt="reference preview"
            className="mt-2 rounded-xl max-h-40 object-cover"
          />
        )}
      </div>

      <div className="bg-neutral-soft border border-neutral-border rounded-xl p-4">
        <p className="text-sm font-semibold text-blue-dark mb-2">
          price estimator
        </p>

        <div className="flex flex-col gap-2 text-sm text-blue-dark">
          <label>
            characters:
            <input
              type="number"
              min="1"
              value={characterCount}
              onChange={(e) =>
                setCharacterCount(parseInt(e.target.value) || 1)
              }
              className="ml-2 border border-neutral-border rounded px-2 py-1 w-16"
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasBackground}
              onChange={(e) => setHasBackground(e.target.checked)}
            />
            background (+50%)
          </label>
        </div>

        <p className="text-pink-main font-semibold mt-3">
          est: ${Math.round(estimate)}
        </p>
      </div>

      <button
        type="submit"
        className="bg-pink-main text-white rounded-pill px-4 py-2 text-sm hover:bg-pink-dark transition"
      >
        submit commission inquiry
      </button>
    </form>
  )
}