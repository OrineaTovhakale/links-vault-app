import React from "react";
import { LinkItem } from "../../types";

interface LinkListProps {
  links: LinkItem[];
  onEdit: (link: LinkItem) => void;
  onDelete: (id: string) => void;
  onTagClick?: (tag: string) => void;
  className?: string;
}

const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete, onTagClick, className }) => {
  if (links.length === 0) {
    return <p style={{ textAlign: "center" }}>No links saved yet.</p>;
  }

  return (
    <div className={`list ${className || ""}`}>
      {links.map((link) => (
        <div key={link.id} className="card">
          <h3>{link.title}</h3>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.url}
          </a>
          <p>{link.description}</p>
          {link.tags.length > 0 && (
            <div className="tags-row" aria-label="tags">
              {link.tags.map((t: string) => (
                <button
                  key={t}
                  className="tag"
                  onClick={() => onTagClick?.(t)}
                  title={`Filter by '${t}'`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
          <div className="actions">
            <button className="edit-btn" onClick={() => onEdit(link)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(link.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkList;