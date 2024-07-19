// src/GrowthCalculator.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GrowthCalculator.css';

const GrowthCalculator = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    axios
      .get("http://localhost:5555/get")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const calculateGrowth = (field) => {
    return data.map((row, index) => {
      if (index === 0) return { year: row.Year, company: row.Company, growth: null };
      const previous = data[index - 1];
      const growth = ((row[field] - previous[field]) / previous[field]) * 100;
      return { year: row.Year, company: row.Company, growth: growth.toFixed(2) };
    });
  };

  const revenueGrowth = calculateGrowth('Revenue');
  const netIncomeGrowth = calculateGrowth('NetIncome');
 
  return (
    <div className="growth-calculator">
      <h2>Growth Rates</h2>
      <table>
        <thead>
          <tr>
            <th className="table-1">Year</th>
            <th className="table-1">Company</th>
            <th className="table-1">Revenue Growth (%)</th>
            <th className="table-1">Net Income Growth (%)</th>
          </tr>
        </thead>
        <tbody>
          {revenueGrowth.map((row, index) => (
            <tr key={index}>
              <td>{row.year}</td>
              <td>{row.company}</td>
              <td>{row.growth}</td>
              <td>{netIncomeGrowth[index].growth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrowthCalculator;
