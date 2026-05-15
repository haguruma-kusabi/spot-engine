export default function Layout({
  theme,
  header,
  children,
}) {
  return (
    <div
      style={{
        ...styles.page,

        background:
          theme.colors.background,
      }}
    >
      {/* 固定ヘッダー */}
      <div
        style={{
          ...styles.sticky,

          background:
            theme.colors.stickyBg,
        }}
      >
        {header}
      </div>

      {/* コンテンツ */}
      <div style={styles.contentArea}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",

    overflow: "hidden",

    display: "flex",

    flexDirection: "column",

    padding: "0 16px",

    maxWidth: 520,

    margin: "0 auto",

    color: "#fff",
  },

  sticky: {
    position: "sticky",

    top: 0,

    zIndex: 100,

    paddingTop: 12,

    paddingBottom: 14,

    backdropFilter:
      "blur(10px)",

    flexShrink: 0,
  },

  contentArea: {
    flex: 1,

    overflow: "hidden",

    paddingBottom: 140,
  },
};
