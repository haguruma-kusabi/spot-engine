import { fetchRSS } from "../../lib/rss";
import { themes } from "../../themes";

export default async function handler(req, res) {
  const type = req.query.theme || "choco";
  const theme = themes[type];

  if (!theme) {
    return res.status(404).json([]);
  }

  try {
    // keywords防御（ここ重要）
    const keywords = Array.isArray(theme.keywords)
      ? theme.keywords.filter(Boolean)
      : [];

    if (keywords.length === 0) {
      return res.status(200).json([]);
    }

    const items = await fetchRSS(keywords);

    // fetchRSSが壊れても落とさない
    const safeItems = Array.isArray(items) ? items : [];

    return res.status(200).json(safeItems);
  } catch (e) {
    console.error("API /news error:", e);

    return res.status(200).json([]); // ← 500を潰す（UI死守）
  }
}
