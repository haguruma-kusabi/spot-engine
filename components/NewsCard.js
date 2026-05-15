// components/NewsCard.js

import {
  getBrand,
  getBrandColor,
} from "../lib/brand";

/* =========================
   ■ 絵文字
========================= */
const getEmoji = (text = "") => {
  if (/アイス/.test(text)) return "🍨";

  if (/ラテ|ドリンク/.test(text))
    return "🍵";

  if (/ケーキ|スイーツ/.test(text))
    return "🍡";

  if (/抹茶/.test(text)) return "🍵";

  if (/チョコミント/.test(text))
    return "🍫";

  return "🌿";
};

export default function NewsCard({
  item,
  favorites,
  readItems,
  toggleFav,
  markAsRead,
  theme,
}) {
  const brand = getBrand(item);

  const isFav = favorites.some(
    (f) => f.link === item.link
  );

  const isRead =
    readItems.includes(item.link);

  const isNew =
    (new Date() -
      new Date(item.date)) /
      (1000 * 60 * 60 * 24) <=
    3;

  return (
    <div
      style={styles.card(
        isRead,
        theme
      )}
    >
      {/* NEW */}
      {isNew && (
        <div
          style={styles.newBadge(
            theme
          )}
        >
          NEW
        </div>
      )}

      {/* 既読 */}
      {isRead && (
        <div
          style={styles.readBadge(
            theme
          )}
        >
          既読
        </div>
      )}

      {/* ブランド */}
      <div
        style={{
          ...styles.brandBadge,
          background:
            getBrandColor(brand),
        }}
      >
        {brand}
      </div>

      {/* 画像 */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          markAsRead(item.link)
        }
        style={{
          textDecoration: "none",
        }}
      >
        <div style={styles.emojiBox}>
          {getEmoji(item.title)}
        </div>
      </a>

      {/* タイトル */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          markAsRead(item.link)
        }
        style={styles.titleLink}
      >
        <div
          style={styles.titleText(
            theme
          )}
        >
          {item.title}
        </div>
      </a>

      {/* 下部 */}
      <div style={styles.bottomRow}>
        <div
          style={styles.dateText(
            theme
          )}
        >
          {new Date(
            item.date
          ).toLocaleDateString()}
        </div>

        <button
          onClick={() => toggleFav(item)}
          style={styles.favBtn}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: (isRead, theme) => ({
    background:
      theme.colors.card,

    color:
      theme.colors.cardText,

    borderRadius: 18,

    padding: 12,

    position: "relative",

    boxShadow: theme.shadow,

    opacity: isRead ? 0.65 : 1,
  }),

  newBadge: (theme) => ({
    position: "absolute",

    top: 8,

    left: 8,

    background:
      theme.colors.badge,

    color:
      theme.colors.badgeText,

    fontSize: 12,

    fontWeight: "bold",

    padding: "5px 9px",

    borderRadius: 9,

    zIndex: 2,
  }),

  readBadge: (theme) => ({
    position: "absolute",

    top: 44,

    left: 8,

    background:
      theme.colors.readBadge,

    color: "#fff",

    fontSize: 11,

    fontWeight: "bold",

    padding: "4px 9px",

    borderRadius: 8,

    zIndex: 2,
  }),

  brandBadge: {
    position: "absolute",

    top: 10,

    right: 10,

    color: "#fff",

    fontSize: 10,

    padding: "4px 8px",

    borderRadius: 8,

    zIndex: 2,
  },

  emojiBox: {
    height: 105,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: 38,

    background: "#eef6f1",

    borderRadius: 12,

    marginBottom: 10,
  },

  titleLink: {
    textDecoration: "none",
  },

  titleText: (theme) => ({
    color:
      theme.colors.cardText,

    fontSize: 14,

    fontWeight: "bold",

    lineHeight: 1.55,

    marginBottom: 10,
  }),

  bottomRow: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginTop: 2,
  },

  dateText: (theme) => ({
    fontSize: 11,

    color:
      theme.colors.mutedText,
  }),

  favBtn: {
    border: "none",

    background: "transparent",

    fontSize: 20,

    cursor: "pointer",

    padding: 0,

    lineHeight: 1,
  },
};
