import React from "react"

import type { WebsiteProps } from "../../../shared/types"

interface MessagesProps {
  messages: WebsiteProps["messages"]
}

function Messages({ messages }: MessagesProps) {
  return (
    <>
      <h1 className="mt-2 mb-1 pl-1">Messages:</h1>

      <ul className="w-full m-0 p-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className="messages flex flex-col justify-center w-full h-6 p-0 border-b-[1px] border-b-black">
            {message}
          </div>
        ))}
      </ul>
    </>
  )
}

export { Messages }
