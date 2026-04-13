import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArtistByUsername } from "../../services/artistService"
import { getCommissionsByArtist } from "../../services/commissionService"
import "../../App.css"

export const ArtistProfile = ({ currentArtist }) => {
    const { username } = useParams()
    const navigate = useNavigate()
    const [artist, setArtist] = useState({})
    const [commissions, setCommissions] = useState([])

    useEffect(() => {
        getArtistByUsername(username).then((artistData) => {
            setArtist(artistData)
            getCommissionsByArtist(artistData.id).then((commissionArray) => {
                setCommissions(commissionArray)
            })
        })
    }, [username])

    const isOwnProfile = currentArtist?.id === artist.id

    return (
      
       <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    {artist.fullName?.charAt(0)}
                </div>
                <div className="profile-info">
                    <h2 className="profile-name">{artist.fullName}</h2>
                    <p className="profile-detail">@{artist.username}</p>
                    <p className="profile-detail">{artist.bio}</p>
                    {artist.profileLink ? (
                      <a href={artist.profileLink}
                            target="_blank"
                            rel="noreferrer"
                            className="profile-link"
                        >
                            {artist.profileLink}
                        </a>
                    ) : (
                        ""
                    )}
                </div>
                {isOwnProfile ? (
                    <button
                        className="btn-secondary"
                        onClick={() => navigate("/dashboard/profile/edit")}
                    >
                        Edit Profile
                    </button>
                ) : (
                    ""
                )}
            </div>

            <h3>Commissions</h3>
            <div className="gallery">
        
                        return (
                            <div
                                key={commission.id}
                                className={`gallery-card`}
                            >
                                <img
                                    src={commission.imageUrl}
                                    alt={commission.title}
                                    className="gallery-img"
                                />
                                <div className="gallery-info">
                                    <p className="gallery-title">{commission.title}</p>
                                    <p className="gallery-price">${commission.price}</p>
                                    
                                </div>
                            </div>
                        )
            </div>
      </div>
    )
    
}