import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {
  const keyNum = "214684df-d8ef-4b90-a62c-21a4a777a47b";
  const listCnt = 10;
  // const currentPage = 1;
  const [currentPage, setCurrentPage] = useState(1)
  const [useData, setUseData] = useState([])
  const [totalpages, setTotalpages] = useState(0)

  const callApi = async (currentPage) => {
    try {
      const response = await axios.get(`http://api.kcisa.kr/openapi/API_CNV_060/request?serviceKey=${keyNum}&numOfRows=${listCnt}&pageNo=${currentPage}`)

      console.log(response.data)
      setUseData(response.data.response.body.items.item)
      setTotalpages(response.data.response.body.totalCount / listCnt)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    callApi(currentPage)
  }, [currentPage])

  const pageViewNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor((currentPage - 1) / listCnt) * listCnt + 1;
    const endPage = startPage + listCnt - 1;

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span  className={`page-item ${currentPage === i ? 'active' : ''}`} key={i} onClick={() => { handlePageChange(i) }} ><a className="page-link" href="#" >{i}</a></span>
      )
    }
    return pageNumbers;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalpages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="App">
      <h1>문화관광부 Api</h1>

      {
        useData.map(function (item, i) {
          return (

            <li key={i}>{item.title}</li>

          )
        })
      }



      <div className='pagetop'>
        <ul className="pagination mx-auto mt-5">
          <li className="page-item" style={{cursor:'pointer'}} onClick={()=>{handlePageChange(currentPage - 1)}}>
            <a className="page-link">Previous</a>
          </li>
          {pageViewNumbers()}

          <li className="page-item" onClick={()=>{handlePageChange(currentPage + 1)}} style={{cursor:'pointer'}}>
            <a className="page-link" href="#" >Next</a>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default App;