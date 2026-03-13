import { addCollection } from '@iconify/react';
import type { IconifyJSON } from '@iconify/types';
import materialSymbols from '@iconify-json/material-symbols/icons.json';
import mdi from '@iconify-json/mdi/icons.json';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homePage/index';
import PopupLayer from './popUpPage/popupWindow';

addCollection(materialSymbols as IconifyJSON);
addCollection(mdi as IconifyJSON);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="main" element={<HomePage/>} />
        <Route path="popup" element={<PopupLayer/>} />
      </Routes>
    </Router>
  )
}

export default App
