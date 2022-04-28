import React, { Suspense } from "react";
import Bootun from "./Bootun";
import iscrtajUsredCrvenogDiva from "./iscrtajUsredCrvenogDiva";
const Game = React.lazy(() => import("./Flood-It/Game"));

function App() {
  const NadogradjeniBotun = iscrtajUsredCrvenogDiva(Bootun);
  const NadogradjeniGame = iscrtajUsredCrvenogDiva(Game);

  return (
    <div className='App'>
      <Suspense fallback={<div>Loading...</div>}>
        <Bootun />
        <NadogradjeniGame />
        <NadogradjeniBotun />
        {iscrtajUsredCrvenogDiva(Bootun)()}
      </Suspense>
    </div>
  );
}

export default App;
