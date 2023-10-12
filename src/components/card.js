import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ClickedCards = styled.div`
  background: ${(props) => props.bg};
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
  const [count, setCount] = useState(4);
  const [cardsNum, setCardsNum] = useState([
    { id: 1, color: "grey" },
    { id: 2, color: "grey" },
    { id: 3, color: "grey" },
    { id: 4, color: "grey" },
  ]);
  const [howMany, setHowMany] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [order, setOrder] = useState([]);
  const [timer, setTimer] = useState(1);
  const [time, setTime] = useState(1);
  const [intervals, setIntervals] = useState();
  const [start, setStart] = useState(false);

  const startHandler = () => {
    setStart(true);
  };

  const clickHandler = (a) => {
    if (time === 0) {
      setOrder([...order, a.id]);
      a.color = "green";
    }
  };
  useEffect(() => {
    if (start) {
      if (level < 6) {
        setTime(6 - level);
      } else {
        setTime(11 - level);
      }
    }
  }, [start, intervals]);
  useEffect(() => {
    if (start) {
      const id = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      if (time === 0) {
        setTimer(0);
        clearInterval(id);
      }
      return () => clearInterval(id);
    }
  }, [time]);
  useEffect(() => {
    if (order.length === cardsNum.length) {
      if (order.toString() === correct.toString()) {
        if (level > 4) {
          setCardsNum([
            { id: 1, color: "grey" },
            { id: 2, color: "grey" },
            { id: 3, color: "grey" },
            { id: 4, color: "grey" },
            { id: 5, color: "grey" },
            { id: 6, color: "grey" },
            { id: 7, color: "grey" },
            { id: 8, color: "grey" },
            { id: 9, color: "grey" },
          ]);
          setWidth("510px");
          setColumns("1fr 1fr 1fr");
          setTimer(1);
          setCount(9);
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
        cardsNum.map((a, b) => {
          a.color = "grey";
        });
      } else {
        console.log("fail");
        setTimer(1);
        setOrder([]);
        setIntervals(Math.random());
        cardsNum.map((a, b) => {
          a.color = "grey";
        });
      }
    }
  }, [order]);
  useEffect(() => {
    console.log("error?");
    console.log(cardsNum);
    setHowMany(
      // Array.from({ length: cardsNum }, (v, i) => i + 1).sort(
      //   () => Math.random() - 0.5
      cardsNum.sort(() => Math.random() - 0.5)
    );

    setCorrect(Array.from({ length: count }, (v, i) => i + 1));
  }, [cardsNum]);
  return (
    <>
      {level < 11 && start ? (
        <div style={{ textAlign: "center" }}>
          <div>level : {level}</div>
          <div>timer : {time}</div>
          <Grid width={width} columns={columns}>
            {howMany
              ? howMany.map((a, b) => {
                  return (
                    <ClickedCards
                      key={b}
                      bg={a.color}
                      onClick={() => {
                        clickHandler(a);
                      }}>
                      {timer === 0 ? null : a.id}
                    </ClickedCards>
                  );
                })
              : null}
          </Grid>
        </div>
      ) : (
        <button onClick={startHandler}>시작하기</button>
      )}
    </>
  );
}

export default Card;
