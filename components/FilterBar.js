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
    <>
      {/* タブ */}
      <div style={styles.tabRow}>
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
            setTab("fav")
          }
          style={tabBtn(
            tab === "fav",
            theme
          )}
        >
          お気に入り(
          {favorites.length})
        </button>
      </div>

      {/* 検索 */}
      <div style={styles.searchRow}>
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
      </div>

      {/* フィルタ */}
      <div style={styles.filterRow}>
        {Object.keys(GROUPS).map(
          (g) => (
            <button
              key={g}
              onClick={() =>
                toggleGroup(g)
              }
              style={filterBtn(
                activeGroups.includes(
                  g
                ),
                theme
              )}
            >
              {g}
            </button>
          )
        )}
      </div>

      {/* ユーティリティ */}
      <div style={styles.utilityRow}>
        <button
          onClick={() =>
            setUnreadOnly(
              !unreadOnly
            )
          }
          style={utilityBtn(
            unreadOnly,
            theme
          )}
        >
          未読のみ
        </button>

        <button
          onClick={clearRead}
          style={{
            ...styles.resetBtn,
            background:
              theme.colors.readBadge,
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
    display: "flex",

    gap: 6,

    marginBottom: 10,
  },

  search: {
    flex: 2,

    padding: 9,

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

  filterRow: {
    display: "flex",

    gap: 6,

    marginBottom: 10,
  },

  utilityRow: {
    display: "flex",

    gap: 6,

    marginBottom: 10,
  },

  resetBtn: {
    flex: 1,

    border: "none",

    borderRadius: 10,

    color: "#fff",

    padding: 8,

    fontSize: 12,
  },
};

const tabBtn = (
  active,
  theme
) => ({
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

const filterBtn = (
  active,
  theme
) => ({
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

const utilityBtn = (
  active,
  theme
) => ({
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
