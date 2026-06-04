import { useState, useEffect } from "react";
import { members as initialMembers } from "../data/mockData";

function Members() {
    const [members, setMembers] = useState(() => {
        const saved = localStorage.getItem("members");
        return saved ? JSON.parse(saved) : initialMembers;
    });

    useEffect(() => {
        localStorage.setItem("members", JSON.stringify(members));
        }, [members]
    );

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Member",
  });

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function openEdit(member) {
    setEditingMember(member);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setEditingMember(null);
    setForm({ name: "", email: "", role: "Member" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingMember) {
      // EDIT
      const updated = members.map((m) =>
        m.id === editingMember.id
          ? { ...m, ...form }
          : m
      );

      setMembers(updated);
    } else {
      // CREATE
      const newMember = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        status: "Active",
      };

      setMembers([newMember, ...members]);
    }

    closeModal();
  }

  function confirmDelete() {
    setMembers(members.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen || deleteTarget) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, deleteTarget]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Members</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-emerald-400 transition"
        >
          + Add Member
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full md:w-1/2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-emerald-500"
      />

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-300 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => (
              <tr
                key={member.id}
                className="border-t border-zinc-800 hover:bg-zinc-800 transition"
              >
                <td className="p-4 font-medium">{member.name}</td>
                <td className="p-4 text-zinc-400">{member.email}</td>
                <td className="p-4 text-zinc-300">{member.role}</td>

                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-black">
                    {member.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => openEdit(member)}
                    className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteTarget(member)}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-400 text-black text-sm font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMembers.length === 0 && (
          <p className="p-6 text-zinc-400">No members found.</p>
        )}
      </div>

      {/* ===================== */}
      {/* ADD / EDIT MODAL */}
      {/* ===================== */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingMember ? "Edit Member" : "Add Member"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                <option value="Member">Member</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Leader">Leader</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold"
                >
                  {editingMember ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* DELETE CONFIRM MODAL */}
      {/* ===================== */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2 text-red-400">
              Delete Member
            </h2>

            <p className="text-zinc-300 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-black font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;