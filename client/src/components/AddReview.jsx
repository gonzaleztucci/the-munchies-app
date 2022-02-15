import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

export const AddReview = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('Rating');
    const [text, setText] = useState('');
    const {id} = useParams();
    const {numberOfComments, setNumberOfComments} = useContext(RestaurantsContext);


    console.log(`EL ID PARA EL NUEVO COMMENT ES ${id}`);
    console.log(numberOfComments);

    const handleSubmit = async (e) => {
        e.preventDefault();
             
        const response = await RestaurantFinder.post(`/${id}/reviews`, {
            name: name,
            text: text,
            rating:rating
        });
    
        setNumberOfComments(numberOfComments + 1);
        setName('');
        setText('');
        setRating('Rating');   

    }

  return (
      <div className="container">
        <form>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
                className='form-control' ç
                type="text" 
                value = {name}
                onChange = {(e) => {setName(e.target.value)}} 
                id="name" 
                placeholder='Name'
            />   
        </div>
        <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select className='form-control form-control-sm' value = {rating} onChange={(e) => {setRating(e.target.value)}} id='rating'>
                <option disabled>Rating</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
        </div>
        <div className='form-group'>
            <label htmlFor='text'>Review:</label>
            <textarea 
                className='form-control'
                value = {text}
                onChange = {(e) => {setText(e.target.value)}}
                id='text' 
                placeholder='Please write your review here'></textarea>
        </div>
        <div style={{paddingTop: "0.5rem"}}>
            <button type='submit' className='btn btn-outline-primary' onClick={handleSubmit}>Submit</button>
        </div> 
        </form>
    </div>
    
  )
}
