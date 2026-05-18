import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NewsCard from "./components/NewsCard";

import { detectBrand } from "./lib/brand";

export default function HomePage({ theme }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("all");
  const [range, setRange] = useState(7);

  const [keyword, setKeyword] = useState("");

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [readItems, setReadItems] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState({
    convenience: [],
    cafe: [],
  });

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const savedFav = localStorage.getItem(
      `${theme.id}-favorites`
    );
    if (savedFav) setFavorites(JSON.parse(savedFav));
  }, [theme.id]);

  useEffect(() => {
    const savedRead = localStorage.getItem(
      `${theme.id}-read`
    );
    if (savedRead) setReadItems(JSON.parse(savedRead));
  }, [theme.id]);

  useEffect(() => {
    localStorage.setItem(
      `${theme.id}-favorites`,
      JSON.stringify(favorites)
    );
  }, [favorites, theme.id]);

  useEffect(() => {
    localStorage.setItem(
      `${theme.id}-read`,
      JSON.stringify(readItems)
    );
  }, [readItems, theme.id]);

  async function fetchNews() {
    try {
      setLoading(true);
      const res = await fetch(`/api/news?theme=${theme.id}`);
      const data = await res.json();

      const enriched = (data || []).map((item) => ({
        ...item,
        brand: detectBrand(item.title),
      }));

      setItems(enriched);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function toggleFav(item) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.link === item.link);
      if (exists) return prev.filter((f) => f.link !== item.link);
      return [item, ...prev];
    });
  }

  function markAsRead(link) {
    setReadItems((prev) => {
      if (prev.includes(link)) return prev;
      return [link, ...prev];
    });
  }

  function resetRead() {
    setReadItems([]);
  }

  const filteredItems = useMemo(() => {
    let list = [...items];

    // tab
    if (tab === "favorites") {
      list = favorites;
    }

    // keyword
    if (keyword.trim()) {
      list = list.filter((item) =>
        item.title?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // brand filter（OR）
    const hasBrandFilter =
      selectedBrands.convenience.length > 0 ||
      selectedBrands.cafe.length > 0;

    if (hasBrandFilter) {
      list = list.filter((item) => {
        const brand = item.brand;

        const matchConvenience =
          selectedBrands.convenience.length === 0 ||
          selectedBrands.convenience.includes(brand.name);

        const matchCafe =
          selectedBrands.cafe.length === 0 ||
          selectedBrands.cafe.includes(brand.name);

        return matchConvenience || matchCafe;
      });
    }

    // range filter
    const now = new Date();

    list = list.filter((item) => {
      const diff =
        (now - new Date(item.date)) /
        (1000 * 60 * 60 * 24);

      return diff <= range;
    });

    // unread filter
    if (showUnreadOnly) {
      list = list.filter(
        (item) => !readItems.includes(item.link)
      );
    }

    // sort
    list.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return list;
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.colors.background,
        color: "#fff",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: theme.colors.stickyBg,
        }}
      >
        <Header theme={theme} />

        <FilterBar
          tab={tab}
          setTab={setTab}
          range={range}
          setRange={setRange}
          showUnreadOnly={showUnreadOnly}
          setShowUnreadOnly={setShowUnreadOnly}
          resetRead={resetRead}
          count={filteredItems.length}
          keyword={keyword}
          setKeyword={setKeyword}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          theme={theme}
        />
      </div>

      {loading ? (
        <div style={{ padding: 24 }}>読み込み中...</div>
      ) : (
        <div
          style={{
            padding: "12px 14px 140px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(220px,1fr))",
            gap: 16,
          }}
        >
          {filteredItems.map((item, i) => (
            <NewsCard
              key={item.link || i}
              item={item}
              favorites={favorites}
              readItems={readItems}
              toggleFav={toggleFav}
              markAsRead={markAsRead}
              theme={theme}
              index={i}
            />
          ))}
        </div>
      )}

      {/* 下部固定余白 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "90px",
          background: theme.colors.background,
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
    </div>
  );
}
