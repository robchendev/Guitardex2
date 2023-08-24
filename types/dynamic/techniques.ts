import { Difficulty, PreReq } from "./common";

export type TechniqueFrontMatter = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: "basics" | "percussion" | "utility" | "articulation";
  difficulty: Difficulty;
  demo: string;
};

export type Technique = TechniqueFrontMatter & {
  contentMarkdown: string;
};
