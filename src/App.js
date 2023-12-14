import WalletContext from "../src/store/store";
import { useState } from "react";
import Home from "../src/pages/Home.jsx"
function App() {
  const [isContract, setContract] = useState({
    Contract: "",
    IsOn: false,
  });
  return (
    <>
      <WalletContext.Provider value={{ isContract, setContract }}>
        <div>
          <Home />
        </div>
      </WalletContext.Provider>
    </>
  );
}

export default App;
