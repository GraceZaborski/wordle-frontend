import React, { useState, useCallback, useEffect, createContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import DailyPuzzle from "./components/DailyPuzzle";
import Scoreboard from "./components/Scoreboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IUser } from "./interfaces/IUser";
import { wordList } from "./data/data";

// export const baseUrl = "https://localhost:4000";
export const baseUrl = "https://wordle-backend-gz.herokuapp.com";


function App() {
  const [word, setWord] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<number>(0);
  const [enter, setEnter] = useState<boolean>(false);
  const [wordArray, setWordArray] = useState<string[]>([]);

  // checks if one day has passed.
  function hasOneDayPassed() {
    // get today's date. eg: "7/37/2007"
    var date = new Date().toLocaleDateString();

    // if there's a date in localstorage and it's equal to the above:
    // inferring a day has yet to pass since both dates are equal.
    if (localStorage.yourapp_date === date) return false;

    // this portion of logic occurs when a day has passed
    localStorage.yourapp_date = date;
    return true;
  }

  // some function which should run once a day
  function runOncePerDay() {
    if (hasOneDayPassed()) {
      console.log(getDailyWord());
      //trigger page refresh
    }
  }


  const deleteData = useCallback(async (endpoint: string) => {
    console.log('RUNNINGGG')
    const res = await axios.delete(`${baseUrl}/${endpoint}`);
  }, []);

  deleteData("reset");


  runOncePerDay(); // run the code

  function getDailyWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
  }

  //get all users for dropdown
  const getUsers = useCallback(async (endpoint: string) => {
    const res = await axios.get(`${baseUrl}/${endpoint}`);
    setUsers(res.data.data);
  }, []);

  useEffect(() => {
    getUsers("users");
  }, [getUsers]);

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
        <Navbar
          users={users}
          setCurrentUser={setCurrentUser}
          setWordArray={setWordArray}
          currentUser={currentUser}
        />
        <Routes>
          <Route
            path="/"
            element={
              <DailyPuzzle
                word={word}
                setWord={setWord}
                currentUser={currentUser}
                enter={enter}
                setEnter={setEnter}
                wordArray={wordArray}
                setWordArray={setWordArray}
              />
            }
          />
          <Route path="scoreboard" element={<Scoreboard />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
