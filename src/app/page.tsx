"use client";
import { useState, useEffect } from "react";

interface FolderItem {
  type: string;
  name: string;
  // Add more properties as needed
}

export default function MyComponent() {
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        // Fetching folder listing directly from the public directory
        const response = await fetch("/menuItems");
        if (!response.ok) {
          throw new Error("ERROR");
        }
        const data: { items: FolderItem[] } = await response.json();

        const folderNames = data.items
          .filter((item) => item.type === "directory")
          .map((item) => item.name);

        setFolders(folderNames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching folders:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <h1>HELLO</h1>
      <div>
        <img src="public/next.svg" alt="Next.js Logo" />
        <h1>Menu Categories</h1>
        <ul>
          {folders.map((folder, index) => (
            <li key={index}>
              <button onClick={() => console.log(folder)}>{folder}</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
