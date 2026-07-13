import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import ContactToolbar from "../../components/contacts/ContactToolbar";
import ContactTable from "../../components/contacts/ContactTable";
import ContactDrawer from "../../components/contacts/ContactDrawer";
import Pagination from "../../components/common/Pagination";

import {
  getContacts,
  deleteContact,
} from "../../services/contactService";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [editingContact, setEditingContact] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchContacts = async (
    page = currentPage,
    searchText = search
  ) => {
    try {
      setLoading(true);

      const response = await getContacts(
        page,
        10,
        searchText
      );

      setContacts(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, search);
  }, [currentPage]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
    fetchContacts(1, value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {
      await deleteContact(id);

      toast.success("Contact deleted successfully");

      fetchContacts(currentPage, search);

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete contact");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Contacts
      </h1>

      <ContactToolbar
        search={search}
        onSearch={handleSearch}
        onCreateContact={() => {
          setEditingContact(null);
          setIsDrawerOpen(true);
        }}
      />

      <ContactDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingContact(null);
        }}
        contact={editingContact}
        onContactCreated={() =>
          fetchContacts(currentPage, search)
        }
      />

      <ContactTable
        contacts={contacts}
        loading={loading}
        onEdit={(contact) => {
          setEditingContact(contact);
          setIsDrawerOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </DashboardLayout>
  );
};

export default Contacts;