import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { StarRating } from './StarRating';



const RestaurantList = (props) => {
    const {restaurants, setRestaurants, selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);   
    let navigate = useNavigate();

    useEffect(() => {
        loadRestaurants();
    },[]);
    
    const loadRestaurants = async() => {        
        console.log('load restaurants');
        const response = await RestaurantFinder.get("/");
        console.log(response);
        setRestaurants(response.data.data);
        setSelectedRestaurant(null);
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter((restaurant) => {
                return restaurant.id !== id
            }));
        } catch (err){throw err;}
                
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    }

  return (
      <div className="container" style={{padding:"1.5rem"}} >
        <div className='list-group'>
            <table className="table table-hover table-light">
                <thead className='thead-dark'>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th> 
                        <th scope="col">Delete</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants.map(restaurant => {
                            return(
                                <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{'$'.repeat(restaurant.price_range)}</td>
                                <td><StarRating rating = {restaurant.avg_rating}/> <span> ({restaurant.number_of_reviews})</span></td>
                                <td><button onClick={(e) => {handleUpdate(e, restaurant.id)}} className='btn btn-outline-warning'>Update</button></td>
                                <td><button onClick={(e)=>handleDelete(e, restaurant.id)} className='btn btn-outline-danger '>Delete</button></td>
                            </tr>
                            )

                        })
                    }
                </tbody>
         </table>
        </div>

    </div>

  );
};

export default RestaurantList;
