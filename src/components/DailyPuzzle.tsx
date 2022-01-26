import { VStack, Spacer, Box } from '@chakra-ui/react';
import React, { useState, useCallback, useEffect } from 'react';
import Keyboard from './DailyPuzzle/Keyboard'
import OutputGrid from './DailyPuzzle/OutputGrid';
import { wordList } from '.././data/data'
import axios from "axios";
import IProgress from '../interfaces/IProgress'
// import { baseUrl } from '.././App'

interface DailyPuzzleInterface {
    word: string
    setWord: (arg: string) => void
    currentUser: number
    enter: boolean
    setEnter: (arg: boolean) => void
    setWordArray: (arg: string[]) => void
    wordArray: string[]
}

function DailyPuzzle({ word, setWord, enter, setEnter, wordArray, setWordArray, currentUser }: DailyPuzzleInterface) {


    return <div>
        <VStack>
            <Box h='550px' pt={50}>
                <OutputGrid
                    word={word}
                    wordArray={wordArray}
                    currentUser={currentUser} />
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
