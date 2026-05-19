import { useState } from "react";

const CONVENIENCE = [
  {
    label: "セブン",
    value: "seven",
  },
  {
    label: "ファミマ",
    value: "famima",
  },
  {
    label: "ローソン",
    value: "lawson",
  },
];

const CAFE = [
  {
    label: "スタバ",
    value: "starbucks",
  },
  {
    label: "タリーズ",
    value: "tullys",
  },
  {
    label: "ドトール",
    value: "doutor",
  },
];

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
}) {
  const [open, setOpen] = useState({
    convenience: true,
    cafe: true,
  });

  // =========================
  // 個別チェック切替
  // =========================
  function toggleBrand(group, value) {
    setSelectedBrands((prev) => {
      const next = {
        ...prev,
        [group]: new Set(prev[group]),
      };

      if (next[group].has(value)) {
        next[group].delete(value);
      } else {
        next[group].add(value);
      }

      return next;
    });
  }

  // =========================
  // 一括ON/OFF
  // =========================
  function toggleAll(group, list) {
    setSelectedBrands((prev) => {
      const current = prev[group];

      const allSelected =
        current.size === list.length;

      return {
        ...prev,
        [group]: allSelected
          ? new Set()
          : new Set(list.map((i) => i.value)),
      };
    });
  }

  // =========================
  // その他フィルタ
  // =========================
  function toggleOther() {
    setSelectedBrands((prev) => ({
      ...prev,
      other: !prev.other,
    }));
  }

  return (
    <div style={styles.wrapper}>
      {/* =========================
          検索 + 期間
      ========================= */}
      <div style={styles.searchRow}>
        <input
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="検索"
          style={styles.search}
        />

        <select
          value={range}
          onChange={(e) =>
            setRange(Number(e.target.value))
          }
          style={styles.select}
        >
          <option value={3}>3日</option>
          <option value={7}>7日</option>
          <option value={14}>14日</option>
          <option value={30}>30日</option>
        </select>
      </div>

      {/* =========================
          タブ
      ========================= */}
      <div style={styles.tabRow}>
        <button
          onClick={() => setTab("all")}
          style={styles.tabBtn}
        >
          新着
        </button>

        <button
          onClick={() => setTab("fav")}
          style={styles.tabBtn}
        >
          ❤️
        </button>

        <button
          onClick={() =>
            setShowUnreadOnly((v) => !v)
          }
          style={{
            ...styles.tabBtn,
            background: showUnreadOnly
              ? "#00c896"
              : "#333",
          }}
        >
          未読
        </button>

        <button
          onClick={resetRead}
          style={styles.tabBtn}
        >
          初期化
        </button>
      </div>

      {/* =========================
          ブランドフィルタ
      ========================= */}
      <div style={styles.brandGrid}>
        {/* =========================
            コンビニ
        ========================= */}
        <div style={styles.groupCard}>
          <button
            onClick={() =>
              setOpen((prev) => ({
                ...prev,
                convenience:
                  !prev.convenience,
              }))
            }
            style={styles.groupHeader}
          >
            コンビニ ▼
          </button>

          {open.convenience && (
            <div style={styles.checkArea}>
              {/* 一括 */}
              <label style={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={
                    selectedBrands.convenience
                      .size ===
                    CONVENIENCE.length
                  }
                  onChange={() =>
                    toggleAll(
                      "convenience",
                      CONVENIENCE
                    )
                  }
                />
                すべて
              </label>

              {/* 個別 */}
              {CONVENIENCE.map((brand) => (
                <label
                  key={brand.value}
                  style={styles.checkLabel}
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.convenience.has(
                      brand.value
                    )}
                    onChange={() =>
                      toggleBrand(
                        "convenience",
                        brand.value
                      )
                    }
                  />
                  {brand.label}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            カフェ
        ========================= */}
        <div style={styles.groupCard}>
          <button
            onClick={() =>
              setOpen((prev) => ({
                ...prev,
                cafe: !prev.cafe,
              }))
            }
            style={styles.groupHeader}
          >
            カフェ ▼
          </button>

          {open.cafe && (
            <div style={styles.checkArea}>
              {/* 一括 */}
              <label style={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={
                    selectedBrands.cafe.size ===
                    CAFE.length
                  }
                  onChange={() =>
                    toggleAll("cafe", CAFE)
                  }
                />
                すべて
              </label>

              {/* 個別 */}
              {CAFE.map((brand) => (
                <label
                  key={brand.value}
                  style={styles.checkLabel}
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.cafe.has(
                      brand.value
                    )}
                    onChange={() =>
                      toggleBrand(
                        "cafe",
                        brand.value
                      )
                    }
                  />
                  {brand.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          その他
      ========================= */}
      <div style={styles.otherRow}>
        <label style={styles.otherLabel}>
          <input
            type="checkbox"
            checked={selectedBrands.other}
            onChange={toggleOther}
          />
          その他
        </label>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "8px 12px 12px",
  },

  // =========================
  // 検索
  // =========================
  searchRow: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
  },

  search: {
    flex: 2,
    padding: 10,
    borderRadius: 12,
    border: "none",
    outline: "none",
    fontSize: 13,
    background: "#222",
    color: "#fff",
  },

  select: {
    flex: 1,
    borderRadius: 12,
    border: "none",
    outline: "none",
    background: "#222",
    color: "#fff",
    padding: 10,
  },

  // =========================
  // タブ
  // =========================
  tabRow: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
  },

  tabBtn: {
    flex: 1,
    padding: 9,
    borderRadius: 12,
    border: "none",
    background: "#333",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
  },

  // =========================
  // ブランドグリッド
  // =========================
  brandGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 10,
  },

  groupCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 8,
  },

  groupHeader: {
    width: "100%",
    border: "none",
    background: "#444",
    color: "#fff",
    borderRadius: 10,
    padding: 9,
    fontWeight: 700,
    textAlign: "left",
    marginBottom: 8,
  },

  // =========================
  // チェックエリア
  // =========================
  checkArea: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingLeft: 2,
  },

  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#f1f1f1",
  },

  // =========================
  // その他
  // =========================
  otherRow: {
    marginTop: 2,
    paddingLeft: 4,
  },

  otherLabel: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#fff",
  },
};
