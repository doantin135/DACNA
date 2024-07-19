import React, { useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate, Link } from 'react-router-dom';
import 'chart.js/auto';

function PieCharts({ data }) {
    const navigate = useNavigate();
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState('MarketCap');
    const chartRef = useRef(null);

    const filteredByYear = data.filter(item =>
        selectedYears.length === 0 || selectedYears.includes(item.Year.toString())
    );

    const pieData = {
        labels: filteredByYear.map(item => item.Company),
        datasets: [
            {
                label: selectedMetric,
                data: filteredByYear.map(item => item[selectedMetric]),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
            },
        ],
    };

    const handleYearChange = event => {
        const { options } = event.target;
        const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedYears(selectedOptions);
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
        link.download = 'chart.png';
        link.click();
    };

    const uniqueYears = [...new Set(data.map(item => item.Year))];

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
                            <h1 className="mt-4">Charts</h1>
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie me-1"></i>
                                    Market Cap Pie Chart
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label>Select Year(s)</label>
                                        <select multiple className="form-control small-select" onChange={handleYearChange}>
                                            {uniqueYears.map(year => (
                                                <option key={year} value={year}>{year}</option>
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
                                    <Pie ref={chartRef} data={pieData} />
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
        </div>
    );
}

export default PieCharts;
