import { fetchRSS } from "../../lib/rss";
import { theme as choco } from "../../themes/choco";
import { theme as matcha } from "../../themes/matcha";

const THEMES = {
  choco,
  matcha,
};

export default async function handler(
  req,
  res
) {
  const type =
    req.query.theme || "choco";

  const theme = THEMES[type];

  if (!theme) {
    return res.status(404).json([]);
  }

  try {
    const items = await fetchRSS(
      theme.keywords
    );

    res.status(200).json(items);
  } catch (e) {
    res.status(500).json([]);
  }
}
