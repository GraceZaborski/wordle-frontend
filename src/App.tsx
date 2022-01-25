import React from 'react';
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


function App() {

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
        <Navbar />
        <Routes>
          {/* different pages */}
          <Route
            path="/"
            element={
              <DailyPuzzle />
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
