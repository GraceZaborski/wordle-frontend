// import React, { useState, useCallback, useEffect } from 'react';
import {
  Button,
  VStack,
  Box,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../App";
import IProgress from "../../interfaces/IProgress";
import React, { useState, useCallback, useEffect } from "react";

// const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
//How to avoid using three lines of letters?
const firstLine = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const secondLine = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const thirdLine = ["Z", "X", "C", "V", "B", "N", "M"];
//how to style buttons so you submit styling once

interface KeyboardInterface {
  word: string;
  setWord: (arg: string) => void;
  wordList: string[];
  enter: boolean;
  setEnter: (arg: boolean) => void;
  setWordArray: (arg: string[]) => void;
  wordArray: string[];
  currentUser: number;
}

const dailyWord = "which";

function Keyboard({
  word,
  setWord,
  wordList,
  wordArray,
  setWordArray,
  currentUser,
}: KeyboardInterface) {
  const [progress, setProgress] = useState<IProgress[]>([]);
  const [fail, setFail] = useState<boolean>(false);

  console.log("Progress:" + progress);

  // const openModal = () => {
  //     if (user[0].complete === true) {
  //         onOpen()
  //     }
  // }

  // useEffect(() => {
  //     openModal()
  // }, [user])

  const getUsersGuesses = useCallback(
    async (endpoint: string) => {
      console.log("runnin");
      console.log("current user" + currentUser);
      let guessedWords = [];
      const res = await axios.get(`${baseUrl}/${endpoint}/${currentUser}`);
      console.log("res" + res);
      setProgress(res.data.data);
      for (let object of res.data.data) {
        console.log(object.word);
        guessedWords.push(object.word);
      }
      setWordArray(wordArray.concat(guessedWords));
      //how to solve below problem: setWordArray and wordArray must be included as dependencies?
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  useEffect(() => {
    getUsersGuesses("words");
    updateWord();
    setFail(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsersGuesses, currentUser]);

  const updateWord = () => {
    setWord("");
  };

  const postScore = async (endpoint: string) => {
    const score = wordArray.length + 1;
    const reqBody = { score };
    const res = await axios.put(
      `${baseUrl}/${endpoint}/${currentUser}`,
      reqBody
    );
    console.log("postScore res:" + res);
  };

  const postWord = async (endpoint: string) => {
    const reqBody = { word };
    try {
      const res = await axios.post(
        `${baseUrl}/${endpoint}/${currentUser}`,
        reqBody
      );
      console.log("postWord res:" + res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          showToastError(`Double word: ${error.response.data.data[0].word}`);
        }
      }
    }
  };

  //toast function
  const showToastError = (str: string) => {
    toast.error(str);
  };

  const handleClickLetter = (letter: string) => {
    if (currentUser === 0) {
      showToastError("Sign in to play");
    } else if (word.length < 5) {
      setWord(word.concat(letter.toLowerCase()));
    } else {
      showToastError("Press enter to submit word");
    }
  };

  //modal code
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickEnter = async (word: string) => {
    const isWord = wordList.includes(word);
    if (word === dailyWord) {
      setWordArray([...wordArray, word]);
      setWord("");
      postScore("score");
      setTimeout(() => {
        onOpen();
      }, 500);
    } else if (!isWord) {
      showToastError("Word not recognised");
    } else {
      setWordArray([...wordArray, word]);
      postWord("words");
      // setEnter(true)
      setWord("");
      console.log(wordArray);
    }
    if (wordArray.length === 5 && word !== dailyWord) {
      setFail(true);
      onOpen();
    }
  };

  const handleClickRemove = () => {
    setWord(word.slice(0, -1));
  };

  return (
    <div>
      <Box bg="white">
        <VStack>
          <HStack>
            {firstLine.map((letter) => (
              <Button
                key={letter}
                colorScheme="gray"
                variant="outline"
                size="lg"
                onClick={() => handleClickLetter(letter)}
              >
                {letter}
              </Button>
            ))}
          </HStack>
          <HStack>
            {secondLine.map((letter) => (
              <Button
                key={letter}
                colorScheme="gray"
                variant="outline"
                size="lg"
                onClick={() => handleClickLetter(letter)}
              >
                {letter}
              </Button>
            ))}
          </HStack>
          <HStack>
            {word.length === 5 && (
              <Button
                colorScheme="gray"
                variant="outline"
                size="lg"
                onClick={() => handleClickEnter(word.toLowerCase())}
              >
                Enter
              </Button>
            )}
            {thirdLine.map((letter) => (
              <Button
                key={letter}
                colorScheme="gray"
                variant="outline"
                size="lg"
                onClick={() => handleClickLetter(letter)}
              >
                {letter}
              </Button>
            ))}
            <Button
              colorScheme="gray"
              variant="outline"
              size="lg"
              onClick={handleClickRemove}
            >
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
            <p>Your score: {fail ? 0 : wordArray.length}</p>
            {fail && "Better luck next time!"}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Keyboard;
