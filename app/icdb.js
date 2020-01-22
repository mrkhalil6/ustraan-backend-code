'use strict';
const querystring = require('querystring');
var QRCode = require('qrcode');

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	async = require('async'),
	uid = require('uid'),
	fs = require('fs'),
	request = require('request'),
	helperCTRL = require('./helper');
	require('date-utils');

var filePath = {
	1: __dirname + '/../../public/assets/uploads/users/'
};




/**
 *
 */
exports.getSingle = function(req, res) {

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.findById(req.body._id, function(err, result) {

		res.json(result);
		console.log(result)
	});
};

exports.addTagsList = function(req, res) {
		console.log("taglist saving");	
		var commonModel = mongoose.model("Tags");
		console.log(req.body.myarray);
		var array =JSON.parse(req.body.myarray);
		console.log("array of tags "+array);

		//JSON.parse(response.body.myarray(/\/g,''));
		// jsonObj=JSON.parse(req.body.myarray);
		//var jsonObject = stringToObject(req.body.myarray)
		console.log("conveted data"+json);
		req.body.createdAt = new Date().getTime();
		
		for (var i in req.body.myarray){
			req.body.myarray[i];
		}
		list.forEach(function (arrayItem) {
			var taglist=new commonModel({
				TagID: arrayItem.TagID,
				JeptagID:arrayItem.JeptagID,
				SellerID:arrayItem.SellerID,
				JeptagID:arrayItem.JeptagID
			})
			taglist.save(function(err, result) {
				if (err){
						res.json({
						status:false
					});		
					return;
				}
				else{
					res.json({
						status:true
					});
					return;
				}
			});
			console.log("tag item saved");

		});

	}
	exports.addproductdata = function(req, res) {
		console.log("executing adding products ");
			if (!req.body.model) {
				res.json([]);
				return;
			}
		
			var commonModel = mongoose.model("req.body.model");
			req.body.model = '';
			req.body.createdAt = new Date().getTime();
			var idFOrQR=req.body.Qr_code_id;
			var stringID=idFOrQR+"";
		
			QRCode.toDataURL(stringID, function (err, url) {
				if (err) 
				console.log('error: ' + err)
				req.body.barcode_type=url;
				  
		
		  var commonFormData = new commonModel(req.body);
		
		commonFormData.save(function(err, result) {
		
				if (err) {
					res.json({
						status: false
					});
					return;
				}
		
				res.json({
					status: true,
					result: result
				});
			});
		});
			return;
		}

	
exports.updateproduct = function(req, res) {
	console.log("executing updating products ");

		var commonModel = mongoose.model("products");
		var product_id=req.body._id;
		req.body.createdAt = new Date().getTime();
	
		commonModel.findOne({_id:product_id},function(err,result){
			if(err){
				console.log(err);
				return res.json({status:false});
			}else{
				if(result!==null){

					result.name=req.body.name;
					result.category=req.body.category;

					result.sub_category_id=req.body.sub_category_id;
					result.product_url=req.body.product_url;
					result.description=req.body.description;
					result.weight=req.body.weight;
					result.price=req.body.price;
					result.alert_quantity=req.body.alert_quantity;
					result.image=req.body.image;

					result.save();

					var responseData={
						status:true
					
					};
				
					console.log(responseData);
					return res.json(responseData);


				}else{
				return res.json({status:false});
				}
			}
		});
		return;
	}
	


exports.addproductReviewdata = function(req, res) {
	console.log("executing adding products ");
		if (!req.body.model) {
			res.json([]);
			return;
		}
	
		var commonModel = mongoose.model(req.body.model);
		req.body.model = '';
		req.body.createdAt = new Date().getTime();
		
	
	  var commonFormData = new commonModel(req.body);
	
	commonFormData.save(function(err, result) {
	
			if (err) {
				res.json({
					status: false
				});
				return;
			}
	
			res.json({
				status: true,
				result: result
			});
		});
	
		return;
	}
	
/**
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
exports.getTagsData = function(req, res) {

	console.log("request received !");
	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model("Tags");

	commonModel.find().exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		
	});
};


exports.getlastTag = function(req, res) {

	console.log("request received !");
	

	var commonModel = mongoose.model("Tags");

	commonModel.find().sort({$natural: -1})
    .limit(1).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			res.json({
				status: true,
				data: responseData,
			});
			return;
		}
		console.log(responseData);
		
	});
};


exports.getTagById = function(req, res) {

	console.log("request received !");
	

	var commonModel = mongoose.model("Tags");

	commonModel.find({TagID:req.body.TagID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			res.json({
				status: true,
				data: responseData,
				type :"Dummy tag"
			});
			return;
		}
		console.log(responseData);
		
	});
};
exports.getproductTagsData = function(req, res) {

	console.log("request received !");
	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({ProductID:req.body.ProductID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		
	});
};

exports.getData = function(req, res) {

	console.log("request received !");
	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find().exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		res.json(responseData);
		return;
	});
};



/**
 *
 */
exports.getsubCategories =function(req, res) {
	console.log("CALELLLLED");

	console.log(req.body.model)
	console.log(req.body.condition)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find().exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};


exports.getsubCategoriess =function(req, res) {
	console.log("CALELLLLED");

	console.log(req.body.model)
	console.log(req.body.CategoryId)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({CategoryId:req.body.CategoryId}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};


exports.getseller = function(req, res) {
	console.log(req.body.model)
	console.log(req.body.seller_id)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({_id:req.body.seller_id}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};

exports.getstore = function(req, res) {
	console.log(req.body.model)
	console.log(req.body.condition)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.findOne({seller_id:req.body.condition}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};
exports.getCondition = function(req, res) {
	console.log(req.body.model)
	console.log(req.body.condition)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find(req.body.condition).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	
	res.json(responseData)
		
		return;

		
	});
};

exports.getProductCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};

exports.getProductsCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.find({_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};





exports.getProductStatus = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		else if(responseData.approved.includes("1")){
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
	console.log("RESPONDED WITH DATA:");
	console.log(responseData);



		
	});
};



exports.getPendingProductStatus = function(req, res) {
	

	var commonModel = mongoose.model("products");

	commonModel.find({seller_id:req.body.seller_id}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		else if(responseData.approved.includes("0")){
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
	console.log("RESPONDED WITH DATA:");
	console.log(responseData);



		
	});
};

exports.getProductTagCondition2 = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.tagId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({tag_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};







exports.getProductTagCondition = function(req, res) {
	var count =0;
	var url = require('url');

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var tagid=parsedQs.tagId;
	
	console.log("QUERY STRING !!!!!");
	
	console.log(tagid);

	var commonModel = mongoose.model("Tags");
	var productModel = mongoose.model("products");

	commonModel.findOne({TagID:tagid}).exec(function(err, responseData) {

		if(err) {
			console.log("error")
		}
	else if(responseData==null){
		res.json({
			status: false
		});
		return;	
	}
else{
	console.log("count before"+count);
	console.log("counter original"+responseData.counter);

	count=responseData.counter;
	
	console.log("count on getting data from counter"+count);

	count+=1;
	console.log("count after adding"+count);

	responseData.counter=count;
	console.log("responseData.counter after"+responseData.counter);
	 
	

	console.log("counter stored afrer"+responseData.counter)
	console.log("RESPONDED WITH DATA:");
	console.log(responseData)
	console.log("product id"+responseData.ProductID)
	console.log("count"+count+"counter stored"+responseData.counter)



	commonModel.updateOne({TagID:tagid},{counter:responseData.counter},function(err,tagresult){
	if(err){
	throw err;
			}
console.log("neww updated data"+tagresult)
     
	var productid=responseData.ProductID;
	productModel.findOne({_id:productid}).exec(function(err, result) {
		if(err) {
			res.json({
				status: false,
				data: result
			});
			return;
		}
	//	console.log("RESPONDED WITH product DATA of tag :");
	console.log("result of product data"+result)
		console.log("responseData.counter=="+responseData.counter)
	res.json({
		status:true,
		data:result,
		counter:responseData.counter
	})
		
		return;

		
	});
})
}
	

});
};

exports.getProductReviewsCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("ProductReview");

	commonModel.find({product_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);
	var sum =0;
	for(var i=0;i<responseData.length;i++){
	
		sum+=parseInt(responseData[i].Ratings);
	
	}
	var avg = sum/responseData.length;

	console.log("sum "+ sum + "average rating "+avg);
console.log("data "+ responseData);
	res.json({
		average_rating:avg,
		review_count:responseData.length,
		status:true,
		data:responseData})
		
		return;

		
	});
};

exports.getSellerWholeAddress = function(req, res) {
	
	var url = require('url');

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var seller_ID=parsedQs.sellerId;

	console.log("QUERY STRING !!!!!");
	
	console.log(seller_ID);
	

	var commonModel = mongoose.model("StoresDetail");

	commonModel.findOne({'seller_id':seller_ID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};


exports.getProductList = function(req, res) {
	
	var url = require('url');

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var seller_ID=parsedQs.sellerId;

	console.log("QUERY STRING !!!!!");
	
	console.log(seller_ID);
	

	var commonModel = mongoose.model("products");

	commonModel.find({'seller_id':seller_ID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};

exports.getApprovedProductList = function(req, res) {
	
	
	var seller_ID=req.body.seller_id;

	console.log("QUERY STRING !!!!!");
	
	console.log(seller_ID);
	

	var commonModel = mongoose.model("products");

	commonModel.find({'seller_id':seller_ID,'approved':"1"}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};



exports.getSellerCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({_id:prod}).exec(function(err, responseData) {

		if(err) {
			
			console.log("error in fectching products ")
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);
	var storeModel = mongoose.model('StoresDetail');
	storeModel.findOne({_id:data.store_id}).exec(function(err, responseData) {

	if(err) {
		res.json({
			status: false,
			data: responseData
		});
		return;
	}
	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
});
}

/**
 *
 */
exports.getEditData = function(req, res) {

    if (!req.body.model) {
        return res.json([]);
    }

    var commonModel = mongoose.model(req.body.model);

    commonModel.update({
        _id: req.body._id
    }, req.body, {
        multi: true
    }).exec(function(err, result) {

		if (req.body.model == 'OurTeam') {
			req.session.user = req.body;
		}

        res.json({
            status: true,
            result: result
        });
    });
};



/**
 *
 */
exports.commonUploadFile = function(req, res) {

	var fileObject = req.files.file,
		destinationpath = filePath[req.params.key];

	var extArray = fileObject.originalFilename.split('.');
	var ext = extArray[extArray.length - 1];
	var fileName = uid(10) + '.' + ext;

	fs.readFile(fileObject.path, function(err, data) {

		if(err) {
			res.send(err);
			return;
		}

		var newPath = destinationpath + fileName;

		fs.writeFile(newPath, data, function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.send({
				original: req.files.file.name,
				image: fileName,
				status: true
			});
			return;
		});
	});
};



/**
 *
 */
exports.postUpdateChildData = function(req, res) {

	if (!req.body.model || !req.body.entityId) {
		return res.json([]);
	}

	var commonModel = mongoose.model(req.body.model);
	var entityId = req.body.entityId,
		childEntityId = req.body.childEntityId,
		entityKey = req.body.entityKey;

	delete req.body.entityId;
	delete req.body.childEntityId;
	delete req.body.entityKey;


	var saveData = function() {

		var updateData = {};
		for (var row in req.body) {
			updateData[row] = req.body[row];
		}

		var condition = {
			_id: entityId
		};

		var pull = {};
		pull[entityKey] = {
			_id: mongoose.Types.ObjectId(childEntityId)
		}

		var push = {};
		updateData._id = mongoose.Types.ObjectId(childEntityId);
		push[entityKey] = updateData;

		commonModel.update({
			'_id': entityId
		}, {
			$pull: pull
		}).exec(function(err, result) {

			if (err) {
				res.json({
					status: false,
					err: err
				});
				return;
			}


			commonModel.update({
				'_id': entityId
			}, {
				$push: push
			}).exec(function(err, result) {

				if (err) {
					res.json({
						status: false,
						err: err
					});
					return;
				}

				var sendRS = function() {
					res.json({
						status: true,
						result: updateData
					});
				}

				switch(entityKey) {
					case 'something':
					break;
						default:
						sendRS();
						break;
				}
				return;
			});
		});
	}


	if (req.body.tags) {
		getDynamicTagsByName(req.body.tags, function(tags) {
			req.body.tags = tags;
			saveData();
		});
	} else {
		saveData();
	}
}



/**
 *
 */
exports.postUpdateData = function(req, res) {

	if (!req.body.model || !req.body.entityId) {
		return res.json([]);
	}

	commonModel.update({
		'_id': req.body.entityId
	}, req.body ).exec(function(err, result) {
		res.json(result);
	});
}




/**
 *
 */
exports.postAddData = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.createdAt = new Date().getTime();
	
	var commonFormData = new commonModel(req.body);

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}

// this is for adding a single tag
exports.AddTag = function(req, res) {
	console.log("callled");

	var commonModel = mongoose.model("Tags");
	//req.body.createdAt = new Date().getTime();

	var commonFormData = new commonModel(req.body);
	//commonModel.find({$or:[{'TagID':req.body.TagID},{'JeptagID':req.body.JeptagID}]},function(err,data){
commonModel.findOne({TagID:req.body.TagID}).exec(function(err, data){
	console.log("inside find ");
		console.log(req.body.JeptagID);
		console.log(req.body.TagID);

		console.log("data  found" + data);
		//console.log("jeptag id in datas"+data.JeptagID);

		if(err){
			console.log("error in getting data");
		  }
		  else{
		   if (data==null) {
			
			console.log("tag  id not found");
			commonFormData.save(function(err, result) {

				console.log(result);
				if (err) {
					console.log(err);
					res.json({
						message:"error",
					});
					return;
				}
			
			console.log("Below error");
			
				res.json({
					message:"true",
					result: result
				});
				return;

			});
			}

			else if(data.JeptagID==req.body.JeptagID){
				console.log("jeptag id found "+data.JeptagID);

			res.json({
				message:"Jeptag ID already exists!",
				result: result
			
			});
			return;

			}
			else if (data.TagID==req.body.TagID){
	  
			  console.log("tag id found "+data.TagID);
			  
			  res.json({
				  message:"TagID already exists!",
				  result: result
							
			});
		  
			return;

		  }
		  else{
			console.log("cannot save data "+data);
			
		  }
		}
	 
	});

}
	



exports.addDemoConditions = function(req, res) {


	var commonModel = mongoose.model("conditionS");
	req.body.createdAt = new Date().getTime();
	
	var commonFormData = new commonModel({name:"used"});

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}


exports.postDesktopUserLoginData = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	//req.body.createdAt = new Date().getTime();
	
	var commonFormData = new commonModel(req.body);

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}



/**
 *
 */
exports.getDeleteData = function(req, res) {
	console.log("product deleted route callled ")

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	// Delete common Data
	commonModel.findOne({ _id: req.body._id}).remove(function(err, result) {
		if (err) {
			res.json({
				status: false
			});
			return;
		}

		res.json({
			status: true,
			responseIds: req.body._id
		});
		return;
		console.log("product deleted ")
	});
};


/**
 *
 */
exports.getDeleteDataCondition = function(req, res) {

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	// Delete common Data
	commonModel.find(req.body.condition).remove(function(err, result) {

		if (err) {
			res.json({
				status: false
			});
			return;
		}

		res.json({
			status: true
		});
		return;
	});
}



exports.getDeleteDataCondition = function(req, res) {

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	// Delete common Data
	commonModel.find(req.body.condition).remove(function(err, result) {

		if (err) {
			res.json({
				status: false
			});
			return;
		}

		res.json({
			status: true
		});
		return;
	});
}
