import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { BRAND_MAP } from "../lib/brand";

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

  function handleClick(e) {
    setRipple(true);
    markAsRead(item.link);

    setTimeout(() => setRipple(false), 400);
  }

  // ★ブランド表示（安全版）
  const brandInfo = (() => {
    if (!brand) return null;

    const group = BRAND_MAP[brand.group];
    if (!group) return null;

    return group.find((b) => b.value === brand.name);
  })();

  return (
    <div
      style={{
        ...styles.card,
        background: theme.colors.cardBg,

        opacity: mounted ? 1 : 0,
        transform: mounted
          ? hover
            ? "translateY(-4px)"
            : "translateY(0px)"
          : "translateY(10px)",

        boxShadow: hover
          ? "0 12px 28px rgba(0,0,0,0.35)"
          : "0 4px 14px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* NEW / 既読（左上） */}
      {!isRead && isNew && (
        <div style={{ ...styles.status, background: theme.colors.primary }}>
          <span style={styles.pulse}>NEW</span>
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

      {/* ブランド（右上・色付き＋略称） */}
      {brandInfo && (
        <div
          style={{
            ...styles.brand,
            background: brandInfo.color,
          }}
        >
          {brandInfo.label}
        </div>
      )}

      {/* 画像 */}
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        style={styles.imageLink}
      >
        <div style={styles.imageBox}>
          <div style={styles.emoji}>{emoji}</div>

          {ripple && <span style={styles.ripple} />}
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
    transition: "all 0.25s ease",
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
    position: "relative",
    overflow: "hidden",
  },

  emoji: {
    fontSize: 42,
    zIndex: 2,
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

  ripple: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    animation: "ripple 0.4s ease-out",
  },

  pulse: {
    animation: "pulse 1.5s infinite",
  },
};
