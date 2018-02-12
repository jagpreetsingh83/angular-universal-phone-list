// server.js BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

// configure app to use bodyParser() this will let us get the data from a POST
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

var port = process.env.PORT || 5000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.get('/price', function (req, res) {
    setTimeout(function () {
        res.json((Math.random() * 1000).toFixed(2));
    }, 1000);
});
router.get('/phones', function (req, res) {
    // if (!req.cookies.PLAY) {
    //     throw Error('PLAY Cookie Not Found');
    // }
    setTimeout(function () {
        res.json([
            {
                id: 1,
                name: 'IPhone X',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/apple/UTE-iPhoneX-silver-225x338-01.png'
            }, {
                id: 2,
                name: 'IPhone 8',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/apple/UTE-iPhone-8-grey-800x1200-01.png'
            }, {
                id: 3,
                name: 'IPhone 7',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/apple/apple-iphone-7-black-front-IP732BLK.png'
            }, {
                id: 4,
                name: 'Galaxy S8',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/samsung/UTE-SamsungS8-800x1200-01-S8BLK.png'
            }, {
                id: 5,
                name: 'Google Pixel 2',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/google/UTE-google-pixel2-wht-225x338-01.png'
            }, {
                id: 6,
                name: 'LG G6',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/lg/UTE-LGG6-800x1200-01-G6PLT.png'
            }, {
                id: 7,
                name: 'LG V3',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/lg/UTE-LGV30-225x338-01.png'
            }, {
                id: 8,
                name: 'Huawei P10',
                url: 'https://www.rogers.com/web/totes/cms/ute/rogers/consumer/BFA/images/wireless/dev' +
                    'ices/huawei/UTE-huawei-p10-blk-800x1200-01-EN-P10BLK-.png'
            }
        ]);
    }, 1000);
});
// more routes for our API will happen here REGISTER OUR ROUTES
// ------------------------------- all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);