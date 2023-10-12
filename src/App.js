import Card from "./components/card";
import styled from "styled-components";

const MainWrap = styled.div`
  margin: auto;
  text-align: center;
  width: 700px;
  background: lightgreen;
  border-radius: 10px;
  padding: 12px;
  height: 800px;
`;

function App() {
  return (
    <MainWrap>
      <Card />
    </MainWrap>
  );
}

export default App;
