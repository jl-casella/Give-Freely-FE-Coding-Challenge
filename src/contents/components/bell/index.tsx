import React, { useCallback, useEffect, useState } from "react"

import type { WebsiteProps } from "../../../shared/types"
import { getARandomMessage, getSearchHighlights } from "../../../shared/utils"
import { Modal } from "../modal"
import bellImage from "./bellImage"

export interface BellProps {
  hostname?: string
  websites: WebsiteProps[]
}

function Bell({ hostname, websites }: BellProps) {
  const [showBell, setShowBell] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const [title, setTitle] = useState<string>("")
  const [message, setMessage] = useState<WebsiteProps["messages"][0]>("")

  const handleOpen = useCallback(() => {
    const searchResults = getSearchHighlights({ websites })
    const url = searchResults[0].querySelector("a").href

    const randonMessage = getARandomMessage({
      websites,
      hostname: url
    })

    setTitle(url)
    setMessage(randonMessage)
    setShowModal(true)
  }, [])

  const handleClose = useCallback(() => {
    setShowModal(false)
  }, [])

  useEffect(() => {
    // Only execute Modal on Google
    if (hostname.includes("www.google.com")) {
      const searchResults = getSearchHighlights({ websites })

      // And if it is a matching search
      if (searchResults.length) {
        setShowBell(true)
      }
    }
  }, [])

  return (
    <>
      {showBell ? (
        <div
          id="bell"
          style={{
            width: 70,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
            backgroundColor: "gray",
            position: "fixed",
            right: 15,
            bottom: 15,
            borderRadius: 20
          }}
          onClick={handleOpen}>
          <img
            style={{
              width: 40,
              height: 40,
              cursor: "pointer"
            }}
            src={bellImage}
            alt="Bell image"
          />
        </div>
      ) : null}

      {showModal ? (
        <Modal title={title} message={message} onClose={handleClose} />
      ) : null}
    </>
  )
}

export { Bell }
