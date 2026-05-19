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
  filterOpen,
  setFilterOpen,
}) {
  const toggle = (group, name) => {
    setSelectedBrands((prev) => {
      const copy = {
        ...prev,
        convenience: new Set(prev.convenience),
        cafe: new Set(prev.cafe),
      };

      if (group === "other") {
        copy.other = !copy.other;
        return copy;
      }

      const set = copy[group];
      set.has(name) ? set.delete(name) : set.add(name);

      return copy;
    });
  };

  return (
    <div style={styles.wrapper}>
      {/* 上段コントロール */}
      <div style={styles.topRow}>
        <button style={styles.btn} onClick={() => setTab("all")}>
          新着
        </button>

        <button style={styles.btn} onClick={() => setTab("fav")}>
          ❤️
        </button>

        <button
          style={styles.btn}
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
        >
          未読
        </button>

        <button style={styles.btn} onClick={resetRead}>
          初期化
        </button>

        {/* 折りたたみボタン */}
        <button
          style={{
            ...styles.btn,
            background: "#555",
          }}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          {filterOpen ? "閉じる" : "フィルター"}
        </button>
      </div>

      {/* 検索 */}
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

      {/* フィルター本体（折りたたみ） */}
      {filterOpen && (
        <div style={styles.filterArea}>
          {/* コンビニ */}
          <div style={styles.group}>
            {["seven", "famima", "lawson"].map((n) => (
              <button
                key={n}
                onClick={() => toggle("convenience", n)}
                style={styles.tag}
              >
                {n}
              </button>
            ))}
          </div>

          {/* カフェ */}
          <div style={styles.group}>
            {["starbucks", "tullys", "doutor"].map((n) => (
              <button
                key={n}
                onClick={() => toggle("cafe", n)}
                style={styles.tag}
              >
                {n}
              </button>
            ))}
          </div>

          {/* その他（独立1行） */}
          <div style={styles.group}>
            <button
              onClick={() => toggle("other", "other")}
              style={styles.tag}
            >
              その他
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "6px 12px",
  },

  topRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 8,
  },

  row: {
    display: "flex",
    gap: 6,
    marginBottom: 8,
  },

  filterArea: {
    marginTop: 6,
  },

  btn: {
    padding: "8px 10px",
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

  group: {
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
