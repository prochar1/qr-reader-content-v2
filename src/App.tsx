import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Page from "./Page";
import QrScanner from "./QrScanner";

type PageNode = {
  id: string;
  title: string;
  content: string;
  children?: PageNode[];
};

// Rozšíření Window interface pro TypeScript
declare global {
  interface Window {
    APP_DATA: {
      pages: PageNode[];
    };
  }
}

function findPageById(pages: PageNode[], id: string): PageNode | undefined {
  for (const page of pages) {
    if (page.id.toLocaleLowerCase() === id.toLocaleLowerCase()) return page;
    if (page.children) {
      const found = findPageById(page.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

export default function App() {
  const [structureData, setStructureData] = useState<{
    pages: PageNode[];
  } | null>(null);
  const [currentId, setCurrentId] = useState<string>("home");
  const [currentContent, setCurrentContent] = useState<string>("");

  useEffect(() => {
    console.log("Checking for APP_DATA...", window.APP_DATA);
    // Počkáme, až se načte externí data.js soubor
    const checkData = () => {
      if (window.APP_DATA) {
        setStructureData(window.APP_DATA);
        // Nastavíme výchozí stránku
        const home = findPageById(window.APP_DATA.pages, "home");
        if (home) {
          setCurrentContent(home.content);
        }
      } else {
        // Pokud data ještě nejsou načtena, zkusíme to znovu za chvíli
        setTimeout(checkData, 100);
      }
    };

    checkData();
  }, []);

  const handleNavigate = (id: string) => {
    if (!structureData) return;

    const page = findPageById(structureData.pages, id);
    if (page) {
      setCurrentId(id);
      setCurrentContent(page.content);
      console.log("Navigace na stránku:", page.title);
    } else {
      console.warn("Stránka s ID", id, "nebyla nalezena");
    }
  };

  const handleQrScan = (scannedId: string) => {
    handleNavigate(scannedId);
  };

  // Zobrazíme loading, dokud se data nenačtou
  if (!structureData) {
    return <div></div>;
  }

  return (
    <div
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <QrScanner onScan={handleQrScan} showDebug={true} />

      <nav>
        <Navigation
          pages={structureData.pages}
          currentId={currentId}
          onNavigate={handleNavigate}
        />
      </nav>
      <main>
        <Page content={currentContent} />
      </main>
    </div>
  );
}
