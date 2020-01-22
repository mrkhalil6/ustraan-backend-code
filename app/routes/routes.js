'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors');
var connectMultiparty = require('connect-multiparty');
var multipartMiddleware = connectMultiparty();


var controller = {
    home: require('../controllers/home'),
    userCtrl: require('../controllers/user'),
    icdb: require('../icdb'),
};




// define the home page route
router.get('/', controller.home.index);
router.get('/api/user/me', cors(), controller.userCtrl.getLoggedUser);
router.post('/api/user/login', cors(), controller.userCtrl.login);
router.post('/api/user/logout', cors(), controller.userCtrl.logout);
router.post('/api/user/newProductsGet', cors(), controller.userCtrl.logout);
router.post('/api/user/register', cors(), controller.userCtrl.register);
router.post('/api/user/registerUser', cors(), controller.userCtrl.registerUser);
router.post('/api/user/checkSellerAddress', cors(), controller.userCtrl.checkSellerAddress);
router.post('/api/user/getProduct', cors(), controller.userCtrl.getProducts);
//router.post('/api/user/addCompany', cors(), controller.userCtrl.addCompany);

router.post('/api/common/getstore', cors(), controller.icdb.getstore);

router.post('/api/common/getsubCategories', cors(), controller.icdb.getsubCategories);
router.post('/api/common/getsubCategoriess', cors(), controller.icdb.getsubCategoriess);

//Common routes

router.post('/api/common/addproduct', cors(), controller.icdb.addproductdata);
router.post('/api/common/updateProduct', cors(), controller.icdb.updateproduct);
//working route for add of review
router.post('/api/common/addproductreview', cors(), controller.icdb.addproductReviewdata);

router.get('/api/common/getProductStatus', cors(), controller.icdb.getProductStatus);


router.get('/api/common/getpendingProductStatus', cors(), controller.icdb.getPendingProductStatus);

router.post('/api/common/add-desktop-userloginData', cors(), controller.icdb.postDesktopUserLoginData);
router.post('/api/common/add-single-tag', cors(), controller.icdb.AddTag);

router.post('/api/common/add-data', cors(), controller.icdb.postAddData);
router.get('/api/common/add-DemoCategory-data', cors(), controller.icdb.addDemoConditions);
router.post('/api/common/get-data', cors(), controller.icdb.getData);

router.post('/api/common/get-condition', cors(), controller.icdb.getCondition);
router.post('/api/common/single-data', cors(), controller.icdb.getSingle);
router.post('/api/common/edit-data', cors(), controller.icdb.getEditData);
router.post('/api/common/delete', cors(), controller.icdb.getDeleteData);
router.post('/api/common/delete-condition', cors(), controller.icdb.getDeleteDataCondition);

// router.all('/api/v1/dashboard/data', cors(), controller.home.getDashboardData);

router.get('/api/common/get-product-review-condition', cors(), controller.icdb.getProductReviewsCondition);
router.get('/api/common/get-seller-whole-address', cors(), controller.icdb.getSellerWholeAddress);
router.get('/api/common/get-product-list', cors(), controller.icdb.getProductList);

router.post('/api/common/get-Tags-data', cors(), controller.icdb.getTagsData);


router.post('/api/common/get-approved-product-list', cors(), controller.icdb.getApprovedProductList);


router.get('/api/common/get-products-condition', cors(), controller.icdb.getProductsCondition);

router.get('/api/common/get-product-condition', cors(), controller.icdb.getProductCondition);
router.get('/api/common/get-productTag-condition', cors(), controller.icdb.getProductTagCondition);

router.get('/api/common/get-productTag-condition2', cors(), controller.icdb.getProductTagCondition2);


router.get('/api/common/get-seller-condition', cors(), controller.icdb.getSellerCondition);



// new desktop routes
router.post('/api/common/get-product-Tags-data', cors(), controller.icdb.getproductTagsData);
router.post('/api/common/getseller', cors(), controller.icdb.getseller);
//deslktop admin route
router.post('/api/common/get-Tags_by_id', cors(), controller.icdb.getTagById);
router.get('/api/common/get-last-tag', cors(), controller.icdb.getlastTag);
router.post('/api/common/addTagList', cors(), controller.icdb.addTagsList);


module.exports = router;
