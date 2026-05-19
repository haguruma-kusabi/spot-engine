import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NewsCard from "./components/NewsCard";
import { detectBrand } from "./lib/brand";

export default function HomePage({ theme }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState("all");

  const [range, setRange] = useState(7);
  const [keyword, setKeyword] = useState("");

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [readItems, setReadItems] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState({
    convenience: new Set(),
    cafe: new Set(),
  });

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/news?theme=${theme.id}`
      );
      const data = await res.json();

      const enriched = (data || []).map((item) => ({
        ...item,
        brand: detectBrand(item.title),
      }));

      setItems(enriched);
    } finally {
      setLoading(false);
    }
  }

  function toggleFav(item) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.link === item.link);
      return exists
        ? prev.filter((f) => f.link !== item.link)
        : [item, ...prev];
    });
  }

  function markAsRead(link) {
    setReadItems((prev) =>
      prev.includes(link) ? prev : [link, ...prev]
    );
  }

  function resetRead() {
    setReadItems([]);
  }

  const filteredItems = useMemo(() => {
    let list = [...items];

    // tab
    if (tab === "fav") list = favorites;

    // keyword
    if (keyword.trim()) {
      const k = keyword.toLowerCase();
      list = list.filter((i) =>
        i.title.toLowerCase().includes(k)
      );
    }

    // brand filter
    const hasFilter =
      selectedBrands.convenience.size > 0 ||
      selectedBrands.cafe.size > 0;

    if (hasFilter) {
      list = list.filter((item) => {
        const b = item.brand;
        if (!b) return false;

        if (
          b.group === "convenience" &&
          selectedBrands.convenience.has(b.name)
        )
          return true;

        if (
          b.group === "cafe" &&
          selectedBrands.cafe.has(b.name)
        )
          return true;

        return false;
      });
    }

    // range
    const now = new Date();
    list = list.filter((item) => {
      const diff =
        (now - new Date(item.date)) /
        (1000 * 60 * 60 * 24);
      return diff <= range;
    });

    // unread
    if (showUnreadOnly) {
      list = list.filter(
        (i) => !readItems.includes(i.link)
      );
    }

    // sort
    return list.sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    );
  }, [
    items,
    tab,
    keyword,
    range,
    showUnreadOnly,
    favorites,
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
      <Header
        theme={theme}
        filteredCount={filteredItems.length}
        todayCount={0}
        lastUpdated={new Date().toLocaleString()}
      />

      <FilterBar
        tab={tab}
        setTab={setTab}
        range={range}
        setRange={setRange}
        keyword={keyword}
        setKeyword={setKeyword}
        showUnreadOnly={showUnreadOnly}
        setShowUnreadOnly={setShowUnreadOnly}
        resetRead={resetRead}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />

      <div
        style={{
          padding: "12px 14px 120px",
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
    </div>
  );
}
