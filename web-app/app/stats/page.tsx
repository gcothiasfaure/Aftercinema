const fetchData = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/get-stats-data");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: "Il y a eu un problème lors de la récupération des données",
    };
  }
};

export default async function Stats() {
  const { data, error } = await fetchData();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Composant 1</h2>
        {data["PostHog - Page viewed"].store_date}
      </div>
      <div>
        <h2>Composant 2</h2>
        {data["PostHog - Platform button clicked"].store_date}
      </div>
    </div>
  );
}
