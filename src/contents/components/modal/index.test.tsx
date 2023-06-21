import { mount } from "enzyme"

import type { ModalProps } from "./index"
import { Modal } from "./index"

const MODAL_PROPS_MOCK = {
  title: "Test title",
  message: "Test message",
  onClose: () => {}
}

const renderModal = ({ title, message, onClose }: ModalProps) => {
  return mount(<Modal title={title} message={message} onClose={onClose} />)
}

describe("Modal", () => {
  describe("Component rendering", () => {
    it("should render the <Modal> overlay", async () => {
      const tree = renderModal(MODAL_PROPS_MOCK)
      expect(tree.find("#overlay").length).toBe(1)
    })

    it("should render the <Modal> header", async () => {
      const tree = renderModal(MODAL_PROPS_MOCK)
      expect(tree.find("#container").find("#header").length).toBe(1)
    })

    it("should render the <Modal> content", async () => {
      const tree = renderModal(MODAL_PROPS_MOCK)
      expect(tree.find("#container").find("#content").length).toBe(1)
    })
  })

  describe("Body contents", () => {
    it("should render the correct <Modal> title", async () => {
      const tree = renderModal(MODAL_PROPS_MOCK)

      const titleContainer = tree.find("#container").find(".title")

      expect(titleContainer.at(0).text()).toBe(MODAL_PROPS_MOCK.title)
    })

    it("should render the correct <Modal> message", async () => {
      const tree = renderModal(MODAL_PROPS_MOCK)

      const messageContainer = tree.find("#container").find(".message")

      expect(messageContainer.at(0).text()).toBe(MODAL_PROPS_MOCK.message)
    })
  })

  describe("Component close", () => {
    it("should NOT close the <Modal> by clicking on the Overlay", async () => {
      const handleCloseSpy = jest.fn()

      const tree = renderModal({
        ...MODAL_PROPS_MOCK,
        onClose: handleCloseSpy
      })

      const modalOverlay = tree.find("#overlay")
      modalOverlay.at(0).simulate("click")

      expect(handleCloseSpy).toHaveBeenCalledTimes(0)
    })

    it("should close the <Modal> by clicking on the 'x", async () => {
      const handleCloseSpy = jest.fn()

      const tree = renderModal({
        ...MODAL_PROPS_MOCK,
        onClose: handleCloseSpy
      })

      const closeContainer = tree
        .find("#container")
        .find("#header")
        .find(".close")
      closeContainer.at(0).simulate("click")

      expect(handleCloseSpy).toHaveBeenCalledTimes(1)
    })
  })
})
