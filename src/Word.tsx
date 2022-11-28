import * as React from "react";
import { Block, Edge } from "./Block";

export type BlockDefinition = string

export const toEdgeSet = (blockDefinition: BlockDefinition): Set<Edge> => {
  return new Set(blockDefinition?.split('-').map((part) => Edge[part as keyof typeof Edge]))
}

const areSetsEqual = (set1: Set<any>, set2: Set<any>) => set1.size === set2.size && Array.from(set1).every((element) => set2.has(element))

export function Word({
  blockDefinitions,
  highlightedBlockEdges,
  text = ""
}: {
  blockDefinitions: readonly BlockDefinition[];
  highlightedBlockEdges?: Set<Edge>;
  text: string;
}) {
  return (
    <span className="word">
      {blockDefinitions.map((blockDefinition, index) => {
        const edges = toEdgeSet(blockDefinition);

        return (
          <Block key={index} edges={edges} isHighlighted={highlightedBlockEdges && areSetsEqual(highlightedBlockEdges, edges)} />
        );
      })}
      <span className="text">{text}</span>
    </span>
  );
}
