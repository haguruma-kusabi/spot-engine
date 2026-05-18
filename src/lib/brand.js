export function detectBrand(title = "") {
  const text = title.toLowerCase();

  // セブン
  if (
    text.includes("セブン") ||
    text.includes("セブンイレブン") ||
    text.includes("7-11") ||
    text.includes("7-eleven") ||
    text.includes("711")
  ) {
    return {
      group: "convenience",
      name: "セブン",
      color: "#f36c21", // オレンジ
    };
  }

  // ファミマ
  if (
    text.includes("ファミマ") ||
    text.includes("ファミリーマート") ||
    text.includes("familymart") ||
    text.includes("family mart")
  ) {
    return {
      group: "convenience",
      name: "ファミマ",
      color: "#00a652", // 緑
    };
  }

  // ローソン
  if (
    text.includes("ローソン") ||
    text.includes("lawson")
  ) {
    return {
      group: "convenience",
      name: "ローソン",
      color: "#005bac", // 青
    };
  }

  // スタバ
  if (
    text.includes("スタバ") ||
    text.includes("スターバックス") ||
    text.includes("starbucks")
  ) {
    return {
      group: "cafe",
      name: "スタバ",
      color: "#00704a", // 濃い緑
    };
  }

  // タリーズ
  if (
    text.includes("タリーズ") ||
    text.includes("tullys") ||
    text.includes("tully's")
  ) {
    return {
      group: "cafe",
      name: "タリーズ",
      color: "#000000", // 黒
    };
  }

  // ドトール
  if (
    text.includes("ドトール") ||
    text.includes("doutor")
  ) {
    return {
      group: "cafe",
      name: "ドトール",
      color: "#f2c200", // 黄
    };
  }

  // その他
  return {
    group: "other",
    name: "その他",
    color: "#8b3a2f", // 赤茶（無印風）
  };
}
