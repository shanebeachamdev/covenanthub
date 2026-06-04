function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div>
          <p className="text-sm text-zinc-400">Church Name</p>
          <p className="font-semibold">CovenantHub Church</p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Status</p>
          <p className="text-emerald-400 font-semibold">Active</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;