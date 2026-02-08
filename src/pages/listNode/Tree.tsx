import { useState } from "react";

type Node = {
  id: number;
  text: string;
  open?: boolean;
  child?: Node[];
  loading?: boolean;
};

const TreeView = () => {
  const [data, setData] = useState<Node[]>([
    { id: 1, text: "Level A" },
    { id: 2, text: "Level B" },
  ]);

  const toggle = (item: Node) => {
    if (!item.child) {
      item.loading = true;
      setData([...data]);

      setTimeout(() => {
        item.child = [{ id: Date.now(), text: "Level A" }];
        item.loading = false;
        item.open = true;
        setData([...data]);
      }, 500);
    } else {
      item.open = !item.open;
      setData([...data]);
    }
  };

  const addNode = (item: Node) => {
    const name = prompt("Node name");
    if (!name) return;

    if (!item.child) item.child = [];
    item.child.push({ id: Date.now(), text: name });
    item.open = true;
    setData([...data]);
  };

  const removeNode = (list: Node[], id: number): Node[] =>
    list
      .filter((n) => n.id !== id)
      .map((n) =>
        n.child ? { ...n, child: removeNode(n.child, id) } : n
      );

  const render = (item: Node, level = 0) => (
    <div key={item.id} className="tree-node" style={{ marginLeft: level * 60 }}>
      <div className="tree-row position-relative d-flex align-items-center">
        {level > 0 && <span className="tree-line"></span>}

        <div
          className={`tree-circle ${level === 0 ? "root" : "child"}`}
          onClick={() => toggle(item)}
        >
          {item.text.charAt(0)}
        </div>

        <div className="tree-card shadow-sm">
          <span>{item.text}</span>

          <div className="tree-actions">
            <i
              className="bi bi-plus"
              onClick={() => addNode(item)}
            ></i>
            <i
              className="bi bi-trash"
              onClick={() => {
                if (confirm("Delete node?")) {
                  setData(removeNode(data, item.id));
                }
              }}
            ></i>
          </div>
        </div>
      </div>

      {item.loading && (
        <div className="tree-loading">
          <i className="bi bi-arrow-repeat spin me-1"></i> loading...
        </div>
      )}

      {item.open &&
        item.child &&
        item.child.map((c) => render(c, level + 1))}
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="card p-4 border-0">
        {data.map((x) => render(x))}
      </div>
    </div>
  );
};

export default TreeView;
