import React, { useEffect, useState } from 'react';
import { createImageUrl } from '../services/movieServices';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { db } from '../services/firebase';

const MovieItem = ({ movie }) => {
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const { title, backdrop_path, poster_path, release_date, original_language } = movie;
  //console.log(movie);

  const markFavShow = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(db, 'users', userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      alert('Login to save a movie Or Do not have Acoount? Then SignUp first.');
    }
  };

  return (
    <div
      className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <div className="cards dark:bg-gray-900">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton
              duration={2}
              className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden"
            />
          </SkeletonTheme>
        </div>
      ) : (
        <>
          <img
            className="w-full h-40 block object-cover object-top"
            src={createImageUrl(backdrop_path ?? poster_path, 'w500')}
            alt={title}
          />
          <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
            <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-sans font-bold">
              {title}
            </p>
            <p onClick={markFavShow} className="cursor-pointer">
              {like ? (
                <FaHeart size={20} className="absolute top-2 left-2 text-gray-300" />
              ) : (
                <FaRegHeart size={20} className="absolute top-2 left-2 text-gray-300" />
              )}
            </p>
            {isHovered && (
              <div className="absolute bottom-0 left-0 w-full h-16 bg-black/80 text-white text-center p-2">
                <p className="text-xs text-red-500">Release: {release_date}</p>
                <p className="text-xs text-red-500">Language: {original_language}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieItem;
