import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import AudioPlayer from "./AudioPlayer";
import GlossaryItem from "./GlossaryItem";
import TabImage from "./TabImage";

const RenderMarkdown = ({
  contentMarkdown,
  addToGlossary,
}: {
  contentMarkdown: string;
  addToGlossary: (term: string, definition: string) => void;
}) => {
  return (
    <ReactMarkdown
      components={{
        img: (props) => {
          // This is hack to transform ![]() to anything we need
          switch (props.alt) {
            case "music":
              return <AudioPlayer src={props.src} />;
            case "tab":
              return <TabImage src={props.src} />;
            default:
              return <div>"{props.alt}" not implemented!</div>;
          }
        },
        code: (props) => (
          <GlossaryItem item={props.children[0] as string} addToGlossary={addToGlossary} />
        ),
        h3: (props) => (
          <h3 className="mt-4 mb-2 text-xl font-semibold tracking-wider">{props.children}</h3>
        ),
        h4: (props) => (
          <h4 className="mt-4 mb-2 text-lg font-semibold tracking-wider">{props.children}</h4>
        ),
        p: (props) => <p className="pb-2 last:pb-0">{props.children}</p>,
      }}
    >
      {contentMarkdown}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;