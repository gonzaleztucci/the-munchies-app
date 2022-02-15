import React, {useContext, useState} from 'react';
import {RestaurantsContext} from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';


export const AddRestaurant = () => {
    const {addRestaurant} = useContext(RestaurantsContext);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');


    const handleClick = async (e) => {
        e.preventDefault();
            const response = await RestaurantFinder.post('/', {
                name,
                location,
                price_range: priceRange
            });
            addRestaurant(response.data.data);
    }

  return (
      <div className="container">
        <form action="" className='container form-inline'>
            <div className='container'>
                <div className="row align-items-center">
                <div className="col-sm">
                    <input 
                            type="text" 
                            value={name}
                            className="form-control" 
                            onChange={e => setName(e.target.value)}
                            placeholder="Name" 
                            style={{border: "1px solid black",
                                    height: "100%"
                                    }} 
                        />
                </div>
                <div className="col-sm">
                    <input 
                            type="text" 
                            value = {location}
                            onChange={e => setLocation(e.target.value)}
                            className="form-control" 
                            placeholder="Location" 
                            style={{border: "1px solid black",
                                    height: "100%"}}    
                        />
                </div>

                </div>
                <div className="row align-items-center">
                <div className="col-sm-8">
                    <select 
                                value = {priceRange} 
                                className="col-sm custom-select form-control my-1 mr-sm-2"
                                onChange={e => setPriceRange(e.target.value)}
                                style={{border: "1px solid black", 
                                        height: "100%",
                                        alignSelf: "center"}}   
                    >
                                    <option disabled>Price Range</option>
                                    <option value="1">$</option>
                                    <option value="2">$$</option>
                                    <option value="3">$$$</option>
                                    <option value="4">$$$$</option>
                                    <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="col-sm-4">
                    <button className="col-sm btn btn-outline-primary btn-md" style={{border: "1px solid black"}} onClick={handleClick}>Add</button>
                </div>
                </div>
            </div>
        </form>
      </div>
  );
};
