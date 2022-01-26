import { VStack, Spacer, Box } from '@chakra-ui/react';
import React, { useState, useCallback, useEffect } from 'react';
import Keyboard from './DailyPuzzle/Keyboard'
import OutputGrid from './DailyPuzzle/OutputGrid';
import { wordList } from '.././data/data'
import { GuessedWords } from '.././interfaces/IGuessedWords'


const dailyDummyWord = "punch"
const baseUrl = "http://localhost:4000"


interface DailyPuzzleInterface {
    word: string,
    setWord: (arg: string) => void,
    currentUser: number,
    guessedWords: GuessedWords[]
    enter: boolean,
    setEnter: (arg: boolean) => void
    setWordArray: any
    wordArray: string[]
}

function DailyPuzzle({ word, setWord, guessedWords, enter, setEnter, wordArray, setWordArray, currentUser }: DailyPuzzleInterface) {
    const [submittedWord, setSubmittedWord] = useState<string[]>([])


    return <div>
        <VStack>
            <Box h='550px' pt={50}>
                <OutputGrid
                    submittedWord={submittedWord}
                    guessedWords={guessedWords}
                    word={word}
                    wordArray={wordArray} />
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
    </div>;
}

export default DailyPuzzle;
