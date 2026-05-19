import { useMemo } from "react";

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
  theme,
}) {
  const toggleBrand = (group, name) => {
    setSelectedBrands((prev) => {
      const copy = {
        ...prev,
        convenience: new Set(prev.convenience),
        cafe: new Set(prev.cafe),
      };

      if (group === "other") {
        copy.other = !prev.other;
        return copy;
      }

      const set = copy[group];

      if (set.has(name)) {
        set.delete(name);
      } else {
        set.add(name);
      }

      return copy;
    });
  };

  return (
    <div style={styles.wrapper}>
      {/* 上段タブ */}
      <div style={styles.row}>
        <button onClick={() => setTab("all")} style={styles.btn}>
          新着
        </button>

        <button onClick={() => setTab("fav")} style={styles.btn}>
          ❤️
        </button>

        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          style={styles.btn}
        >
          未読
        </button>

        <button onClick={resetRead} style={styles.btn}>
          初期化
        </button>
      </div>

      {/* 検索・期間 */}
      <div style={styles.row}>
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

      {/* コンビニ */}
      <div style={styles.groupRow}>
        {["seven", "famima", "lawson"].map((name) => (
          <button
            key={name}
            onClick={() => toggleBrand("convenience", name)}
            style={styles.tag}
          >
            {name}
          </button>
        ))}
      </div>

      {/* カフェ */}
      <div style={styles.groupRow}>
        {["starbucks", "tullys", "doutor"].map((name) => (
          <button
            key={name}
            onClick={() => toggleBrand("cafe", name)}
            style={styles.tag}
          >
            {name}
          </button>
        ))}
      </div>

      {/* その他 */}
      <div style={styles.groupRow}>
        <button
          onClick={() => toggleBrand("other", "other")}
          style={styles.tag}
        >
          その他
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: "6px 12px" },

  row: {
    display: "flex",
    gap: 6,
    marginBottom: 8,
  },

  btn: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    border: "none",
    background: "#333",
    color: "#fff",
    fontSize: 12,
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

  groupRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 6,
  },

  tag: {
    padding: "6px 10px",
    borderRadius: 999,
    border: "none",
    background: "#444",
    color: "#fff",
    fontSize: 12,
  },
};
