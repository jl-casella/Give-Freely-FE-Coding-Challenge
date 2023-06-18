const API_URL = "https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8"
const API_TOKEN = "$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om"

import { Storage } from "@plasmohq/storage"

import type { WebsiteProps } from "./types"

export const fetchWebsites: () => Promise<WebsiteProps[]> = async ()   => {
  const storage = new Storage()
  const cachedWebsites = await storage.get("websites")

  if (cachedWebsites) {
    return await JSON.parse(cachedWebsites)
  } else {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-Access-Key": API_TOKEN,
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      const websites = data?.record?.websites

      // Save a data cache
      const parsedData = await JSON.stringify(websites)
      await storage.set("websites", parsedData)

      return websites
    } catch (e: any) {
      console.log("fetchData error:", e)
    }
  }
}

interface IsAMatchingWebsiteProps {
  websites: WebsiteProps[]
  hostname: string
}

export const isAMatchingWebsite = ({ websites, hostname }: IsAMatchingWebsiteProps) : boolean => {
  const validURLS = websites.map(website => website.url)
  
  return !!validURLS.find(url => hostname.includes(url));
}

export const getARandomMessage = ({ websites, hostname }: IsAMatchingWebsiteProps) : string => {
  const matchingWebsite = websites.filter(({ url }) => hostname.includes(url));
  
  if (matchingWebsite?.length) {
    const messages = matchingWebsite[0].messages
    const randdomMessage = messages[(Math.random() * messages.length) | 0]
    return randdomMessage
  }
  
  return ''
}

interface GetSearchHighlightsProps {
  websites: WebsiteProps[]
}

export const getSearchHighlights = ({ websites }: GetSearchHighlightsProps) => {
  const validURLS = websites.map((website) => website.url)

  const dedupReducer = (acum, curr) => {
    return curr.tagName === "A" ? [...acum, curr] : acum
  }

  const searchResults: any[] = [...document.querySelectorAll("span")]
    .filter(x => validURLS.indexOf("www." + x.innerHTML.replace(/\.com.*/, ".com")) > -1)
    .filter((s) => s.checkVisibility ? s.checkVisibility() : true)
    .map((x) => x.parentNode)
    .filter((p) => p.querySelector("cite") !== null)
    .map((x) => x.parentNode)
    .map((x) => x.parentNode)
    .reduce(dedupReducer, [])
    .map((x) => x.parentNode)
    .map((x) => x.parentNode)
    .map((x) => x.parentNode)
    .map((x) => x.parentNode)

    return searchResults
}