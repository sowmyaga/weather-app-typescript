import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forcaste from "./Forcaste";

const App=()=> {
return(
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Forcaste />}>
        </Route>
      </Routes>
    </BrowserRouter>
)
}

export default App;
