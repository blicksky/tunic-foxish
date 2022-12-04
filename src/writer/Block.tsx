import * as React from "react";

type Coord = {
  x: number;
  y: number;
};

enum PointId {
  A = "A" /*      A     -  row1 */,
  B = "B" /*    ╱ │ ╲           */,
  C = "C" /*  B   │   C -  row2 */,
  D = "D" /*  │ ╲ │ ╱           */,
  E = "E" /*  │   D     -  row3 */,
  F = "F" /*  │   │             */,
  G = "G" /*  E===F===G -  row4 */,

  H = "H" /*  H   I     -  row5 */,
  I = "I" /*  │ ╱ │ ╲           */,
  K = "K" /*  K   │   L -  row6 */,
  L = "L" /*    ╲ │ ╱           */,
  M = "M" /*      M     -  row7 */
  /*          ╷   ╷   ╷         */
  /*       col1  col2 col3      */
}

const ColWidth = 48;
const Col1 = 4;
const Col2 = Col1 + ColWidth;
const Col3 = Col2 + ColWidth;

const EdgeRowHeight = 32;
const CenterLineMargin = 12;
const Row1 = 2;
const Row2 = Row1 + EdgeRowHeight;
const Row3 = Row2 + EdgeRowHeight;
const Row4 = Row3 + CenterLineMargin;
const Row5 = Row4 + CenterLineMargin;
const Row6 = Row5 + EdgeRowHeight;
const Row7 = Row6 + EdgeRowHeight;

const points: Record<PointId, Coord> = {
  [PointId.A]: { x: Col2, y: Row1 },
  [PointId.B]: { x: Col1, y: Row2 },
  [PointId.C]: { x: Col3, y: Row2 },
  [PointId.D]: { x: Col2, y: Row3 },
  [PointId.E]: { x: Col1, y: Row4 },
  [PointId.F]: { x: Col2, y: Row4 },
  [PointId.G]: { x: Col3, y: Row4 },
  [PointId.H]: { x: Col1, y: Row5 },
  [PointId.I]: { x: Col2, y: Row5 },
  [PointId.K]: { x: Col1, y: Row6 },
  [PointId.L]: { x: Col3, y: Row6 },
  [PointId.M]: { x: Col2, y: Row7 }
} as const;

enum Edge {
  "AB" = PointId.A + PointId.B,
  "AC" = PointId.A + PointId.C,
  "AD" = PointId.A + PointId.D,
  "BD" = PointId.B + PointId.D,
  "BE" = PointId.B + PointId.E,
  "CD" = PointId.C + PointId.D,
  "DF" = PointId.D + PointId.F,
  "HK" = PointId.H + PointId.K,
  "IK" = PointId.I + PointId.K,
  "IL" = PointId.I + PointId.L,
  "IM" = PointId.I + PointId.M,
  "KM" = PointId.K + PointId.M,
  "LM" = PointId.L + PointId.M
}

const VowelLine = {
  a: Edge.BE, // TODO combine with HK, because they are always together
  b: Edge.AB,
  c: Edge.AC,
  d: Edge.HK,
  e: Edge.KM,
  f: Edge.LM
} as const;

const ConsonantLine = {
  a: Edge.BD,
  b: Edge.AD,
  c: Edge.CD,
  d: Edge.IK,
  e: Edge.IM,
  f: Edge.IL
} as const;

type LineKey = keyof typeof VowelLine | keyof typeof ConsonantLine;

type OptionalLineKey<T extends LineKey> = T | "";
type BlockDefPart =
  `${OptionalLineKey<"a">}${OptionalLineKey<"b">}${OptionalLineKey<"c">}${OptionalLineKey<"d">}${OptionalLineKey<"e">}${OptionalLineKey<"f">}`;
type BlockDef = `${BlockDefPart}|${BlockDefPart}`;

const defToLines = (def: BlockDef): Set<Edge> => {
  const [vowelLines, consonantLines] = def.split("|") as [
    BlockDefPart,
    BlockDefPart
  ];

  const vowelEdges = Array.from(vowelLines, (line) => VowelLine[line] as Edge);
  const consonantEdges = Array.from(
    consonantLines,
    (line) => ConsonantLine[line] as Edge
  );

  return new Set(vowelEdges.concat(consonantEdges));
};

type EnumObject = { [key: string]: number | string };
type EnumObjectEnum<E extends EnumObject> = E extends {
  [key: string]: infer ET | string;
}
  ? ET
  : never;

function getEnumValues<E extends EnumObject>(
  enumObject: E
): EnumObjectEnum<E>[] {
  return Object.keys(enumObject)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => enumObject[key] as EnumObjectEnum<E>);
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

const CenterLine = () => (
  <path
    d={`M4 ${Row4}H100`}
    stroke="#1E1E1E"
    strokeWidth={8}
    strokeMiterlimit={0}
    strokeLinecap="round"
    strokeLinejoin="bevel"
  />
);

type BlockProps = {
  definition: BlockDef;
  label?: string;
};
const Block = ({ definition = "|", label }: BlockProps) => {
  const edges = defToLines(definition);

  if (
    (edges.has(Edge.BD) || edges.has(Edge.AD) || edges.has(Edge.CD)) &&
    (edges.has(Edge.IK) || edges.has(Edge.IM) || edges.has(Edge.IL))
  ) {
    edges.add(Edge.DF);
  }

  return (
    <div className="block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 104 186`}
        fill="none"
      >
        {allEdges.map((edge) => (
          <Segment edge={edge} isFilled={false} key={edge} />
        ))}
        {Array.from(edges).map((edge) => (
          <Segment edge={edge} isFilled={true} key={edge} />
        ))}
        <CenterLine />
      </svg>
      <span className="label">{label}</span>
    </div>
  );
};

export { Block, BlockDef };
