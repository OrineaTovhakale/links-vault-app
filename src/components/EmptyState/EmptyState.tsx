
import React from "react";
import { FaLink, FaSearch, FaInbox } from "react-icons/fa";

// Type assertion for icons
const IconLink = FaLink as React.FC<React.SVGProps<SVGSVGElement>>;
const IconSearch = FaSearch as React.FC<React.SVGProps<SVGSVGElement>>;
const IconInbox = FaInbox as React.FC<React.SVGProps<SVGSVGElement>>;

interface EmptyStateProps {
  type: "no-links" | "no-results" | "default";
  searchTerm?: string;
  onAction?: () => void;
  actionText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  searchTerm,
  onAction,
  actionText = "Add Your First Link",
}) => {
  const renderContent = () => {
    switch (type) {
      case "no-links":
        return (
          <>
            <div className="empty-icon">
              <IconLink aria-hidden="true" />
            </div>
            <h2 className="empty-title">No Links Yet</h2>
            <p className="empty-description">
              Start building your personal link library! Add your first link to get started.
            </p>
            {onAction && (
              <button className="button empty-action" onClick={onAction}>
                {actionText}
              </button>
            )}
          </>
        );

      case "no-results":
        return (
          <>
            <div className="empty-icon">
              <IconSearch aria-hidden="true" />
            </div>
            <h2 className="empty-title">No Results Found</h2>
            <p className="empty-description">
              No links match your search for "<strong>{searchTerm}</strong>".
              <br />
              Try different keywords or check your spelling.
            </p>
          </>
        );

      default:
        return (
          <>
            <div className="empty-icon">
              <IconInbox aria-hidden="true" />
            </div>
            <h2 className="empty-title">Nothing Here</h2>
            <p className="empty-description">
              There's nothing to display at the moment.
            </p>
          </>
        );
    }
  };

  return (
    <div className="empty-state">
      {renderContent()}
    </div>
  );
};

export default EmptyState;