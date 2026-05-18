export default function FilterBar({
  tab,
  setTab,
  range,
  setRange,
  keyword,
  setKeyword,
  selectedBrands,
  setSelectedBrands,
  showUnreadOnly,
  setShowUnreadOnly,
  resetRead,
  theme,
}) {
  function toggle(group, value) {
    setSelectedBrands((prev) => {
      const next = { ...prev };
      const set = new Set(next[group]);

      if (set.has(value)) set.delete(value);
      else set.add(value);

      next[group] = set;
      return next;
    });
  }

  const tabBtn = (active) => ({
    flex: 1,
    padding: 9,
    borderRadius: 10,
    border: "none",
    color: "#fff",
    fontSize: 12,
    background: active
      ? theme.colors.primary
      : theme.colors.navInactive,
  });

  const btn = (active) => ({
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

  return (
    <>
      {/* タブ（元デザイン復元） */}
      <div style={styles.tabRow}>
        <button
          onClick={() => setTab("all")}
          style={tabBtn(tab === "all")}
        >
          新着
        </button>

        <button
          onClick={() => setTab("favorites")}
          style={tabBtn(tab === "favorites")}
        >
          お気に入り
        </button>
      </div>

      {/* 検索（元サイズ復元） */}
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
      </div>

      {/* ブランド（元レイアウト：2列カード風） */}
      <div style={styles.brandGrid}>
        {/* コンビニ */}
        <div style={styles.groupBox}>
          <div style={styles.groupTitle}>コンビニ</div>

          {["セブン", "ファミマ", "ローソン"].map((b) => (
            <label key={b} style={styles.checkRow}>
              <input
                type="checkbox"
                checked={selectedBrands.convenience.has(b)}
                onChange={() => toggle("convenience", b)}
              />
              {b}
            </label>
          ))}
        </div>

        {/* カフェ */}
        <div style={styles.groupBox}>
          <div style={styles.groupTitle}>カフェ</div>

          {["スタバ", "タリーズ", "ドトール"].map((b) => (
            <label key={b} style={styles.checkRow}>
              <input
                type="checkbox"
                checked={selectedBrands.cafe.has(b)}
                onChange={() => toggle("cafe", b)}
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {/* その他（元位置維持） */}
      <div style={styles.otherBox}>
        <label style={styles.checkRow}>
          <input
            type="checkbox"
            checked={selectedBrands.other}
            onChange={() =>
              setSelectedBrands((p) => ({
                ...p,
                other: !p.other,
              }))
            }
          />
          その他
        </label>
      </div>

      {/* 期間（復活・元UI） */}
      <div style={styles.rangeRow}>
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

      {/* ユーティリティ（元UI復元） */}
      <div style={styles.utilRow}>
        <button
          onClick={() => setShowUnreadOnly((v) => !v)}
          style={btn(showUnreadOnly)}
        >
          未読のみ
        </button>

        <button
          onClick={resetRead}
          style={{
            ...btn(false),
            background: theme.colors.readBadge,
          }}
        >
          既読リセット
        </button>
      </div>
    </>
  );
}

const styles = {
  tabRow: {
    display: "flex",
    gap: 6,
    marginBottom: 10,
  },

  searchRow: {
    marginBottom: 10,
  },

  search: {
    width: "100%",
    padding: 9,
    borderRadius: 10,
    border: "none",
    fontSize: 13,
    outline: "none",
  },

  brandGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 10,
  },

  groupBox: {
    padding: 10,
    borderRadius: 10,
    background: "rgba(255,255,255,0.03)",
  },

  groupTitle: {
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

  otherBox: {
    marginBottom: 10,
  },

  rangeRow: {
    marginBottom: 10,
  },

  select: {
    width: "100%",
    padding: 9,
    borderRadius: 10,
    border: "none",
    fontSize: 12,
    outline: "none",
  },

  utilRow: {
    display: "flex",
    gap: 6,
  },
};
