import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { useNavigate, Link } from 'react-router-dom';

function Upload() {
  const navigate = useNavigate();

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // retrieve saved file and data from localStorage
  useEffect(() => {
    const savedFile = localStorage.getItem('excelFile');
    const savedData = localStorage.getItem('excelData');
    if (savedFile) {
      setExcelFile(savedFile);
    }
    if (savedData) {
      setExcelData(JSON.parse(savedData));
    }
  }, []);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          const result = e.target.result;
          setExcelFile(result);
          localStorage.setItem('excelFile', result);
        }
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  }

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const limitedData = data.slice(0, 10);
      setExcelData(limitedData);
      localStorage.setItem('excelData', JSON.stringify(limitedData));
    }
  }

  const goToDashboard = () => {
    navigate('/');
  };

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
              <h3>Upload & View Excel Sheets</h3>

              {/* form */}
              <form className="form-group custom-form" onSubmit={handleFileSubmit}>
                <input type="file" className="form-control" required onChange={handleFile} />
                <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
                {typeError && (
                  <div className="alert alert-danger" role="alert">{typeError}</div>
                )}
              </form>

              {/* view data */}
              <div className="viewer">
                {excelData ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          {Object.keys(excelData[0]).map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {excelData.map((individualExcelData, index) => (
                          <tr key={index}>
                            {Object.keys(individualExcelData).map((key) => (
                              <td key={key}>{individualExcelData[key]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>No File is uploaded yet!</div>
                )}
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

export default Upload;
