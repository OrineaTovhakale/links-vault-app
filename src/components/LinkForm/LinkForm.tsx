import React, { useState, useEffect, FormEvent } from "react";
import { LinkItem } from "../../types";
import { validateUrl, validateTitle, sanitizeInput, formatTags } from "../../utils";
import { MAX_TAGS, MAX_DESCRIPTION_LENGTH } from "../../constants";

// ... rest of your LinkForm.tsx code stays the same
// ... rest of your LinkForm.tsx code stays the same
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setTags(editingLink.tags.join(", "));
    } else {
      // Clear form when not editing
      setTitle("");
      setUrl("");
      setDescription("");
      setTags("");
    }
    setErrors({});
  }, [editingLink]);

  /**
   * Validate all form fields
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (!validateTitle(title)) {
      newErrors.title = "Title must be between 3 and 100 characters";
    }

    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!validateUrl(url)) {
      newErrors.url = "Please enter a valid URL (must start with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Create link object
    const updatedLink: LinkItem = {
      id: editingLink ? editingLink.id : `link-${Date.now()}`,
      title: sanitizeInput(title),
      url: url.trim(),
      description: sanitizeInput(description).slice(0, MAX_DESCRIPTION_LENGTH),
      tags: formatTags(tags, MAX_TAGS),
    };

    // Call appropriate handler
    if (editingLink) {
      onUpdate(updatedLink);
    } else {
      onAdd(updatedLink);
    }

    // Clear form
    clearEditing();
  };

  return (
    <form className={`form ${className || ""}`} onSubmit={handleSubmit}>
      <h2>{editingLink ? "Edit Link" : "Add New Link"}</h2>
      
      {/* Title input */}
      <div>
        <input
          className={`input ${errors.title ? 'input-error' : ''}`}
          type="text"
          placeholder="Enter Title *"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
          }}
          aria-label="Link title"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="error-message">{errors.title}</p>
        )}
      </div>

      {/* URL input */}
      <div>
        <input
          className={`input ${errors.url ? 'input-error' : ''}`}
          type="text"
          placeholder="Enter Link (URL) - e.g., https://example.com *"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (errors.url) setErrors(prev => ({ ...prev, url: '' }));
          }}
          aria-label="Link URL"
          aria-invalid={!!errors.url}
          aria-describedby={errors.url ? "url-error" : undefined}
        />
        {errors.url && (
          <p id="url-error" className="error-message">{errors.url}</p>
        )}
      </div>

      {/* Description textarea */}
      <textarea
        className="textarea"
        placeholder="Enter Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        aria-label="Link description"
        maxLength={MAX_DESCRIPTION_LENGTH}
      />
      <small className="char-count">
        {description.length}/{MAX_DESCRIPTION_LENGTH} characters
      </small>

      {/* Tags input */}
      <input
        className="input"
        type="text"
        placeholder="Enter Tags (comma-separated, e.g., work, tutorial, reference)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        aria-label="Link tags"
      />
      <small className="helper-text">
        Maximum {MAX_TAGS} tags. Tags will be automatically cleaned and validated.
      </small>

      {/* Action buttons */}
      <div className="form-actions">
        <button className="button" type="submit">
          {editingLink ? "Update Link" : "Save Link"}
        </button>
        <button type="button" className="cancel-btn" onClick={clearEditing}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LinkForm;