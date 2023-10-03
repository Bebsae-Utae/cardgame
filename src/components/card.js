import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ClickedCards = styled.div`
  background: grey;
  width: 150px;
  height: 200px;
  border-radius: 20px;
  margin: 10px;
  text-align: center;
  font-size: 100px;
  line-height: 200px;
`;
const Grid = styled.div`
  margin: auto;
  width: ${(props) => props.width};
  display: grid;
  grid-template-columns: ${(props) => props.columns};
`;

function Card() {
  const [width, setWidth] = useState("340px");
  const [columns, setColumns] = useState("1fr 1fr");
  const [level, setLevel] = useState(1);
  const [cardsNum, setCardsNum] = useState(4);
  const [howMany, setHowMany] = useState(0);
  const [correct, setCorrect] = useState(
    Array.from({ length: cardsNum }, (v, i) => i + 1)
  );
  const [order, setOrder] = useState([]);
  const [timer, setTimer] = useState(1);
  const [time, setTime] = useState(1);
  const [intervals, setIntervals] = useState();

  const clickHandler = (a, b) => {
    if (time === 0) setOrder([...order, a]);
  };
  useEffect(() => {
    if (level < 6) {
      setTime(6 - level);
    } else {
      setTime(11 - level);
    }
  }, [intervals]);
  useEffect(() => {
    const id = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    if (time === 0) {
      setTimer(0);
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [time]);
  useEffect(() => {
    if (order.length === cardsNum) {
      if (order.toString() === correct.toString()) {
        if (level > 4) {
          setCardsNum(9);
          setWidth("510px");
          setColumns("1fr 1fr 1fr");
          setTimer(1);
        }
        if (level === 10) {
          console.log("finish");
        }
        console.log("done");
        setHowMany(howMany.sort(() => Math.random() - 0.5));
        setLevel(level + 1);
        setTimer(1);
        setOrder([]);
        setIntervals(Math.random());
      } else {
        console.log("fail");
        setTimer(1);
        setOrder([]);
        setIntervals(Math.random());
      }
    }
  }, [order]);
  useEffect(() => {
    setHowMany(
      Array.from({ length: cardsNum }, (v, i) => i + 1).sort(
        () => Math.random() - 0.5
      )
    );
    setCorrect(Array.from({ length: cardsNum }, (v, i) => i + 1));
  }, [cardsNum]);
  return (
    <>
      {level < 11 ? (
        <div style={{ textAlign: "center" }}>
          <div>level : {level}</div>
          <div>timer : {time}</div>
          <Grid width={width} columns={columns}>
            {howMany
              ? howMany.map((a, b) => {
                  return (
                    <ClickedCards
                      key={b}
                      onClick={() => {
                        clickHandler(a, b);
                      }}>
                      {timer === 0 ? null : a}
                    </ClickedCards>
                  );
                })
              : null}
          </Grid>
        </div>
      ) : (
        <div>Finished</div>
      )}
    </>
  );
}

export default Card;
