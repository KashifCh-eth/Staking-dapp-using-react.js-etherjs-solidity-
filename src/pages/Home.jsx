import React from "react";
import Dis from "../componentes/Dis/Dis";
import Methods from "../componentes/Web3Connect/Methods";


function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400 p-10 ">
    
        <div className="text-black backdrop-blur-sm bg-red-200/30 flex-col px-4 shadow-md text-center max-w-5xl m-auto p-10">
          <Methods />
        </div>
        <Dis />
      </div>
    </>
  );
}

export default Home;
