import "./styles.css";
import * as React from "react";
import { BlockEditor } from "./BlockEditor";
import { Block, Edge } from "./Block";
import { Word, toEdgeSet } from "./Word";

const consonantSounds = {
  "B": "AD-DF-IL",
  "Ch": "BD-DF-IM",
  "D": "AD-DF-IK-IL",
  "F": "CD-DF-IK-IM",
  "G": "CD-DF-IL-IM",
  "H": "AD-DF-IL-IM",
  "J": "AD-IK",
  "K": "AD-CD-DF-IL",
  "L": "AD-DF-IM",
  "M": "IK-IL",
  "N": "BD-IK-IL",
  "Ng": "AD-BD-CD-DF-IK-IL-IM",
  "P": "CD-DF-IM",
  "R": "AD-CD-DF-IM",
  "S": "AD-CD-DF-IK-IM",
  "Sh": "BD-CD-DF-IK-IL-IM",
  "T": "BD-CD-DF-IM",
  "Th": "AD-DF-IK-IL-IM",
  "Dh": "AD-BD-CD-DF-IM",
  "V": "AD-BD-DF-IL",
  "W": "BD-CD",
  "Y": "AD-BD-DF-IM",
  "Z": "AD-BD-DF-IL-IM",
  "Zh": "AD-BD-CD-DF-IK-IL"
};

const vowelSounds = {
  "a": "AB-BE-HK",
  "aa": "AB-AC-BE-HK",
  "ar": "AB-AC-KM-LM",
  "ay": "AB", // (b)ay
  "e": "BE-HK-KM-LM", // eh
  "er": "BE-HK-LM", // air
  "err": "AC-BE-HK-KM-LM",
  "ia": "BE-HK-KM", // (th)ai
  "ee": "AB-BE-HK-KM-LM",
  "eer": "AB-BE-HK-LM",
  "i": "KM-LM",
  "iy": "AC",
  "o": "AB-AC-BE-HK-KM-LM",
  "or": "AB-AC-BE-HK-LM",
  "oo": "AB-AC-BE-HK-KM",
  "ow": "LM",
  "u": "AB-AC",
  "?": "LM"
}

const ConsonantSound = ({ sound }: { sound: string }) => (<Block edges={toEdgeSet(consonantSounds[sound])} label={sound} />);

const VowelSound = ({ sound }: { sound: string }) => (<Block edges={toEdgeSet(vowelSounds[sound])} label={sound} />);

const CompoundSound = ({ consonantSound, vowelSound }: { consonantSound: string, vowelSound: string }) => (
  <Block edges={toEdgeSet(`${consonantSounds[consonantSound]}-${vowelSounds[vowelSound]}`)} label={`${consonantSound}${vowelSound}`} />
);

const Sound = ({ sound }: { sound: string }) => {
  const result = sound?.split(',')

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
  type PageContent = Readonly<Record<number, any>>
  const pageContent: PageContent = {
    11: [
      <>
        <div className="section" title="🦊">
          <SoundWord sounds="R,oo-N,i" text="ruin" />
          <SoundWord sounds="S,ee-K,err" text="seeker" />
          (<SoundWord sounds="Y,oo" text="you" />)
        </div>
        <br />
        <div className="section" title="">
          <SoundWord sounds="S-T-R,ay-N-J" text="strange" />
          <SoundWord sounds="G,ay-T" text="gate" />
          <SoundWord sounds="T,oo" text="to" />
          <SoundWord sounds="Th,u" text="the" />
          <SoundWord sounds="F,ar" text="far" />
          <SoundWord sounds="Sh,or" text="shore" />
        </div>
        <br />
        <div className="section" title="IMPORTANT!">
          <SoundWord sounds="K,e-P" text="keep" />
          <SoundWord sounds="Y,or" text="your" />
          <SoundWord sounds="iy" text="eye" />
          <SoundWord sounds="N,a" text="on" />
          <SoundWord sounds="Y,or" text="your" />
          STAMINA-POINTS!
          <br />
          <SoundWord sounds="W,e-N" text="when" />
          <SoundWord sounds="Y,oo" text="you" />
          <SoundWord sounds="H,aa-V" text="have" />
          0 SP
          <SoundWord sounds="Y,oo" text="you" />
          <SoundWord sounds="ar" text="are" />
          <SoundWord sounds="N,i" text="in" />
          <span color="red"><SoundWord sounds="D,ay-N-J,err" text="danger" /></span>
        </div>
      </>
    ],
    12: [
      <>
        <div className="section" title="banner">
          <SoundWord sounds="K,u-N-T-R,o-L-Z" text="controls" />
        </div>
        <br />
        <div className="section" title="(ZL|">
          <SoundWord sounds="F,o-K,u" text="focus" /> (ZL)
          <br />
          (!)
          <SoundWord sounds="F,o-K,u-S" text="focus" />
          <SoundWord sounds="Z,i" text="is" />
          <SoundWord sounds="K-R,oo-Sh,ia-L" text="crucial" />
          !
          <a href="#24">📄 14</a>
        </div>
        <div className="section" title="|ZR)">
          <SoundWord sounds="Sh,ee-L-D" text="shield" />
        </div>
        <br />
        <div className="section" title="(L|">
          <SoundWord sounds="N,i-V,e-N-T,or" text="inventory" />
          /
          <SoundWord sounds="G,eer" text="gear" />
        </div>
        <div className="section" title="|R)">
          <SoundWord sounds="P,o-Sh,u-N" text="potion" />
          <a href="#17">📄 17</a>
        </div>
        <br />
        <div className="section" title="(L)">
          <SoundWord sounds="M,oo-V" text="move" />
        </div>
        <div className="section" title="(Y)(B)(X)">
          <SoundWord sounds="Y,oo-Z" text="use" />
          <SoundWord sounds="T,iy-M,e" text="item" />
        </div>
        <br />
        <div className="section" title="(A)">
          <SoundWord sounds="R,o-L" text="run" />
          ,
          <SoundWord sounds="R,u-N" text="roll" />
          ,
          <SoundWord sounds="T,a-K" text="talk" />
        </div>
      </>
    ],
    13: [
      <>
        <div className="section" title="banner - title">
          (A)
          <SoundWord sounds="B,u-T,i-N" text="button" />
        </div>

        <div className="section" title="banner - small">
          <SoundWord sounds="Th,i-S" text="this" />
          <SoundWord sounds="B,u-T,i-N" text="button" />
          <SoundWord sounds="H,a-Z" text="has" />
          <SoundWord sounds="M,e-N,ee" text="many" />
          <SoundWord sounds="Y,oo-S,i-Z" text="uses" />
          .
          <br />
          TODO
        </div>
        <br />
        <div className="section" title="top-left">
          <div className="section" title="header">
            <SoundWord sounds="T,a-K" text="talk" />
          </div>
          <div className="section" title="text">
            <SoundWord sounds="T,a-K" text="talk" />
            <SoundWord sounds="T,oo" text="to" />
            <SoundWord sounds="S,iy-N-Z" text="signs" />
            ?? & ??.
          </div>
        </div>
        <div className="section" title="top-right">
          <div className="section" title="header">
            <SoundWord sounds="R,o-L" text="roll" />
          </div>
          <div className="section" title="text">
            <SoundWord sounds="P-R,e-S" text="press" />
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
          <div className="section" title="(A) speech bubble">
            <SoundWord sounds="P-R,e-S" text="press" />!
          </div>
        </div>
        <br />
        <div className="section" title="bottom-left">
          <div className="section" title="header">
            <SoundWord sounds="P-R,ay" text="pray" />
          </div>
          <div className="section" title="text">
            <SoundWord sounds="F,or-B,i-D,i-N" text="forbidden" />
            <SoundWord sounds="T,e-K-N,ee-K" text="technique" />
            .
            <br />
            TODO
          </div>
          <a href="#24">📄 24</a>
        </div>
        <div className="section" title="bottom-right">
          <div className="section" title="header">
            <SoundWord sounds="R,u-N" text="run" />
          </div>
          <div className="section" title="text">
            <SoundWord sounds="P-R,e-S" text="press" />
            &
            <SoundWord sounds="H,o-L-D" text="hold" />
            <SoundWord sounds="Th,u" text="the" />
            <br />
            <SoundWord sounds="B,u-T,i-N" text="button" />
            <SoundWord sounds="T,oo" text="to" />
            <SoundWord sounds="R,u-N" text="run" />
            .
            TODO
          </div>
          <br />
          <div className="section" title="(A) speech bubble">
            <SoundWord sounds="P-R,e-S" text="press" />
            ...
          </div>
          <div className="section" title="hold arrow">
            ... & HOLD
          </div>
        </div>
      </>,
    ],
    14: [
      <>
        <div className="section" title="banner - small">
          <SoundWord sounds="Th,i-S" text="this" />
          <SoundWord sounds="B,u-T,i-N" text="button" />
          <SoundWord sounds="H,a-Z" text="has" />
          <SoundWord sounds="W,u-N" text="one" />
          <SoundWord sounds="M,ay-N" text="main" />
          <SoundWord sounds="Y,oo-S" text="use" />
          ,
          <br />
          <SoundWord sounds="B,u-T" text="but" />
          <SoundWord sounds="T,i" text="it" />
          <SoundWord sounds="Z,i" text="is" />
          <SoundWord sounds="u" text="a" />
          ?
          <SoundWord sounds="Y,oo-S" text="use" />
          .
          <br />
          <SoundWord sounds="Y,oo-Z" text="use" />
          <SoundWord sounds="T,i" text="it" />
          <SoundWord sounds="L,a" text="all" />
          <SoundWord sounds="Th,u" text="the" />
          <SoundWord sounds="T,ay-M" text="time" />
          ,
          ?
          ?
          !
        </div>
        <div className="section" title="banner - title">
          (ZL)
          <SoundWord sounds="B,u-T,i-N" text="button" />
        </div>
        <br />
        <div className="section" title="">
          <div className="section" title="header">
            <SoundWord sounds="L,a-K" text="lock" />
          </div>
          <div className="section" title="FACE YOUR ADVERSARIES">
            <SoundWord sounds="H,o-L-D" text="hold" />
            <SoundWord sounds="Th,i-S" text="this" />
            <SoundWord sounds="T,oo" text="to" />
            <SoundWord sounds="F,o-K,u-S" text="focus" />
            <SoundWord sounds="N,a" text="on" />
            <SoundWord sounds="u" text="a" />
            <SoundWord sounds="N,eer-B,iy" text="nearby" />
            <SoundWord sounds="F,o" text="foe" />
          </div>
          <br />
          <div className="section" title="FOCUS & EVADE">
            TODO
            <SoundWord sounds="R,e-D,ee" text="ready" />
            <SoundWord sounds="T,oo" text="to" />
            <SoundWord sounds="S-T-R,iy-K" text="strike" />
          </div>
          <br />
          <div className="section" title="FOCUS & BLOCK">
            TODO
          </div>
        </div>


      </>
    ],
    40: [
      <>
        <div className="section" title="1">
          <SoundWord sounds="Th,u" text="the" />
          <SoundWord sounds="S,ow-N-D" text="sound" />
          <SoundWord sounds="V,u" text="of" />
          <SoundWord sounds="Ch,aa-N-T,i-Ng" text="chanting" />
          <SoundWord sounds="N,i" text="in" />
          <SoundWord sounds="Th,ee" text="the" />
          <SoundWord sounds="er" text="air" />.??
        </div>
        <br />
        <div className="section" title="8">
          <SoundWord sounds="u" text="a" />
          <SoundWord sounds="M,oo-N-L,iy-T" text="moonlight" />
          <SoundWord sounds="B-R,i-J" text="bridge" />
          <SoundWord sounds="B-L,a-K-S" text="blocks" />
          <SoundWord sounds="K,aa-S,e-S" text="access" />
          <SoundWord sounds="T,oo" text="to" />
          <SoundWord sounds="u" text="a" />
          <SoundWord sounds="T-R,e-Zh,err" text="treasure" />.
        </div>
        <div className="section" title="9">
          <SoundWord sounds="Th,u" text="the" />
          <SoundWord sounds="Ch,aa-L,i-S" text="chalice" />
          /
          <SoundWord sounds="V,e-S,ia-L" text="vessel" />
        </div>
        <br />
        <div className="section" title="13">
          <SoundWord sounds="G,a-N-T-L,e-T" text="gauntlet" />
          <SoundWord sounds="W,i-Dh" text="with" /> {/* Why is `Dh` not rendering when it's on it's own? */}
          6
          <SoundWord sounds="Ch,aa-L,e-N-J,i-Z" text="challenges" />
        </div>
      </>
    ],
    48: [
      <>
        <div className="section" title="L9">
          THE GREAT LIBRARY
        </div>
        <br />
        <div className="section" title="L10">
          <SoundWord sounds="M,ay-Z" text="maze" />
          (<SoundWord sounds="K,a-L,u-M" text="column" />)
        </div>
      </>
    ],
    49: [
      <>
        <div className="section" title="left">
          <SoundWord sounds="Th,u" text="the" />
          <SoundWord sounds="G,o-L-D,i-N" text="golden" />
          <SoundWord sounds="P,aa-Dh" text="path" />
        </div>
        <div className="section" title="right">
          <SoundWord sounds="Th,u" text="the" />
          <SoundWord sounds="G-R,ay-T,i-S-T" text="greatest" />
          <SoundWord sounds="S-P,e-L" text="spell" />
        </div>
      </>
    ]
  }

  const [selectedConsonant, setSelectedConsonant] = React.useState<string>()
  const [selectedVowel, setSelectedVowel] = React.useState<string>()
  const selectedSounds = [selectedConsonant, selectedVowel].filter(Boolean).join(",");

  const selectedConsonantEdges = selectedConsonant && consonantSounds[selectedConsonant];
  const selectedVowelEdges = selectedVowel && vowelSounds[selectedVowel];

  const selectedEdges: string[] = [];
  if (selectedConsonantEdges) { selectedEdges.push(selectedConsonantEdges) }
  if (selectedVowelEdges) { selectedEdges.push(selectedVowelEdges) }
  const selectedEdgeSet = selectedEdges.length ? toEdgeSet(selectedEdges.join("-")) : new Set<Edge>();

  const [previewEdgeSets, setPreviewEdgeSets] = React.useState<Array<Set<Edge>>>([]);
  const [previewSounds, setPreviewSounds] = React.useState<string[]>([]);

  const handleNextClick = () => {
    setPreviewEdgeSets(previewEdgeSets.concat(selectedEdgeSet));
    setPreviewSounds(previewSounds.concat(selectedSounds));
    setSelectedConsonant(undefined);
    setSelectedVowel(undefined);
  }

  const handleClearClick = () => {
    setPreviewEdgeSets([]);
    setPreviewSounds([]);
    setSelectedConsonant(undefined);
    setSelectedVowel(undefined);
  }

  return (
    <div className="App">
      <div className="tool-panel">
        <BlockEditor />
        <hr />
        <div id="known-blocks">
          Consonants
          <ol>
            {
              Object.keys(consonantSounds).map((sound) => (
                <li key={sound} onClick={() => setSelectedConsonant(sound)}>
                  <ConsonantSound sound={sound} />
                </li>
              ))
            }
            <li><button onClick={() => setSelectedConsonant(undefined)}>X</button></li>
          </ol>
          <hr />
          Vowels
          <ol>
            {
              Object.keys(vowelSounds).map((sound) => (
                <li key={sound} onClick={() => setSelectedVowel(sound)}>
                  <VowelSound sound={sound} />
                </li>
              ))
            }
            <li><button onClick={() => setSelectedVowel(undefined)}>X</button></li>
          </ol>
          <hr />
          <div className="preview">
            {previewEdgeSets.map((edgeSet, index) => <Block key={index} edges={edgeSet} label={previewSounds[index] || "_"} />)}
            {<Block edges={selectedEdgeSet ?? new Set()} label={selectedSounds || "_"} />}
            <button onClick={handleNextClick}>➡️</button>
          </div>
          <pre>{`<SoundWord sounds="${previewSounds.join('-')}" text="" />\n`}</pre>
          <button onClick={handleClearClick}>clear</button>
        </div>
      </div>
      <ol id="manual">
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
