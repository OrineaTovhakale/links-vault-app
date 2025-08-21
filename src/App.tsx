import React, { useState, useEffect, useMemo } from "react";
import { LinkItem } from "./types";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/LinkList";
import SearchBar from "./components/SearchBar";
import { FaPlus, FaList, FaSearch, FaTimes } from "react-icons/fa";
import "./App.css";

// Type assertion to satisfy TypeScript
const IconComponent = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const IconList = FaList as React.FC<React.SVGProps<SVGSVGElement>>;
const IconSearch = FaSearch as React.FC<React.SVGProps<SVGSVGElement>>;
const IconTimes = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;

const STORAGE_KEY = "links_vault_links";

function App() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setLinks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const handleAddLink = (link: LinkItem) => {
    setLinks((prev) => [...prev, link]);
    setMessage(`Link "${link.title}" saved successfully!`);
    setTimeout(() => setMessage(null), 3000);
    setShowForm(false);
  };

  const handleDeleteLink = (id: string) => {
    const linkToDelete = links.find((l) => l.id === id);
    if (window.confirm(`Are you sure you want to delete "${linkToDelete?.title}"?`)) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
      setMessage(`Link "${linkToDelete?.title}" deleted successfully!`);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link);
    setShowForm(true);
    setShowLinks(false);
    setShowSearch(false);
  };

  const handleUpdateLink = (updatedLink: LinkItem) => {
    setLinks((prev) => prev.map((l) => (l.id === updatedLink.id ? updatedLink : l)));
    setMessage(`Link "${updatedLink.title}" updated successfully!`);
    setTimeout(() => setMessage(null), 3000);
    setEditingLink(null);
    setShowForm(false);
  };

  const clearEditing = () => {
    setEditingLink(null);
    setShowForm(false);
  };

  const matchesQuery = (link: LinkItem, query: string) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const inTitle = link.title.toLowerCase().includes(q);
    const inUrl = link.url.toLowerCase().includes(q);
    const inDesc = link.description.toLowerCase().includes(q);
    const inTags = link.tags.some((t) => t.toLowerCase().includes(q));
    return inTitle || inUrl || inDesc || inTags;
  };

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
      <div className="options">
        <button
          className="option-btn"
          onClick={() => {
            setShowForm(true);
            setShowLinks(false);
            setShowSearch(false);
          }}
        >
          <IconComponent /> Add a Link
        </button>
        <button
          className="option-btn"
          onClick={() => {
            setShowLinks(true);
            setShowForm(false);
            setShowSearch(false);
          }}
        >
          <IconList /> View All Links
        </button>
        <button
          className="option-btn"
          onClick={() => {
            setShowSearch(true);
            setShowForm(false);
            setShowLinks(false);
          }}
        >
          <IconSearch /> Search Links
        </button>
      </div>
      {message && <p className="message">{message}</p>}
      {showSearch && (
        <div className="search-overlay visible">
          <div className="search-container">
            <button
              className="exit-btn"
              onClick={() => setShowSearch(false)}
            >
              <IconTimes />
            </button>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <LinkList
              links={filteredLinks}
              onEdit={handleEditLink}
              onDelete={handleDeleteLink}
              onTagClick={(tag) => setSearchTerm(tag)}
            />
          </div>
        </div>
      )}
      {showForm && (
        <div className="form-overlay visible">
          <div className="form-container">
            <button
              className="exit-btn"
              onClick={() => clearEditing()}
            >
              <IconTimes />
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
      {showLinks && (
        <div className="list-overlay visible">
          <div className="list-container">
            <button
              className="exit-btn"
              onClick={() => setShowLinks(false)}
            >
              <IconTimes />
            </button>
            <LinkList
              links={filteredLinks}
              onEdit={handleEditLink}
              onDelete={handleDeleteLink}
              onTagClick={(tag) => setSearchTerm(tag)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;