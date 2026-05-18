import SeriesNav from "./SeriesNav";

export default function Header({
  theme,
}) {
  return (
    <div style={styles.wrap}>
      <SeriesNav
        currentTheme={theme.id}
        primary={
          theme.colors.primary
        }
      />

      <h1 style={styles.title}>
        {theme.title}
      </h1>
    </div>
  );
}

const styles = {
  wrap: {
    padding:
      "14px 14px 10px",
  },

  title: {
    textAlign: "center",

    fontSize: 24,

    fontWeight: 700,

    margin: 0,
  },
};
