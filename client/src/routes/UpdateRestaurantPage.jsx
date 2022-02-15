import React, { useEffect, useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useParams } from 'react-router';
import UpdateRestaurant from '../components/UpdateRestaurant';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurantPage = () => {

  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);
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
    
  }, []);

  return <div className='container'>
    {
      selectedRestaurant && 
      (
        <div>
          <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
          <div>
            <UpdateRestaurant/>
          </div>

        </div>

      )
    }
    
  </div>;
};

export default UpdateRestaurantPage;
