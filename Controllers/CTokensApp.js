var mongoose = require('mongoose');
var TokensApp = mongoose.model('TokensApp');

  //GET - Return all Users in the DB
  exports.findAllTokensApp = function(req, res) {
  	console.log(TokensApp);
  	TokensApp.find(function(err, tokensapp) {
  		console.log(tokensapp);
  		if(!err) {
  			res.send(tokensapp);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  exports.findTokensAppById = function(req, res) {
      TokensApp.findById(req.params.id,function(err, tokensapp) {
      if(!err) {
        res.send(tokensapp);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new User in the DB
  exports.addTokensApp = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
        var tokensapp = new TokensApp({
            Name: req.body.Name,
            PrivateToken: req.body.PrivateToken,
            PublicToken: req.body.PublicToken
      });

      tokensapp.save(function(err) {
        if(!err) {
          console.log('Payment Type "'+ req.body.Name +'" Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(tokensapp);
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a User already exists
  exports.updateTokensApp = function(req, res)
  {
      TokensApp.findById(req.params.id, function (err, tokensapp) {
          tokensapp.Name= req.body.Name,
          tokensapp.PrivateToken= req.body.PrivateToken,
          tokensapp.PublicToken= req.body.PublicToken

      tokensapp.save(function(err) {
        if(!err) 
        {
          console.log('Payment type "'+ req.body.Name +'" Updated Succefull');
        }
        else
        {
          console.log('ERROR: ' + err);
        }

        res.send(tokensapp);
      });
    });
  };

  //DELETE - Delete a User with specified ID
  exports.deleteTokensApp = function(req, res) {
    TokensApp.findById(req.params.id, function(err, tokensapp) {
      tokensapp.remove(function(err) {
        if(!err) {
      console.log('Payment Type with Id "'+ req.params.id +'" Removed Succefull');
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });
  }