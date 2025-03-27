import { useState, useEffect } from "react";
import { IOrganization } from "../types/IResponse"; // Define this interface in your types file
import Button from "../components/Button/Button";
import EditOrganizationDialog from "../components/common/EditOrganizationDialog";
import { deleteOrganizationAPI, getOrganizationsAPI, updateOrganizationAPI, createOrganizationAPI } from "../services/OrganizationService";

const ManageOrganizations = () => {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingOrganization, setEditingOrganization] = useState<IOrganization | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreatingOrganization, setIsCreatingOrganization] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getOrganizationsAPI();
        if (Array.isArray(response)) {
          setOrganizations(response);
        } else {
          setError("Failed to load organizations");
        }
      } catch {
        setError("Failed to load organizations");
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteOrganizationAPI(id);
      setOrganizations((prevOrganizations) =>
        prevOrganizations.filter((organization) => organization._id !== id)
      );
    } catch {
      setError("Failed to delete organization");
    }
  };

  const handleEdit = (organization: IOrganization) => {
    setEditingOrganization(organization);
    setIsDialogOpen(true);
    setIsCreatingOrganization(false); // When editing, it's not a new organization
  };

  const handleCreate = () => {
    setEditingOrganization(null); // Clear the editing organization for new creation
    setIsDialogOpen(true);
    setIsCreatingOrganization(true); // When creating, it's a new organization
  };

  const handleUpdate = async () => {
    if (editingOrganization) {
      try {
        await updateOrganizationAPI(editingOrganization._id, editingOrganization);
        setOrganizations((prevOrganizations) =>
          prevOrganizations.map((organization) =>
            organization._id === editingOrganization._id ? editingOrganization : organization
          )
        );
        setIsDialogOpen(false);
        setError("Organization updated successfully");
        setTimeout(() => setError(""), 3000);
      } catch {
        setError("Failed to update organization");
      }
    }
  };

  const handleCreateOrganization = async () => {
    if (editingOrganization) {
      try {
        await createOrganizationAPI(editingOrganization);
        setOrganizations((prevOrganizations) => [...prevOrganizations, editingOrganization]);
        setIsDialogOpen(false);
        setError("Organization created successfully");
        setTimeout(() => setError(""), 3000);
      } catch {
        setError("Failed to create organization");
      }
    }
  };

  const filteredOrganizations = organizations.filter((organization) =>
    organization.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Manage Organizations</h2>

      {error && (
        <div
          className={`mb-4 p-3 rounded-md ${
            error.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {error}
        </div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="search">
          Search Organizations
        </label>
        <Button
          text="Add Organization"
          size="sm"
          color="primary"
          onClick={handleCreate} // Trigger the create dialog
        />
      </div>

      <div className="relative mb-4">
        <input
          id="search"
          type="text"
          placeholder="Search by organization name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading organizations...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 text-left border-b border-blue-100">
                  <th className="p-4 text-blue-700">Name</th>
                  <th className="p-4 text-blue-700">President</th>
                  <th className="p-4 text-blue-700">Staff Advisor</th>
                  <th className="p-4 text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.length > 0 ? (
                  filteredOrganizations.map((organization) => (
                    <tr key={organization._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">{organization.name}</td>
                      <td className="p-4">{organization.president}</td>
                      <td className="p-4">{organization.staffAdvisor}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button text="Edit" size="sm" onClick={() => handleEdit(organization)} />
                          <Button
                            text="Delete"
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(organization._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-500">
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EditOrganizationDialog
        isDialogOpen={isDialogOpen}
        editingOrganization={editingOrganization}
        setEditingOrganization={setEditingOrganization}
        setIsDialogOpen={setIsDialogOpen}
        handleUpdate={isCreatingOrganization ? handleCreateOrganization : handleUpdate}
        isCreating={isCreatingOrganization}
      />
    </div>
  );
};

export default ManageOrganizations;
