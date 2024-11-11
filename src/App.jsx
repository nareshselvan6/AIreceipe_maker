import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AIDash from './Pages/AIDash';
import Favourites from './Pages/Favourites';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/dashboard' element={<AIDash/>}/>  
        <Route path='/favourites' element={<Favourites/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;