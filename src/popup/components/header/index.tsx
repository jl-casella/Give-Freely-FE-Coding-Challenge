import classNames from "classnames"
import React from "react"

import type { WebsiteProps } from "../../../shared/types"

interface HeaderProps {
  selectedSite: WebsiteProps
  onGoBack: () => void
}

function Header({ selectedSite, onGoBack }: HeaderProps) {
  return (
    <div className="w-full h-6 flex justify-between items-center bg-indigo-300 p-0 m-0 mb-3">
      <div
        className={classNames([
          selectedSite && "go-back",
          "w-11 pl-1 cursor-pointer"
        ])}
        onClick={onGoBack}>
        {selectedSite ? "< back" : ""}
      </div>
      <div>{selectedSite ? selectedSite.name : "Websites"}</div>
      <div className="w-11" />
    </div>
  )
}

export { Header }
