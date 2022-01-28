import { createContext, useContext } from "react";
import { IUser } from "../interfaces/IUser";
export type GlobalContent = {
  word: string;
  setWord: (arg: string) => void;
  currentUser: number;
  enter: boolean;
  setEnter: (arg: boolean) => void;
  setWordArray: (arg: string[]) => void;
  wordArray: string[];
  wordList: string[];
  users: IUser[];
  setCurrentUser: (arg: number) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  word: "", // set a default value
  setWord: () => {},
  currentUser: 0,
  enter: false,
  setEnter: () => {},
  setWordArray: () => {},
  wordArray: [],
  wordList: [],
  users: [],
  setCurrentUser: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
