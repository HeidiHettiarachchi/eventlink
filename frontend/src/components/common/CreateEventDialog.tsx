import { useState, useEffect, FC } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button/Button";
import { IEvent } from "../../types/IResponse";

interface EventDialogProps {
  isDialogOpen: boolean;
  editingEvent: IEvent | null;
  setEditingEvent: (event: IEvent) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleUpdate: (event: IEvent) => void;
  isCreating: boolean;
}

interface ErrorState {
  [key: string]: string;
}

const ConfirmationDialog: FC<{
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl z-10 border-t-4 border-blue-500">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <Button text="Cancel" size="sm" color="danger" onClick={onCancel} />
          <Button text="Confirm" size="sm" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

const EventDialog: FC<EventDialogProps> = ({
  isDialogOpen,
  editingEvent,
  setEditingEvent,
  setIsDialogOpen,
  handleUpdate,
  isCreating,
}) => {
  const initialErrorState: ErrorState = {
    eventName: "",
    eventDate: "",
    eventStartTime: "",
    eventFinishTime: "",
    timePeriod: "",
    eventPresident: "",
    eventProposal: "",
    eventForm: "",
    eventMode: "",
    eventType: "",
    eventStatus: "",
  };

  const [errors, setErrors] = useState<ErrorState>(initialErrorState);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<"close" | "save">("close");

  useEffect(() => {
    if (isDialogOpen) {
      setErrors(initialErrorState);
      if (isCreating) {
        setEditingEvent({
          eventID: "",
          eventName: "",
          eventDate: "",
          eventStartTime: "",
          eventFinishTime: "",
          timePeriod: "",
          eventPresident: "",
          eventProposal: "",
          eventForm: "",
          eventMode: "Physical",
          eventType: "Hackathon",
          eventStatus: "Pending",
        });
      }
    }
  }, [isDialogOpen, isCreating, setEditingEvent]);

  const validateForm = (): boolean => {
    if (!editingEvent) return false;

    const newErrors: ErrorState = { ...initialErrorState };

    Object.entries(editingEvent).forEach(([key, value]) => {
      if (!value && key !== "eventID") {
        newErrors[key] = `${key} is required`;
      }
    });

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== "");
  };

  const handleCancel = () => {
    setConfirmationAction("close");
    setShowConfirmation(true);
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      setConfirmationAction("save");
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    if (confirmationAction === "save" && editingEvent) {
      handleUpdate(editingEvent);
      toast.success(isCreating ? "Event created!" : "Event updated!", { position: "top-right" });
    } else if (confirmationAction === "close") {
      setIsDialogOpen(false);
      toast.info("Canceled", { position: "top-right" });
    }
  };

  const handleChange = (field: keyof IEvent, value: string) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [field]: value });
    }
  };

  if (!isDialogOpen || !editingEvent) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl z-10 border-t-4 border-blue-500">
          <h3 className="text-2xl font-bold mb-6 text-blue-700">
            {isCreating ? "Create Event" : "Edit Event"}
          </h3>

          {/* Text fields */}
          {[
            "eventName",
            "eventDate",
            "eventStartTime",
            "eventFinishTime",
            "timePeriod",
            "eventPresident",
            "eventProposal",
            "eventForm",
          ].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor={field}>
                {field}
              </label>
              <input
                id={field}
                type="text"
                value={editingEvent[field as keyof IEvent]}
                onChange={(e) => handleChange(field as keyof IEvent, e.target.value)}
                className={`p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Selects */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="eventMode">
              Event Mode
            </label>
            <select
              id="eventMode"
              value={editingEvent.eventMode}
              onChange={(e) => handleChange("eventMode", e.target.value)}
              className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="eventType">
              Event Type
            </label>
            <select
              id="eventType"
              value={editingEvent.eventType}
              onChange={(e) => handleChange("eventType", e.target.value)}
              className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Hackathon">Hackathon</option>
              <option value="Academic">Academic</option>
              <option value="Non-Academic">Non-Academic</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="eventStatus">
              Event Status
            </label>
            <select
              id="eventStatus"
              value={editingEvent.eventStatus}
              onChange={(e) => handleChange("eventStatus", e.target.value)}
              className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <Button text="Cancel" size="sm" color="danger" onClick={handleCancel} />
            <Button text={isCreating ? "Create" : "Save"} size="sm" onClick={handleSaveClick} />
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        title={confirmationAction === "save" ? "Confirm Save" : "Confirm Cancel"}
        message={
          confirmationAction === "save"
            ? isCreating
              ? "Are you sure you want to create this event?"
              : "Are you sure you want to update this event?"
            : "Are you sure you want to cancel? All unsaved changes will be lost."
        }
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
      />
    </>
  );
};

export default EventDialog;
