export const GROUPS = {
  コンビニ: ["セブン", "ファミマ", "ローソン"],
  カフェ: ["スタバ", "タリーズ", "ドトール"],
  その他: [],
};

export function detectBrand(title = "") {
  const text = title.toLowerCase();

  // セブン
  if (
    text.includes("セブン") ||
    text.includes("セブンイレブン") ||
    text.includes("7-eleven") ||
    text.includes("7-11")
  ) {
    return {
      group: "コンビニ",
      name: "セブン",
      color: "#f36c21",
    };
  }

  // ファミマ
  if (
    text.includes("ファミマ") ||
    text.includes("ファミリーマート") ||
    text.includes("familymart")
  ) {
    return {
      group: "コンビニ",
      name: "ファミマ",
      color: "#00a652",
    };
  }

  // ローソン
  if (
    text.includes("ローソン") ||
    text.includes("lawson")
  ) {
    return {
      group: "コンビニ",
      name: "ローソン",
      color: "#005bac",
    };
  }

  // スタバ
  if (
    text.includes("スタバ") ||
    text.includes("スターバックス") ||
    text.includes("starbucks")
  ) {
    return {
      group: "カフェ",
      name: "スタバ",
      color: "#00704a",
    };
  }

  // タリーズ
  if (
    text.includes("タリーズ") ||
    text.includes("tullys")
  ) {
    return {
      group: "カフェ",
      name: "タリーズ",
      color: "#000000",
    };
  }

  // ドトール
  if (
    text.includes("ドトール") ||
    text.includes("doutor")
  ) {
    return {
      group: "カフェ",
      name: "ドトール",
      color: "#f2c200",
    };
  }

  return {
    group: "その他",
    name: "その他",
    color: "#8b3a2f",
  };
}
