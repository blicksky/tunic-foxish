import * as React from "react";
import { useReducer } from "react";
import { Block, Edge } from "./Block";

const toggleEdges = (edges: Set<Edge>, edge: Edge): Set<Edge> => {
  const updatedEdges = new Set(edges);

  if (edges.has(edge)) {
    updatedEdges.delete(edge);
  } else {
    updatedEdges.add(edge);
  }

  return updatedEdges;
}

type BlockEditorProps = {
  onChange?: (blockDefinition: Set<Edge>) => void;
}
export const BlockEditor = ({ onChange }: BlockEditorProps) => {
  const reduce = (
    prevEdges: Set<Edge>,
    action: { type: "toggle"; edge: Edge } | { type: "clear" }
  ) => {
    let newEdges;

    switch (action.type) {
      case "toggle":
        newEdges = toggleEdges(prevEdges, action.edge);
        break;
      case "clear":
        newEdges = new Set<Edge>();
        break;
      default:
        throw new Error();
    }

    onChange?.(newEdges);

    return newEdges;
  };

  const [edges, dispatch] = useReducer(reduce, new Set<Edge>());

  return (
    <div className="editor">
      <Block
        edges={edges}
        onEdgeClick={(edge) => {
          dispatch({ type: "toggle", edge });
        }}
      />
      <div className="panel">
        <span className="definition">
          {Array.from(edges).sort().join("-")}&nbsp;
        </span>
        <div className="actions">
          <button
            onClick={() => {
              dispatch({ type: "clear" });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
