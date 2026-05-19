// src/components/SkeletonCard.js

export default function SkeletonCard() {
  return (
    <div style={styles.card}>
      {/* ブランド */}
      <div style={styles.brand} />

      {/* ステータス */}
      <div style={styles.status} />

      {/* 画像 */}
      <div style={styles.imageBox}>
        <div style={styles.imageGlow} />
      </div>

      {/* 本文 */}
      <div style={styles.body}>
        <div
          style={{
            ...styles.line,
            width: "92%",
          }}
        />

        <div
          style={{
            ...styles.line,
            width: "78%",
          }}
        />

        <div
          style={{
            ...styles.line,
            width: "56%",
            marginTop: 8,
          }}
        />

        <div style={styles.footer}>
          <div
            style={{
              ...styles.small,
              width: 70,
            }}
          />

          <div style={styles.circle} />
        </div>
      </div>
    </div>
  );
}

const shimmer = {
  background:
    "linear-gradient(90deg,#1d1d1d 0%,#2a2a2a 50%,#1d1d1d 100%)",

  backgroundSize:
    "200% 100%",

  animation:
    "skeleton-loading 1.3s infinite linear",
};

const styles = {
  card: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    background: "#151515",
    display: "flex",
    flexDirection: "column",
    minHeight: 260,
  },

  status: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 48,
    height: 22,
    borderRadius: 999,
    zIndex: 10,

    ...shimmer,
  },

  brand: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 64,
    height: 22,
    borderRadius: 999,
    zIndex: 10,

    ...shimmer,
  },

  imageBox: {
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    ...shimmer,
  },

  imageGlow: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background:
      "rgba(255,255,255,0.06)",
    filter: "blur(8px)",
  },

  body: {
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  line: {
    height: 14,
    borderRadius: 8,

    ...shimmer,
  },

  small: {
    height: 12,
    borderRadius: 8,

    ...shimmer,
  },

  footer: {
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  circle: {
    width: 22,
    height: 22,
    borderRadius: "50%",

    ...shimmer,
  },
};
