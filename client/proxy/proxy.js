const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./api');

const app = express();

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000; // set our port

// create our router
const router = express.Router();

/* API */
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.use('/app', routes.appRoutes);
router.use('/authentication', routes.authenticationRoutes);
router.use('/products', routes.productsRoutes);
// router.use('/orders', routes.ordersRoutes);
router.use('/users', routes.usersRoutes);
router.use('/booking/services', routes.servicesRoutes);
router.use('/booking/employees', routes.staffRoutes);

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`API Proxy listening on: http://localhost:${port}`);
