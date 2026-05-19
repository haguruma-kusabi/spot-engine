export const BRAND_MAP = {
  convenience: [
    { label: "セブン", value: "seven", color: "#f36c21" },
    { label: "ファミマ", value: "famima", color: "#2bb673" },
    { label: "ローソン", value: "lawson", color: "#1e5aa8" },
  ],
  cafe: [
    { label: "スタバ", value: "starbucks", color: "#006241" },
    { label: "タリーズ", value: "tullys", color: "#000000" },
    { label: "ドトール", value: "doutor", color: "#f2c200" },
  ],
};

// ★ここが重要：ブランド判定ロジック
export function detectBrand(title = "") {
  const t = title.toLowerCase();

  if (t.includes("セブン") || t.includes("seven")) {
    return { group: "convenience", name: "seven" };
  }

  if (t.includes("ファミマ") || t.includes("familymart")) {
    return { group: "convenience", name: "famima" };
  }

  if (t.includes("ローソン") || t.includes("lawson")) {
    return { group: "convenience", name: "lawson" };
  }

  if (t.includes("スタバ") || t.includes("starbucks")) {
    return { group: "cafe", name: "starbucks" };
  }

  if (t.includes("タリーズ") || t.includes("tullys")) {
    return { group: "cafe", name: "tullys" };
  }

  if (t.includes("ドトール") || t.includes("doutor")) {
    return { group: "cafe", name: "doutor" };
  }

  return null;
}
