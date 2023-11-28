import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

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
      <h1 text-align='center' className='pt-5'>카카오(다음) 책 API</h1>
      {loading ? (
        <div className='loading'>로딩...</div>
      ) : (
        <Container>
          <Row>
            {userData.map((item, i) => (
              <Col key={i} lg={3} md={6} className='p-5'>
                <div className='card'>
                  <div className="cardTitle">
                    <a href={item.url} target='_blank'> <strong>{i}번</strong>  {item.title}</a>
                  </div>
                  {/* <div className="cardText" dangerouslySetInnerHTML={{__html: item.description}}></div> */}
                  {item.thumbnail ? (<img src={item.thumbnail} alt="" />) : (<img src='./logo512.png' width={'232px'} height={'336px'}></img>)}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;
