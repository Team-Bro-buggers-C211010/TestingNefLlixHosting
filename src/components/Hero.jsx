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
    const truncate = (str,length) => {
        if(!str) 
            return "";
        return str.length > length ? str.slice(0, length)+"..." : str;
    }

    if(!movie)
        return (<>
                <p>fetching movie...</p>
                </>);

    const {title, backdrop_path, release_date, overview}= movie;
  return (
    <div className="w-full h-[550px] lg:h-[850px]">
        <div className="w-full h-full">
            {/* Shadow effect in home banner */}
            <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
                <img className="w-full h-full object-cover object-top" src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title} />
                <div className="absolute w-full top-[20%] lg:top-[40%] p-4 md:p-8">
                    <h1 className="text-2xl md:text-4xl font-nsans-bold">{title}</h1>
                    <div className="mt-8 mb-4">
                        <button className="capitalize border bg-gray-200 text-black py-2 px-5">Play</button>
                        <button className="capitalize border border-red-700 text-white py-2 px-5 ml-4">watch later</button>
                    </div>
                    <p className="text-gray-400 text-sm">{release_date}</p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] text-gray-200">{truncate(overview,300)}</p>
                </div>
        </div>

    </div>
  );
}

export default Hero