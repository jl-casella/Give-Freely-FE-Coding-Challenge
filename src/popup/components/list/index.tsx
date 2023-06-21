import React from "react"

import type { WebsiteProps } from "../../../shared/types"

interface ListProps {
  websites: WebsiteProps[]
  onSiteSelect: (website: WebsiteProps) => void
}

function List({ websites, onSiteSelect }: ListProps) {
  return (
    <ul className="w-full m-0 p-1">
      {websites.map((website, index) => (
        <div
          key={index}
          className="website flex flex-col justify-center w-full h-[50px] p-0 border-b-[1px] border-b-black cursor-pointer hover:bg-indigo-100"
          onClick={() => onSiteSelect(website)}>
          <p>{website.name}</p>
          <p>{website.url}</p>
        </div>
      ))}
    </ul>
  )
}

export { List }
