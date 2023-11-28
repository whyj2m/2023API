import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const keyNum = "214684df-d8ef-4b90-a62c-21a4a777a47b";
  const currentPage = 1;
  const listCnt = 10;
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)

  const callApi = async (currentPage) => {
    try {
      setLoading(true)

      const response = await axios.get(`http://api.kcisa.kr/openapi/API_CNV_060/request?serviceKey=${keyNum}&numOfRows=${listCnt}&pageNo=${currentPage}`)
      console.log(response.data.response.body.items.item)
      setUserData(response.data.response.body.items.item)

    } catch (error) {
      console.log("error title : " + error)
    } finally {
      setLoading(false)
    }

    //   .then((response) => {
    //     console.log(response)
    //     setUserData(response.data.response.body.items.item)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  }

  useEffect(() => {
    callApi(currentPage)
  }, [])

  return (

    <div className="App">
      <h1>문화체육관광부 추천여행 API</h1>
      {
        loading ? (<div className='loading'>로딩...</div>) :
          (
            <>
              <ul>
                {
                  userData.map((item, i) => {
                    return (
                      <li key={i}>
                        <div className='card'>
                          <div className="cardTitle">
                            <a href={item.url} target='_blank'>  {item.title} </a>
                          </div>
                          <div className="cardText" dangerouslySetInnerHTML={{__html: item.description}}>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </>
          )
      }
    </div>
  );
}

export default App;
