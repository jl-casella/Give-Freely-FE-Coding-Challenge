import React from "react"

import type { WebsiteProps } from "../../../shared/types"

interface ModalProps {
  title?: WebsiteProps["name"]
  message: WebsiteProps["messages"][0]
  onClose: () => void
}

function Modal({ title, message, onClose }: ModalProps) {
  return (
    <div
      id="overlay"
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: "999999",
        backgroundColor: "#808080a1",
        display: "flex",
        alignItems: "center"
      }}>
      <div
        id="container"
        style={{
          width: 500,
          height: 300,
          background: "whitesmoke",
          margin: "0 auto",
          border: "2px solid indigo"
        }}>
        <div
          id="header"
          style={{
            width: "100%",
            height: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(165 180 252 / 1)"
          }}>
          <div style={{ width: 44, paddingLeft: 10 }} />
          <div style={{ color: "black" }}>{title ? title : ""}</div>
          <div
            style={{
              width: 44,
              cursor: "pointer",
              paddingRight: 10,
              color: "black",
              textAlign: "right"
            }}
            onClick={onClose}>
            x
          </div>
        </div>

        <div
          id="body"
          style={{
            padding: 10,
            color: "black"
          }}>
          {message}
        </div>
      </div>
    </div>
  )
}

export { Modal }
