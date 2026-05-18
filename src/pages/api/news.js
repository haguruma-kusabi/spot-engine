import { fetchRSS } from "../../lib/rss";

import { themes } from "../../themes";

export default async function handler(
req,
res
) {
const type =
req.query.theme || "choco";

const theme = themes[type];

if (!theme) {
return res.status(404).json([]);
}

try {
const items = await fetchRSS(
theme.rss
);

res.status(200).json(items);

} catch (e) {
console.log(e);

res.status(500).json([]);

}
}
