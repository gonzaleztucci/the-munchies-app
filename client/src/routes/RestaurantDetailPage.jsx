import React, { useContext, useEffect, useState } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { StarRating } from '../components/StarRating';
import { useParams } from 'react-router';
import { Reviews } from '../components/Reviews';
import { AddReview } from '../components/AddReview';

const RestaurantDetailPage = () => {
  const {selectedRestaurant, setSelectedRestaurant, numberOfComments} = useContext(RestaurantsContext);
  const {id} = useParams();
  
  useEffect(()=> {
    const fetchRestaurant = async () => {
      console.log('EFFECT');
      try{
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response.data);
        setSelectedRestaurant(response.data);
        console.log('SELECTED RESTAURANT');
        console.log(selectedRestaurant);
      } catch(err){throw err}
    }

    fetchRestaurant();
    
  }, [numberOfComments]);


  return (
    <div className='container'>
      {
        selectedRestaurant && (
          
          <>
            <div>
            {/* style={{height: "10rem", padding: '2rem'}} */}
              <h6 className='text-center display-6'>{selectedRestaurant.restaurant.name}</h6>
                <div className='text-center'>
                  <StarRating rating={selectedRestaurant.avg_rating} /> 
                  <span className='text-warning'> ({selectedRestaurant.avg_rating})</span>
                </div>
            </div>   
            <div className="container" style={{padding: "2rem"}}>
              <div className='container mt-3 d-flex flex-row justify-content-center' style={{padding: '2rem'}}>
                <Reviews reviews = {selectedRestaurant.reviews}  />
              </div>
              <div style={{padding: "1rem"}}>
                  <h3 className="display-6" style={{marginLeft: "0.8rem"}}>Add your review:</h3>
                  <AddReview />
              </div>
            </div>         
            
          </>
        )
      }
    </div>
    
    )
};

export default RestaurantDetailPage;
