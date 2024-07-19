// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Dashboard from './Dashboard';
import PieCharts from './PieCharts';
import LineCharts from './LineCharts';
import Upload from './Upload';
import Signup from './Signup';
import Login from './Login';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5555/get")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path = '/signup' element = { <Signup/>}></Route>
            <Route path="/dashboard" element={<Dashboard  />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/pie-chart" element={<PieCharts data={data} />} />
            <Route path="/line-chart" element={<LineCharts data={data} />} />
            
          </Routes>
    </BrowserRouter>
  );
}

export default App;
