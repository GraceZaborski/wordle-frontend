import React, { useState, useCallback } from 'react';
import { Button, Flex, VStack, StackDivider, Box, HStack, AvatarGroupProps, useDisclosure, Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { isDisabled } from '@chakra-ui/utils';
import axios from "axios";
import { setSourceMapRange } from 'typescript';

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
//How to avoid using three lines of letters? 
const firstLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdLine = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
//how to style buttons so you submit styling once

interface KeyboardInterface {
    word: string
    setWord: (arg: string) => void
    wordList: string[]
    enter: boolean
    setEnter: (arg: boolean) => void
    setWordArray: any
    //([...string[], word: string]) => void: any
    wordArray: string[]
    currentUser: number
}

const baseUrl = "http://localhost:4000"
const dailyWord = "which"


function Keyboard({ word, setWord, wordList, enter, setEnter, wordArray, setWordArray, currentUser }: KeyboardInterface) {
    const [letter, setLetter] = useState<string>("")
    const [modalState, setModalState] = useState<boolean>(false);


    const postScore = async (endpoint: string) => {
        const score = wordArray.length + 1
        const reqBody = { score }
        const res = await axios.put(`${baseUrl}/${endpoint}/${currentUser}`, reqBody);
        console.log(res)
    }

    // const postWord =  async (endpoint: string) => {
    //       const res = await axios.get(`${baseUrl}/${endpoint}/${newGuessRow}`, reqBody);
    //       setUsers(res.data.data);
    //       console.log(users)
    //       setEnter(false)
    //     }

    //toast function
    const showToastError = (str: string) => {
        toast.error(str);
    };

    const handleClickLetter = (letter: string) => {
        console.log(currentUser)
        if (currentUser === 0) {
            showToastError("Sign in to play")
        }
        else if (word.length < 5) {
            setWord(word.concat(letter))
        } else {
            showToastError("Press enter to submit word")
        }
    }


    //modal code
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleClickEnter = async (word: string) => {
        const isWord = await wordList.includes(word)
        console.log(word, wordArray)
        if (word === dailyWord) {
            setWordArray([...wordArray, word])
            setWord("")
            postScore("score")
            setTimeout(() => {
                onOpen()
            }, 500)
            //set boolean complete to true
        }
        else if (!isWord) {
            showToastError("Word not recognised")
            // postWord("words")
        } else {
            setWordArray([...wordArray, word])
            setEnter(true)
            setWord("")
        }
    }

    const handleClickRemove = () => {
        setWord(word.slice(0, -1))
    }

    return (
        <div>
            <Box bg="white">
                <VStack >
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
                        {word.length === 5 &&
                            <Button
                                colorScheme='gray' variant='outline' size='lg' onClick={() => handleClickEnter(word.toLowerCase())}>
                                Enter
                            </Button>}
                        {thirdLine.map(letter =>
                            <Button key={letter} colorScheme='gray' variant='outline' size='lg' onClick={() => handleClickLetter(letter)}>
                                {letter}
                            </Button>)}
                        <Button colorScheme='gray' variant='outline' size='lg' onClick={handleClickRemove}>
                            Backspace
                        </Button>
                    </HStack>

                </VStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Performance overview</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Your score: {wordArray.length}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Keyboard;
