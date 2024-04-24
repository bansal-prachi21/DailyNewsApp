//App.js
import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
//import Switch from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'


const App= ()=> {
  const pageSize=6;
  const [progress,setProgress] = useState(0)
  // pageSize=6;
  // state={
  //   progress:0
  // }
  // setProgress=(progress)=>{
  //   //  setState({
  //   //   progress:progress
  //   // })
    
  // }
  
    return (
        <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
        //onLoaderFinished={() => setProgress(0)}
      />
      
        <Navbar/>
        <Routes>
          <Route path="/" element={<News setProgress={ setProgress} key="general" pageSize={ pageSize} country='in' category='general'/>}></Route>
          <Route path="/business" element={<News setProgress={ setProgress} key="business" pageSize={ pageSize} country='in' category='business'/>}></Route>
          <Route path="/entertainment" element={<News setProgress={ setProgress} key="entertainment" pageSize={ pageSize} country='in' category='entertainment'/>}></Route>
          <Route path="/general" element={<News setProgress={ setProgress} key="general" pageSize={ pageSize} country='in' category='general'/>}></Route>
          <Route path="/health" element={<News setProgress={ setProgress} key="health" pageSize={ pageSize} country='in' category='health'/>}></Route>
          <Route path="/science" element={<News setProgress={ setProgress} key="cience" pageSize={ pageSize} country='in' category='science'/>}></Route>
          <Route path="/sports" element={<News setProgress={ setProgress} key="sports" pageSize={ pageSize} country='in' category='sports'/>}></Route>
          <Route path="/technology" element={<News setProgress={ setProgress} key="technology" pageSize={ pageSize} country='in' category='technology'/>}></Route>
        </Routes>
          </Router>
      </div>
    )
  
}
export default App;


