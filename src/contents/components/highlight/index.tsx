import { useEffect } from "react"

import type { WebsiteProps } from "../../../shared/types"
import { getSearchHighlights } from "../../../shared/utils"

interface HighlightProps {
  hostname?: string
  websites: WebsiteProps[]
}

function Highlight({ hostname, websites }: HighlightProps) {
  useEffect(() => {
    // Only execute Highlights on Google
    if (hostname.includes("www.google.com")) {
      const searchResults = getSearchHighlights({ websites })

      searchResults.forEach((el) => {
        el.style.border = "1px solid indigo"
        el.style.padding = "5px"
      })
    }
  }, [])

  return null
}

export { Highlight }
