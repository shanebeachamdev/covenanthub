import DailyVerseCard from "../components/widgets/DailyVerseCard";

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Section */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back 👋
          </h1>

          <p className="text-gray-600 dark:text-zinc-400">
            Here's an overview of your church this week.
          </p>
        </div>

        {/* Daily Verse */}
        <DailyVerseCard />

      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Total Members
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            128
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Upcoming Events
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            5
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Volunteers Active
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            34
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Weekly Attendance
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            92%
          </h2>
        </div>

      </div>

      {/* PLACEHOLDER SECTION (future expansion) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Recent Activity
          </h3>

          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Member check-ins, event updates, and announcements will appear here.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Church Insights
          </h3>

          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Growth trends, attendance stats, and engagement metrics will appear here.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;