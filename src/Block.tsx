import * as React from "react";

type Point = {
  x: number;
  y: number;
};

type PointName =
  | "A" /*      A     -  row1 */
  | "B" /*    ╱ │ ╲           */
  | "C" /*  B   │   C -  row2 */
  | "D" /*  │ ╲ │ ╱ │         */
  | "E" /*  │   D   │ -  row3 */
  | "F" /*  │ ╱ │ ╲ │         */
  | "G" /*  E   F   G -  row4 */
  | "H" /*  =========         */
  | "I" /*  H   I   J -  row5 */
  | "J" /*  │ ╱ │ ╲ │         */
  | "K" /*  K   │   L -  row6 */
  | "L" /*    ╲ │ ╱           */
  | "M"; /*     M     -  row7 */
/*          ╷   ╷   ╷         */
/*       col1  col2 col3      */

const col1 = 4;
const col2 = 52;
const col3 = 100;

const row1 = 2;
const row2 = 34;
const row3 = 66;
const row4 = 98;
const row5 = 120;
const row6 = 152;
const row7 = 184;

const Points = new Map<PointName, Point>([
  ["A", { x: col2, y: row1 }],
  ["B", { x: col1, y: row2 }],
  ["C", { x: col3, y: row2 }],
  ["D", { x: col2, y: row3 }],
  ["E", { x: col1, y: row4 }],
  ["F", { x: col2, y: row4 }],
  ["G", { x: col3, y: row4 }],
  ["H", { x: col1, y: row5 }],
  ["I", { x: col2, y: row5 }],
  ["J", { x: col3, y: row5 }],
  ["K", { x: col1, y: row6 }],
  ["L", { x: col3, y: row6 }],
  ["M", { x: col2, y: row7 }]
]);

const buildPathDefinition = (edge: string): string => {
  const startPointName = edge[0] as PointName;
  const endPointName = edge[1] as PointName;

  const start = Points.get(startPointName);
  const end = Points.get(endPointName);
  if (!start || !end) {
    throw new Error();
  }

  return `M${start.x} ${start.y}L${end.x} ${end.y}`;
};

type SegmentProps = {
  edge: string;
  isFilled: boolean;
};
const Segment = ({ edge, isFilled }: SegmentProps) => (
  <path
    className="segment"
    d={buildPathDefinition(edge)}
    stroke={isFilled ? "#000000" : "#E6E6E6"}
    strokeDasharray={isFilled ? "" : "1 6"}
    strokeWidth={3}
    strokeMiterlimit={0}
    strokeLinecap="round"
    strokeLinejoin="bevel"
  />
);

type SegmentHitBoxProps = {
  edge: string;
  onClick?: (edge: string) => void;
};
const SegmentHitBox = ({ edge, onClick }: SegmentHitBoxProps) => (
  <path
    className="segment-hit-box"
    d={buildPathDefinition(edge)}
    stroke="transparent"
    strokeWidth={20}
    strokeMiterlimit={0}
    strokeLinecap="round"
    strokeLinejoin="bevel"
    onClick={() => {
      onClick?.(edge);
    }}
  />
);

const CenterLine = () => (
  <path
    d={"M4 98H100"}
    stroke="#1E1E1E"
    strokeWidth={8}
    strokeMiterlimit={0}
    strokeLinecap="round"
    strokeLinejoin="bevel"
  />
);

const allEdges = [
  "AB",
  "AC",
  "AD",
  "BD",
  "BE",
  "CD",
  "CG",
  "DE",
  "DF",
  "DG",
  "HK",
  "IK",
  "IL",
  "IM",
  "JL",
  "KM",
  "LM"
] as const;

type BlockProps = {
  edges: string[];
  onEdgeClick?: (edge: string) => void;
};
const Block = ({ edges = [], onEdgeClick }: BlockProps) => {
  const filledEdges = allEdges.filter((edge: string) => edges.includes(edge));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 104 196`}
      fill="none"
      className="block"
    >
      {allEdges.map((edge: string) => (
        <Segment edge={edge} isFilled={false} key={`${edge}`} />
      ))}
      {filledEdges.map((edge: string) => (
        <Segment edge={edge} isFilled={true} key={`${edge}`} />
      ))}
      <CenterLine />
      {onEdgeClick
        ? allEdges.map((edge: string) => (
            <SegmentHitBox edge={edge} onClick={onEdgeClick} key={`${edge}`} />
          ))
        : null}
    </svg>
  );
};

export { Block };
