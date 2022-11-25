import * as React from "react";
import { useReducer } from "react";
import { Block } from "./Block";

const reduce = (
  prevEdges: Set<string>,
  action: { type: "toggle"; edge: string } | { type: "clear" }
) => {
  if (action.type === "toggle") {
    const newEdges = new Set(prevEdges);

    if (prevEdges.has(action.edge)) {
      newEdges.delete(action.edge);
    } else {
      newEdges.add(action.edge);
    }

    return newEdges;
  } else if (action.type === "clear") {
    return new Set<string>();
  } else {
    throw new Error();
  }
};
export const BlockEditor = () => {
  const [edges, dispatch] = useReducer(reduce, new Set<string>());

  return (
    <div className="editor">
      <Block
        edges={Array.from(edges)}
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
