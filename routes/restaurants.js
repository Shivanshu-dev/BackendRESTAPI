const express = require('express');
const { getAllRestaurants, createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurants');
const router = express.Router();

// get all restaurants , create res--> private
router.route('/').get(getAllRestaurants).post(createRestaurant);

// get 1 res , update del 1 res , private routes --> update delete , 
router.route('/:id').get(getRestaurant).put(updateRestaurant).delete(deleteRestaurant);


module.exports = router;