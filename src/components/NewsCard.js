export default function NewsCard({
  item,
  theme,
  index = 0,
}) {
  const brand = item.brand;

  return (
    <div style={styles.card}>
      {/* ブランドラベル */}
      {brand && (
        <div
          style={{
            ...styles.label,
            background: brand.color,
          }}
        >
          {brand.name}
        </div>
      )}

      <div style={styles.body}>
        <a href={item.link} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    background: "#111",
    padding: 12,
  },

  label: {
    position: "absolute",
    top: 8,
    left: 8,
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 999,
    color: "#fff",
    fontWeight: 700,
  },

  body: {
    marginTop: 20,
    fontSize: 14,
    color: "#fff",
  },
};
