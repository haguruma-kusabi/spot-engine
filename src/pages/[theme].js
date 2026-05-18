import HomePage from "../HomePage";

import { themes } from "../themes";

export default function ThemePage({
  theme,
}) {
  return (
    <HomePage theme={theme} />
  );
}

export async function getServerSideProps({
  params,
}) {
  const theme =
    themes[params.theme];

  if (!theme) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      theme,
    },
  };
}
