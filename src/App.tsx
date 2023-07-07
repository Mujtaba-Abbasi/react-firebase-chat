import { BrowserRouter } from "react-router-dom";
import Navigation from "./app/Components/Navigation";
import "./styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
