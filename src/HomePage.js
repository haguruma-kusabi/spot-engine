// src/HomePage.js

import { useEffect, useMemo, useState } from "react";

import NewsCard from "../components/NewsCard";
import SeriesNav from "../components/SeriesNav";

import {
  GROUPS,
  getBrand,
} from "../lib/brand";

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
      setLoading(true);

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
    } catch (e) {
      console.log(e);
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

      /* 検索 */
      if (
        keyword &&
        !text.includes(keyword.toLowerCase())
      ) {
        return false;
      }

      /* ブランド */
      const brand = getBrand(item);

      if (activeGroups.length > 0) {
        const ok = activeGroups.some((g) =>
          GROUPS[g].includes(brand)
        );

        if (!ok) return false;
      }

      /* 日付 */
      const diff =
        (new Date() -
          new Date(item.date)) /
        (1000 * 60 * 60 * 24);

      if (diff > range) return false;

      /* 未読 */
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

  /* 今日件数 */
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
          theme.colors.background,
      }}
    >
      {/* 固定ヘッダー */}
      <div
        style={{
          ...styles.sticky,
          background:
            theme.colors.stickyBg,
        }}
      >
        {/* シリーズナビ */}
        <SeriesNav
          currentTheme={theme.id}
          primary={theme.colors.primary}
        />

        {/* タイトル */}
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
                style={{
                  ...styles.skeleton,
                  background:
                    theme.colors
                      .skeleton,
                }}
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
                  theme={theme}
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

    marginBottom: 10,
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
