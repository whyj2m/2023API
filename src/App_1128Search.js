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

  const [searchTitle,setSearchTitle] = useState('졸음')
  // const searchTitle = '손흥민';
  const callApi = async (searchTitle) => {
    try {
      setLoading(true)

      const response = await axios.get(`https://dapi.kakao.com/v2/search/web`, {
        params: {
          query: searchTitle,
          size: 20,
          // sort : 'recency'
        },
        headers: {
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
    callApi(searchTitle)
  }, [])


  const searchBtn = () => {
    callApi(searchTitle)
  }

  const handlerKeyPress = (e) => {
    if(e.key == "Enter") {
      callApi(searchTitle)
    }
  }

  return (
    <div className="App">
      <h1 className='container text-center p-5'> 카카오 API 검색</h1>
      {loading ? (
        <div className='loading'>로딩...</div>
      ) : (
        <Container>
          <Row>
            <Col className='d-flex gap-2 pb-3'>
              <input type="text" className='form-control' onChange={(e)=>{setSearchTitle(e.target.value)}}
              onKeyPress={handlerKeyPress}/>
              <button className='btn btn-primary' style={{width:'100px'}} onClick={searchBtn}>검색</button>
            </Col>
          </Row>
          <Row>
            {userData.map((item, i) => (
              <Col key={i} lg={6} md={6}>
                <div className='card mb-4'>
                  <div className="cardTitle">
                    <li key={i}> <a className="cardText" dangerouslySetInnerHTML={{ __html: item.title }} href={item.url} target='_blank' ></a> </li>   
                  </div>
                  <li dangerouslySetInnerHTML={{ __html: item.contents }}></li>
                  {/* {item.thumbnail ? (<img src={item.thumbnail} alt="" />) : (<img src='./logo512.png' width={'auto'} height={'auto'}></img>)} */}
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
