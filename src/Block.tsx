import * as React from "react";

type Coord = {
  x: number;
  y: number;
};

enum PointId {
  A = "A", /*      A     -  row1 */
  B = "B", /*    ╱ │ ╲           */
  C = "C", /*  B   │   C -  row2 */
  D = "D", /*  │ ╲ │ ╱ │         */
  E = "E", /*  │   D   │ -  row3 */
  F = "F", /*  │ ╱ │ ╲ │         */
  G = "G", /*  E   F   G -  row4 */
  H = "H", /*  =========         */
  I = "I", /*  H   I   J -  row5 */
  J = "J", /*  │ ╱ │ ╲ │         */
  K = "K", /*  K   │   L -  row6 */
  L = "L", /*    ╲ │ ╱           */
  M = "M", /*      M     -  row7 */
  /*           ╷   ╷   ╷         */
  /*        col1  col2 col3      */
}

const enum Col {
  _1 = 4,
  _2 = 52,
  _3 = 100
}

const enum Row {
  _1 = 2,
  _2 = 34,
  _3 = 66,
  _4 = 98,
  _5 = 120,
  _6 = 152,
  _7 = 184
}

const points: Record<PointId, Coord> = {
  [PointId.A]: { x: Col._2, y: Row._1 },
  [PointId.B]: { x: Col._1, y: Row._2 },
  [PointId.C]: { x: Col._3, y: Row._2 },
  [PointId.D]: { x: Col._2, y: Row._3 },
  [PointId.E]: { x: Col._1, y: Row._4 },
  [PointId.F]: { x: Col._2, y: Row._4 },
  [PointId.G]: { x: Col._3, y: Row._4 },
  [PointId.H]: { x: Col._1, y: Row._5 },
  [PointId.I]: { x: Col._2, y: Row._5 },
  [PointId.J]: { x: Col._3, y: Row._5 },
  [PointId.K]: { x: Col._1, y: Row._6 },
  [PointId.L]: { x: Col._3, y: Row._6 },
  [PointId.M]: { x: Col._2, y: Row._7 }
} as const;

enum Edge {
  "AB" = PointId.A + PointId.B,
  "AC" = PointId.A + PointId.C,
  "AD" = PointId.A + PointId.D,
  "BD" = PointId.B + PointId.D,
  "BE" = PointId.B + PointId.E,
  "CD" = PointId.C + PointId.D,
  "CG" = PointId.C + PointId.G,
  "DE" = PointId.D + PointId.E,
  "DF" = PointId.D + PointId.F,
  "DG" = PointId.D + PointId.G,
  "HK" = PointId.H + PointId.K,
  "IK" = PointId.I + PointId.K,
  "IL" = PointId.I + PointId.L,
  "IM" = PointId.I + PointId.M,
  "JL" = PointId.J + PointId.L,
  "KM" = PointId.K + PointId.M,
  "LM" = PointId.L + PointId.M
}

type EnumObject = { [key: string]: number | string };
type EnumObjectEnum<E extends EnumObject> = E extends { [key: string]: infer ET | string } ? ET : never;

function getEnumValues<E extends EnumObject>(enumObject: E): EnumObjectEnum<E>[] {
  return Object.keys(enumObject)
    .filter(key => Number.isNaN(Number(key)))
    .map(key => enumObject[key] as EnumObjectEnum<E>);
}

const allEdges = getEnumValues(Edge);

const buildSvgPathDefinition = (edge: Edge): string => {
  const startPointName = edge[0] as PointId;
  const endPointName = edge[1] as PointId;

  const start = points[startPointName];
  const end = points[endPointName];
  if (!start || !end) {
    throw new Error();
  }

  return `M${start.x} ${start.y}L${end.x} ${end.y}`;
};

type SegmentProps = {
  edge: Edge;
  isFilled: boolean;
};
const Segment = ({ edge, isFilled }: SegmentProps) => (
  <path
    className="segment"
    d={buildSvgPathDefinition(edge)}
    stroke={isFilled ? "#000000" : "#E6E6E6"}
    strokeDasharray={isFilled ? "" : "1 6"}
    strokeWidth={3}
    strokeMiterlimit={0}
    strokeLinecap="round"
    strokeLinejoin="bevel"
  />
);

type SegmentHitBoxProps = {
  edge: Edge;
  onClick?: (edge: Edge) => void;
};
const SegmentHitBox = ({ edge, onClick }: SegmentHitBoxProps) => (
  <path
    className="segment-hit-box"
    d={buildSvgPathDefinition(edge)}
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

type BlockProps = {
  edges: Set<Edge>;
  isHighlighted?: boolean;
  label?: string;
  onEdgeClick?: (edge: Edge) => void;
};
const Block = ({ edges = new Set(), isHighlighted = false, label, onEdgeClick }: BlockProps) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 104 226`}
      fill="none"
      className={`block ${isHighlighted ? "highlighted" : ""}`}
    >
      {allEdges.map((edge) => (
        <Segment edge={edge} isFilled={false} key={`${edge}`} />
      ))}
      {Array.from(edges).map((edge) => (
        <Segment edge={edge} isFilled={true} key={`${edge}`} />
      ))}
      <CenterLine />
      {Object.entries(points).map(([pointId, { x, y }]) => <text key={pointId} x={x - 4} y={y + 12}>{pointId}</text>)}
      {onEdgeClick
        ? allEdges.map((edge) => (
          <SegmentHitBox edge={edge} onClick={onEdgeClick} key={`${edge}`} />
        ))
        : null}
      <text className="label" x="40" y={Row._7 + 35}>{label}</text>
    </svg>
  );
};

export { Block, Edge };
