const express = require('express')
const router = express.Router()
const { addLaptop,
    getLaptops,
    getLaptop,
    getCaption,
    getFilteredProducts,
    getSimilarProducts,
    addRecommendation,
    d,
    getUsersToRecommend, 
    setSoldout,
    searchProduct} = require('./controller');
const requireAuth = require('./middleware');

//Product
router.post('/add-laptop', requireAuth(), addLaptop)
router.get('/get-laptops', getLaptops)
router.get('/get-laptop/:id', getLaptop)
router.get('/search/:key', searchProduct)
router.get('/get-caption/:messageId', requireAuth(), getCaption)
router.get('/get-filtered-products', requireAuth(), getFilteredProducts)
router.get('/get-similar-products/:id', getSimilarProducts)
router.patch('/sold-out/:id', requireAuth(), setSoldout)
// router.delete('/d', d)

//Recommendation
addRecommendation
router.post('/add-recommendation', requireAuth(), addRecommendation)
router.get('/get-users-to-recommend', requireAuth(), getUsersToRecommend)



module.exports = router