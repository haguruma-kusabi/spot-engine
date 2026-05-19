// HomePage.js

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NewsCard from "./components/NewsCard";
import SkeletonCard from "./components/SkeletonCard";

import { detectBrand } from "./lib/detectBrand";

export default function HomePage({
  theme,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] =
    useState(false);

  const [tab, setTab] =
    useState("all");

  const [range, setRange] =
    useState(7);

  const [keyword, setKeyword] =
    useState("");

  const [
    showUnreadOnly,
    setShowUnreadOnly,
  ] = useState(false);

  const [favorites, setFavorites] =
    useState([]);

  const [readItems, setReadItems] =
    useState([]);

  const [
    selectedBrands,
    setSelectedBrands,
  ] = useState({
    convenience: new Set(),
    cafe: new Set(),
    other: false,
  });

  // =========================
  // LocalStorage復元
  // =========================

  useEffect(() => {
    try {
      const savedFav =
        localStorage.getItem(
          "spot-favorites"
        );

      const savedRead =
        localStorage.getItem(
          "spot-readItems"
        );

      const savedRange =
        localStorage.getItem(
          "spot-range"
        );

      const savedKeyword =
        localStorage.getItem(
          "spot-keyword"
        );

      const savedUnread =
        localStorage.getItem(
          "spot-unreadOnly"
        );

      const savedBrands =
        localStorage.getItem(
          "spot-selectedBrands"
        );

      if (savedFav) {
        setFavorites(
          JSON.parse(savedFav)
        );
      }

      if (savedRead) {
        setReadItems(
          JSON.parse(savedRead)
        );
      }

      if (savedRange) {
        setRange(
          Number(savedRange)
        );
      }

      if (savedKeyword) {
        setKeyword(savedKeyword);
      }

      if (savedUnread) {
        setShowUnreadOnly(
          JSON.parse(savedUnread)
        );
      }

      if (savedBrands) {
        const parsed =
          JSON.parse(savedBrands);

        setSelectedBrands({
          convenience: new Set(
            parsed.convenience || []
          ),

          cafe: new Set(
            parsed.cafe || []
          ),

          other:
            parsed.other || false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  // =========================
  // LocalStorage保存
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "spot-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "spot-readItems",
      JSON.stringify(readItems)
    );
  }, [readItems]);

  useEffect(() => {
    localStorage.setItem(
      "spot-range",
      range
    );
  }, [range]);

  useEffect(() => {
    localStorage.setItem(
      "spot-keyword",
      keyword
    );
  }, [keyword]);

  useEffect(() => {
    localStorage.setItem(
      "spot-unreadOnly",
      JSON.stringify(
        showUnreadOnly
      )
    );
  }, [showUnreadOnly]);

  useEffect(() => {
    localStorage.setItem(
      "spot-selectedBrands",
      JSON.stringify({
        convenience: [
          ...selectedBrands.convenience,
        ],

        cafe: [
          ...selectedBrands.cafe,
        ],

        other:
          selectedBrands.other,
      })
    );
  }, [selectedBrands]);

  // =========================
  // ニュース取得
  // =========================

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/news?theme=${theme.id}`
      );

      const data =
        await res.json();

      const enriched = (
        data || []
      ).map((item) => ({
        ...item,
        brand: detectBrand(
          item.title
        ),
      }));

      setItems(enriched);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // お気に入り
  // =========================

  function toggleFav(item) {
    setFavorites((prev) => {
      const exists =
        prev.some(
          (f) =>
            f.link === item.link
        );

      return exists
        ? prev.filter(
            (f) =>
              f.link !== item.link
          )
        : [item, ...prev];
    });
  }

  // =========================
  // 既読
  // =========================

  function markAsRead(link) {
    setReadItems((prev) =>
      prev.includes(link)
        ? prev
        : [link, ...prev]
    );
  }

  function resetRead() {
    setReadItems([]);
  }

  // =========================
  // フィルター
  // =========================

  const filteredItems =
    useMemo(() => {
      let list = [...items];

      // タブ
      if (tab === "fav") {
        list = favorites;
      }

      // 検索
      if (keyword.trim()) {
        const k =
          keyword.toLowerCase();

        list = list.filter((i) =>
          (
            i.title || ""
          )
            .toLowerCase()
            .includes(k)
        );
      }

      // ブランド
      const hasFilter =
        selectedBrands
          .convenience.size > 0 ||
        selectedBrands.cafe.size >
          0 ||
        selectedBrands.other;

      if (hasFilter) {
        list = list.filter(
          (item) => {
            const b = item.brand;

            // その他
            if (
              selectedBrands.other &&
              (!b ||
                b.group ===
                  "other")
            ) {
              return true;
            }

            if (!b)
              return false;

            // コンビニ
            if (
              b.group ===
                "convenience" &&
              selectedBrands.convenience.has(
                b.name
              )
            ) {
              return true;
            }

            // カフェ
            if (
              b.group === "cafe" &&
              selectedBrands.cafe.has(
                b.name
              )
            ) {
              return true;
            }

            return false;
          }
        );
      }

      // 期間
      const now = new Date();

      list = list.filter(
        (item) => {
          const diff =
            (now -
              new Date(
                item.date
              )) /
            (1000 *
              60 *
              60 *
              24);

          return diff <= range;
        }
      );

      // 未読
      if (showUnreadOnly) {
        list = list.filter(
          (i) =>
            !readItems.includes(
              i.link
            )
        );
      }

      // ソート
      return list.sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );
    }, [
      items,
      favorites,
      tab,
      keyword,
      range,
      showUnreadOnly,
      readItems,
      selectedBrands,
    ]);

  // =========================
  // 今日件数
  // =========================

  const todayCount =
    items.filter((item) => {
      const d = new Date(
        item.date
      );

      const now = new Date();

      return (
        d.getFullYear() ===
          now.getFullYear() &&
        d.getMonth() ===
          now.getMonth() &&
        d.getDate() ===
          now.getDate()
      );
    }).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          theme.colors.background,
        color: "#fff",
      }}
    >
      {/* =========================
          Header
      ========================= */}

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background:
            theme.colors.stickyBg,
          backdropFilter:
            "blur(10px)",
        }}
      >
        <Header
          theme={theme}
          filteredCount={
            filteredItems.length
          }
          todayCount={todayCount}
          lastUpdated={new Date().toLocaleString(
            "ja-JP"
          )}
        />

        <FilterBar
          tab={tab}
          setTab={setTab}
          range={range}
          setRange={setRange}
          keyword={keyword}
          setKeyword={setKeyword}
          showUnreadOnly={
            showUnreadOnly
          }
          setShowUnreadOnly={
            setShowUnreadOnly
          }
          resetRead={resetRead}
          selectedBrands={
            selectedBrands
          }
          setSelectedBrands={
            setSelectedBrands
          }
        />
      </div>

      {/* =========================
          News Grid
      ========================= */}

      <div
        style={{
          padding:
            "12px 14px 120px",

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fill,minmax(220px,1fr))",

          gap: 16,
        }}
      >
        {loading
          ? Array.from({
              length: 8,
            }).map((_, i) => (
              <SkeletonCard
                key={i}
              />
            ))
          : filteredItems.map(
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

      {/* =========================
          下余白
      ========================= */}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 80,
          pointerEvents: "none",
          background:
            theme.colors.background,
        }}
      />
    </div>
  );
}
