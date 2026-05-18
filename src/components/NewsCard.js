import { useState } from "react";
import { Heart } from "lucide-react";

export default function NewsCard({
  item,
  favorites,
  readItems,
  toggleFav,
  markAsRead,
  theme,
  index = 0,
}) {
  const [hover, setHover] = useState(false);

  const brand = item.brand;

  const isFav = favorites.some(
    (f) => f.link === item.link
  );

  const isRead = readItems.includes(item.link);

  const isNew = (() => {
    const diff =
      (new Date() - new Date(item.date)) /
      (1000 * 60 * 60 * 24);

    return diff <= 3;
  })();

  const emojis = theme.emojiSet || ["📰"];
  const emoji = emojis[index % emojis.length];

  // ★既読の見た目制御
  const readStyle = isRead
    ? {
        opacity: 0.55,
        filter: "grayscale(0.6)",
      }
    : {};

  // ★ホバー演出
  const hoverStyle = hover
    ? {
        transform: "translateY(-4px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
      }
    : {};

  return (
    <div
      style={{
        ...styles.card,
        ...hoverStyle,
        ...readStyle,
        background: theme.colors.cardBg,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* NEW / 既読（左上） */}
      {!isRead && isNew && (
        <div
          style={{
            ...styles.status,
            background: theme.colors.primary,
          }}
        >
          NEW
        </div>
      )}

      {isRead && (
        <div
          style={{
            ...styles.status,
            background: theme.colors.readBadge,
          }}
        >
          既読
        </div>
      )}

      {/* ブランド（右上） */}
      {brand && (
        <div
          style={{
            ...styles.brand,
            background: brand.color,
          }}
        >
          {brand.name}
        </div>
      )}

      {/* 画像 */}
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        onClick={() => markAsRead(item.link)}
        style={styles.imageLink}
      >
        <div
          style={{
            ...styles.imageBox,
            background: theme.colors.skeleton,
          }}
        >
          <div style={styles.emoji}>{emoji}</div>
        </div>
      </a>

      {/* 本文 */}
      <div style={styles.body}>
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          onClick={() => markAsRead(item.link)}
          style={styles.title}
        >
          {item.title}
        </a>

        {/* フッター */}
        <div style={styles.footer}>
          <div style={styles.date}>
            {new Date(item.date).toLocaleDateString("ja-JP")}
          </div>

          <button
            onClick={() => toggleFav(item)}
            style={styles.favBtn}
          >
            <Heart
              size={18}
              fill={isFav ? theme.colors.primary : "transparent"}
              color={isFav ? theme.colors.primary : "#fff"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",

    // ★ホバー用（重要）
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
    cursor: "pointer",
  },

  status: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 999,
    color: "#000",
  },

  brand: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 999,
    color: "#fff",
  },

  imageLink: {
    textDecoration: "none",
  },

  imageBox: {
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 42,
    transition: "transform 0.2s ease",
  },

  body: {
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  title: {
    color: "#fff",
    textDecoration: "none",
    fontSize: 15,
    lineHeight: 1.5,
    fontWeight: 700,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontSize: 12,
    opacity: 0.7,
    color: "#fff",
  },

  favBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
  },
};
