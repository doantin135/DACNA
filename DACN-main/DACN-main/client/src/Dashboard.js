import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'chart.js/auto';

function Dashboard() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(''); // State for selected year

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const uniqueYears = [...new Set(data.map(item => item.Year))];

  const filteredData = data.filter((item) => {
    return (
      item.Company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedYear === '' || item.Year.toString() === selectedYear)
    );
  });

  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link to="/dashboard" className="navbar-brand ps-3"> {/* Use Link component for internal navigation */}
          DACN
        </Link>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link to="/dashboard " className="nav-link"> {/* Use Link component for internal navigation */}
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </Link>
                <div className="sb-sidenav-menu-heading">Interface</div>
                <Link
                  to="/pie-chart" // Link to the /pie-chart route
                  className="nav-link"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-area"></i>
                  </div>
                  Pie Chart
                </Link>
                <Link
                  to="/line-chart" // Link to the /line-chart route
                  className="nav-link"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-area"></i>
                  </div>
                  Line Chart
                </Link>

                {/* <Link to="/growth-calculator" className="nav-link">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  Growth Rate
                </Link> */}

                <Link to="/upload" className="nav-link">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  Upload
                </Link>

              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              User: 000000
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Financial Data Table
                </div>
                <div className="card-body">
                  <input
                    type="text"
                    placeholder="Search by Company"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <select value={selectedYear} onChange={handleYearChange}>
                    <option value="">All Years</option>
                    {uniqueYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <table className="tableWhole">
                    <thead>
                      <tr>
                        <th className="table-1">Year</th>
                        <th className="table-2">Company</th>
                        <th className="table-2">Category</th>
                        <th className="table-2">Market Cap</th>
                        <th className="table-2">Revenue</th>
                        <th className="table-2">Gross Profit</th>
                        <th className="table-2">Net Income</th>
                        <th className="table-2">Earning Per Share</th>
                        <th className="table-2">EBITDA</th>
                        <th className="table-2">Share Holder Equity</th>
                        <th className="table-2">Debt</th>
                        <th className="table-1">ROE</th>
                        <th className="table-1">ROA</th>
                        <th className="table-1">ROI</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.Year}</td>
                          <td>{item.Company}</td>
                          <td>{item.Category}</td>
                          <td>{item.MarketCap}</td>
                          <td>{item.Revenue}</td>
                          <td>{item.GrossProfit}</td>
                          <td>{item.NetIncome}</td>
                          <td>{item.EarningPerShare}</td>
                          <td>{item.EBITDA}</td>
                          <td>{item.ShareHolderEquity}</td>
                          <td>{item.Debt}</td>
                          <td>{item.roe}</td>
                          <td>{item.roa}</td>
                          <td>{item.roi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <CSVLink data={data} filename="BaoCaoTaiChinh" className="btn btn-success mb-3">Download Financial Data Table </CSVLink>
            </div>
          </main>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Dashboard;
