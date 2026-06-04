const BASE_URL = "http://localhost:3001";

export async function getDailyVerse() {
  const res = await fetch(`${BASE_URL}/verse/today`);

  if (!res.ok) {
    throw new Error("Failed to fetch verse");
  }

  return res.json();
}