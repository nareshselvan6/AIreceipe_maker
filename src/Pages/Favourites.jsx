import React from 'react';
import { Link } from 'react-router-dom';

const Favourites = () => {

 const getfav = localStorage.getItem("receipedata");
 const arrfav = getfav ? JSON.parse(getfav) : [];
 console.log(arrfav);
 

 const del=(ind)=>{
 
 const updatedFavs = arrfav.filter((ele, idx) => idx !== ind);

 
 localStorage.setItem("receipedata", JSON.stringify(updatedFavs));

 window.location.reload();

 }

 return (
  <div className='total-fav'>
     <div  className='favourite'>
         <div>
             <h1 className='fav_receipe'>Favourite Receipe</h1>
         </div>
         <nav className='navigates favnav'>
             <Link to="/" className='headnavs'>Main</Link>
             <Link to="/dashboard" className='headnavs'>Dashboard</Link>
             <Link to="/favourites" className='headnavs'>Favourites</Link>
         </nav>
         <div className='total-table table-responsive'>
             <div className='full-table table-responsive'>
                 <table className="table table-striped table-responsive">
                     <thead>
                         <tr>
                             <th scope="col">S.No</th>
                             <th scope="col">Receipe-Name</th>
                             <th scope="col">Date</th>
                             <th scope="col">Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {arrfav?.map((ele, index) => (
                             <tr key={index}>
                                 <th scope="row">{index + 1}</th>
                                 <td>{ele?.title}</td>
                                 <td>{ele?.timestamp?.split(' ')}</td>
                                 <td><i className="fa-solid fa-trash btn btn-danger" onClick={()=>del(index)} /></td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </div>
     </div> 
      </div>
 );

};

export default Favourites;