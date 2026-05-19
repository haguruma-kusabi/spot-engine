import { BRAND_MAP } from "../lib/brand";

export default function FilterBar({
  theme,

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

      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }

      next[group] = set;
      return next;
    });
  }

  return (
    <div style={styles.wrapper}>
      {/* 上段 */}
      <div style={styles.row}>
        <button onClick={() => setTab("all")} style={btn(tab==="all", theme)}>新着</button>
        <button onClick={() => setTab("fav")} style={btn(tab==="fav", theme)}>❤️</button>
        <button onClick={() => setShowUnreadOnly(!showUnreadOnly)} style={btn(showUnreadOnly, theme)}>未読</button>
        <button onClick={resetRead} style={btn(false, theme)}>初期化</button>
      </div>

      {/* 検索 */}
      <div style={styles.searchRow}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索"
          style={{
            ...styles.search,
            background: theme.colors.inputBg,
            color: theme.colors.inputText,
          }}
        />

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          style={{
            ...styles.select,
            background: theme.colors.inputBg,
            color: theme.colors.inputText,
          }}
        >
          <option value={3}>3日</option>
          <option value={7}>7日</option>
          <option value={14}>14日</option>
          <option value={30}>30日</option>
        </select>
      </div>

      {/* チェックボックス */}
      <div style={styles.groupRow}>
        <div style={styles.groupBox}>
          <div style={styles.label}>コンビニ</div>
          {BRAND_MAP.convenience.map((b) => (
            <label key={b.value} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBrands.convenience.has(b.value)}
                onChange={() => toggle("convenience", b.value)}
              />
              <span style={{ color: b.color }}>
                {b.label}
              </span>
            </label>
          ))}
        </div>

        <div style={styles.groupBox}>
          <div style={styles.label}>カフェ</div>
          {BRAND_MAP.cafe.map((b) => (
            <label key={b.value} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBrands.cafe.has(b.value)}
                onChange={() => toggle("cafe", b.value)}
              />
              <span style={{ color: b.color }}>
                {b.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: "6px 12px" },

  row: { display: "flex", gap: 6, marginBottom: 8 },

  searchRow: { display: "flex", gap: 6, marginBottom: 8 },

  search: {
    flex: 2,
    padding: 8,
    borderRadius: 10,
    border: "none",
    fontSize: 13,
    outline: "none",
  },

  select: {
    flex: 1,
    borderRadius: 10,
    border: "none",
    fontSize: 12,
    outline: "none",
  },

  groupRow: {
    display: "flex",
    gap: 12,
  },

  groupBox: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  label: {
    fontSize: 11,
    opacity: 0.8,
  },

  checkbox: {
    display: "flex",
    gap: 6,
    fontSize: 12,
    alignItems: "center",
  },
};

const btn = (active, theme) => ({
  flex: 1,
  padding: 8,
  borderRadius: 10,
  border: "none",
  color: "#fff",
  fontSize: 12,
  background: active
    ? theme.colors.primary
    : theme.colors.navInactive,
});
