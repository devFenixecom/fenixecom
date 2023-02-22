import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ThemeDetail() {
  const [theme, setTheme] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const themeName = router.query.name;
      const res = await fetch(`/api/theme/${themeName}`);
      const data = await res.json();
      setTheme(data);
    }
    fetchData();
  }, [router.query.name]);

  if (!theme) {
    return <p></p>;
  }

  return (
    <div>
      <h1>{theme.name}</h1>
      <p>{theme.description}</p>
    </div>
  );
}
