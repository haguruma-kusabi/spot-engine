import { useEffect, useMemo, useState } from "react";

import NewsCard from "../components/NewsCard";

import { GROUPS, getBrand } from "../lib/brand";

export default function HomePage({
  theme,
}) {
  const [items, setItems] = useState([]);

  const [favorites, setFavorites] =
    useState([]);

  const [readItems, setReadItems] =
    useState([]);

  const [keyword, setKeyword] =
    useState("");

  const [activeGroups, setActiveGroups] =
    useState([]);

  const [range, setRange] = useState(14);

  const [tab, setTab] = useState("all");

  const [loading, setLoading] =
    useState(true);

  const [unreadOnly, setUnreadOnly] =
    useState(false);

  const [lastUpdated, setLastUpdated] =
    useState("");

  /* =========================
     ■ 初期化
  ========================= */
  useEffect(() => {
    fetchData();

    const savedFav =
      localStorage.getItem(
        `${theme.id}-fav`
      );

    if (savedFav) {
      setFavorites(JSON.parse(savedFav));
    }

    const savedRead =
      localStorage.getItem(
        `${theme.id}-read`
      );

    if (savedRead) {
      setReadItems(JSON.parse(savedRead));
    }
  }, [theme.id]);

  /* =========================
     ■ データ取得
  ========================= */
  const fetchData = async () => {
    try {
      const res = await fetch(
        `/api/news?theme=${theme.id}`
      );

      const data = await res.json();

      setItems(data);

      const now = new Date();

      setLastUpdated(
        now.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ■ お気に入り
  ========================= */
  const toggleFav = (item) => {
    const exists = favorites.some(
      (f) => f.link === item.link
    );

    const updated = exists
      ? favorites.filter(
          (f) => f.link !== item.link
        )
      : [...favorites, item];

    setFavorites(updated);

    localStorage.setItem(
      `${theme.id}-fav`,
      JSON.stringify(updated)
    );
  };

  /* =========================
     ■ 既読
  ========================= */
  const markAsRead = (link) => {
    if (readItems.includes(link))
      return;

    const updated = [...readItems, link];

    setReadItems(updated);

    localStorage.setItem(
      `${theme.id}-read`,
      JSON.stringify(updated)
    );
  };

  /* =========================
     ■ 既読リセット
  ========================= */
  const clearRead = () => {
    localStorage.removeItem(
      `${theme.id}-read`
    );

    setReadItems([]);
  };

  /* =========================
     ■ グループ切替
  ========================= */
  const toggleGroup = (g) => {
    setActiveGroups((prev) =>
      prev.includes(g)
        ? prev.filter((x) => x !== g)
        : [...prev, g]
    );
  };

  /* =========================
     ■ フィルタ
  ========================= */
  const baseList =
    tab === "fav" ? favorites : items;

  const filtered = useMemo(() => {
    return baseList.filter((item) => {
      const text = (
        item.title +
        item.link
      ).toLowerCase();

      if (
        keyword &&
        !text.includes(keyword.toLowerCase())
      ) {
        return false;
      }

      const brand = getBrand(item);

      if (activeGroups.length > 0) {
        const ok = activeGroups.some((g) =>
          GROUPS[g].includes(brand)
        );

        if (!ok) return false;
      }

      const diff =
        (new Date() -
          new Date(item.date)) /
        (1000 * 60 * 60 * 24);

      if (diff > range) return false;

      if (
        unreadOnly &&
        readItems.includes(item.link)
      ) {
        return false;
      }

      return true;
    });
  }, [
    baseList,
    keyword,
    activeGroups,
    range,
    unreadOnly,
    readItems,
  ]);

  const todayCount = items.filter((item) => {
    const diff =
      (new Date() -
        new Date(item.date)) /
      (1000 * 60 * 60 * 24);

    return diff <= 1;
  }).length;

  return (
    <div
      style={{
        ...styles.page,
        background:
          theme.background,
      }}
    >
      {/* 固定ヘッダー */}
      <div style={styles.sticky}>
        <h1 style={styles.title}>
          {theme.title}
        </h1>

        {/* タブ */}
        <div style={styles.tabRow}>
          <button
            onClick={() =>
              setTab("all")
            }
            style={tabBtn(
              tab === "all",
              theme.primary
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
              theme.primary
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
            style={styles.search}
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
            style={styles.select}
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
                  theme.primary
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
              theme.primary
            )}
          >
            未読のみ
          </button>

          <button
            onClick={clearRead}
            style={styles.resetBtn}
          >
            既読リセット
          </button>
        </div>

        {/* 情報 */}
        {!loading && (
          <>
            <div style={styles.infoRow}>
              <span>
                {filtered.length}
                件ヒット
              </span>

              <span>
                今日 {todayCount}件
              </span>
            </div>

            <div
              style={
                styles.updateText
              }
            >
              最終更新{" "}
              {lastUpdated}
            </div>
          </>
        )}
      </div>

      {/* コンテンツ */}
      <div style={styles.contentArea}>
        {/* ローディング */}
        {loading && (
          <>
            <div
              style={
                styles.loadingText
              }
            >
              読み込み中...
            </div>

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={
                  styles.skeleton
                }
              />
            ))}
          </>
        )}

        {/* 空状態 */}
        {!loading &&
          filtered.length === 0 && (
            <div
              style={styles.emptyBox}
            >
              条件に一致する記事がありません
            </div>
          )}

        {/* カード */}
        <div style={styles.grid}>
          {!loading &&
            filtered.map(
              (item, i) => (
                <NewsCard
                  key={
                    item.link || i
                  }
                  item={item}
                  favorites={
                    favorites
                  }
                  readItems={
                    readItems
                  }
                  toggleFav={
                    toggleFav
                  }
                  markAsRead={
                    markAsRead
                  }
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",

    overflow: "hidden",

    display: "flex",

    flexDirection: "column",

    padding: "0 16px",

    maxWidth: 520,

    margin: "0 auto",

    color: "#fff",
  },

  sticky: {
    position: "sticky",

    top: 0,

    zIndex: 100,

    paddingTop: 12,

    paddingBottom: 14,

    backdropFilter:
      "blur(10px)",

    background:
      "rgba(0,0,0,0.28)",

    flexShrink: 0,
  },

  contentArea: {
    flex: 1,

    overflow: "hidden",

    paddingBottom: 140,
  },

  grid: {
    display: "grid",

    gap: 18,

    overflowY: "auto",

    height: "100%",

    scrollbarWidth: "none",

    msOverflowStyle: "none",
  },

  title: {
    textAlign: "center",

    fontSize: 22,

    marginBottom: 14,

    fontWeight: "bold",
  },

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
  },

  select: {
    flex: 1,

    borderRadius: 10,

    border: "none",

    fontSize: 12,
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

  infoRow: {
    display: "flex",

    justifyContent:
      "space-between",

    fontSize: 12,

    color: "#d7e0e5",

    marginBottom: 4,
  },

  updateText: {
    fontSize: 11,

    color: "#cfe7d3",

    marginBottom: 6,
  },

  loadingText: {
    textAlign: "center",

    fontSize: 12,

    marginTop: 24,

    marginBottom: 14,
  },

  resetBtn: {
    flex: 1,

    border: "none",

    borderRadius: 10,

    background: "#57606f",

    color: "#fff",

    padding: 8,

    fontSize: 12,
  },

  emptyBox: {
    textAlign: "center",

    padding: 24,

    fontSize: 13,

    color: "#d7e0e5",
  },

  skeleton: {
    height: 170,

    borderRadius: 18,

    background:
      "#ffffff22",

    marginBottom: 10,
  },
};

const tabBtn = (
  active,
  primary
) => ({
  flex: 1,

  padding: 9,

  borderRadius: 10,

  border: "none",

  color: "#fff",

  fontSize: 12,

  background: active
    ? primary
    : "#2a2f36",
});

const filterBtn = (
  active,
  primary
) => ({
  flex: 1,

  padding: 8,

  borderRadius: 10,

  border: "none",

  color: "#fff",

  fontSize: 12,

  background: active
    ? primary
    : "#2a2f36",
});

const utilityBtn = (
  active,
  primary
) => ({
  flex: 1,

  padding: 8,

  borderRadius: 10,

  border: "none",

  color: "#fff",

  fontSize: 12,

  background: active
    ? primary
    : "#2a2f36",
});
