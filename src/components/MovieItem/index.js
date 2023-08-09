import './index.css'

const MovieItem=(props)=>{
    const {url,overview,releaseDate,title,rating}=props
    // const imageUrl=`https://image.tmdb.org/t/p/w500/${url}`
    const imageUrl = url
    ? `https://image.tmdb.org/t/p/w500/${url}` 
    : 'placeholder-image.jpg';

return(
    <li className='list-item'>
        <div className='img-class-container'>
            <img src={imageUrl} className='img-class' alt={title}/>
        </div>
        <div className='details'>
        <h1 className='title'>{title}</h1>
        <p className='release'><b>RELEASE DATE:</b>{releaseDate}</p>
        <p className='rating' ><b>RATING:</b>{rating}</p>
        <p className='overview'>{overview}</p>
       
        </div>
       
       

    </li>

)


}
export default MovieItem