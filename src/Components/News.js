//News.js
import React,{useState,useEffect} from 'react'
import NewsPart from './Newspart'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

const capitalizeFirstLetter=(string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
    // constructor(props){
    //     super(props);
    //     //console.log("Hello i am a constructor");
    //     state={
    //     articles:[],
    //     loading:true,
    //     page:1,
    //     totalResults:0
    //     }

    //     document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;

    // }

   const updateNews=async()=>{
      //console.log("cdm");
      props.setProgress(10);
        const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e78bfb6ea0047d782420c4fda55ad08&page=${page}&pageSize=${props.pageSize}`;
        // setState({
        //   loading:true
        // })
        setLoading(true)
        let data= await fetch(url);
        let parsedData=await data.json();
        //console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // setState({
        //   articles: parsedData.articles,totalResults: parsedData.totalResults,
        //   loading:false
        // });

        props.setProgress(100);
    }

    useEffect(() => {
      updateNews()
    }, [])
    

    // handleOnPreviousClick=async()=>{
    //   // console.log("Previous")
    //   // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e78bfb6ea0047d782420c4fda55ad08&page=${ page -1}&pageSize=${props.pageSize}`;
    //   // setState({
    //   //   loading:true
    //   // })  
    //   // let data= await fetch(url);
    //   //   let parsedData=await data.json();
    //   //   console.log(parsedData);
    //   //   setState({
          
    //   //     page: page-1,
    //   //     articles: parsedData.articles,
    //   //     loading:false
    //   // });
    //   setState({page: page-1});
    //   updateNews();

    // }

    //  handleOnNextClick= async()=>{
    //   // console.log("Next")
    //   // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e78bfb6ea0047d782420c4fda55ad08&page=${ page + 1}&pageSize=${props.pageSize}`;
    //   // setState({
    //   //   loading:true
    //   // })  
    //   // let data= await fetch(url);
    //   //   let parsedData=await data.json();
    //   //   console.log(parsedData);
    //   //   setState({
         
    //   //     page: page+1,
    //   //     articles: parsedData.articles,
    //   //     loading:false
    //   //   });
    //   setState({page: page+1});
    //   updateNews();
      
    // }
    

  // const  componentDidMount=async()=>{
  //       // console.log("cdm");
  //       // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e78bfb6ea0047d782420c4fda55ad08&page=1&pageSize=${props.pageSize}`;
  //       // setState({
  //       //   loading:true
  //       // })
  //       // let data= await fetch(url);
  //       // let parsedData=await data.json();
  //       // console.log(parsedData);
  //       // setState({
  //       //   articles: parsedData.articles,totalResults: parsedData.totalResults,
  //       //   loading:false
  //       // });
  //       updateNews();

    

    const fetchMoreData = async() => {
      // this.setState({
      //     page: page+1
      //     })
      setPage(page+1)

          const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e78bfb6ea0047d782420c4fda55ad08&page=${ page}&pageSize=${props.pageSize}`;
          
          let data= await fetch(url);
          let parsedData=await data.json();
          console.log(parsedData);
          // this.setState({
          //   articles:  articles.concat(parsedData.articles),totalResults: parsedData.totalResults,
          //   //loading:false
          // });
          setArticles(articles.concat(parsedData.articles))
          setTotalResults(parsedData.totalResults)


    };
  
    //console.log("render");
    return (
      <div className="container my-3 text-center">
        <h2>Top"{capitalizeFirstLetter(props.category)}" headlines on NewsMonkey</h2>
        { loading && <Spinner/>}
        {/* <div className="row"> */}
        <InfiniteScroll
          dataLength={ articles.length}
          next={fetchMoreData}
          hasMore={ articles.length!== totalResults}
          loader={<Spinner/>}
          
        >
          <div className="container">
          <div className="row">
            { articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
            <NewsPart title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}</div>
            </div>
        </InfiniteScroll>
        {/* </div> */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={ page<=1} type="button" className="btn btn-dark" onClick={handleOnPreviousClick}>&larr; Previous</button>
        <button disabled={ page+1>Math.ceil( totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleOnNextClick}>Next &rarr;</button>
        </div> */}
        
      </div>
    )
  
}

News.defaultProps={
  country:'in',
  pageSize:6,
  category:'science'
}

News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News
