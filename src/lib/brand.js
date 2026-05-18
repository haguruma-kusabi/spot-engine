export function detectBrand(title = "") {
  const text = title.toLowerCase();

  // ===== コンビニ =====
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
    };
  }

  if (
    text.includes("ファミマ") ||
    text.includes("ファミリーマート") ||
    text.includes("familymart") ||
    text.includes("family mart")
  ) {
    return {
      group: "convenience",
      name: "ファミマ",
    };
  }

  if (
    text.includes("ローソン") ||
    text.includes("lawson")
  ) {
    return {
      group: "convenience",
      name: "ローソン",
    };
  }

  // ===== カフェ =====
  if (
    text.includes("スタバ") ||
    text.includes("スターバックス") ||
    text.includes("starbucks")
  ) {
    return {
      group: "cafe",
      name: "スタバ",
    };
  }

  if (
    text.includes("タリーズ") ||
    text.includes("tullys") ||
    text.includes("tully's")
  ) {
    return {
      group: "cafe",
      name: "タリーズ",
    };
  }

  if (
    text.includes("ドトール") ||
    text.includes("doutor")
  ) {
    return {
      group: "cafe",
      name: "ドトール",
    };
  }

  // ===== その他 =====
  return {
    group: "other",
    name: "その他",
  };
}

/**
 * 拡張用（将来：複数ブランド同時検出）
 */
export function detectBrands(title = "") {
  return [detectBrand(title)];
}
