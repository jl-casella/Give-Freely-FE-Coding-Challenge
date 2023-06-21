import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoRender
} from "plasmo"
import { createRoot } from "react-dom/client"

import { fetchWebsites } from "../shared/utils"
import { Banner } from "./components/banner"
import { Bell } from "./components/bell"
import { Highlight } from "./components/highlight"

export const config: PlasmoCSConfig = {
  world: "MAIN",
  run_at: "document_end"
}

export const getRootContainer = () => {
  const bannerContainer = document.createElement("div")
  const firstChild = document.body.firstChild
  bannerContainer.style.cssText =
    "position:sticky;top:0;width:100%;z-index:99999;background:transparent;"
  document.body.insertBefore(bannerContainer, firstChild)
  return bannerContainer
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer
}) => {
  const rootContainer = await createRootContainer()
  const root = createRoot(rootContainer)

  const websites = await fetchWebsites()

  root.render(
    <>
      <Banner hostname={window.location.href} websites={websites} />

      <Highlight hostname={window.location.href} websites={websites} />

      <Bell hostname={window.location.href} websites={websites} />
    </>
  )
}

export default {}
