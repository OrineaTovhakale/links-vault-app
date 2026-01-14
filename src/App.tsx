import React, { useState, useMemo } from "react";
import { LinkItem } from "./types";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/LinkList";
import SearchBar from "./components/SearchBar";
import ConfirmModal from "./components/ConfirmModal";
import { FaPlus, FaList, FaSearch, FaTimes } from "react-icons/fa";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { STORAGE_KEY, MESSAGE_DURATION } from "./constants";
import "./App.css";

// Type assertion to satisfy TypeScript
const IconComponent = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const IconList = FaList as React.FC<React.SVGProps<SVGSVGElement>>;
const IconSearch = FaSearch as React.FC<React.SVGProps<SVGSVGElement>>;
const IconTimes = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;

function App() {
  // Use custom hook for localStorage management
  const [links, setLinks] = useLocalStorage<LinkItem[]>(STORAGE_KEY, []);
  
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  
  // Confirmation modal state
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    linkId: string | null;
    linkTitle: string;
  }>({
    isOpen: false,
    linkId: null,
    linkTitle: "",
  });

  /**
   * Display a temporary message to the user
   */
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), MESSAGE_DURATION);
  };

  /**
   * Add a new link to the collection
   */
  const handleAddLink = (link: LinkItem) => {
    setLinks((prev) => [...prev, link]);
    showMessage(`Link "${link.title}" saved successfully!`);
    setShowForm(false);
  };

  /**
   * Delete a link with confirmation
   */
  const handleDeleteLink = (id: string) => {
    const linkToDelete = links.find((l) => l.id === id);
    if (linkToDelete) {
      setConfirmDelete({
        isOpen: true,
        linkId: id,
        linkTitle: linkToDelete.title,
      });
    }
  };

  /**
   * Confirm deletion
   */
  const confirmDeleteLink = () => {
    if (confirmDelete.linkId) {
      setLinks((prev) => prev.filter((l) => l.id !== confirmDelete.linkId));
      showMessage(`Link "${confirmDelete.linkTitle}" deleted successfully!`);
    }
    setConfirmDelete({ isOpen: false, linkId: null, linkTitle: "" });
  };

  /**
   * Cancel deletion
   */
  const cancelDelete = () => {
    setConfirmDelete({ isOpen: false, linkId: null, linkTitle: "" });
  };

  /**
   * Initiate editing a link
   */
  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link);
    setShowForm(true);
    setShowLinks(false);
    setShowSearch(false);
  };

  /**
   * Update an existing link
   */
  const handleUpdateLink = (updatedLink: LinkItem) => {
    setLinks((prev) => prev.map((l) => (l.id === updatedLink.id ? updatedLink : l)));
    showMessage(`Link "${updatedLink.title}" updated successfully!`);
    setEditingLink(null);
    setShowForm(false);
  };

  /**
   * Cancel editing and close form
   */
  const clearEditing = () => {
    setEditingLink(null);
    setShowForm(false);
  };

  /**
   * Open the add link form
   */
  const openAddLinkForm = () => {
    setShowForm(true);
    setShowLinks(false);
    setShowSearch(false);
  };

  /**
   * Check if a link matches the search query
   */
  const matchesQuery = (link: LinkItem, query: string): boolean => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      link.title.toLowerCase().includes(q) ||
      link.url.toLowerCase().includes(q) ||
      link.description.toLowerCase().includes(q) ||
      link.tags.some((t) => t.toLowerCase().includes(q))
    );
  };

  /**
   * Filter links based on search term
   */
  const filteredLinks = useMemo(
    () => links.filter((l) => matchesQuery(l, searchTerm)),
    [links, searchTerm]
  );

  return (
    <div className="app">
      <div className="header">
        <div className="logo"></div>
        <h1>Links Vault</h1>
      </div>
      <div className="welcome">
        Welcome to Links Vault, your ultimate link management hub!
      </div>
      
      {/* Main action buttons */}
      <div className="options">
        <button
          className="option-btn"
          onClick={() => {
            setShowForm(true);
            setShowLinks(false);
            setShowSearch(false);
          }}
          aria-label="Add a new link"
        >
          <IconComponent aria-hidden="true" /> Add a Link
        </button>
        <button
          className="option-btn"
          onClick={() => {
            setShowLinks(true);
            setShowForm(false);
            setShowSearch(false);
          }}
          aria-label="View all saved links"
        >
          <IconList aria-hidden="true" /> View All Links
        </button>
        <button
          className="option-btn"
          onClick={() => {
            setShowSearch(true);
            setShowForm(false);
            setShowLinks(false);
          }}
          aria-label="Search through your links"
        >
          <IconSearch aria-hidden="true" /> Search Links
        </button>
      </div>
      
      {/* Success/Error messages */}
      {message && <p className="message">{message}</p>}
      
      {/* Search overlay */}
      {showSearch && (
        <div className="search-overlay visible">
          <div className="search-container">
            <button
              className="exit-btn"
              onClick={() => setShowSearch(false)}
              aria-label="Close search"
            >
              <IconTimes aria-hidden="true" />
            </button>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <LinkList
              links={filteredLinks}
              onEdit={handleEditLink}
              onDelete={handleDeleteLink}
              onTagClick={(tag) => setSearchTerm(tag)}
              searchTerm={searchTerm}
              onAddLink={openAddLinkForm}
            />
          </div>
        </div>
      )}
      
      {/* Add/Edit form overlay */}
      {showForm && (
        <div className="form-overlay visible">
          <div className="form-container">
            <button
              className="exit-btn"
              onClick={() => clearEditing()}
              aria-label="Close form"
            >
              <IconTimes aria-hidden="true" />
            </button>
            <LinkForm
              onAdd={handleAddLink}
              onUpdate={handleUpdateLink}
              editingLink={editingLink}
              clearEditing={clearEditing}
            />
          </div>
        </div>
      )}
      
      {/* View all links overlay */}
      {showLinks && (
        <div className="list-overlay visible">
          <div className="list-container">
            <button
              className="exit-btn"
              onClick={() => setShowLinks(false)}
              aria-label="Close links view"
            >
              <IconTimes aria-hidden="true" />
            </button>
            <LinkList
              links={filteredLinks}
              onEdit={handleEditLink}
              onDelete={handleDeleteLink}
              onTagClick={(tag) => setSearchTerm(tag)}
              searchTerm={searchTerm}
              onAddLink={openAddLinkForm}
            />
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title="Delete Link?"
        message={`Are you sure you want to delete "${confirmDelete.linkTitle}"? This action cannot be undone.`}
        onConfirm={confirmDeleteLink}
        onCancel={cancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
      />
    </div>
  );
}

export default App;