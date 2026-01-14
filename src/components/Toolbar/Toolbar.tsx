import React, { useRef } from "react";
import { FaDownload, FaUpload, FaSortAmountDown } from "react-icons/fa";
import { SortOption } from "../../utils";

// Type assertions
const IconDownload = FaDownload as React.FC<React.SVGProps<SVGSVGElement>>;
const IconUpload = FaUpload as React.FC<React.SVGProps<SVGSVGElement>>;
const IconSort = FaSortAmountDown as React.FC<React.SVGProps<SVGSVGElement>>;

interface ToolbarProps {
  onExport: () => void;
  onImport: (file: File) => void;
  onSortChange: (sortBy: SortOption) => void;
  currentSort: SortOption;
  totalLinks: number;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onExport,
  onImport,
  onSortChange,
  currentSort,
  totalLinks,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset input so same file can be selected again
      e.target.value = "";
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-info">
        <span className="link-count">
          {totalLinks} {totalLinks === 1 ? "link" : "links"}
        </span>
      </div>

      <div className="toolbar-actions">
        {/* Sort dropdown */}
        <div className="toolbar-group">
          <IconSort aria-hidden="true" />
          <select
            className="toolbar-select"
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort links"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>

        {/* Export button */}
        <button
          className="toolbar-btn"
          onClick={onExport}
          disabled={totalLinks === 0}
          title="Export links as JSON"
        >
          <IconDownload aria-hidden="true" />
          <span>Export</span>
        </button>

        {/* Import button */}
        <button
          className="toolbar-btn"
          onClick={handleImportClick}
          title="Import links from JSON"
        >
          <IconUpload aria-hidden="true" />
          <span>Import</span>
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: "none" }}
          aria-label="Import file"
        />
      </div>
    </div>
  );
};

export default Toolbar;