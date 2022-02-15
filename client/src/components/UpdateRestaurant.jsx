import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');

    useEffect(() => {
        getRestaurant(id);
    }, []);

    const getRestaurant = async (id) => {
        try{
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.restaurant.name);
            setLocation(response.data.restaurant.location);
            setPriceRange(response.data.restaurant.price_range);
        } catch (err){
            console.log(err);
        }
        
    }


    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            console.log(`EL ID DEL UPDATE ${id} `)
            const response = await RestaurantFinder.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            });
            navigate('/');

        } catch(err){
            throw err
        }

    }
    
  return (<div>
        <form>
            <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input 
                    value = {name} 
                    className='form-control' 
                    onChange={e => setName(e.target.value)}
                    id='name' 
                    type='text' >
                </input>
            </div>
            <div className='form-group'>
                <label htmlFor='location'>Location:</label>
                <input 
                    value= {location} 
                    className='form-control' 
                    onChange={e => setLocation(e.target.value)}
                    id='location' 
                    type='text' ></input>
            </div>
            <div className='form-group'>
                <label htmlFor='price_range'>Price Range:</label>
                <select 
                    value={priceRange} 
                    className='custom-select my-1 mr-sm-2'
                    onChange={e => setPriceRange(e.target.value)} 
                    id='price_range' 
                    type='text' >
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                </select>
            </div>
            <div style={{paddingTop: "1.5rem"}}>
                <button type='submit' className='btn btn-outline-primary' onClick={handleUpdate}>Submit</button>
            </div>
            
        </form>
    

  </div>)
};

export default UpdateRestaurant;
