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

  const isFav = favorites.some((f) => f.link === item.link);
  const isRead = readItems.includes(item.link);

  const isNew =
    (new Date() - new Date(item.date)) /
      (1000 * 60 * 60 * 24) <= 3;

  const emojiSet = theme.emojiSet || ["📰", "🔥", "✨", "📢"];
  const emoji = emojiSet[index % emojiSet.length];

  function handleClick() {
    setRipple(true);
    markAsRead(item.link);
    setTimeout(() => setRipple(false), 400);
  }

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        background: theme.colors.cardBg,

        // 既読優先制御
        opacity: isRead ? 0.35 : mounted ? 1 : 0,
        filter: isRead
          ? "grayscale(1) brightness(0.8)"
          : "none",

        transform: isRead
          ? "scale(0.98)"
          : mounted
          ? hover
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(10px)",

        boxShadow: hover
          ? "0 12px 28px rgba(0,0,0,0.35)"
          : "0 4px 14px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* =========================
          状態バッジ（既読優先）
      ========================= */}
      {isRead ? (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 20,
            fontSize: 11,
            fontWeight: 800,
            padding: "4px 8px",
            borderRadius: 999,
            background: "#555",
            color: "#fff",
          }}
        >
          既読
        </div>
      ) : isNew ? (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 10,
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 8px",
            borderRadius: 999,
            background: "#00c896",
            color: "#000",
            opacity: 0.85,
          }}
        >
          NEW
        </div>
      ) : null}

      {/* =========================
          ブランドラベル（右上）
      ========================= */}
      {item.brand && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 8px",
            borderRadius: 999,
            background: item.brand.color,
            color: "#fff",
          }}
        >
          {item.brand.label}
        </div>
      )}

      {/* =========================
          画像エリア
      ========================= */}
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        style={{
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          textDecoration: "none",
        }}
      >
        <div style={{ fontSize: 40 }}>{emoji}</div>

        {ripple && (
          <span
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              animation: "ripple 0.4s ease-out",
            }}
          />
        )}
      </a>

      {/* =========================
          本文
      ========================= */}
      <div style={{ padding: 14 }}>
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          onClick={() => markAsRead(item.link)}
          style={{
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 700,
            color: isRead ? "#aaa" : "#fff",
          }}
        >
          {item.title}
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontSize: 12,
              opacity: 0.7,
              color: "#fff",
            }}
          >
            {new Date(item.date).toLocaleDateString(
              "ja-JP"
            )}
          </span>

          <button
            onClick={() => toggleFav(item)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
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
