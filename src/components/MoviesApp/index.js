
import {Component} from 'react'
import ReactPaginate from 'react-paginate'
import Loader from 'react-loader-spinner'
import {   ThreeDots } from 'react-loader-spinner'
import './index.css'
import MovieItem from '../MovieItem'

class MoviesApp extends Component{
    state={movieName:'',movieList:[],currentPage: 1,
    moviesPerPage: 4,isLoading:true,isPaginate:false}

     getMovies=async(e)=>{
      e.preventDefault()
        let options={
            method:'GET'
        }
    const { movieName } = this.state;
    const apiKey = 'e8ccc676e299173067a80520c1fee405'; 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;
try{
   const response=await fetch(url,options)
   console.log(response)
   const data=await response.json()
//    console.log(data.results)
   const movieList=data.results
   this.setState({movieList})
   this.setState({isLoading:false})
//    console.log(movieName)
   console.log(movieList)
   const sortedMovieList = movieList.slice().sort((a, b) => {
    const releaseDateA = new Date(a.release_date);
    const releaseDateB = new Date(b.release_date);
    return releaseDateA - releaseDateB;
});

this.setState({ movieList: sortedMovieList })
this.setState({isLoading:false})
this.setState({isPaginate:true})
}
   catch(e){
    console.log(e)

   }
    
      }

      getTotalPages = () => {
        const { movieList, moviesPerPage } = this.state;
        return Math.ceil(movieList.length / moviesPerPage);
      };
      
  
      onChangeEvent=(e)=>{
        this.setState({movieName:e.target.value})
      }

      

    //   movieList.sort(key=filterDate)

    render(){
        const {movieName,movieList,currentPage, moviesPerPage,isLoading,isPaginate }=this.state
        // const sortedMovieList = movieList.slice().sort((a, b) => b.vote_average - a.vote_average);
        console.log(movieList)
        // console.log(movieName)
        

        const totalPages = this.getTotalPages();
       const indexOfLastMovie = currentPage * moviesPerPage;
       const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
     const currentMovies = movieList.slice(indexOfFirstMovie, indexOfLastMovie);



        return(
            <>
            <div className='main-container'>
                <div>
               <form onSubmit={this.getMovies} className='search-container'>
               <p className='movie-name'>MOVIE NAME</p>
               <input type='text' placeholder='Search Movie' value={movieName} onChange={this.onChangeEvent}/>
               <button type='submit' >Search!</button>
               </form>
               </div>
               {isLoading?(<div className="loader"><ThreeDots height="50" width="50" radius="8" color="#362f34" ariaLabel="loading" wrapperStyle wrapperClass/></div>):null}
              { currentMovies.length>0?(<ul className='movies-list'>
                {currentMovies.map(e=>(
                    <MovieItem  key={e.id} releaseDate={e.release_date} url={e.poster_path} rating={e.vote_average} overview={e.overview} title={e.title}/>

                ))}
               </ul>):(<p className='nothing'>There is Nothing to Display</p>)}
              { isPaginate?(<ReactPaginate
           pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={(selected) => this.setState({ currentPage: selected.selected + 1 })}
          containerClassName='pagination'
          activeClassName='active'
      />):null}
               </div>
            </>
            

        )
    }
}
export default MoviesApp