require('dotenv').config()

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Pool } = require('pg');
const path = require('path');
const db = require('./db/index');
const res = require('express/lib/response');
const PORT = process.env.PORT || 3009;


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

if(process.env.NODE_ENV === 'production'){
    // server static contentent
    app.use(express.static(path.join(__dirname, 'client/build')));
}

console.log(__dirname);
console.log(path.join(__dirname, 'client/build'))

/**
 *   MIDDLEWARE
 */
// Checks if restaurant from id in Parameter is in the DB
const checkRestaurant = (req, res, next) => {
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM restaurants WHERE id = $1', [id], (err, results) => {
        if (err){
            console.log(err);
            res.status(500).send('Something broke!');
        }
        if(results.rows.length > 0) {
            next();
        } else {
            res.status(404).send('Restaurant not found');
        }
    })
}

// Get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
    db.query('SELECT r.id, r.name, r.location, r.price_range, COALESCE(trunc(AVG(rev.rating),2), 0) AS avg_rating, COALESCE(COUNT(rev.rating), 0) AS number_of_reviews FROM restaurants r LEFT JOIN reviews rev ON r.id = rev.restaurant_id GROUP BY r.id', (err, results) => {
        if (err) res.status(501).send('Something broke!');
        res.json({
            status: 'success',
            results: results.rows.length,
            data: results.rows
        });
    });
});

//Get a restaurant by id
app.get('/api/v1/restaurants/:id', (req, res, next)=> {
    
    db.query('SELECT * FROM restaurants WHERE id = $1', [parseInt(req.params.id, 10)] ,(err, results)=> {
        if (err) {
            res.status(500).send('Something broke!');
        } 
        if(results.rows.length > 0){
            // res.json({
            //     status: 'success',
            //     results: results.rows.length,
            //     data: results.rows[0]
            // })
            req.restaurant = results.rows[0];
            next();
        } else {
            res.status(404).send('Restaurant not found');
        }
    });   
}, (req, res, next) => {
    //Get all reviews for the restaurant
    db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [parseInt(req.params.id, 10)], (err, results) => {
        if (err) {
            res.status(500).send('Something broke!');
        } 
        // const reviews = results.rows;
        req.reviews = results.rows;
        next();
        // res.json({
        //     status: 'success',
        //     restaurant: req.restaurant,
        //     reviews: reviews
        // })
    })
}, (req, res) => {
    // Get average rating for the restaurant
    db.query('SELECT TRUNC(AVG(rating), 2) AS avg, COUNT(rating) AS total_reviews FROM reviews WHERE restaurant_id = $1', [parseInt(req.params.id, 10)], (err, results) => {
        if (err) {
            res.status(500).send('Something broke!');
        } 
        res.status(200).json({
            status: 'success',
            restaurant: req.restaurant,
            reviews: req.reviews,
            avg_rating: results.rows[0].avg,
            total_reviews: results.rows[0].total_reviews
        })
        
    })
});


// Create a new restaurant
app.post('/api/v1/restaurants', (req, res) => {
    const {name, location, price_range} = req.body;
    db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *', [name, location, price_range], (err, results) => {
        if(err) res.status(500).send('Something broke!');
        res.status(201).json({
            status: 'success',
            data: results.rows[0]
        })
    })
})


//Modify restaurant data by id
app.put('/api/v1/restaurants/:id', checkRestaurant, (req, res) => {
    const {name, location, price_range} = req.body;
    const id = parseInt(req.params.id);
    
    db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *', [name, location, price_range, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Something broke!');
        } 
        if(results.rows.length > 0){
            res.status(202).json({
                status: 'success',
                data: results.rows[0]
            })            
        } else {
            res.status(404).send('Restaurant not found');
        }
    })
 
});

//Delete restaurant by id
app.delete('/api/v1/restaurants/:id', checkRestaurant, (req, res, next) => {
    const id = parseInt(req.params.id);

    db.query('DELETE FROM reviews WHERE restaurant_id = $1', [id], (err, results) => {
        if(err){
            console.log(`el error ${err}`);
            res.status(500).send('Something broke!');
        } else {
            next();
        }
    })

},(req, res)=>{
    const id = parseInt(req.params.id);

    db.query('DELETE FROM restaurants WHERE id = $1', [id], (err, results) => {
        if(err){
            console.log(`el error ${err}`);
            res.status(500).send('Something broke!');
        } else {
            res.status(204).json({
                status: 'success'
            });
        }
    })
});

//Get reviews by restaurant id
app.get('/api/v1/restaurants/:id/reviews', checkRestaurant, (req, res) => {
    const {id} = req.params;
    db.query('SELECT name, text, rating FROM reviews WHERE restaurant_id = $1', [id], (err, results) => {
        if(err) res.status(500).send('Something broke!');
        if(results.rows.length > 0) {
            res.json({
                status: 'success',
                results: results.rows.length,
                data: results.rows
            });                
            } else {
                res.status(404).send('No reviews found');
            }
    })
});

// //CREATE new review
app.post('/api/v1/restaurants/:id/reviews', checkRestaurant , (req, res) => {
    const {id} = req.params;
    const {name, text, rating} = req.body;

    db.query('INSERT INTO reviews (name, text, rating, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, text, rating, id], (err, results) => {
        if(err) res.status(500).send('Something broke!');
        console.log(results.rows);
        res.json({
            status: 'success',
            data: results.rows[0]
        });
    })
})

// app.get('*', (req, res) => {
//     console.log(path.join(__dirname, 'client/build/index.html'));
//     res.sendFile(path.join(__dirname, 'client/build/index.html'));
// })


app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
})


