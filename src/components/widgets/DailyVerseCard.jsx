import { useEffect, useState } from "react";
import { getDailyVerse } from "../../api/verseApi";

function DailyVerseCard() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVerse() {
      try {
        const data = await getDailyVerse();
        setVerse(data.verse);
      } catch (err) {
        setError("Could not load verse");
      } finally {
        setLoading(false);
      }
    }

    loadVerse();
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 h-full">
      
      <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
        DAILY VERSE
      </h2>

      {loading && (
        <p className="text-gray-500 dark:text-zinc-400">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {verse && !loading && (
        <>
          <p className="text-gray-800 dark:text-zinc-200 text-lg leading-relaxed mb-4">
            “{verse.text}”
          </p>

          <p className="text-sm text-gray-500 dark:text-zinc-400">
            — {verse.reference}
          </p>
        </>
      )}
    </div>
  );
}

export default DailyVerseCard;