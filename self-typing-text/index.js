import s from "./Showcase.module.css";
import { useState, useEffect, useRef } from "react";

const Showcase = () => {
  // Self typing text ref
  const charIndex = useRef(0);

  // Self typing text states
  const selfTypingWords = ["Front-End", "React", "Jamstack"];
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [fullWord, setFullWord] = useState(selfTypingWords[wordIndex]);

  // Reset the char index and timeout when the word changes
  useEffect(() => {
    // If the current word is the last one
    let time;
    if (wordIndex === 0) {
      time = 100;
    } else {
      time = 2400;
    }
    const timer = setTimeout(() => {
      if (wordIndex === selfTypingWords.length) {
        setWordIndex(0);
        setFullWord(selfTypingWords[0]);
        charIndex.current = 0;
        setCurrentWord("");
      } else {
        // If current is not the last word
        setFullWord(selfTypingWords[wordIndex]);
        charIndex.current = 0;
        setCurrentWord("");
      }
    }, time);

    // Clear Timeout on word reset
    return () => clearTimeout(timer);
  }, [wordIndex]);

  // Type the word letter by letter
  useEffect(() => {
    let timer;
    let time = 100;
    timer = setTimeout(() => {
      if (fullWord !== undefined && charIndex.current !== fullWord.length) {
        // Type a letter every 600ms
        setCurrentWord((value) => value + fullWord.charAt(charIndex.current));
        charIndex.current += 1;
      } else {
        // If word is finished, switch to the next one
        setWordIndex((prevState) => prevState + 1);
      }
    }, time);

    // CLear the timeout on component unmount
    return () => clearTimeout(timer);
  }, [currentWord, fullWord]);

  return (
    <section className={s.showcase} id="home">
      <div className="container">
        <div className={s.showcaseWrapper}>
          <div className={s.showcaseContent}>
            <div className={s.titleWrapper}>
              <h1 className={s.heroTitle}>
                Web Developer <br />
                <span className={s.word}> - {currentWord}</span>
                <span className={s.typingSign}>.</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
