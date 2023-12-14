import "./styles.css";
import Main from "./components/Main";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import SplitPane, { Pane } from "react-split-pane";
import "./SplitPane.css";
export default function App() {
  return (
    // <SplitPane split="horizontal">
    //   <Pane initialSize={150} minSize={150}>
    //     1
    //   </Pane>
    //   <Pane initialSize="50%">2</Pane>
    // </SplitPane>
    <div className="App">
      {/* <Header /> */}
      <Main />
      {/* <Footer /> */}
    </div>
  );
}
