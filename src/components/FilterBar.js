import { BRAND_MAP } from "../lib/brand";

export default function FilterBar({
  tab,
  setTab,
  keyword,
  setKeyword,
  range,
  setRange,
  selectedBrands,
  setSelectedBrands,
  showUnreadOnly,
  setShowUnreadOnly,
  resetRead,
}) {
  function toggle(group, value) {
    setSelectedBrands((prev) => {
      const next = { ...prev };
      const set = new Set(next[group]);

      set.has(value) ? set.delete(value) : set.add(value);

      next[group] = set;
      return next;
    });
  }

  return (
    <div style={{ padding: "6px 12px" }}>
      {/* 上段 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <button onClick={() => setTab("all")}>新着</button>
        <button onClick={() => setTab("fav")}>❤️</button>
        <button onClick={() => setShowUnreadOnly(!showUnreadOnly)}>
          未読
        </button>
        <button onClick={resetRead}>初期化</button>
      </div>

      {/* 検索 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索"
        />

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        >
          <option value={3}>3日</option>
          <option value={7}>7日</option>
          <option value={14}>14日</option>
          <option value={30}>30日</option>
        </select>
      </div>

      {/* チェックボックス（色なし） */}
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <div>コンビニ</div>
          {BRAND_MAP.convenience.map((b) => (
            <label key={b.value} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedBrands.convenience.has(b.value)}
                onChange={() => toggle("convenience", b.value)}
              />
              {b.label}
            </label>
          ))}
        </div>

        <div>
          <div>カフェ</div>
          {BRAND_MAP.cafe.map((b) => (
            <label key={b.value} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedBrands.cafe.has(b.value)}
                onChange={() => toggle("cafe", b.value)}
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
