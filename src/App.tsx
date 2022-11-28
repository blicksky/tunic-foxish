import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { BlockEditor } from "./BlockEditor";
import { Block, Edge } from "./Block";
import { Word, toEdgeSet } from "./Word";

const W_press = () => (
  <Word blockDefinitions={[
    "CD-DF-IM",
    "AD-BE-CD-DF-IM-KM-LM",
    "AD-CD-DF-IK-IM"
  ]} text="press" />
)

const W_run = () => (
  <Word blockDefinitions={[
    "AB-AC-AD-CD-DF-IM",
    "BD-IK-IL"
  ]} text="run" />
)

const consonantSounds = {
  "B": "AD-DF-IL",
  "D": "AD-DF-IK-IL",
  "F": "CD-DF-IK-IM",
  "H": "AD-DF-IL-IM",
  "K": "AD-CD-DF-IL",
  "L": "AD-DF-IM",
  "N": "BD-IK-IL",
  "P": "CD-DF-IM",
  "R": "AD-CD-DF-IM",
  "S": "AD-CD-DF-IK-IM",
  "T": "BD-CD-DF-IM",
  "Th": "AD-DF-IK-IL-IM",
  "Z": "AD-BD-DF-IL-IM"
};

const vowelSounds = {
  "a": "AB-BE-HK",
  "ay": "AB",
  "e": "BE-KM-LM",
  "i": "KM-LM",
  "o": "AB-AC-BE-HK-KM-LM",
  "oo": "AB-AC-BE-KM",
  "u": "AB-AC"
}

const ConsonantSound = ({ sound }: { sound: string }) => (<Block edges={toEdgeSet(consonantSounds[sound])} label={sound} />);

const VowelSound = ({ sound }: { sound: string }) => (<Block edges={toEdgeSet(vowelSounds[sound])} label={sound} />);

const CompoundSound = ({ consonantSound, vowelSound }: { consonantSound: string, vowelSound: string }) => (
  <Block edges={toEdgeSet(`${consonantSounds[consonantSound]}-${vowelSounds[vowelSound]}`)} label={`${consonantSound}${vowelSound}`} />
);

const Sound = ({ sound }: { sound: string }) => {
  const result = sound?.split(',')
  console.log(result)

  if (result.length === 1) {
    if (result[0].toUpperCase() === result[0]) {
      return <ConsonantSound sound={result[0]} />
    }
    else {
      return <VowelSound sound={result[0]} />
    }
  } else {
    return (<CompoundSound consonantSound={result[0]} vowelSound={result[1]} />)
  }
}

const SoundWord = ({ sounds, text = "???" }: { sounds: string, text?: string }) => {
  const result = sounds.split("-");
  return (
    <span className="word">
      {result.map((item, index) => (<Sound key={index} sound={item} />))}
      <span className="text">{text}</span>
    </span>
  )
}

export default function App() {
  const [highlightBlockEdges, setHighlightBlockEdges] = useState(false);
  const [highlightedBlockEdges, setHighlightedBlockEdges] = useState(new Set<Edge>());

  type PageContent = Readonly<Record<number, any>>
  const pageContent: PageContent = {
    12: [
      <>
        <div className="content-section" title="banner">
          <SoundWord sounds="K,u-N-T-R,o-L-Z" text="controls" />
        </div>
      </>
    ],
    13: [
      <>
        <div className="content-section" title="banner - title">
          (A)
          <SoundWord sounds="B,u-T,o-N" text="button" />
        </div>

        <div className="content-section" title="banner - small">
          TODO
        </div>
        <br />
        <div className="content-section" title="top-left">
          <div className="content-section" title="header">
            <Word blockDefinitions={[
              "AB-BD-BE-CD-DF-HK-IM",
              "AD-CD-DF-IL"
            ]} text="check?" />
          </div>
          <div className="content-section" title="text">
            <Word blockDefinitions={[
              "AB-BD-BE-CD-DF-HK-IM",
              "AD-CD-DF-IL"
            ]} text="check?" />
            <SoundWord sounds="T,oo" text="to" />
            ??, ?? & ??.
          </div>
        </div>
        <div className="content-section" title="top-right">
          <div className="content-section" title="header">
            <SoundWord sounds="R,o-L" text="roll" />
          </div>
          <div className="content-section" title="text">
            <W_press />
            <SoundWord sounds="T,oo" text="to" />
            <SoundWord sounds="R,o-L" text="roll" />
            !<br />
            <Word blockDefinitions={[
              "AD-BD-BE-DF-HK-IL-JL-LM",
              "AB-BE-HK-KM-LM"
            ]} text="???" />
            <Word blockDefinitions={[
              "AD-BD-BE-DF-HK-IL-JL-LM",
              "AB-BE-HK-KM-LM"
            ]} text="???" />
            TODO
          </div>
          <br />
          <div className="content-section" title="(A) speech bubble">
            <W_press />!
          </div>
        </div>
        <br />
        <div className="content-section" title="bottom-left">
          <div className="content-section" title="header">
            <Word blockDefinitions={[
              "CD-DF-IM",
              "AB-AD-CD-DF-IM"
            ]} text="pray" />
          </div>
          <div className="content-section" title="text">
            TODO
          </div>
          <a href="#24">📄 24</a>
        </div>
        <div className="content-section" title="bottom-right">
          <div className="content-section" title="header">
            <W_run />
          </div>
          <div className="content-section" title="text">
            <W_press />
            &
            <Word blockDefinitions={[
              "AB-AC-AD-BE-DF-HK-IL-IM-KM-LM",
              "AD-DF-IM",
              "AD-DF-IK-IL"
            ]} text="hold" />
            <Word blockDefinitions={[
              "AB-AC-AD-DF-IK-IL-IM"
            ]} text="the" />
            <br />
            <SoundWord sounds="B,u-T,o-N" text="button" />
            <SoundWord sounds="T,oo" text="to" />
            <W_run />.
            TODO
          </div>
          <br />
          <div className="content-section" title="(A) speech bubble">
            <W_press />...
          </div>
          <div className="content-section" title="hold arrow">
            ... & HOLD
          </div>
        </div>
      </>
    ]
  }

  return (
    <div className="App">
      <div className="tool-panel">
        <BlockEditor onChange={setHighlightedBlockEdges} />
        <label>
          <input type="checkbox" onClick={(event) => { setHighlightBlockEdges(event.currentTarget.checked) }} /> Highlight Matches
        </label>
        <hr />
        <div id="known-blocks">
          Consonants
          <ol>
            {
              Object.keys(consonantSounds).map((sound) => (<li key={sound}><ConsonantSound sound={sound} /></li>))
            }
          </ol>
          <hr />
          Vowels
          <ol>
            {
              Object.keys(vowelSounds).map((sound) => (<li key={sound}><VowelSound sound={sound} /></li>))
            }
          </ol>
        </div>
      </div>
      <ol id="manual">
        <li>
          <div className="page-pair">
            <img className="left-page" src="images/manual/page00-table-of-contents.jpg" />
          </div>
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
        </li>
        {
          Array.from({ length: 50 / 2 }).map((_, pagePairIndex) => {
            const leftPageNumber = (pagePairIndex * 2) + 3;
            const rightPageNumber = leftPageNumber + 1;

            const padPageNumber = (pageNumber: number): string => pageNumber.toString().padStart(2, '0');

            return (<li key={pagePairIndex}>
              <div className="page-pair">
                <img id={padPageNumber(leftPageNumber)} className="left-page" src={`images/manual/page${padPageNumber(leftPageNumber)}.jpg`} />
                <img id={padPageNumber(rightPageNumber)} className="right-page" src={`images/manual/page${padPageNumber(rightPageNumber)}.jpg`} />
              </div>
              <div className="notes-pair">
                <div className="notes">{pageContent[leftPageNumber]}</div>
                <div className="notes">{pageContent[rightPageNumber]}</div>
              </div>
            </li>);
          })
        }
        <li>
          <div className="page-pair">
            <img className="left-page" src="images/manual/page53.jpg" />
          </div>
        </li>
      </ol>
    </div >
  );
}
