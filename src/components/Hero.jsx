
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import endpoints from '../services/movieServices';

const Hero= ()=> {
    const [movie,setMovie]=useState({});
    useEffect(()=>{
        axios.get(endpoints.popular).then((response) => {
            const movies = response.data.results;
            const randomMovie = movies[Math.floor(Math.random()*movies.length)];
            setMovie(randomMovie);
        });
    },[]);

    if(!movie)
        return (
    <>
    <p>fetching movie...</p>
    </>);

    const {title, backdrop_path, release_date, overview}= movie;
  return (
    <div className="w-full h-[550px] lg:h-[850px]">
        <div className="w-full h-full">
            <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black">
                <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title} />

            </div>

        </div>

    </div>
  );
}

export default Hero