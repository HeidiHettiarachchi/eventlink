import { useState, useEffect, FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../Button/Button";
import { IOrganization } from "../../types/IResponse"; 

interface EditOrganizationDialogProps {
  isDialogOpen: boolean;
  editingOrganization: IOrganization | null;
  setEditingOrganization: (organization: IOrganization) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleUpdate: () => void;
  isCreating: boolean;  // New prop to differentiate between create and edit
}

interface ErrorState {
  name: string;
  president: string;
  staffAdvisor: string;
}

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Confirmation Dialog Component
const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
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

const EditOrganizationDialog: FC<EditOrganizationDialogProps> = ({
  isDialogOpen,
  editingOrganization,
  setEditingOrganization,
  setIsDialogOpen,
  handleUpdate,
  isCreating,  // Checking if we're in create mode
}) => {
  const [errors, setErrors] = useState<ErrorState>({
    name: "",
    president: "",
    staffAdvisor: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<"close" | "save">(
    "close"
  );

  // Reset errors when dialog opens with new organization
  useEffect(() => {
    if (isDialogOpen) {
      setErrors({ name: "", president: "", staffAdvisor: "" });
      if (isCreating) {
        setEditingOrganization({ name: "", president: "", staffAdvisor: "" } as IOrganization); // Reset form for creation
      }
    }
  }, [isDialogOpen, isCreating]);

  // Validate when organization data changes
  useEffect(() => {
    if (editingOrganization) {
      validateForm();
    }
  }, [editingOrganization]);

  const validateForm = (): boolean => {
    if (!editingOrganization) return false;

    const newErrors: ErrorState = {
      name: "",
      president: "",
      staffAdvisor: "",
    };

    // Name validation
    if (!editingOrganization.name) {
      newErrors.name = "Name is required";
    }

    // President validation
    if (!editingOrganization.president) {
      newErrors.president = "President is required";
    }

    // Staff Advisor validation
    if (!editingOrganization.staffAdvisor) {
      newErrors.staffAdvisor = "Staff Advisor is required";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.president && !newErrors.staffAdvisor;
  };

  const handleCancel = (): void => {
    setConfirmationAction("close");
    setShowConfirmation(true);
  };

  const handleSaveClick = (): void => {
    if (validateForm()) {
      setConfirmationAction("save");
      setShowConfirmation(true);
    }
  };

  const handleConfirm = (): void => {
    setShowConfirmation(false);
    if (confirmationAction === "save") {
      handleUpdate();
      // Show success notification for save or create
      toast.success(isCreating ? "Organization created successfully!" : "Organization updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (confirmationAction === "close") {
      setIsDialogOpen(false);
      // Show info notification for cancel
      toast.info("Edit cancelled", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleCancelConfirmation = (): void => {
    setShowConfirmation(false);
  };

  if (!isDialogOpen || !editingOrganization) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="absolute inset-0 backdrop-blur-sm"></div>

        <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl z-10 border-t-4 border-blue-500">
          <h3 className="text-2xl font-bold mb-6 text-blue-700">{isCreating ? "Create Organization" : "Edit Organization"}</h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Organization Name
            </label>
            <input
              id="name"
              type="text"
              value={editingOrganization.name || ""}
              onChange={(e) =>
                setEditingOrganization({
                  ...editingOrganization,
                  name: e.target.value,
                })
              }
              className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="president">
              President
            </label>
            <input
              id="president"
              type="text"
              value={editingOrganization.president || ""}
              onChange={(e) =>
                setEditingOrganization({
                  ...editingOrganization,
                  president: e.target.value,
                })
              }
              className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.president ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.president && (
              <p className="text-red-500 text-xs mt-1">{errors.president}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="staffAdvisor">
              Staff Advisor
            </label>
            <input
              id="staffAdvisor"
              type="text"
              value={editingOrganization.staffAdvisor || ""}
              onChange={(e) =>
                setEditingOrganization({
                  ...editingOrganization,
                  staffAdvisor: e.target.value,
                })
              }
              className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.staffAdvisor ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.staffAdvisor && (
              <p className="text-red-500 text-xs mt-1">{errors.staffAdvisor}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button text="Cancel" size="sm" color="danger" onClick={handleCancel} />
            <Button text={isCreating ? "Create" : "Save"} size="sm" onClick={handleSaveClick} />
          </div>
        </div>
      </div>

      <ConfirmationDialog
          isOpen={showConfirmation}
          title={confirmationAction === "save" ? "Confirm Create" : "Confirm Cancel"}
          message={
            confirmationAction === "save"
              ? (isCreating 
                  ? "Are you sure you want to create this organization?" 
                  : "Are you sure you want to update this organization?")
              : "Are you sure you want to cancel? Any unsaved changes will be lost."
          }
          onConfirm={handleConfirm}
          onCancel={handleCancelConfirmation}
      />

    </>
    
  );
};

export default EditOrganizationDialog;
