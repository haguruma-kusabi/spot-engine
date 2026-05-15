import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
});

export async function fetchRSS(
  keywords = []
) {
  const all = [];

  for (const word of keywords) {
    try {
      const url =
        "https://news.google.com/rss/search?q=" +
        encodeURIComponent(word) +
        "&hl=ja&gl=JP&ceid=JP:ja";

      const res = await fetch(url);

      const xml = await res.text();

      const json = parser.parse(xml);

      const items =
        json?.rss?.channel?.item || [];

      for (const item of items) {
        all.push({
          title: item.title || "",
          link: item.link || "",
          date:
            item.pubDate ||
            new Date().toISOString(),
        });
      }
    } catch (e) {
      console.log(e);
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
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );
}

function normalize(text = "") {
  return text
    .toLowerCase()
    .replace(/[【】\[\]（）()]/g, "")
    .replace(/\s/g, "");
}
