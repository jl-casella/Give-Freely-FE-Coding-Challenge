import React, { useCallback, useEffect, useState } from "react"

import type { WebsiteProps } from "../../../shared/types"
import { getARandomMessage, isAMatchingWebsite } from "../../../shared/utils"

export interface BannerProps {
  hostname?: string
  websites: WebsiteProps[]
}

function Banner({ hostname, websites }: BannerProps) {
  const [showBanner, setShowBanner] = useState<boolean>(false)
  const [message, setMessage] = useState<WebsiteProps["messages"][0]>("")

  const handleClose = useCallback(() => {
    setShowBanner(false)
  }, [])

  useEffect(() => {
    const matches = isAMatchingWebsite({ websites, hostname })
    if (matches) {
      const randonMessage = getARandomMessage({
        websites,
        hostname
      })
      setMessage(randonMessage)
      setShowBanner(true)
    }
  }, [])

  return showBanner ? (
    <div
      id="banner"
      style={{
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 10px 0px 10px",
        margin: 0,
        backgroundColor: "gray"
      }}>
      <div className="message">{message}</div>
      <div
        className="close"
        style={{ cursor: "pointer", padding: 10 }}
        onClick={handleClose}>
        x
      </div>
    </div>
  ) : null
}

export { Banner }
