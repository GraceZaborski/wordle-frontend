import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { ChakraProvider } from '@chakra-ui/react'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import DailyPuzzle from './components/DailyPuzzle';
import Scoreboard from './components/Scoreboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IUser } from "./interfaces/IUser"
import { GuessedWords } from './interfaces/IGuessedWords'


const baseUrl = "http://localhost:4000"


function App() {
  const [word, setWord] = useState<string>("")
  const [users, setUsers] = useState<IUser[]>([])
  const [currentUser, setCurrentUser] = useState<number>(0)
  const [guessedWords, setGuessedWords] = useState<GuessedWords[]>([])
  const [enter, setEnter] = useState<boolean>(false)
  const [wordArray, setWordArray] = useState<string[]>([])


  const getWords = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}/${currentUser}`);
      setGuessedWords(res.data.data);
      console.log(guessedWords)

    },
    [baseUrl, currentUser, enter]
  );

  // async function getUsers(endpoint: string) {
  //   try {
  //     const response = await axios.get('users');
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  const getUsers = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      setUsers(res.data.data);
      console.log(users)
    },
    [baseUrl]
  );

  // async function getUsers(endpoint: string) {
  //   try {
  //     const response = await axios.get('users');
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    getUsers("users")
    getWords("words")
  }, [getUsers, getWords])

  return (

    <div>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ChakraProvider>
        <Navbar users={users} setCurrentUser={setCurrentUser} />
        <Routes>
          {/* different pages */}
          <Route
            path="/"
            element={
              <DailyPuzzle
                word={word}
                setWord={setWord}
                // users={users}
                currentUser={currentUser}
                guessedWords={guessedWords}
                enter={enter}
                setEnter={setEnter}
                wordArray={wordArray}
                setWordArray={setWordArray} />
            }
          />
          <Route
            path="scoreboard"
            element={<Scoreboard />}
          />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
