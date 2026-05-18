export default function FilterBar({
  tab,
  setTab,

  range,
  setRange,

  showUnreadOnly,
  setShowUnreadOnly,

  resetRead,

  count,

  keyword,
  setKeyword,

  selectedBrands,
  setSelectedBrands,

  theme,
}) {
  function toggleBrand(group, value) {
    setSelectedBrands((prev) => {
      const next = { ...prev };

      const current = next[group] || [];

      if (value === "all") {
        next[group] = [];
        return next;
      }

      const exists = current.includes(value);

      if (exists) {
        next[group] = current.filter((b) => b !== value);
      } else {
        next[group] = [...current, value];
      }

      return next;
    });
  }

  return (
    <div style={styles.wrap}>
      {/* タブ */}
      <div style={styles.row}>
        <button
          onClick={() => setTab("all")}
          style={tabBtn(tab === "all", theme)}
        >
          新着
        </button>

        <button
          onClick={() => setTab("favorites")}
          style={tabBtn(tab === "favorites", theme)}
        >
          お気に入り
        </button>
      </div>

      {/* 検索 */}
      <div style={styles.row}>
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
      </div>

      {/* コンビニ */}
      <div style={styles.group}>
        <div style={styles.groupTitle}>コンビニ</div>

        <select
          onChange={(e) =>
            toggleBrand("convenience", e.target.value)
          }
          style={styles.select}
        >
          <option value="all">全て</option>
          <option value="セブン">セブン</option>
          <option value="ファミマ">ファミマ</option>
          <option value="ローソン">ローソン</option>
        </select>
      </div>

      {/* カフェ */}
      <div style={styles.group}>
        <div style={styles.groupTitle}>カフェ</div>

        <select
          onChange={(e) =>
            toggleBrand("cafe", e.target.value)
          }
          style={styles.select}
        >
          <option value="all">全て</option>
          <option value="スタバ">スタバ</option>
          <option value="タリーズ">タリーズ</option>
          <option value="ドトール">ドトール</option>
        </select>
      </div>

      {/* 期間 */}
      <div style={styles.row}>
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

      {/* 未読 / リセット */}
      <div style={styles.row}>
        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          style={filterBtn(showUnreadOnly, theme)}
        >
          未読のみ
        </button>

        <button
          onClick={resetRead}
          style={{
            ...styles.resetBtn,
            background: theme.colors.readBadge,
          }}
        >
          既読リセット
        </button>
      </div>

      <div style={styles.count}>{count}件ヒット</div>
    </div>
  );
}

const styles = {
  wrap: {
    padding: "0 14px 12px",
  },

  row: {
    display: "flex",
    gap: 8,
    marginBottom: 8,
  },

  group: {
    marginBottom: 10,
  },

  groupTitle: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8,
  },

  search: {
    width: "100%",
    border: "none",
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    outline: "none",
  },

  select: {
    width: "100%",
    border: "none",
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    outline: "none",
  },

  resetBtn: {
    flex: 1,
    border: "none",
    borderRadius: 10,
    color: "#fff",
    padding: 8,
    fontSize: 12,
  },

  count: {
    fontSize: 12,
    opacity: 0.8,
    paddingTop: 4,
  },
};

const tabBtn = (active, theme) => ({
  flex: 1,
  padding: 10,
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
