export default function FilterBar({
  tab,
  setTab,

  filter,
  setFilter,

  sort,
  setSort,

  range,
  setRange,

  showUnreadOnly,
  setShowUnreadOnly,

  resetRead,

  count,

  keyword,
  setKeyword,

  theme,
}) {
  return (
    <div style={styles.wrap}>
      {/* タブ */}
      <div style={styles.row}>
        <button
          onClick={() =>
            setTab("all")
          }
          style={tabBtn(
            tab === "all",
            theme
          )}
        >
          新着
        </button>

        <button
          onClick={() =>
            setTab(
              "favorites"
            )
          }
          style={tabBtn(
            tab ===
              "favorites",
            theme
          )}
        >
          お気に入り
        </button>
      </div>

      {/* 検索 */}
      <div style={styles.row}>
        <input
          value={keyword}
          onChange={(e) =>
            setKeyword(
              e.target.value
            )
          }
          placeholder="検索"
          style={{
            ...styles.search,

            background:
              theme.colors.inputBg,

            color:
              theme.colors.inputText,
          }}
        />
      </div>

      {/* フィルタ */}
      <div style={styles.row}>
        <button
          onClick={() =>
            setFilter("all")
          }
          style={filterBtn(
            filter === "all",
            theme
          )}
        >
          全て
        </button>

        <button
          onClick={() =>
            setFilter(
              "convenience"
            )
          }
          style={filterBtn(
            filter ===
              "convenience",
            theme
          )}
        >
          コンビニ
        </button>

        <button
          onClick={() =>
            setFilter("cafe")
          }
          style={filterBtn(
            filter === "cafe",
            theme
          )}
        >
          カフェ
        </button>

        <button
          onClick={() =>
            setFilter("other")
          }
          style={filterBtn(
            filter ===
              "other",
            theme
          )}
        >
          その他
        </button>
      </div>

      {/* ユーティリティ */}
      <div style={styles.row}>
        <select
          value={range}
          onChange={(e) =>
            setRange(
              Number(
                e.target.value
              )
            )
          }
          style={{
            ...styles.select,

            background:
              theme.colors.inputBg,

            color:
              theme.colors.inputText,
          }}
        >
          <option value={3}>
            3日
          </option>

          <option value={7}>
            7日
          </option>

          <option value={14}>
            14日
          </option>

          <option value={30}>
            30日
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          style={{
            ...styles.select,

            background:
              theme.colors.inputBg,

            color:
              theme.colors.inputText,
          }}
        >
          <option value="new">
            新しい順
          </option>

          <option value="old">
            古い順
          </option>
        </select>
      </div>

      {/* 補助 */}
      <div style={styles.row}>
        <button
          onClick={() =>
            setShowUnreadOnly(
              !showUnreadOnly
            )
          }
          style={filterBtn(
            showUnreadOnly,
            theme
          )}
        >
          未読のみ
        </button>

        <button
          onClick={resetRead}
          style={{
            ...styles.resetBtn,

            background:
              theme.colors
                .readBadge,
          }}
        >
          既読リセット
        </button>
      </div>

      {/* 件数 */}
      <div style={styles.count}>
        {count}件ヒット
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    padding:
      "0 14px 12px",
  },

  row: {
    display: "flex",

    gap: 8,

    marginBottom: 8,
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
    flex: 1,

    border: "none",

    borderRadius: 10,

    padding: 8,

    fontSize: 12,

    outline: "none",
  },

  resetBtn: {
    flex: 1,

    border: "none",

    borderRadius: 10,

    color: "#fff",

    fontSize: 12,

    padding: 8,
  },

  count: {
    fontSize: 12,

    opacity: 0.8,

    paddingTop: 4,
  },
};

const tabBtn = (
  active,
  theme
) => ({
  flex: 1,

  border: "none",

  borderRadius: 10,

  padding: 10,

  fontSize: 12,

  color: "#fff",

  background: active
    ? theme.colors.primary
    : theme.colors.navInactive,
});

const filterBtn = (
  active,
  theme
) => ({
  flex: 1,

  border: "none",

  borderRadius: 10,

  padding: 8,

  fontSize: 12,

  color: "#fff",

  background: active
    ? theme.colors.primary
    : theme.colors.navInactive,
});
