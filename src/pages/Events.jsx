import { useState, useEffect } from "react";
import { initialEvents } from "../data/mockData";

function Events() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");

    return saved
      ? JSON.parse(saved)
      : initialEvents;
  });

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    type: "Service",
  });

  // Persist events
  useEffect(() => {
    localStorage.setItem(
      "events",
      JSON.stringify(events)
    );
  }, [events]);

  // Lock body scroll during modal
  useEffect(() => {
    if (isOpen || deleteTarget) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, deleteTarget]);

  const filteredEvents = events.filter((event) =>
    event.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function closeModal() {
    setIsOpen(false);

    setEditingEvent(null);

    setForm({
      title: "",
      date: "",
      location: "",
      type: "Service",
    });
  }

  function openEdit(event) {
    setEditingEvent(event);

    setForm({
      title: event.title,
      date: event.date,
      location: event.location,
      type: event.type,
    });

    setIsOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingEvent) {
      const updated = events.map((event) =>
        event.id === editingEvent.id
          ? {
              ...event,
              ...form,
            }
          : event
      );

      setEvents(updated);
    } else {
      const newEvent = {
        id: Date.now(),
        ...form,
      };

      setEvents([newEvent, ...events]);
    }

    closeModal();
  }

  function confirmDelete() {
    setEvents(
      events.filter(
        (event) =>
          event.id !== deleteTarget.id
      )
    );

    setDeleteTarget(null);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Events
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-emerald-400 transition"
        >
          + Add Event
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="mb-6 w-full md:w-1/2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-emerald-500"
      />

      {/* Event Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">
                  {event.title}
                </h2>

                <p className="text-zinc-400 text-sm">
                  {event.type}
                </p>
              </div>

              <span className="bg-emerald-500 text-black text-xs font-semibold px-2 py-1 rounded-full">
                {event.type}
              </span>
            </div>

            <div className="space-y-2 text-zinc-300 text-sm mb-6">
              <p>
                <span className="text-zinc-500">
                  Date:
                </span>{" "}
                {event.date}
              </p>

              <p>
                <span className="text-zinc-500">
                  Location:
                </span>{" "}
                {event.location}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(event)}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  setDeleteTarget(event)
                }
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-400 text-black text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <p className="text-zinc-400 mt-6">
          No events found.
        </p>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingEvent
                ? "Edit Event"
                : "Add Event"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                name="title"
                placeholder="Event Title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                <option value="Service">
                  Service
                </option>

                <option value="Bible Study">
                  Bible Study
                </option>

                <option value="Outreach">
                  Outreach
                </option>

                <option value="Youth">
                  Youth
                </option>
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
                  {editingEvent
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-red-400 mb-2">
              Delete Event
            </h2>

            <p className="text-zinc-300 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {deleteTarget.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="px-4 py-2 rounded-lg bg-zinc-800"
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

export default Events;