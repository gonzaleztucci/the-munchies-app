import React from "react";
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdateRestaurantPage from "./routes/UpdateRestaurantPage";



const App = () => {
    return(  
    <RestaurantsContextProvider>
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element = {<Home/>} />
                    <Route exact path="/restaurants/:id" element = {<RestaurantDetailPage/>} />
                    <Route exact path="/restaurants/:id/update" element = {<UpdateRestaurantPage/>} />
                </Routes>
            </Router>
        </div>
    </RestaurantsContextProvider>
)
}

export default App;