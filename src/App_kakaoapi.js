import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const REST_API_KEY = "1e117a84227ee821d16a7dce53a6c55d";
  const currentPage = 1;
  const listCnt = 10;
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)

  const searchTitle = '미움받을 용기';
  const callApi = async (currentPage) => {
    try {
      setLoading(true)

      const response = await axios.get(`https://dapi.kakao.com/v3/search/book?target=title`, {
        params:{
          query:searchTitle,
          // sort : 'recency'
        },
        headers:{
          Authorization: `KakaoAK ${REST_API_KEY}`
        }
      })
      console.log(response.data);
      setUserData(response.data.documents)

    } catch (error) {
      console.log("error title : " + error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    callApi(currentPage)
  }, [])

  return (

    <div className="App">
      <h1> 카카오(다음) 책 API</h1>
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
                          {/* <div className="cardText" dangerouslySetInnerHTML={{__html: item.description}}></div> */}
                          <img src={item.thumbnail} alt="" />
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
