function StatCard({ title, value, change }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 transition">
      <p className="text-zinc-400 text-sm mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-white mb-2">
        {value}
      </h3>

      <p className="text-emerald-400 text-sm">
        {change}
      </p>
    </div>
  );
}

export default StatCard;