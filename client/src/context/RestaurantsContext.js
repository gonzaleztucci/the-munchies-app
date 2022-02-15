import React, {useState, createContext} from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [numberOfComments, setNumberOfComments] = useState(0);

    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    }

    // const deleteRestaurant = (restaurant) => {
    //     const newList = restaurants.filter(element => {return element.id !== restaurant.id});
    //     console.log(`NEW LIST: ${JSON.stringify(newList)}`)
    //     setRestaurants(newList);
    // }

    return(
        <RestaurantsContext.Provider value = {{restaurants, setRestaurants, addRestaurant, selectedRestaurant, setSelectedRestaurant, numberOfComments, setNumberOfComments}}>
            {props.children}
        </RestaurantsContext.Provider>
    );
}
