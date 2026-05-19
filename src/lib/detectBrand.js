import { BRAND_DICTIONARY } from "./brandDictionary";

export function detectBrand(title = "") {
  const text = (title || "").toLowerCase();

  for (const brand of BRAND_DICTIONARY) {
    for (const keyword of brand.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return {
          group: brand.group,
          name: brand.name,
          color: brand.color,
        };
      }
    }
  }

  return {
    group: "other",
    name: "その他",
    color: "#8c5a3c",
  };
}
