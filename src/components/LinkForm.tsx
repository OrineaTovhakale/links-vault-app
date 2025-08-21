import React, { useState, useEffect, FormEvent } from "react";
import { LinkItem } from "../types";

interface LinkFormProps {
  onAdd: (link: LinkItem) => void;
  onUpdate: (link: LinkItem) => void;
  editingLink: LinkItem | null;
  clearEditing: () => void;
  className?: string;
}

const LinkForm: React.FC<LinkFormProps> = ({
  onAdd,
  onUpdate,
  editingLink,
  clearEditing,
  className,
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setTags(editingLink.tags.join(", "));
    } else {
      setTitle("");
      setUrl("");
      setDescription("");
      setTags("");
    }
  }, [editingLink]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      alert("Title and URL are required!");
      return;
    }

    const updatedLink: LinkItem = {
      id: editingLink ? editingLink.id : Date.now().toString(),
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
      tags: tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
    };

    if (editingLink) {
      onUpdate(updatedLink); // Call update function
    } else {
      onAdd(updatedLink); // Call add function
    }

    // Clear form and exit edit mode
    clearEditing();
  };

  return (
    <form className={`form ${className || ""}`} onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Enter Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input"
        type="url"
        placeholder="Enter Link (URL) *"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        className="textarea"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div>
        <button className="button" type="submit">
          {editingLink ? "Update Link" : "Save Link"}
        </button>
        {editingLink && (
          <button type="button" className="cancel-btn" onClick={clearEditing}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default LinkForm;