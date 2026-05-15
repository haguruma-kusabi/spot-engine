export const GROUPS = {
  コンビニ: ["ローソン", "セブン", "ファミマ"],
  カフェ: ["スタバ", "タリーズ", "ドトール"],
  その他: ["その他"],
};

export const getBrand = (item) => {
  const text = (
    (item.title || "") +
    (item.link || "")
  )
    .toLowerCase()
    .replace(/\s/g, "");

  if (/(lawson|ローソン)/.test(text))
    return "ローソン";

  if (/(7-?eleven|セブン)/.test(text))
    return "セブン";

  if (/(familymart|ファミマ)/.test(text))
    return "ファミマ";

  if (
    /(starbucks|スタバ|スターバックス)/.test(
      text
    )
  )
    return "スタバ";

  if (/(tully'?s|タリーズ)/.test(text))
    return "タリーズ";

  if (/(doutor|ドトール)/.test(text))
    return "ドトール";

  return "その他";
};

export const getBrandColor = (brand) => {
  if (brand === "セブン")
    return "#ff9f43";

  if (brand === "ローソン")
    return "#2d7ff9";

  if (brand === "ファミマ")
    return "#2ecc71";

  if (brand === "スタバ")
    return "#0f9d58";

  if (brand === "タリーズ")
    return "#b71c1c";

  if (brand === "ドトール")
    return "#795548";

  return "#666";
};
