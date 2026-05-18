import { GROUPS } from "../lib/brand";

export default function FilterBar({
  theme,

  tab,
  setTab,

  favorites,

  keyword,
  setKeyword,

  range,
  setRange,

  activeGroups,
  toggleGroup,

  unreadOnly,
  setUnreadOnly,

  clearRead,
}) {
  return (
    <div style={styles.wrapper}>
      {/* 上段タブ */}
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
          onClick={() => setUnreadOnly(!unreadOnly)}
          style={tabBtn(unreadOnly, theme)}
        >
          未読
        </button>

        <button
          onClick={clearRead}
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

      {/* ブランドグループ */}
      <div style={styles.groupRow}>
        {Object.keys(GROUPS).map((g) => (
          <button
            key={g}
            onClick={() => toggleGroup(g)}
            style={filterBtn(activeGroups.includes(g), theme)}
          >
            {g}
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
    flexWrap: "wrap",
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
