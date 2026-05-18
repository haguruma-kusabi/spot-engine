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

  const [range, setRange] =
    useState(7);

  const [showUnreadOnly, setShowUnreadOnly] =
    useState(false);

  const [favorites, setFavorites] =
    useState([]);

  const [readItems, setReadItems] =
    useState([]);

  const [keyword, setKeyword] =
    useState("");

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

    // キーワード検索
    if (keyword.trim()) {
      list = list.filter((item) =>
        item.title
          ?.toLowerCase()
          .includes(
            keyword.toLowerCase()
          )
      );
    }

    // フィルタ
    if (filter !== "all") {
      list = list.filter((item) => {
        const title =
          item.title || "";

        if (
          filter ===
          "convenience"
        ) {
          return (
            title.includes(
              "セブン"
            ) ||
            title.includes(
              "ファミマ"
            ) ||
            title.includes(
              "ファミリーマート"
            ) ||
            title.includes(
              "ローソン"
            ) ||
            title.includes(
              "LAWSON"
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
              "Starbucks"
            ) ||
            title.includes(
              "タリーズ"
            ) ||
            title.includes(
              "TULLY"
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
              "ファミリーマート"
            ) ||
            title.includes(
              "ローソン"
            ) ||
            title.includes(
              "LAWSON"
            ) ||
            title.includes(
              "スタバ"
            ) ||
            title.includes(
              "スターバックス"
            ) ||
            title.includes(
              "Starbucks"
            ) ||
            title.includes(
              "タリーズ"
            ) ||
            title.includes(
              "TULLY"
            ) ||
            title.includes(
              "ドトール"
            )
          );
        }

        return true;
      });
    }

    // 期間フィルター
    const now = new Date();

    list = list.filter((item) => {
      const diff =
        (now -
          new Date(item.date)) /
        (1000 * 60 * 60 * 24);

      return diff <= range;
    });

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
    range,
    showUnreadOnly,
    readItems,
    keyword,
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
      {/* ヘッダー */}
      <div
        style={{
          position: "sticky",

          top: 0,

          zIndex: 100,

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
          range={range}
          setRange={setRange}
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
          keyword={keyword}
          setKeyword={setKeyword}
          theme={theme}
        />
      </div>

      {/* 記事一覧 */}
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
              "12px 14px 140px",

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

      {/* 固定下部余白 */}
      <div
        style={{
          position: "fixed",

          bottom: 0,

          left: 0,

          width: "100%",

          height:
            "calc(90px + env(safe-area-inset-bottom))",

          background:
            theme.colors.background,

          borderTop:
            "1px solid rgba(255,255,255,0.04)",

          pointerEvents: "none",

          zIndex: 40,
        }}
      />
    </div>
  );
}
