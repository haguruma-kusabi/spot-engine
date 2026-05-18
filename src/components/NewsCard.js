import {
  Heart,
  ExternalLink,
} from "lucide-react";

export default function NewsCard({
  item,
  favorites,
  readItems,
  toggleFav,
  markAsRead,
  theme,
  index = 0,
}) {
  const isFav = favorites.some(
    (f) => f.link === item.link
  );

  const isRead =
    readItems.includes(item.link);

  const emojis =
    theme.emojiSet || ["📰"];

  const emoji =
    emojis[index % emojis.length];

  const isNew = (() => {
    const diff =
      (new Date() -
        new Date(item.date)) /
      (1000 * 60 * 60 * 24);

    return diff <= 3;
  })();

  const brand = item.brand;

  return (
    <div
      style={{
        ...styles.card,
        background: theme.colors.cardBg,
        opacity: isRead ? 0.6 : 1,
        filter: isRead ? "saturate(0.7)" : "none",
      }}
    >
      {/* ブランドバッジ */}
      {brand?.name && (
        <div
          style={{
            ...styles.brandBadge,
            background: theme.colors.primary,
          }}
        >
          {brand.name}
        </div>
      )}

      {/* NEW */}
      {isNew && !isRead && (
        <div
          style={{
            ...styles.newBadge,
            background: theme.colors.primary,
          }}
        >
          NEW
        </div>
      )}

      {/* 既読 */}
      {isRead && (
        <div
          style={{
            ...styles.readBadge,
            background: theme.colors.readBadge,
          }}
        >
          既読
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
              fill={
                isFav
                  ? theme.colors.primary
                  : "transparent"
              }
              color={
                isFav
                  ? theme.colors.primary
                  : "#fff"
              }
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
    fontWeight: 700,
    lineHeight: 1.5,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontSize: 12,
    opacity: 0.7,
  },

  favBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  brandBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 999,
    color: "#000",
  },

  newBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 999,
    color: "#000",
  },

  readBadge: {
    position: "absolute",
    top: 38,
    left: 10,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 999,
    color: "#fff",
  },
};
