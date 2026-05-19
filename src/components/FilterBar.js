// FilterBar.js

import {
  BRAND_DICTIONARY,
} from "../lib/brandDictionary";

import {
  useState,
} from "react";

export default function FilterBar({
  tab,
  setTab,

  range,
  setRange,

  keyword,
  setKeyword,

  showUnreadOnly,
  setShowUnreadOnly,

  resetRead,

  selectedBrands,
  setSelectedBrands,
}) {
  const [openConvenience, setOpenConvenience] =
    useState(false);

  const [openCafe, setOpenCafe] =
    useState(false);

  const convenienceBrands =
    BRAND_DICTIONARY.filter(
      (b) =>
        b.group ===
        "convenience"
    );

  const cafeBrands =
    BRAND_DICTIONARY.filter(
      (b) => b.group === "cafe"
    );

  function toggleBrand(
    group,
    name
  ) {
    setSelectedBrands((prev) => {
      const next = new Set(
        prev[group]
      );

      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }

      return {
        ...prev,
        [group]: next,
      };
    });
  }

  function toggleAll(group) {
    const list =
      group === "convenience"
        ? convenienceBrands
        : cafeBrands;

    const allSelected =
      list.every((b) =>
        selectedBrands[group].has(
          b.name
        )
      );

    setSelectedBrands((prev) => ({
      ...prev,

      [group]: allSelected
        ? new Set()
        : new Set(
            list.map(
              (b) => b.name
            )
          ),
    }));
  }

  return (
    <div style={styles.wrapper}>
      {/* 上段 */}
      <div style={styles.topRow}>
        <button
          onClick={() =>
            setTab("all")
          }
          style={tabBtn(
            tab === "all"
          )}
        >
          新着
        </button>

        <button
          onClick={() =>
            setTab("fav")
          }
          style={tabBtn(
            tab === "fav"
          )}
        >
          お気に入り
        </button>

        <button
          onClick={() =>
            setShowUnreadOnly(
              !showUnreadOnly
            )
          }
          style={tabBtn(
            showUnreadOnly
          )}
        >
          未読
        </button>

        <button
          onClick={resetRead}
          style={tabBtn(false)}
        >
          既読リセット
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
          style={styles.search}
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
          style={styles.select}
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

      {/* ブランド */}
      <div style={styles.brandRow}>
        {/* コンビニ */}
        <div style={styles.groupBox}>
          <button
            onClick={() =>
              setOpenConvenience(
                !openConvenience
              )
            }
            style={styles.groupBtn}
          >
            コンビニ ▼
          </button>

          <div
            style={{
              ...styles.dropdown,

              maxHeight:
                openConvenience
                  ? 220
                  : 0,

              opacity:
                openConvenience
                  ? 1
                  : 0,
            }}
          >
            <label
              style={styles.check}
            >
              <input
                type="checkbox"
                checked={convenienceBrands.every(
                  (b) =>
                    selectedBrands.convenience.has(
                      b.name
                    )
                )}
                onChange={() =>
                  toggleAll(
                    "convenience"
                  )
                }
              />

              すべて
            </label>

            {convenienceBrands.map(
              (brand) => (
                <label
                  key={brand.name}
                  style={
                    styles.check
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.convenience.has(
                      brand.name
                    )}
                    onChange={() =>
                      toggleBrand(
                        "convenience",
                        brand.name
                      )
                    }
                  />

                  {brand.label}
                </label>
              )
            )}
          </div>
        </div>

        {/* カフェ */}
        <div style={styles.groupBox}>
          <button
            onClick={() =>
              setOpenCafe(
                !openCafe
              )
            }
            style={styles.groupBtn}
          >
            カフェ ▼
          </button>

          <div
            style={{
              ...styles.dropdown,

              maxHeight:
                openCafe
                  ? 220
                  : 0,

              opacity:
                openCafe
                  ? 1
                  : 0,
            }}
          >
            <label
              style={styles.check}
            >
              <input
                type="checkbox"
                checked={cafeBrands.every(
                  (b) =>
                    selectedBrands.cafe.has(
                      b.name
                    )
                )}
                onChange={() =>
                  toggleAll("cafe")
                }
              />

              すべて
            </label>

            {cafeBrands.map(
              (brand) => (
                <label
                  key={brand.name}
                  style={
                    styles.check
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.cafe.has(
                      brand.name
                    )}
                    onChange={() =>
                      toggleBrand(
                        "cafe",
                        brand.name
                      )
                    }
                  />

                  {brand.label}
                </label>
              )
            )}
          </div>
        </div>
      </div>

      {/* その他 */}
      <div style={styles.otherRow}>
        <label
          style={styles.otherCheck}
        >
          <input
            type="checkbox"
            checked={
              selectedBrands.other
            }
            onChange={() =>
              setSelectedBrands(
                (prev) => ({
                  ...prev,
                  other:
                    !prev.other,
                })
              )
            }
          />

          その他
        </label>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "10px 12px",
  },

  topRow: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },

  searchRow: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
  },

  search: {
    flex: 1,
    borderRadius: 12,
    border: "none",
    padding:
      "10px 12px",
    fontSize: 14,
    outline: "none",
    background: "#1e1e1e",
    color: "#fff",
  },

  select: {
    borderRadius: 12,
    border: "none",
    padding:
      "10px 12px",
    background: "#1e1e1e",
    color: "#fff",
  },

  brandRow: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },

  groupBox: {
    flex: 1,
  },

  groupBtn: {
    width: "100%",
    border: "none",
    borderRadius: 12,
    padding:
      "10px 12px",
    background: "#2b2b2b",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  dropdown: {
    overflow: "hidden",
    transition:
      "all 0.25s ease",
    background: "#181818",
    borderRadius: 12,
    marginTop: 6,
    padding:
      "0 10px",
  },

  check: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding:
      "8px 0",
    color: "#fff",
    fontSize: 14,
  },

  otherRow: {
    marginTop: 8,
  },

  otherCheck: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#fff",
    fontSize: 14,
  },
};

const tabBtn = (active) => ({
  border: "none",
  borderRadius: 12,
  padding:
    "10px 12px",
  background: active
    ? "#4d7cff"
    : "#2b2b2b",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
});
