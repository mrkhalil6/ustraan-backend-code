var mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var url = require('url');
var QRCode = require('qrcode');

function sendNewUserEmail(user){
    async function main(){
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: 'jeptags@gmail.com', 
          pass: 'Tvn@1970@1971' 
        }
      });
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Best Sky America" <jeptags@gmail.com>', // sender address
        to: "jeptags@gmail.com", // list of receivers
        subject: "New user registered ! ✔", // Subject line
        html: `<h1>${user.email} registered </h1>
        <p> This is an automated message informing you that a new user registered for a business account in our system </p>
         `
      });
      
    }
  
    main().catch(console.error);
  
  }



// ---- Create new user ---- (DO NOT CALL THIS FOR BUSINESS ACCOUNTS)
exports.register = function(req, res) {
  

    var userModel = mongoose.model('users');

    userModel.find({
        email: req.body.email
    }).exec(function(err, result) {

        if (err) {
     
            return;
        }

        if (result && result.length) {
         
            res.json({
                status: 1
            });

            return;
        }

        req.body.createdAt = new Date();
        var user = new userModel(req.body);

     
        // because we set our user.provider to local our models/user.js validation will always be true
        req.assert('first_name', 'You must enter a firstname').notEmpty();
        req.assert('last_name', 'You must enter a lastname').notEmpty();
        req.assert('email', 'You must enter a valid email address').isEmail();
        req.assert('password', 'Password must be 8 to 20 characters long').len(8, 20);
        var errors = req.validationErrors();
      
        
        if (errors) {
        
            res.json({
                status: 2,
                errors: errors,
            })
            
            return
        }

        // Hard coded for now. Will address this with the user permissions system in v0.3.5
        user.roles = 'admin';
        
        user.isActivate = true;
       
       
        user.save(function(err, result) {
            res.json(result);
        });
    });
};



//--Create a simple user (non-admin user)
exports.registerUser = function(req, res) {
    console.log("REceived the call !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    
    var userModel = mongoose.model('users');

    userModel.find({
        email: req.body.email
    }).exec(function(err, result) {

        if (err) {
            return;
        }

        if (result && result.length) {
            console.log("status 1 error")
            res.json({
                status: 1,
            });

            return;
        }

        req.body.createdAt = new Date();
        console.log(req.body);
        var user = new userModel(req.body);

        // because we set our user.provider to local our models/user.js validation will always be true
        req.assert('first_name', 'You must enter a firstname').notEmpty();
        req.assert('last_name', 'You must enter a lastname').notEmpty();
        req.assert('email', 'You must enter a valid email address').isEmail();
        req.assert('password', 'Password too short').len(8, 20);

        var errors = req.validationErrors();

        if (errors) {
            console.log("status 2 error")
          
            res.json({
                status: 2,
                errors: errors,
            })
            return;
        }

        // Hard coded for now. Will address this with the user permissions system in v0.3.5
        user.roles = 'user';

        
        
        
        //TODO: change it back to false later on after testing it
        user.isActivate = true;




        sendNewUserEmail(user);

        user.save(function(err, result) {
            
            res.json({
                status: "true",
                data:result
            });
        });
    });
};




exports.getProducts = function(req, res) {
    console.log("REceived the call !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    var productModel = mongoose.model('products');
    
//var url_parts = url.parse(req.url, true);
//var productId = url_parts.productId;
var productId = req.body.productId;

    productModel.findOne({
        _id: productId
    }).exec(function(err, result) {

        if (err) {
            return;
        }

        if (result && result.length) {
            console.log("status 1 error")
            res.json({
                status: false,
            });

            return;
        }

        console.log(result);
        
        res.json({
            status:true,
            data:result});
        
    
    });
};


exports.getProductsList = function(req, res) {
    console.log("REceived the call !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    var productModel = mongoose.model('products');
    

    var sellerID=req.body.sellerID;
    var lang=req.body.lang;


    productModel.find({
        seller_id: sellerID
    }).exec(function(err, result) {

        if(err) {
			res.json({
				status: false,
				data: result
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(result);

	res.json({
		status:true,
		data:result})
		
		return;

		
	});
};
/**
 *
 */
exports.getLoggedUser = function(req, res) {
    res.json(req.user || null);
};


/**
 *
 */
exports.logout = function(req, res) {
    req.session.user = null;
    res.json({});
};



// ---- Login user ----
exports.login = function(req, res) {
    var userModel = mongoose.model('users');

    userModel.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err || !user) {
            console.log("1 false");
            res.json({
                msg: 'User not found',
                status: false
            });
            return;
        }

        if (!user.authenticate(req.body.password)) {
            
            console.log("2 false");
            res.json({
                msg: 'Email or password is invalid.',
                status: false
            });
            return;
        }
        if(user.isActivate==false){
           
            console.log("3 false");
            res.json({
                msg:'Activate your account first',
                status: false
            });
            return;
        }
        else{
            req.session.user = user;

            res.json({
                status: true,
                msg:"Login Successful",
                data: user,
            });
        }
    });
}

// ---- Check seller address ----
exports.checkSellerAddress = function(req, res) {
    var userModel = mongoose.model('StoresDetail');

    userModel.findOne({
        'seller_id': req.body.seller_id
    }, function(err, data) {

        if (err || !data) {
            res.json({
                msg: 'User Not found',
                status: false
            });
            return;
        }else{
            if(!(data.Address)){
                res.json({
                    msg: 'Address not found',
                    status: false
                });
        
                return;
            }else{
                res.json({
                    result: data,
                    msg: 'Address found',
                    status: true
                });
        
                return;
            }

        }

      
    });
}


//--Create a Company
exports.addCompany = function(req, res) {
    console.log("REceived the call !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
   
    var companyModel = mongoose.model('Company');

        req.body.createdAt = new Date();
        console.log(req.body);
        var user = new userModel(req.body);

        // because we set our user.provider to local our models/user.js validation will always be true
        req.assert('first_name', 'You must enter a firstname').notEmpty();
        req.assert('last_name', 'You must enter a lastname').notEmpty();
        req.assert('email', 'You must enter a valid email address').isEmail();
        req.assert('password', 'Password too short').len(8, 20);

        var errors = req.validationErrors();

        if (errors) {
            console.log("status 2 error")
          
            res.json({
                status: 2,
                errors: errors,
            })
            return;
        }

        // Hard coded for now. Will address this with the user permissions system in v0.3.5
        user.roles = 'user';

        
        
        
        //TODO: change it back to false later on after testing it
        user.isActivate = true;




        sendNewUserEmail(user);

        user.save(function(err, result) {
            
            res.json({
                status: "true",
                data:result
            });
        });
    
};

