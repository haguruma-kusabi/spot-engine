// src/HomePage.js

import { useEffect, useMemo, useState } from "react";

import Layout from "./components/Layout";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NewsCard from "./components/NewsCard";

import {
  GROUPS,
  getBrand,
} from "./lib/brand";

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

  /* 今日件数 */
  const todayCount = items.filter((item) => {
    const diff =
      (new Date() -
        new Date(item.date)) /
      (1000 * 60 * 60 * 24);

    return diff <= 1;
  }).length;

  return (
    <Layout
      theme={theme}
      header={
        <>
          <Header
            theme={theme}
            filteredCount={
              filtered.length
            }
            todayCount={todayCount}
            lastUpdated={
              lastUpdated
            }
          />

          <FilterBar
            theme={theme}
            tab={tab}
            setTab={setTab}
            favorites={favorites}
            keyword={keyword}
            setKeyword={
              setKeyword
            }
            range={range}
            setRange={setRange}
            activeGroups={
              activeGroups
            }
            toggleGroup={
              toggleGroup
            }
            unreadOnly={
              unreadOnly
            }
            setUnreadOnly={
              setUnreadOnly
            }
            clearRead={clearRead}
          />
        </>
      }
    >
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
          filtered.map((item, i) => (
            <NewsCard
              key={item.link || i}
              item={item}
              favorites={favorites}
              readItems={readItems}
              toggleFav={
                toggleFav
              }
              markAsRead={
                markAsRead
              }
              theme={theme}
            />
          ))}
      </div>
    </Layout>
  );
}

const styles = {
  grid: {
    display: "grid",

    gap: 18,

    overflowY: "auto",

    height: "100%",

    scrollbarWidth: "none",

    msOverflowStyle: "none",
  },

  loadingText: {
    textAlign: "center",

    fontSize: 12,

    marginTop: 24,

    marginBottom: 14,
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
