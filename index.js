const BASE_URL = "https://anime.nexus";

async function search(query) {
  const res = await fetch(`${BASE_URL}/?s=${query}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  return [...doc.querySelectorAll(".post")].map(el => ({
    title: el.querySelector("h2")?.textContent,
    url: el.querySelector("a")?.href,
    image: el.querySelector("img")?.src
  }));
}

async function getDetails(url) {
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  return {
    title: doc.querySelector("h1")?.textContent,
    episodes: [...doc.querySelectorAll("a")]
      .filter(a => a.href.includes("episode"))
      .map(a => ({
        name: a.textContent,
        url: a.href
      }))
  };
}

async function getStreams(url) {
  return [];
}

module.exports = { search, getDetails, getStreams };
