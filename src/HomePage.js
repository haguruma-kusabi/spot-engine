import { useEffect, useState } from "react";

export default function HomePage({
  theme,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      `/api/news?theme=${theme.id}`
    )
      .then((r) => r.json())
      .then((d) => setItems(d));
  }, [theme]);

  return (
    <div
      style={{
        minHeight: "100vh",

        background:
          theme.background,

        color: "#fff",

        padding: 20,
      }}
    >
      <h1>{theme.title}</h1>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            color: "#111",

            padding: 12,

            borderRadius: 12,

            marginBottom: 12,
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
