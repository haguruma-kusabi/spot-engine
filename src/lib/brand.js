export const BRAND_MAP = {
  convenience: [
    { label: "セブン", value: "seven" },
    { label: "ファミマ", value: "famima" },
    { label: "ローソン", value: "lawson" },
  ],
  cafe: [
    { label: "スタバ", value: "starbucks" },
    { label: "タリーズ", value: "tullys" },
    { label: "ドトール", value: "doutor" },
  ],
};

export function detectBrand(title = "") {
  const t = title.toLowerCase();

  // コンビニ
  if (t.includes("セブン") || t.includes("seven")) {
    return { group: "convenience", name: "seven" };
  }
  if (t.includes("ファミマ") || t.includes("familymart")) {
    return { group: "convenience", name: "famima" };
  }
  if (t.includes("ローソン") || t.includes("lawson")) {
    return { group: "convenience", name: "lawson" };
  }

  // カフェ
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
