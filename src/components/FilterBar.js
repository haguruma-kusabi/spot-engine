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
      const updated = { ...prev };
      const set = new Set(updated[group]);

      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }

      updated[group] = set;
      return updated;
    });
  }

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
          onClick={() =>
            setShowUnreadOnly(!showUnreadOnly)
          }
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
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="検索"
          style={{
            ...styles.search,
            background: theme.colors.inputBg,
            color: theme.colors.inputText,
          }}
        />

        <select
          value={range}
          onChange={(e) =>
            setRange(Number(e.target.value))
          }
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

      {/* ★横並びチェックボックス（コンビニ・カフェ） */}
      <div style={styles.groupRow}>
        {/* コンビニ */}
        <div style={styles.groupBox}>
          <div style={styles.label}>コンビニ</div>

          {["セブン", "ファミマ", "ローソン"].map((v) => (
            <label key={v} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBrands.convenience.has(v)}
                onChange={() =>
                  toggle("convenience", v)
                }
              />
              {v}
            </label>
          ))}
        </div>

        {/* カフェ */}
        <div style={styles.groupBox}>
          <div style={styles.label}>カフェ</div>

          {["スタバ", "タリーズ", "ドトール"].map((v) => (
            <label key={v} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBrands.cafe.has(v)}
                onChange={() => toggle("cafe", v)}
              />
              {v}
            </label>
          ))}
        </div>
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
    gap: 12,
    flexWrap: "wrap",
  },

  groupBox: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 6,
  },

  label: {
    fontSize: 11,
    opacity: 0.8,
  },

  checkbox: {
    fontSize: 12,
    display: "flex",
    gap: 6,
    alignItems: "center",
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
