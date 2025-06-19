type PageNode = {
  id: string;
  title: string;
  content: string;
  children?: PageNode[];
};

type NavigationProps = {
  pages: PageNode[];
  currentId: string;
  onNavigate: (id: string) => void;
};

function renderMenu(
  pages: PageNode[],
  currentId: string,
  onNavigate: NavigationProps["onNavigate"],
  level: number = 0
) {
  return (
    <ul style={{ paddingLeft: level * 20, listStyle: "none" }}>
      {pages.map((page) => (
        <li key={page.id} style={{ marginBottom: 8 }}>
          <button
            style={{
              fontWeight: page.id === currentId ? "bold" : "normal",
              background: page.id === currentId ? "#e3f2fd" : "transparent",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              borderRadius: 4,
            }}
            onClick={() => onNavigate(page.id)}
          >
            [{page.id}] {page.title}
          </button>
          {page.children &&
            renderMenu(page.children, currentId, onNavigate, level + 1)}
        </li>
      ))}
    </ul>
  );
}

export default function Navigation(props: NavigationProps) {
  return renderMenu(props.pages, props.currentId, props.onNavigate);
}
