import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NewsCard from "./components/NewsCard";
import { detectBrand } from "./lib/brand";

export default function HomePage({ theme }) {
  const [items, setItems] = useState([]);

  const [tab, setTab] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [range, setRange] = useState(7);

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [readItems, setReadItems] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState({
    convenience: new Set(),
    cafe: new Set(),
    other: false,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const res = await fetch(`/api/news?theme=${theme.id}`);
    const data = await res.json();

    setItems(
      (data || []).map((item) => ({
        ...item,
        brand: detectBrand(item.title),
      }))
    );
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

    if (tab === "fav") list = favorites;

    if (keyword.trim()) {
      const k = keyword.toLowerCase();
      list = list.filter((i) =>
        (i.title || "").toLowerCase().includes(k)
      );
    }

    const hasFilter =
      selectedBrands.convenience.size > 0 ||
      selectedBrands.cafe.size > 0 ||
      selectedBrands.other;

    if (hasFilter) {
      list = list.filter((item) => {
        const b = item.brand;
        if (!b && selectedBrands.other) return true;
        if (!b) return false;

        if (selectedBrands.other) {
          if (
            b.group !== "convenience" &&
            b.group !== "cafe"
          ) return true;
        }

        return (
          (b.group === "convenience" &&
            selectedBrands.convenience.has(b.name)) ||
          (b.group === "cafe" &&
            selectedBrands.cafe.has(b.name))
        );
      });
    }

    const now = new Date();

    list = list.filter((item) => {
      const diff =
        (now - new Date(item.date)) /
        (1000 * 60 * 60 * 24);

      return diff <= range;
    });

    if (showUnreadOnly) {
      list = list.filter(
        (i) => !readItems.includes(i.link)
      );
    }

    return list.sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
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

  const todayCount = useMemo(() => {
    const now = new Date();
    return items.filter((item) => {
      const diff =
        (now - new Date(item.date)) /
        (1000 * 60 * 60 * 24);
      return diff <= 1;
    }).length;
  }, [items]);

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.colors.background,
      color: "#fff",
    }}>
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: theme.colors.stickyBg,
      }}>
        <Header
          theme={theme}
          filteredCount={filteredItems.length}
          todayCount={todayCount}
          lastUpdated={
            items[0]?.date
              ? new Date(items[0].date).toLocaleString("ja-JP")
              : "-"
          }
        />

        <FilterBar
          tab={tab}
          setTab={setTab}
          keyword={keyword}
          setKeyword={setKeyword}
          range={range}
          setRange={setRange}
          showUnreadOnly={showUnreadOnly}
          setShowUnreadOnly={setShowUnreadOnly}
          resetRead={resetRead}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          theme={theme}
        />
      </div>

      <div style={{
        padding: "12px 14px 120px",
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill,minmax(220px,1fr))",
        gap: 16,
      }}>
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

      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 80,
        background: theme.colors.background,
        pointerEvents: "none",
      }} />
    </div>
  );
}
