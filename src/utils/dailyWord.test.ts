import { dailyWord } from "./dailyWord";

const wordList = ["hello", "magic", "money", "talks", "walks"];

test("Function is called once", () => {
  expect(dailyWord.length).toEqual(1);
});

test("5-letter word returned", () => {
  expect(dailyWord(wordList).length).toEqual(5);
});

// test("The random word returned is a string", () => {
//     expect(
//         typeof dailyWord
//     ).toBe("string")
// })
