import React, { useCallback, useEffect, useState } from "react"

import type { WebsiteProps } from "../shared/types"
import { fetchWebsites } from "../shared/utils"
import { Header } from "./components/header"
import { List } from "./components/list"
import { Messages } from "./components/messages"

import "../base.css"
import "../style.css"

function IndexPopup() {
  const [websites, setWebsites] = useState<WebsiteProps[]>([])
  const [selectedSite, setSelectedSite] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const websites = await fetchWebsites()
      setWebsites(websites)
    }

    fetchData()
  }, [])

  const handleGoBack = useCallback(() => {
    setSelectedSite(undefined)
  }, [])

  const handleSiteSelect = useCallback((site: WebsiteProps) => {
    setSelectedSite(site)
  }, [])

  return (
    <div className="flex flex-col w-80 h-80">
      <Header selectedSite={selectedSite} onGoBack={handleGoBack} />

      {selectedSite ? (
        <Messages messages={selectedSite.messages} />
      ) : (
        <List websites={websites} onSiteSelect={handleSiteSelect} />
      )}
    </div>
  )
}

export default IndexPopup
