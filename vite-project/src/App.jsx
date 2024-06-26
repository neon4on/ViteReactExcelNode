import Header from './components/Header';
import Home from './pages/Home';
import Page51 from './pages/Form_5_1';
import Page52 from './pages/Form_5_2';
import Page54 from './pages/Form_5_4';
import Page64 from './pages/Form_6_4';
import Page723 from './pages/Form_7_2_3';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const port = 4001;
const host = 'http://pan-a518-01:';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/admin" element={<Home port={port} host={host} />} />
          <Route path="/51" element={<Page51 port={port} host={host} />} />
          <Route path="/52" element={<Page52 port={port} host={host} />} />
          <Route path="/54" element={<Page54 port={port} host={host} />} />
          <Route path="/64" element={<Page64 port={port} host={host} />} />
          <Route path="/723" element={<Page723 port={port} host={host} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
