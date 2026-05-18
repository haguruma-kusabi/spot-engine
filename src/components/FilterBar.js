export default function FilterBar({
  theme,

  tab,
  setTab,

  favorites,

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
  return (
    <div style={styles.wrapper}>
      {/* タブ */}
      <div style={styles.row}>
        <button
          onClick={() => setTab("all")}
          style={tabBtn(tab === "all", theme)}
        >
          新着
        </button>

        <button
          onClick={() => setTab("fav")}
          style={tabBtn(tab === "fav", theme)}
        >
          ❤️
        </button>

        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          style={tabBtn(showUnreadOnly, theme)}
        >
          未読
        </button>

        <button
          onClick={resetRead}
          style={tabBtn(false, theme)}
        >
          初期化
        </button>
      </div>

      {/* 検索 + 期間 */}
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

      {/* ブランドフィルター（完全一致版） */}
      <div style={styles.groupRow}>
        {["コンビニ", "カフェ", "その他"].map((group) => (
          <button
            key={group}
            onClick={() =>
              setSelectedBrands((prev) => ({
                ...prev,
                [group.toLowerCase()]: !prev[group.toLowerCase()],
              }))
            }
            style={filterBtn(
              selectedBrands[group.toLowerCase()],
              theme
            )}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "6px 12px",
  },

  row: {
    display: "flex",
    gap: 6,
    marginBottom: 8,
  },

  searchRow: {
    display: "flex",
    gap: 6,
    marginBottom: 8,
  },

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
    gap: 6,
  },
};

const tabBtn = (active, theme) => ({
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

const filterBtn = (active, theme) => ({
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
