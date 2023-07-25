import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProp = {
        country: 'in',
        pageSize:8,
        category: "general"
    }
    static defaultProps = {
        name: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    articles =  []
    constructor(){
        super(); 
        console.log("this is Constructor from news Compenent");
        this.state = {
            articles :this.articles,
            loading : false,
            page:1 
        }
    }

    async componentDidMount(){
        console.log("cmd")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50729923664e4fed8f352f28fc494918&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,  
            totalResults:parsedData.totalResults,
            loading: false
        })
    }
    handleNextCick = async ()=>{
        console.log("next")
        if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50729923664e4fed8f352f28fc494918&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page+1,
            articles: parsedData.articles,
            loading: false
        })
    }
    }

    handlePrevCick = async ()=>{
        console.log("previous")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50729923664e4fed8f352f28fc494918&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
        })
    }

  render() {
    return (
      <div className="container my-3">
        <h2 className='text-center'>NewsHeadlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row ">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
        </div>
        })}
        </div> 
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevCick}  >&larr; Previus</button>
        <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextCick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
