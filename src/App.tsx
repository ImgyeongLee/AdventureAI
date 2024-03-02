import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HostGuest from './pages/HostGuest';
import GameInfo from './pages/GameInfo';
import Game from './pages/Game';
import Role from './pages/Role';
import Lobby from './pages/Lobby';
import {GamePlay} from "./pages/GamePlay";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/host-guest" element={<HostGuest />} />
        <Route path="/game-info" element={<GameInfo />} />
        <Route path="/game:gameId" element={<Game />} />
        <Route path="/role" element={<Role />} />
        <Route path="/gameplay/:gameId" element={<GamePlay />} />
    </Routes>
  );
}

export default App;
