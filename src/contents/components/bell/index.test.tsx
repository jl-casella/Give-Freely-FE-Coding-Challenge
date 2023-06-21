import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

import { Modal } from "../modal"
import type { BellProps } from "./index"
import { Bell } from "./index"

jest.mock("./bellImage", () => {
  return { default: "bell.png" }
})

const WEBSITES_MOCK = [
  {
    name: "Tripadvisor",
    url: "www.tripadvisor.com",
    messages: ["Message 1", "Message 2", "Message 3"]
  }
]

export const SEARCH_RESULT_MOCK = `
  <div>
  <div>
    <div>
    <div>
        <a href="https://www.expedia.com.ar">tripadvisor.com
        <div>
          <div>
            <span class="test">tripadvisor.com</span>
            <cite>https://www.tripadvisor.com.ar</cite>
          </div>
        </div>
        </a>
      </div>
    </div>
    </div>
  </div>
`

const renderBell = async ({ hostname, websites }: BellProps) => {
  let tree

  await act(async () => {
    tree = mount(<Bell hostname={hostname} websites={websites} />)
  })

  return tree
}

describe("Bell", () => {
  describe("Component rendering", () => {
    afterAll(() => {
      document.body.innerHTML = ""
    })

    it("should NOT render the <Bell> component if NOT google.com", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: ""
      }

      const tree = await renderBell(mockedProps)
      expect(tree.find("#bell").length).toBe(0)
    })

    it("should NOT render the <Bell> component if google.com and NOT search Highlights found", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: "www.google.com"
      }

      const tree = await renderBell(mockedProps)
      expect(tree.find("#bell").length).toBe(0)
    })

    it("should render the <Bell> component if google.com and search Highlights found", async () => {
      document.body.innerHTML = SEARCH_RESULT_MOCK

      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: "www.google.com"
      }

      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderBell(mockedProps)

      await runAllPromises()
      tree.update()

      expect(tree.find("#bell").length).toBe(1)
    })
  })

  describe("Modal opening", () => {
    beforeAll(() => {
      document.body.innerHTML = SEARCH_RESULT_MOCK
    })

    it("should NOT start with the <Modal> component open", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: "www.google.com"
      }

      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderBell(mockedProps)

      await runAllPromises()
      tree.update()

      expect(tree.find(Modal).length).toBe(0)
    })

    it("should open the <Modal> component by clicking on the <Bell>", async () => {
      const mockedProps = {
        websites: WEBSITES_MOCK,
        hostname: "www.google.com"
      }

      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderBell(mockedProps)

      await runAllPromises()
      tree.update()

      expect(tree.find("#bell").length).toBe(1)
      expect(tree.find(Modal).length).toBe(0)

      tree.find("#bell").at(0).simulate("click")
      expect(tree.find(Modal).length).toBe(1)
    })
  })
})
