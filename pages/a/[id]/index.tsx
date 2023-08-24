import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { getAllTechniqueIds, getTechniqueData } from "../../../lib/techniques";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { GlossaryItem } from "../../../types";
import { AudioSkill } from "../../../types/dynamic/audio";
import { PreReq } from "../../../types/dynamic/common";
import { getAllAudioSkillIds, getAudioSkillData } from "../../../lib/audioSkills";
import RenderMarkdown from "../../../components/ModulePage/RenderMarkdown";

const AudioSkill = ({ audioSkill }: { audioSkill: AudioSkill }) => {
  // console.log(technique);
  const [glossary, setGlossary] = useState<GlossaryItem[]>([]);
  const initialGlossary: GlossaryItem[] = [];

  // add in glossary only if there isn't a duplicate
  const addToGlossary = (term: string, definition: string) => {
    // if an obj with the key matching term not already in glossary, .push()
    if (!initialGlossary.some((item: GlossaryItem) => item.term === term)) {
      initialGlossary.push({ term, definition });
    }
  };

  useEffect(() => {
    setGlossary(initialGlossary);
  }, []);

  return (
    <Wrapper title="Techniques">
      <div className="flex justify-center">
        <div>
          <div>ID: {audioSkill.id}</div>
          <div>Title: {audioSkill.name}</div>
          <div>
            PreReq:{" "}
            {audioSkill.requirements.map((req: PreReq, index: number) => (
              <Link key={index} href={"/t/" + req.id}>
                {req.name}
              </Link>
            ))}
          </div>
          <div>Category: {audioSkill.category}</div>
          <div>Difficulty: {audioSkill.difficulty}</div>
          <div>Demo: {audioSkill.demo}</div>
          <div>
            <div>Glossary: </div>
            <ul>
              {glossary.map((item: GlossaryItem, index: number) => (
                <li key={index}>
                  {item.term}: {item.definition}
                </li>
              ))}
            </ul>
          </div>
          <RenderMarkdown
            contentMarkdown={audioSkill.contentMarkdown}
            addToGlossary={addToGlossary}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getAllAudioSkillIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data using params.id
  const audioSkill = await getAudioSkillData(params.id);
  return {
    props: {
      audioSkill,
    },
  };
}

export default AudioSkill;
