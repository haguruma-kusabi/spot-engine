import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
});

export async function fetchRSS(keywords = []) {
  const all = [];

  for (const word of keywords) {
    try {
      const url =
        "https://news.google.com/rss/search?q=" +
        encodeURIComponent(word) +
        "&hl=ja&gl=JP&ceid=JP:ja";

      const res = await fetch(url);

      if (!res.ok) continue;

      const xml = await res.text();

      if (!xml || !xml.includes("<rss")) continue;

      const json = parser.parse(xml);

      let items = json?.rss?.channel?.item || [];

      // ★単体オブジェクト対策
      if (!Array.isArray(items)) {
        items = items ? [items] : [];
      }

      for (const item of items) {
        const title =
          typeof item?.title === "string"
            ? item.title
            : item?.title?.["#text"] || "";

        const link =
          typeof item?.link === "string"
            ? item.link
            : item?.link?.["@_href"] || "";

        const date =
          item?.pubDate || new Date().toISOString();

        if (!title || !link) continue;

        all.push({
          title,
          link,
          date,
        });
      }
    } catch (e) {
      console.log("RSS error:", e);
    }
  }

  return dedupe(all);
}

function dedupe(items) {
  const map = new Map();

  for (const item of items) {
    const key = normalize(item.title);

    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  return [...map.values()].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

function normalize(text = "") {
  return text
    .toLowerCase()
    .replace(/[【】\[\]（）()]/g, "")
    .replace(/\s/g, "");
}
