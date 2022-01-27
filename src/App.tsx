import React, { useState, useCallback, useEffect } from "react";
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

export const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";

function App() {
  const [word, setWord] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<number>(0);
  const [enter, setEnter] = useState<boolean>(false);
  const [wordArray, setWordArray] = useState<string[]>([]);

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
