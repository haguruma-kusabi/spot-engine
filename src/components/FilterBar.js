export default function FilterBar({
  tab,
  setTab,
  range,
  setRange,
  keyword,
  setKeyword,
  selectedBrands,
  setSelectedBrands,
  showUnreadOnly,
  setShowUnreadOnly,
  resetRead,
  theme,
}) {
  function toggle(group, value) {
    setSelectedBrands((prev) => {
      const next = { ...prev };
      const set = new Set(next[group]);

      if (set.has(value)) set.delete(value);
      else set.add(value);

      next[group] = set;
      return next;
    });
  }

  return (
    <div style={{ padding: "0 14px 12px" }}>
      {/* tab */}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setTab("all")}>新着</button>
        <button onClick={() => setTab("favorites")}>
          お気に入り
        </button>
      </div>

      {/* search */}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="検索"
        style={{ width: "100%", marginTop: 8 }}
      />

      {/* brand */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
        <div>
          <div>コンビニ</div>
          {["セブン", "ファミマ", "ローソン"].map((b) => (
            <label key={b}>
              <input
                type="checkbox"
                checked={selectedBrands.convenience.has(b)}
                onChange={() => toggle("convenience", b)}
              />
              {b}
            </label>
          ))}
        </div>

        <div>
          <div>カフェ</div>
          {["スタバ", "タリーズ", "ドトール"].map((b) => (
            <label key={b}>
              <input
                type="checkbox"
                checked={selectedBrands.cafe.has(b)}
                onChange={() => toggle("cafe", b)}
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {/* other */}
      <label>
        <input
          type="checkbox"
          checked={selectedBrands.other}
          onChange={() =>
            setSelectedBrands((p) => ({
              ...p,
              other: !p.other,
            }))
          }
        />
        その他
      </label>

      {/* range */}
      <select
        value={range}
        onChange={(e) => setRange(Number(e.target.value))}
      >
        <option value={3}>3日</option>
        <option value={7}>7日</option>
        <option value={14}>14日</option>
        <option value={30}>30日</option>
      </select>

      {/* unread */}
      <button onClick={() => setShowUnreadOnly((v) => !v)}>
        未読切替
      </button>

      <button onClick={resetRead}>既読リセット</button>
    </div>
  );
}
