import React, { useContext } from 'react';
import { StarRating } from './StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';




export const Reviews = ({reviews}) => {
    const { selectedRestaurant } = useContext(RestaurantsContext);

  return (
      <div className='row row-cols-3 mb-2 justify-content-between'>
      {
          reviews.map(review => {
              console.log(review);
              return(
                <div key = {selectedRestaurant.restaurant.id} className="col card text-white bg-primary mb-3" style={{maxWidth: "32%", minWidth: "250px", margin: "4px"}}>
                    <div className="card-header d-flex justify-content-between">
                        <span className="card-title">{review.name}</span>
                        
                    </div>
                    <div style={{paddingLeft: "0.8rem"}}>
                        <span><StarRating rating={review.rating}/></span>
                    </div>
                    <div className="card-body">  
                        <p className="card-text">{review.text}</p>
                    </div>
                </div>
              );
          })
      }
      </div>
    
  );
};
