import { LinkItem } from "../types";

/**
 * Export links as JSON file
 */
export const exportLinks = (links: LinkItem[]): void => {
  const dataStr = JSON.stringify(links, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `links-vault-backup-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Import links from JSON file
 */
export const importLinks = (file: File): Promise<LinkItem[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        
        // Validate that it's an array
        if (!Array.isArray(parsed)) {
          reject(new Error("Invalid file format: expected an array of links"));
          return;
        }
        
        // Validate each link has required properties
        const isValid = parsed.every(
          (item) =>
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.url === "string" &&
            typeof item.description === "string" &&
            Array.isArray(item.tags)
        );
        
        if (!isValid) {
          reject(new Error("Invalid file format: missing required fields"));
          return;
        }
        
        resolve(parsed);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Sort links by different criteria
 */
export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

export const sortLinks = (links: LinkItem[], sortBy: SortOption): LinkItem[] => {
  const sorted = [...links];
  
  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    case "oldest":
      return sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
};