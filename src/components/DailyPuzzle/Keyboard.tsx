import React, { useState } from 'react';
import { Button, Flex, VStack, StackDivider, Box, HStack } from "@chakra-ui/react";
import { toast } from "react-toastify";

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
//How to avoid using three lines of letters? 
const firstLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdLine = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
//how to style buttons so you submit styling once

function Keyboard() {
    const [letter, setLetter] = useState<string>("")
    const [enter, setEnter] = useState<boolean>(false)
    const [word, setWord] = useState<string>("")

    console.log(`Word ${word}`)

    //toast function
    const showToastError = (str: string) => {
        toast.error(str);
    };

    const handleClickLetter = (letter: string) => {
        if (word.length < 5) {
            setWord(word.concat(letter))
        } else {
            showToastError("Press enter to submit word")
        }
    }

    const handleClickEnter = () => {
        setEnter(true)
    }

    const handleClickRemove = () => {
        setWord(word.slice(-1))
    }

    return (
        <div>
            <VStack>
                <HStack>
                    {firstLine.map(letter =>
                        <Button key={letter} colorScheme='gray' variant='outline' size='lg' onClick={() => handleClickLetter(letter)}>
                            {letter}
                        </Button>)}
                </HStack>
                <HStack>
                    {secondLine.map(letter =>
                        <Button key={letter} colorScheme='gray' variant='outline' size='lg' onClick={() => handleClickLetter(letter)}>
                            {letter}
                        </Button>)}
                </HStack>
                <HStack>
                    <Button colorScheme='gray' variant='outline' size='lg' onClick={() => handleClickEnter}>
                        Enter
                    </Button>
                    {thirdLine.map(letter =>
                        <Button key={letter} colorScheme='gray' variant='outline' size='lg' onClick={() => handleClickLetter(letter)}>
                            {letter}
                        </Button>)}
                    <Button colorScheme='gray' variant='outline' size='lg' onClick={() => handleClickRemove}>
                        Backspace
                    </Button>
                </HStack>

            </VStack>
        </div>
    )
}

export default Keyboard;
