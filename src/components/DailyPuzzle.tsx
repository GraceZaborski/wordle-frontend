import { VStack, Spacer, Box } from "@chakra-ui/react";
import Keyboard from "./DailyPuzzle/Keyboard";
import OutputGrid from "./DailyPuzzle/OutputGrid";

function DailyPuzzle() {
  return (
    <div>
      <VStack>
        <Box h="500px">
          <OutputGrid />
        </Box>
        <Spacer />
        <Box>
          <Keyboard />
        </Box>
      </VStack>
    </div>
  );
}

export default DailyPuzzle;
