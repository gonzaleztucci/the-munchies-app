import React from "react";
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Header from "./components/Header";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdateRestaurantPage from "./routes/UpdateRestaurantPage";



const App = () => {
    return(  
    <RestaurantsContextProvider>
        <Router>
             <div>
                 <Header/>
             </div>
            <main>
                <Routes>
                    <Route exact path="/" element = {<Home/>} />
                    <Route exact path="/restaurants/:id" element = {<RestaurantDetailPage/>} />
                    <Route exact path="/restaurants/:id/update" element = {<UpdateRestaurantPage/>} />
                </Routes>
            </main>
        </Router>
    </RestaurantsContextProvider>
)
}

export default App;