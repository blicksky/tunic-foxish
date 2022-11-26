import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { BlockEditor } from "./BlockEditor";
import { Edge } from "./Block";
import { Word } from "./Word";

export default function App() {
  const [highlightBlockEdges, setHighlightBlockEdges] = useState(false);
  const [highlightedBlockEdges, setHighlightedBlockEdges] = useState(new Set<Edge>());

  return (
    <div className="App">
      <BlockEditor onChange={setHighlightedBlockEdges} />
      <label>
        <input type="checkbox" onClick={(event) => { setHighlightBlockEdges(event.currentTarget.checked) }} /> Highlight Matches
      </label>
      <hr />
      <div className="words">
        <Word
          blockDefinitions={[
            "AB-AC",
            "AB-AC-AD-KM",
            "AC-DF",
            "AD-IK"
          ]}
          highlightedBlockEdges={highlightBlockEdges ? highlightedBlockEdges : undefined}
          text="notes"
        />

        <Word
          blockDefinitions={[
            "AB-AC-AD-KM",
            "AD-IK"
          ]}
          highlightedBlockEdges={highlightBlockEdges ? highlightedBlockEdges : undefined}
          text="world!"
        />
      </div>
    </div>
  );
}
