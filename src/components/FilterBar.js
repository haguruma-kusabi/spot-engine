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
  function toggle(group, value) {
    setSelectedBrands((prev) => {
      const next = { ...prev };
      const list = next[group] || [];

      if (list.includes(value)) {
        next[group] = list.filter((v) => v !== value);
      } else {
        next[group] = [...list, value];
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

      {/* 横並びエリア */}
      <div style={styles.grid2}>
        {/* コンビニ */}
        <div style={styles.group}>
          <div style={styles.title}>コンビニ</div>

          {["セブン", "ファミマ", "ローソン"].map((b) => (
            <label key={b} style={styles.checkRow}>
              <input
                type="checkbox"
                checked={selectedBrands.convenience.includes(b)}
                onChange={() => toggle("convenience", b)}
              />
              <span>{b}</span>
            </label>
          ))}
        </div>

        {/* カフェ */}
        <div style={styles.group}>
          <div style={styles.title}>カフェ</div>

          {["スタバ", "タリーズ", "ドトール"].map((b) => (
            <label key={b} style={styles.checkRow}>
              <input
                type="checkbox"
                checked={selectedBrands.cafe.includes(b)}
                onChange={() => toggle("cafe", b)}
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* その他 */}
      <div style={styles.group}>
        <label style={styles.checkRow}>
          <input
            type="checkbox"
            checked={selectedBrands.other}
            onChange={() =>
              setSelectedBrands((prev) => ({
                ...prev,
                other: !prev.other,
              }))
            }
          />
          <span>その他</span>
        </label>
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

      {/* 未読 */}
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

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 10,
  },

  group: {
    padding: 10,
    borderRadius: 10,
    background: "rgba(255,255,255,0.03)",
  },

  title: {
    fontSize: 12,
    marginBottom: 6,
    opacity: 0.8,
  },

  checkRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    fontSize: 13,
    marginBottom: 4,
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
