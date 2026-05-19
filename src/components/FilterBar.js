import { BRAND_MAP } from "../lib/brand";

export default function FilterBar({
  tab,
  setTab,
  keyword,
  setKeyword,
  range,
  setRange,
  selectedBrands,
  setSelectedBrands,
  showUnreadOnly,
  setShowUnreadOnly,
  resetRead,
}) {
  function toggle(group, value) {
    setSelectedBrands((prev) => {
      const next = { ...prev };
      const set = new Set(next[group]);

      set.has(value) ? set.delete(value) : set.add(value);

      next[group] = set;
      return next;
    });
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.tabRow}>
        <button onClick={() => setTab("all")} style={tabBtn(tab === "all")}>
          新着
        </button>

        <button onClick={() => setTab("fav")} style={tabBtn(tab === "fav")}>
          ❤️
        </button>

        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          style={tabBtn(showUnreadOnly)}
        >
          未読
        </button>

        <button onClick={resetRead} style={resetBtn}>
          初期化
        </button>
      </div>

      <div style={styles.searchRow}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索"
          style={styles.search}
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

      <div style={styles.brandRow}>
        <div style={styles.groupBox}>
          <div style={styles.groupTitle}>コンビニ</div>
          {BRAND_MAP.convenience.map((b) => (
            <label key={b.value} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBrands.convenience.has(b.value)}
                onChange={() => toggle("convenience", b.value)}
              />
              {b.label}
            </label>
          ))}
        </div>

        <div style={styles.groupBox}>
          <div style={styles.groupTitle}>カフェ</div>
          {BRAND_MAP.cafe.map((b) => (
            <label key={b.value} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBrands.cafe.has(b.value)}
                onChange={() => toggle("cafe", b.value)}
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: "10px 12px" },

  tabRow: {
    display: "flex",
    gap: 6,
    marginBottom: 10,
  },

  searchRow: {
    display: "flex",
    gap: 6,
    marginBottom: 10,
  },

  search: {
    flex: 2,
    padding: 9,
    borderRadius: 12,
    border: "none",
  },

  select: {
    flex: 1,
    borderRadius: 12,
    border: "none",
  },

  brandRow: {
    display: "flex",
    gap: 10,
  },

  groupBox: {
    flex: 1,
    padding: 10,
    borderRadius: 14,
    background: "rgba(255,255,255,0.04)",
  },

  groupTitle: {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 6,
  },

  checkbox: {
    display: "flex",
    gap: 6,
    fontSize: 12,
    color: "#fff",
  },
};

const tabBtn = (active) => ({
  flex: 1,
  padding: 10,
  borderRadius: 12,
  border: "none",
  color: "#fff",
  background: active ? "#63ffd2" : "#214851",
});

const resetBtn = {
  flex: 1,
  padding: 10,
  borderRadius: 12,
  border: "none",
  color: "#fff",
  background: "#4f8d84",
};
