import { useState, useEffect } from "react";
import {
  getEventsAPI,
  createEventAPI,
  updateEventAPI,
  deleteEventAPI,
} from "../services/EventService";
import { IEvent } from "../types/IResponse";
import Button from "../components/Button/Button";
import EditUserDialog from "../components/common/EditUserDialog";
import CreateEventDialog from "../components/common/CreateEventDialog"
import SideBarOrg from "../components/SideBar/SideBarOrg";

const ManageEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getEventsAPI();
      if (Array.isArray(response)) {
        setEvents(response);
      } else {
        setError("Failed to load events");
      }
    } catch {
      setError("Failed to load events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventID: string) => {
    try {
      await deleteEventAPI(eventID);
      setEvents((prev) => prev.filter((e) => e.eventID !== eventID));
      showMessage("Event deleted successfully");
    } catch {
      showMessage("Failed to delete event", true);
    }
  };

  const handleEdit = (event: IEvent) => {
    setEditingEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingEvent) return;

    try {
      const updated = await updateEventAPI(editingEvent.eventID, editingEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventID === editingEvent.eventID ? updated : event
        )
      );
      setIsEditDialogOpen(false);
      showMessage("Event updated successfully");
    } catch {
      showMessage("Failed to update event", true);
    }
  };

  const handleCreate = async (newEvent: IEvent) => {
    try {
      const createdEvent = await createEventAPI(newEvent);
      setEvents((prev) => [...prev, createdEvent]);
      setIsCreateDialogOpen(false);
      showMessage("Event created successfully");
    } catch {
      showMessage("Failed to create event", true);
    }
  };

  const showMessage = (msg: string, isError = false) => {
    setError(msg);
    setTimeout(() => {
      if (error === msg) setError("");
    }, 3000);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <SideBarOrg />
      </div>
      <main className="flex-grow p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Manage Events</h2>

        {error && (
          <div
            className={`mb-4 p-3 rounded-md ${
              error.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        <div className="mb-4 flex justify-between items-center">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Search by event name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
          <Button
            text="Create Event"
            size="sm"
            onClick={() => setIsCreateDialogOpen(true)}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin h-12 w-12 border-t-2 border-blue-500 rounded-full mx-auto"></div>
              <p className="mt-4">Loading events...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-blue-50 text-left border-b border-blue-100">
                <tr>
                  <th className="p-4 text-blue-700">Name</th>
                  <th className="p-4 text-blue-700">Date</th>
                  <th className="p-4 text-blue-700">Start</th>
                  <th className="p-4 text-blue-700">Finish</th>
                  <th className="p-4 text-blue-700">Type</th>
                  <th className="p-4 text-blue-700">Status</th>
                  <th className="p-4 text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length ? (
                  filteredEvents.map((event) => (
                    <tr key={event.eventID} className="border-b hover:bg-gray-50">
                      <td className="p-4">{event.eventName}</td>
                      <td className="p-4">{event.eventDate}</td>
                      <td className="p-4">{event.eventStartTime}</td>
                      <td className="p-4">{event.eventFinishTime}</td>
                      <td className="p-4">{event.eventType}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.eventStatus === "Approved"
                              ? "bg-green-100 text-green-800"
                              : event.eventStatus === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {event.eventStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button text="Edit" size="sm" onClick={() => handleEdit(event)} />
                          <Button
                            text="Delete"
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(event.eventID)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center p-6 text-gray-500">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Edit Event Dialog */}
        <EditUserDialog
          isDialogOpen={isEditDialogOpen}
          editingEvent={editingEvent}
          setEditingEvent={setEditingEvent}
          setIsDialogOpen={setIsEditDialogOpen}
          handleUpdate={handleUpdate}
        />

        {/* Create Event Dialog */}
        <CreateEventDialog
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
          handleCreate={handleCreate}
        />
      </main>
    </div>
  );
};

export default ManageEvents;
