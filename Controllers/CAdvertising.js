var mongoose = require('mongoose');
var Advertising = mongoose.model('Advertising');

  //GET - Return all Users in the DB
  exports.findAllAdvertisings = function(req, res) {
  	console.log(Advertising);
  	Advertising.find(function(err, advertising) {
  		console.log(advertising);
  		if(!err) {
  			res.send(advertising);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  exports.findAdvertisingsById = function(req, res) {
      Advertising.findById(req.params.id,function(err, advertising) {
      if(!err) {
        res.send(advertising);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified UserName
  /*exports.findUserByNomUsu = function(req, res) {
    //Advertising.findById(req.param.id, function(err, guia) {
      Advertising.find({NomUsu:req.params.NomUsu},function(err, advertising) {
      console.log(req.params);
      if(!err) {
        res.send(advertising);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };*/

  //POST - Insert a new User in the DB
  exports.addAdvertisings = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
        var advertising = new Advertising({
            Name: req.body.Name,
            Logo: req.body.Logo,
            Background: req.body.Background,
            Color: req.body.Color,
            Awards: req.body.Awards,
            TokenApp: req.body.TokenApp,
            FacebookPerfil: req.body.FacebookPerfil,
            TwitterPerfil: req.body.TwitterPerfil
      });

      advertising.save(function(err) {
        if(!err) {
          console.log('Advertising "'+ req.body.Name +'" Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(advertising);
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a User already exists
  exports.updateAdvertising = function(req, res)
  {
      Advertising.findById(req.params.id, function (err, advertising) {
          advertising.Name= req.body.Name,
          advertising.Logo= req.body.Logo,
          advertising.Background= req.body.Background,
          advertising.Color= req.body.Color,
          advertising.Awards= req.body.Awards,
          advertising.TokenApp = req.body.TokenApp,
          advertising.FacebookPerfil = req.body.FacebookPerfil,
          advertising.TwitterPerfil = req.body.TwitterPerfil

      advertising.save(function(err) {
        if(!err) 
        {
          console.log('Advertising "'+ req.body.Name +'" Updated Succefull');
        }
        else
        {
          console.log('ERROR: ' + err);
        }

        res.send(advertising);
      });
    });
  };

  //DELETE - Delete a User with specified ID
  exports.deleteAdvertising = function(req, res) {
    Advertising.findById(req.params.id, function(err, advertising) {
      advertising.remove(function(err) {
        if(!err) {
      console.log('Advertising Id "'+ req.params.id +'" Removed Succefull');
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });
  }