import * as React from "react";
import { Block } from "./Block";

export function Word({
  blocks,
  text = ""
}: {
  blocks: string[][];
  text: string;
}) {
  return (
    <>
      <span className="word">
        {blocks.map((blockEdges, index) => (
          <Block key={index} edges={blockEdges} />
        ))}
        <span className="text">{text}</span>
      </span>
    </>
  );
}
