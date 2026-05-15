const SERIES = [
  {
    id: "choco",
    title: "CHOCO 🌿 SPOT",
    path: "/choco",
    emoji: "🍫",
  },

  {
    id: "matcha",
    title: "METCHA 🍵 MATCHA",
    path: "/matcha",
    emoji: "🍵",
  },
];

export default function SeriesNav({
  currentTheme,
  primary,
}) {
  return (
    <div style={styles.wrap}>
      {SERIES.map((site) => {
        const active =
          site.id === currentTheme;

        return (
          <a
            key={site.id}
            href={site.path}
            style={{
              ...styles.link,

              background: active
                ? primary
                : "#2a2f36",

              transform: active
                ? "scale(1.03)"
                : "scale(1)",
            }}
          >
            <span
              style={styles.emoji}
            >
              {site.emoji}
            </span>

            <span>
              {site.title}
            </span>
          </a>
        );
      })}
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",

    gap: 8,

    overflowX: "auto",

    paddingBottom: 8,

    marginBottom: 10,

    scrollbarWidth: "none",

    msOverflowStyle: "none",
  },

  link: {
    flexShrink: 0,

    display: "flex",

    alignItems: "center",

    gap: 6,

    padding: "8px 12px",

    borderRadius: 999,

    color: "#fff",

    textDecoration: "none",

    fontSize: 12,

    fontWeight: "bold",

    transition:
      "all 0.18s ease",
  },

  emoji: {
    fontSize: 14,
  },
};

if (typeof document !== "undefined") {
  const style =
    document.createElement("style");

  style.innerHTML = `
    div::-webkit-scrollbar {
      display: none;
    }
  `;

  document.head.appendChild(style);
}
