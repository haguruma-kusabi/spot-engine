import { useState } from "react";
import SeriesNav from "./SeriesNav";
import { themes } from "../themes";

export default function Header({
  theme,
  filteredCount,
  todayCount,
  lastUpdated,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.wrapper}>
      {/* 上段 */}
      <div style={styles.topRow}>
        {/* ≡ メニュー */}
        <div style={styles.menuArea}>
          <button
            onClick={() => setOpen(!open)}
            style={styles.menuBtn}
          >
            ≡
          </button>

          {open && (
            <div style={styles.dropdown}>
              {Object.keys(themes).map((key) => (
                <a
                  key={key}
                  href={`/${key}`}
                  style={styles.dropdownItem}
                >
                  {themes[key].title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* タイトル（中央固定） */}
        <div style={styles.title}>
          {theme.title}
        </div>

        {/* 右側余白（バランス用） */}
        <div style={{ width: 40 }} />
      </div>

      {/* SeriesNav（残す） */}
      <SeriesNav
        currentTheme={theme.id}
        primary={theme.colors.primary}
      />

      {/* 情報 */}
      <div style={styles.infoRow}>
        <span>{filteredCount}件ヒット</span>
        <span>今日 {todayCount}件</span>
      </div>

      <div style={styles.updateText}>
        最終更新 {lastUpdated}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    paddingTop: 8,
  },

  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
    marginBottom: 8,
  },

  menuArea: {
    position: "relative",
  },

  menuBtn: {
    fontSize: 22,
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    top: 28,
    left: 0,
    background: "#111",
    borderRadius: 10,
    padding: 6,
    zIndex: 999,
    minWidth: 140,
  },

  dropdownItem: {
    display: "block",
    padding: "6px 8px",
    color: "#fff",
    textDecoration: "none",
    fontSize: 13,
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#d7e0e5",
    marginBottom: 4,
    padding: "0 12px",
  },

  updateText: {
    fontSize: 11,
    color: "#cfe7d3",
    marginBottom: 6,
    padding: "0 12px",
  },
};
