export const BRANDS = {
  convenience: {
    セブン: [
      "セブン",
      "セブンイレブン",
      "7-Eleven",
      "7 eleven",
    ],

    ファミマ: [
      "ファミマ",
      "ファミリーマート",
      "FamilyMart",
    ],

    ローソン: [
      "ローソン",
      "LAWSON",
    ],
  },

  cafe: {
    スタバ: [
      "スタバ",
      "スターバックス",
      "Starbucks",
    ],

    タリーズ: [
      "タリーズ",
      "TULLY",
      "Tully's",
    ],

    ドトール: [
      "ドトール",
      "DOUTOR",
    ],
  },
};

export function detectBrand(title = "") {
  const text = title.toLowerCase();

  for (const [group, brands] of Object.entries(BRANDS)) {
    for (const [name, keywords] of Object.entries(brands)) {
      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          return {
            group,
            name,
          };
        }
      }
    }
  }

  return {
    group: "other",
    name: null,
  };
}
