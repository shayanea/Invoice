// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var moment      = require('moment-jalaali');
var cors        = require("cors");

var multer      = require('multer');
var path        = require('path')
var crypto      = require('crypto');


var jwt    = require('jsonwebtoken');
var config = require('./config');

// =======================
// upload config =========
// =======================
var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});
var upload = multer({ storage: storage });

// =======================
// service =========
// =======================
var auth   = require('./service/Auth');


// =======================
// controller =========
// =======================
var Login = require('./controller/login');
var Register = require('./controller/register');
var profile = require('./controller/profile');
var client = require('./controller/client');
var product = require('./controller/product');
var invoice = require('./controller/invoice');
var dashboard = require('./controller/dashboard');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(config.database,function (err, db){
	if(!err){
		// =======================
		// start the server ======
		// =======================
		app.listen(port,function(){
			console.log('database is connected');
		});
	}
});
app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors());

app.use(express.static(__dirname + '/public')); 	

app.post('/api/auth/register',Register);

app.post('/api/auth/login', Login);

app.get('/api/profile', auth, profile.GetProfile);

app.post('/api/profile/edit', auth, profile.EditProfile);

app.post('/api/profile/upload', auth, upload.single('file'), profile.EditProfile);

app.get('/api/clients',auth,client.GetClient);

app.post('/api/clients/add',auth,client.AddClient);

app.delete('/api/clients/remove',auth,client.RemoveClient);

app.patch('/api/clients/edit',auth,client.EditClient);

app.get('/api/suggestname',auth,client.Suggest);

app.get('/api/product',auth,product.GetProduct);

app.post('/api/product/add',auth,product.AddProduct);

app.delete('/api/product/remove',auth,product.RemoveProduct);

app.patch('/api/product/edit',auth,product.EditProduct);

app.get('/api/suggestproduct',auth,product.Suggest);

app.get('/api/invoice',auth,invoice.GetInvoice);

app.get('/api/invoice/get',auth,invoice.GetInvoiceById);

app.post('/api/invoice/add',auth,invoice.AddInvoice);

app.delete('/api/invoice/remove',auth,invoice.RemoveInvoice);

app.patch('/api/invoice/edit',auth,invoice.EditInvoice);

app.get('/api/dashboard',auth,dashboard.Get);

app.get('/*', function(req, res) {
	res.sendFile('./public/index.html',{ root: __dirname });
});