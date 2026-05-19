import { useState } from "react";

export default function FilterBar({
  tab,
  setTab,

  range,
  setRange,
  keyword,
  setKeyword,

  showUnreadOnly,
  setShowUnreadOnly,

  resetRead,

  selectedBrands,
  setSelectedBrands,
}) {
  const [open, setOpen] = useState({
    convenience: true,
    cafe: false,
  });

  const toggleCheck = (group, name) => {
    setSelectedBrands((prev) => {
      const copy = {
        convenience: new Set(prev.convenience),
        cafe: new Set(prev.cafe),
      };

      const set = copy[group];
      set.has(name) ? set.delete(name) : set.add(name);

      return copy;
    });
  };

  return (
    <div style={styles.wrapper}>
      {/* =========================
          検索 + 期間（上部）
      ========================= */}
      <div style={styles.searchRow}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索"
          style={styles.input}
        />

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          style={styles.select}
        >
          <option value={3}>3日</option>
          <option value={7}>7日</option>
          <option value={14}>14日</option>
          <option value={30}>30日</option>
        </select>
      </div>

      {/* =========================
          タブ（検索の下に移動）
      ========================= */}
      <div style={styles.tabRow}>
        <button onClick={() => setTab("all")} style={styles.tabBtn}>
          新着
        </button>

        <button onClick={() => setTab("fav")} style={styles.tabBtn}>
          ❤️
        </button>

        <button
          onClick={() => setShowUnreadOnly((v) => !v)}
          style={styles.tabBtn}
        >
          未読
        </button>

        <button onClick={resetRead} style={styles.tabBtn}>
          初期化
        </button>
      </div>

      {/* =========================
          コンビニ（アコーディオン）
      ========================= */}
      <div style={styles.group}>
        <button
          onClick={() =>
            setOpen((p) => ({
              ...p,
              convenience: !p.convenience,
            }))
          }
          style={styles.groupHeader}
        >
          ▼ コンビニ
        </button>

        {open.convenience && (
          <div style={styles.checkRow}>
            {["seven", "famima", "lawson"].map((n) => (
              <label key={n} style={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={selectedBrands.convenience.has(n)}
                  onChange={() =>
                    toggleCheck("convenience", n)
                  }
                />
                {n}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* =========================
          カフェ（アコーディオン）
      ========================= */}
      <div style={styles.group}>
        <button
          onClick={() =>
            setOpen((p) => ({
              ...p,
              cafe: !p.cafe,
            }))
          }
          style={styles.groupHeader}
        >
          ▼ カフェ
        </button>

        {open.cafe && (
          <div style={styles.checkRow}>
            {["starbucks", "tullys", "doutor"].map(
              (n) => (
                <label key={n} style={styles.checkItem}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.cafe.has(n)}
                    onChange={() => toggleCheck("cafe", n)}
                  />
                  {n}
                </label>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "6px 12px",
  },

  searchRow: {
    display: "flex",
    gap: 6,
    marginBottom: 8,
  },

  input: {
    flex: 2,
    padding: 8,
    borderRadius: 10,
    border: "none",
  },

  select: {
    flex: 1,
    borderRadius: 10,
    border: "none",
  },

  tabRow: {
    display: "flex",
    gap: 6,
    marginBottom: 10,
  },

  tabBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    border: "none",
    background: "#333",
    color: "#fff",
    fontSize: 12,
  },

  group: {
    marginBottom: 10,
  },

  groupHeader: {
    width: "100%",
    padding: 8,
    borderRadius: 10,
    border: "none",
    background: "#444",
    color: "#fff",
    textAlign: "left",
  },

  checkRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
    paddingLeft: 4,
  },

  checkItem: {
    fontSize: 12,
    color: "#fff",
  },
};
