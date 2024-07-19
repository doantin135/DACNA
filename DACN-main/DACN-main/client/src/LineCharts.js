import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate, Link } from 'react-router-dom';
import 'chart.js/auto';

function LineCharts({ data }) {
    const navigate = useNavigate();
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState('MarketCap');
    const chartRef = useRef(null);

    // Get the last 10 years
    const currentYear = new Date().getFullYear();
    const last10Years = Array.from({ length: 10 }, (v, i) => currentYear - i).reverse();

    // Filter data based on selected companies and last 10 years
    const filteredData = data.filter(item =>
        selectedCompanies.length === 0 || selectedCompanies.includes(item.Company)
    ).filter(item => last10Years.includes(item.Year));

    // Create line chart data based on selected metric and companies
    const lineData = {
        labels: last10Years,
        datasets: selectedCompanies.map(company => {
            return {
                label: company,
                data: last10Years.map(year => {
                    const record = filteredData.find(item => item.Year === year && item.Company === company);
                    return record ? record[selectedMetric] : null;
                }),
                borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color for each company
                fill: false
            };
        })
    };

    const handleCompanyChange = event => {
        const { options } = event.target;
        const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedCompanies(selectedOptions);
    };

    const handleMetricChange = event => {
        setSelectedMetric(event.target.value);
    };

    const goToDashboard = () => {
        navigate('/');
    };

    const downloadChartImage = () => {
        const link = document.createElement('a');
        link.href = chartRef.current.toBase64Image();
        link.download = 'line_chart.png';
        link.click();
    };

    const uniqueCompanies = [...new Set(data.map(item => item.Company))];

    return (
        <div className="sb-nav-fixed">
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand ps-3" href="#!" onClick={goToDashboard}>
                    DACN
                </a>
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
                                <Link to="/dashboard" className="nav-link">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-tachometer-alt"></i>
                                    </div>
                                    Dashboard
                                </Link>
                                <div className="sb-sidenav-menu-heading">Interface</div>
                                <Link to="/pie-chart" className="nav-link">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-chart-area"></i>
                                    </div>
                                    Pie Chart
                                </Link>
                                <Link to="/line-chart" className="nav-link">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-chart-line"></i>
                                    </div>
                                    Line Chart
                                </Link>
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
                            <h1 className="mt-4">Line Chart</h1>
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-line me-1"></i>
                                    Trends Over the Last 10 Years
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label>Select Company(ies)</label>
                                        <select multiple className="form-control small-select" onChange={handleCompanyChange}>
                                            {uniqueCompanies.map(company => (
                                                <option key={company} value={company}>{company}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Select Metric</label>
                                        <select
                                            className="form-control"
                                            value={selectedMetric}
                                            onChange={handleMetricChange}
                                        >
                                            <option value="MarketCap">Market Cap</option>
                                            <option value="Revenue">Revenue</option>
                                            <option value="GrossProfit">Gross Profit</option>
                                            <option value="NetIncome">Net Income</option>
                                            <option value="EarningPerShare">Earning Per Share</option>
                                            <option value="EBITDA">EBITDA</option>
                                            <option value="ShareHolderEquity">Share Holder Equity</option>
                                            <option value="Debt">Debt</option>
                                            <option value="roe">ROE</option>
                                            <option value="roa">ROA</option>
                                            <option value="roi">ROI</option>
                                        </select>
                                    </div>
                                    <Line ref={chartRef} data={lineData} />
                                    <button onClick={downloadChartImage} className="btn btn-primary mt-3">
                                        Download Chart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
                crossOrigin="anonymous"
            ></script>
            <script src="js/scripts.js"></script>
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"
                crossOrigin="anonymous"
            ></script>
        </div>
    );
}

export default LineCharts;
