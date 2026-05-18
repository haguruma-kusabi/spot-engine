import Link from "next/link";

import { themes } from "../themes";

export default function SeriesNav({
  currentTheme,
  primary,
}) {
  return (
    <div style={styles.row}>
      {Object.values(themes).map(
        (theme) => (
          <Link
            key={theme.id}
            href={`/${theme.id}`}
            style={{
              ...styles.link,

              borderColor:
                currentTheme ===
                theme.id
                  ? primary
                  : "transparent",
            }}
          >
            {theme.title}
          </Link>
        )
      )}
    </div>
  );
}

const styles = {
  row: {
    display: "flex",

    gap: 8,

    overflowX: "auto",

    marginBottom: 14,

    scrollbarWidth: "none",
  },

  link: {
    flexShrink: 0,

    padding:
      "8px 12px",

    borderRadius: 999,

    border: "1px solid",

    textDecoration: "none",

    color: "#fff",

    fontSize: 12,

    background:
      "rgba(255,255,255,0.06)",
  },
};
