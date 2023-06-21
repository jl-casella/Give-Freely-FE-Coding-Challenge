import { mount } from "enzyme"

import type { BannerProps } from "./index"
import { Banner } from "./index"

const WEBSITES_MOCK = [
  {
    name: "Tripadvisor",
    url: "www.tripadvisor.com",
    messages: ["Message 1", "Message 2", "Message 3"]
  }
]

const renderBanner = ({ hostname, websites }: BannerProps) => {
  return mount(<Banner hostname={hostname} websites={websites} />)
}

describe("Banner", () => {
  describe("Component rendering", () => {
    it("should NOT render the <Banner> component in an invalid website", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: ""
      }

      const tree = renderBanner(mockedProps)
      expect(tree.find("#banner").length).toBe(0)
    })

    it("should render the <Banner> component in an invalid website", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: "https://www.tripadvisor.com"
      }

      const tree = renderBanner(mockedProps)
      expect(tree.find("#banner").length).toBe(1)
    })
  })

  describe("Displayed message", () => {
    it("should show a valid message", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: "https://www.tripadvisor.com"
      }

      const tree = renderBanner(mockedProps)

      const message = tree.find("#banner").find(".message").at(0).text()
      expect(WEBSITES_MOCK[0].messages.includes(message)).toBeTruthy()
    })
  })

  describe("Component close", () => {
    it("should close the <Banner> by clicking on the 'x'", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: "https://www.tripadvisor.com"
      }

      const tree = renderBanner(mockedProps)

      expect(tree.find("#banner").length).toBe(1)

      tree.find(".close").at(0).simulate("click")

      expect(tree.find("#banner").length).toBe(0)
    })
  })
})
