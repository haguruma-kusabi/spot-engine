import { BRAND_DICTIONARY } from "./brandDictionary";

export function detectBrand(title = "") {
  const text = (title || "").toLowerCase();

  for (const brand of BRAND_DICTIONARY) {
    for (const key of brand.keywords) {
      if (text.includes(key.toLowerCase())) {
        return {
          group: brand.group,
          name: brand.name,
          label: brand.label,
          color: brand.color,
        };
      }
    }
  }

  return {
    group: "other",
    name: "other",
    label: "その他",
    color: "#8c5a3c",
  };
}
