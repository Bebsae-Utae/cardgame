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
  margin-top: 12px;
  width: ${(props) => props.width};
  display: grid;
  grid-template-columns: ${(props) => props.columns};
`;
const StartBtn = styled.button`
  border-radius: 20px;
  background: white;
  color: black;
  margin: 30px;
  padding: 20px;
  font-size: 30px;
  border: none;
`;
const Title = styled.div`
  font-size: 30px;
  margin: 10px;
  font-weight: bold;
  text-align: center;
  color: black;
`;
const Intro = styled.pre`
  font-size: 16px;
  margin: 16px;
  color: black;
  margin-top: 200px;
`;
const Info = styled.div`
  font-size: 16px;
  font-weight: bold;
  background: green;
  color: white;
  border-radius: 12px;
  margin: auto;
  margin-top: 8px;
  padding: 4px;
  width: 120px;
`;

function Card() {
  const [width, setWidth] = useState("340px");
  const [columns, setColumns] = useState("1fr 1fr");
  const [level, setLevel] = useState(1);
  const [count, setCount] = useState(4);
  const [cardsNum, setCardsNum] = useState([
    { id: 1, color: "white" },
    { id: 2, color: "white" },
    { id: 3, color: "white" },
    { id: 4, color: "white" },
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
            { id: 1, color: "white" },
            { id: 2, color: "white" },
            { id: 3, color: "white" },
            { id: 4, color: "white" },
            { id: 5, color: "white" },
            { id: 6, color: "white" },
            { id: 7, color: "white" },
            { id: 8, color: "white" },
            { id: 9, color: "white" },
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
          a.color = "white";
        });
      } else {
        console.log("fail");
        setTimer(1);
        setOrder([]);
        setIntervals(Math.random());
        cardsNum.map((a, b) => {
          a.color = "white";
        });
      }
    }
  }, [order]);
  useEffect(() => {
    console.log("error?");
    console.log(cardsNum);
    setHowMany(cardsNum.sort(() => Math.random() - 0.5));

    setCorrect(Array.from({ length: count }, (v, i) => i + 1));
  }, [cardsNum]);
  return (
    <>
      {level < 11 && start ? (
        <div style={{ textAlign: "center" }}>
          <Info>Level : {level}</Info>
          <Info>Timer : {time}</Info>
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
        <>
          <Intro>
            <Title>게임 규칙</Title>
            1. 타이머에 표시된 시간 만큼 카드의 순서가 표시됨<br></br>
            2. 타이머가 0이 되면 카드의 순서가 사라짐<br></br>
            3. 표시되었던 순서대로 카드를 클릭하면 성공
          </Intro>
          <StartBtn onClick={startHandler}>시작하기</StartBtn>
        </>
      )}
    </>
  );
}

export default Card;
