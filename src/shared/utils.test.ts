import {
  fetchWebsites,
  isAMatchingWebsite,
  getARandomMessage,
  getSearchHighlights
} from './utils'

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

describe("Utils ", () => {
  describe("Fetching websites", () => {
    it("should fetch the websites API", async () => {
      global.fetch = () => Promise.resolve({
        ok: true,
        status: 200,
        json: async () => Promise.resolve(NO_WEBSITES_MOCK),
      } as Response);

      const websites = await fetchWebsites()

      expect(Array.isArray(websites)).toBeTruthy();
      expect(websites).toHaveLength(0);
    });

    it("should fetch the websites API and return the websites", async () => {
      global.fetch = () => Promise.resolve({
        ok: true,
        status: 200,
        json: async () => Promise.resolve(WEBSITES_MOCK),
      } as Response);

      const websites = await fetchWebsites()

      expect(websites).toHaveLength(1);
      expect(websites[0].name).toBe('Tripadvisor');
    });
  });
  
  describe("Matching websites", () => {
    it("should NOT match an invalid website", () => {
      const mocks = [{ name: 'Tripadvisor', url: 'www.tripadvisor.com', messages: [] }]

      const assertion = isAMatchingWebsite({
        websites: mocks,
        hostname: 'www.tripNOTadvisor.com'
      })

      expect(assertion).toBeFalsy();
    });

    it("should match an valid website", () => {
      const mocks = [{ name: 'Tripadvisor', url: 'www.tripadvisor.com', messages: [] }]

      const assertion = isAMatchingWebsite({
        websites: mocks,
        hostname: 'www.tripadvisor.com'
      })

      expect(assertion).toBeTruthy();
    });
  });

  describe("Get a random message", () => {
    it("should get a valid randon website message", () => {
      const mocks = [{ name: 'Tripadvisor', url: 'www.tripadvisor.com', messages: ['Message 1', 'Message 2'] }]

      const assertion = getARandomMessage({
        websites: mocks,
        hostname: 'www.tripadvisor.com'
      })

      expect(mocks[0].messages.includes(assertion)).toBeTruthy();
    });
  });

  describe("Get the Google search highlights", () => {
    it("should NOT get highlights if they are NOT found", () => {
      const mocks = [{ name: 'Tripadvisor', url: 'www.tripadvisor.com', messages: [] }]

      const searchResults = getSearchHighlights({ websites: mocks })

      expect(searchResults).toHaveLength(0);
    });

    it("should get highlights if they are found", () => {
      const mocks = [{ name: 'Tripadvisor', url: 'www.tripadvisor.com', messages: [] }]

      document.body.innerHTML =
        '<div>' +
        ' <div>' +
        '  <div>' +
        '   <div>' +
        '     <a href="https://www.expedia.com.ar">tripadvisor.com' +
        '       <div>' +
        '         <div>' +
        '           <span class="test">tripadvisor.com</span>' +
        '           <cite>https://www.expedia.com.ar</cite>' +
        '         </div>' +
        '       </div>' +
        '      </a>' +
        '    </div>' +
        '   </div>' +
        '  </div>' +
        '</div>';

      const searchResults = getSearchHighlights({ websites: mocks })
      
      expect(searchResults).toHaveLength(1);
    });
  })
});
