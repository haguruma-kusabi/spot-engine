import { useEffect, useRef, useState } from "react";
import { themes } from "../themes";

export default function Header({
  theme,
  filteredCount,
  todayCount,
  lastUpdated,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () =>
      document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.topRow}>
        <div ref={menuRef} style={styles.menuArea}>
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

        <div style={styles.title}>{theme.title}</div>

        <div style={{ width: 40 }} />
      </div>

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
  wrapper: { paddingTop: 8 },

  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
  },

  menuArea: { position: "relative" },

  menuBtn: {
    fontSize: 22,
    background: "transparent",
    border: "none",
    color: "#fff",
  },

  dropdown: {
    position: "absolute",
    top: 28,
    left: 0,
    background: "#111",
    borderRadius: 10,
    padding: 6,
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
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    padding: "0 12px",
    color: "#d7e0e5",
  },

  updateText: {
    fontSize: 11,
    padding: "0 12px",
    color: "#cfe7d3",
  },
};
