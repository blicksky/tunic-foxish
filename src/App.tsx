import "./styles.css";
import * as React from "react";
import { BlockEditor } from "./BlockEditor";
import { Word } from "./Word";

export default function App() {
  return (
    <div className="App">
      <BlockEditor />
      {/* <label>
        <input type="checkbox" /> Highlight
      </label> */}
      <hr />
      <div className="words">
        <Word
          blocks={[
            ["AB", "AC"],
            ["AB", "AC", "AD", "KM"],
            ["AC", "DF"],
            ["AD", "IK"]
          ]}
          text="notes"
        />

        <Word
          blocks={[
            ["AB", "AC", "AD", "KM"],
            ["AD", "IK"]
          ]}
          text="world!"
        />
      </div>
    </div>
  );
}
