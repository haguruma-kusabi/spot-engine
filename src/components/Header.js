import SeriesNav from "./SeriesNav";

export default function Header({
  theme,
  filteredCount,
  todayCount,
  lastUpdated,
}) {
  return (
    <>
      {/* シリーズナビ */}
      <SeriesNav
        currentTheme={theme.id}
        primary={theme.colors.primary}
      />

      {/* タイトル */}
      <h1 style={styles.title}>
        {theme.title}
      </h1>

      {/* 情報 */}
      <div style={styles.infoRow}>
        <span>
          {filteredCount}件ヒット
        </span>

        <span>
          今日 {todayCount}件
        </span>
      </div>

      <div style={styles.updateText}>
        最終更新 {lastUpdated}
      </div>
    </>
  );
}

const styles = {
  title: {
    textAlign: "center",

    fontSize: 22,

    marginBottom: 14,

    fontWeight: "bold",
  },

  infoRow: {
    display: "flex",

    justifyContent:
      "space-between",

    fontSize: 12,

    color: "#d7e0e5",

    marginBottom: 4,
  },

  updateText: {
    fontSize: 11,

    color: "#cfe7d3",

    marginBottom: 6,
  },
};
