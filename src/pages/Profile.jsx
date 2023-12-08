import React, {useEffect, useState }from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose} from "react-icons/ai";
import { UserAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { createImageUrl } from '../services/movieServices';
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Profile = () => {

  const [movies, setMovies] = useState([]);
  const { user } = UserAuth;

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", '${user.email}'), (doc) => {
        if (doc.data()) setMovies(doc.data().favshows);
      });
    }
  }, [user?.email]);

  if(!user) {
    return (
      
      <>
      <p>fetching shows...</p>
    </>
    );
  }

  return (

   <>
        <div>
          <div>
            <img
            className="bloc w-full h-[500px] object-cover" 
            src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/10e042ab-9935-4aaa-9784-c83736a90839/BD-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="//" />
         <div></div> 
          </div>
        </div>
   </>
  );
  
};

export default Profile;