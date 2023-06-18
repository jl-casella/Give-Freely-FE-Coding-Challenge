import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

import { Header } from "./components/header"
import { List } from "./components/list"
import { Messages } from "./components/messages"
import Popup from "./index"

const NO_WEBSITES_MOCK = { record: { websites: [] } }
const WEBSITES_MOCK = {
  record: {
    websites: [
      {
        name: "Tripadvisor",
        url: "www.tripadvisor.com",
        messages: ["Message 1", "Message 2", "Message 3"]
      }
    ]
  }
}

const renderPopup = async () => {
  let tree

  await act(async () => {
    tree = mount(<Popup />)
  })

  return tree
}

describe("Popup", () => {
  describe("Initial state", () => {
    global.fetch = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => Promise.resolve(NO_WEBSITES_MOCK)
      } as Response)

    it("should render the <Popup> component", async () => {
      const tree = await renderPopup()
      expect(tree.find(Popup).length).toBe(1)
    })

    it("should render the <Header> component", async () => {
      const tree = await renderPopup()
      expect(tree.find(Header).length).toBe(1)
    })

    it("should render the <List> component", async () => {
      const tree = await renderPopup()
      expect(tree.find(List).length).toBe(1)
    })

    it("should NOT render the <Messages> component", async () => {
      const tree = await renderPopup()
      expect(tree.find(Messages).length).toBe(0)
    })
  })

  describe("Messages state", () => {
    global.fetch = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => Promise.resolve(WEBSITES_MOCK)
      } as Response)

    it("should render all the websites", async () => {
      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderPopup()

      await runAllPromises()
      tree.update()

      const websites = tree.find(".website")
      expect(websites.length).toBe(1)
    })

    it("should render the <Messages> component once a website is clicked", async () => {
      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderPopup()

      // Not rendered YET
      expect(tree.find(Messages).length).toBe(0)

      await runAllPromises()
      tree.update()

      const websites = tree.find(".website")
      expect(websites.length).toBe(1)
      websites.at(0).simulate("click")

      await runAllPromises()
      tree.update()

      expect(tree.find(Messages).length).toBe(1)
    })

    it("should render all the messages in the <Messages> component", async () => {
      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderPopup()

      await runAllPromises()
      tree.update()

      tree.find(".website").at(0).simulate("click")

      await runAllPromises()
      tree.update()

      const messages = tree.find(".messages")
      expect(messages.length).toBe(3)
    })
  })

  describe("Go Back to initial state", () => {
    global.fetch = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => Promise.resolve(WEBSITES_MOCK)
      } as Response)

    it("should NOT render Go back element on the Initial state <Header>", async () => {
      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderPopup()

      await runAllPromises()
      tree.update()

      const goBack = tree.find(".go-back")
      expect(goBack.length).toBe(0)
    })

    it("should render Go back element on the Messages state <Header>", async () => {
      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderPopup()

      await runAllPromises()
      tree.update()

      let goBack = tree.find(".go-back")
      expect(goBack.length).toBe(0)

      tree.find(".website").at(0).simulate("click")

      await runAllPromises()
      tree.update()

      goBack = tree.find(".go-back")
      expect(goBack.length).toBe(1)
    })

    it("should Go back to the Initial state once clicked", async () => {
      const runAllPromises = () => new Promise(setImmediate)
      const tree = await renderPopup()

      await runAllPromises()
      tree.update()

      let goBack = tree.find(".go-back")
      expect(goBack.length).toBe(0)

      tree.find(".website").at(0).simulate("click")

      await runAllPromises()
      tree.update()

      goBack = tree.find(".go-back")
      expect(goBack.length).toBe(1)

      goBack.at(0).simulate("click")

      await runAllPromises()
      tree.update()

      goBack = tree.find(".go-back")
      expect(goBack.length).toBe(0)
    })
  })
})
