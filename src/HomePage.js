import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NewsCard from "./components/NewsCard";

export default function HomePage({
  theme,
}) {
  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [tab, setTab] =
    useState("all");

  const [filter, setFilter] =
    useState("all");

  const [sort, setSort] =
    useState("new");

  const [showUnreadOnly, setShowUnreadOnly] =
    useState(false);

  const [favorites, setFavorites] =
    useState([]);

  const [readItems, setReadItems] =
    useState([]);

  // 初回ロード
  useEffect(() => {
    fetchNews();
  }, []);

  // お気に入り復元
  useEffect(() => {
    const saved =
      localStorage.getItem(
        `${theme.id}-favorites`
      );

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, [theme.id]);

  // 既読復元
  useEffect(() => {
    const saved =
      localStorage.getItem(
        `${theme.id}-read`
      );

    if (saved) {
      setReadItems(JSON.parse(saved));
    }
  }, [theme.id]);

  // お気に入り保存
  useEffect(() => {
    localStorage.setItem(
      `${theme.id}-favorites`,
      JSON.stringify(favorites)
    );
  }, [favorites, theme.id]);

  // 既読保存
  useEffect(() => {
    localStorage.setItem(
      `${theme.id}-read`,
      JSON.stringify(readItems)
    );
  }, [readItems, theme.id]);

  async function fetchNews() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/news?theme=${theme.id}`
      );

      const data = await res.json();

      setItems(data || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function toggleFav(item) {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.link === item.link
      );

      if (exists) {
        return prev.filter(
          (f) => f.link !== item.link
        );
      }

      return [item, ...prev];
    });
  }

  function markAsRead(link) {
    setReadItems((prev) => {
      if (prev.includes(link)) {
        return prev;
      }

      return [link, ...prev];
    });
  }

  function resetRead() {
    setReadItems([]);
  }

  const filteredItems = useMemo(() => {
    let list = [...items];

    // タブ
    if (tab === "favorites") {
      list = favorites;
    }

    // フィルタ
    if (filter !== "all") {
      list = list.filter((item) => {
        const title =
          item.title || "";

        if (filter === "convenience") {
          return (
            title.includes(
              "セブン"
            ) ||
            title.includes(
              "ファミマ"
            ) ||
            title.includes(
              "ローソン"
            )
          );
        }

        if (filter === "cafe") {
          return (
            title.includes(
              "スタバ"
            ) ||
            title.includes(
              "スターバックス"
            ) ||
            title.includes(
              "タリーズ"
            ) ||
            title.includes(
              "ドトール"
            )
          );
        }

        if (filter === "other") {
          return !(
            title.includes(
              "セブン"
            ) ||
            title.includes(
              "ファミマ"
            ) ||
            title.includes(
              "ローソン"
            ) ||
            title.includes(
              "スタバ"
            ) ||
            title.includes(
              "スターバックス"
            ) ||
            title.includes(
              "タリーズ"
            ) ||
            title.includes(
              "ドトール"
            )
          );
        }

        return true;
      });
    }

    // 未読のみ
    if (showUnreadOnly) {
      list = list.filter(
        (item) =>
          !readItems.includes(
            item.link
          )
      );
    }

    // ソート
    list.sort((a, b) => {
      if (sort === "old") {
        return (
          new Date(a.date) -
          new Date(b.date)
        );
      }

      return (
        new Date(b.date) -
        new Date(a.date)
      );
    });

    return list;
  }, [
    items,
    favorites,
    tab,
    filter,
    sort,
    showUnreadOnly,
    readItems,
  ]);

  return (
    <div
      style={{
        minHeight: "100vh",

        background:
          theme.colors.background,

        color: "#fff",
      }}
    >
      {/* 固定ヘッダー */}
      <div
        style={{
          position: "sticky",

          top: 0,

          zIndex: 100,

          backdropFilter:
            "blur(10px)",

          background:
            theme.colors.stickyBg,
        }}
      >
        <Header theme={theme} />

        <FilterBar
          tab={tab}
          setTab={setTab}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          showUnreadOnly={
            showUnreadOnly
          }
          setShowUnreadOnly={
            setShowUnreadOnly
          }
          resetRead={resetRead}
          count={
            filteredItems.length
          }
          theme={theme}
        />
      </div>

      {/* スクロール余白固定 */}
      <div
        style={{
          height: 12,
          background:
            theme.colors.background,
          position: "sticky",
          top: 148,
          zIndex: 90,
        }}
      />

      {/* ローディング */}
      {loading ? (
        <div
          style={{
            padding: 24,
          }}
        >
          読み込み中...
        </div>
      ) : (
        <div
          style={{
            padding:
              "0 14px 40px",

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fill,minmax(220px,1fr))",

            gap: 16,
          }}
        >
          {filteredItems.map(
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
                index={i}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
