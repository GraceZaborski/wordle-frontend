import { VStack, Spacer, Box } from "@chakra-ui/react";
import Keyboard from "./DailyPuzzle/Keyboard";
import OutputGrid from "./DailyPuzzle/OutputGrid";
import { wordList } from ".././data/data";

interface DailyPuzzleInterface {
  word: string;
  setWord: (arg: string) => void;
  currentUser: number;
  enter: boolean;
  setEnter: (arg: boolean) => void;
  setWordArray: (arg: string[]) => void;
  wordArray: string[];
}

function DailyPuzzle({
  word,
  setWord,
  enter,
  setEnter,
  wordArray,
  setWordArray,
  currentUser,
}: DailyPuzzleInterface) {
  return (
    <div>
      <VStack>
        <Box h="550px" pt={50}>
          <OutputGrid word={word} wordArray={wordArray} />
        </Box>
        <Spacer />
        <Box>
          <Keyboard
            word={word}
            setWord={setWord}
            wordList={wordList}
            enter={enter}
            setEnter={setEnter}
            wordArray={wordArray}
            setWordArray={setWordArray}
            currentUser={currentUser}
          />
        </Box>
      </VStack>
    </div>
  );
}

export default DailyPuzzle;
