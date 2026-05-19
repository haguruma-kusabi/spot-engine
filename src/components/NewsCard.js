import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const emoji = ["📰", "🔥", "✨", "📢"][index % 4];

  function handleClick() {
    setRipple(true);
    markAsRead(item.link);
    setTimeout(() => setRipple(false), 400);
  }

  return (
    <div
      style={{
        ...styles.card,
        background: theme.colors.cardBg,

        opacity: isRead ? 0.45 : mounted ? 1 : 0,
        filter: isRead ? "grayscale(1)" : "none",

        transform: mounted
          ? hover
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(10px)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* status */}
      {isRead ? (
        <div
          style={{
            ...styles.status,
            background: "#666",
          }}
        >
          既読
        </div>
      ) : isNew ? (
        <div
          style={{
            ...styles.status,
            background: theme.colors.primary,
          }}
        >
          NEW
        </div>
      ) : null}

      {/* brand */}
      {item.brand && (
        <div
          style={{
            ...styles.brand,
            background: item.brand.color,
          }}
        >
          {item.brand.label}
        </div>
      )}

      {/* image */}
      <a
        href={item.link}
        onClick={handleClick}
        style={styles.imageBox}
      >
        <div style={styles.emoji}>{emoji}</div>
        {ripple && <span style={styles.ripple} />}
      </a>

      {/* body */}
      <div style={styles.body}>
        <a href={item.link} style={styles.title}>
          {item.title}
        </a>

        <div style={styles.footer}>
          <span style={styles.date}>
            {new Date(item.date).toLocaleDateString(
              "ja-JP"
            )}
          </span>

          <button
            onClick={() => toggleFav(item)}
            style={styles.fav}
          >
            <Heart
              size={18}
              fill={
                isFav
                  ? theme.colors.primary
                  : "transparent"
              }
              color={
                isFav ? theme.colors.primary : "#fff"
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
    borderRadius: 20,
    overflow: "hidden",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },

  status: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 999,
    fontWeight: 700,
  },

  brand: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 999,
    color: "#fff",
  },

  imageBox: {
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    textDecoration: "none",
  },

  emoji: {
    fontSize: 40,
  },

  body: {
    padding: 14,
  },

  title: {
    color: "#fff",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 15,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },

  date: {
    fontSize: 12,
    opacity: 0.7,
  },

  fav: {
    background: "transparent",
    border: "none",
  },

  ripple: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    animation: "ripple 0.4s ease-out",
  },
};
