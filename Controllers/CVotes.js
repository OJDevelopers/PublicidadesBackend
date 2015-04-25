var mongoose = require('mongoose');
var Votes = mongoose.model('Votes');

  //GET - Return all Votes in the DB
  exports.findAllVotes = function(req, res) {
  	console.log(Votes);
  	Votes.find(function(err, votes) {
  		console.log(votes);
  		if(!err) {
  			res.send(votes);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Votes with specified ID
  exports.findVotesByIdCompetitor = function(req, res) {
      Votes.find({ IdCompetitor: req.params.idCompetitor, IdAdvertising: req.params.IdAdvertising }, function (err, votes) {
      if(!err) {
        res.send(votes._id);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  exports.findVotesByIdVoter = function (req, res) {
      Votes.find({ IdVoter: req.params.IdVoter, IdAdvertising: req.params.IdAdvertising }, function (err, votes) {
          if (!err) {
              res.send(votes._id);
          } else {
              console.log('ERROR: ' + err);
          }
      });
  };

  //POST - Insert a new Votes in the DB
  exports.addVotes = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
        var votes = new Votes({
            IdAdvertising: req.body.IdAdvertising,
            IdCompetitor: req.body.IdCompetitor,
            IdVoter: req.body.IdVoter
        });

      votes.save(function(err) {
        if(!err) {
          console.log('Votes "'+ req.body.BasicInfo.Name +'" Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(votes);
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a Votes already exists
  exports.updateVotes = function(req, res)
  {
      Votes.findById(req.params.id, function (err, votes) {
        votes.IdAdvertising = req.body.IdAdvertising,
        votes.IdCompetitor = req.body.IdCompetitor,
        votes.IdVoter = req.body.IdVoter
        votes.save(function(err) {
        if(!err) 
        {
            console.log('Votes "'+ req.body.BasicInfo.Name +'" Updated Succefull');
        }
        else
        {
            console.log('ERROR: ' + err);
        }

        res.send(votes);
        });
    });
  };

  //DELETE - Delete a Votes with specified ID
  exports.deleteVotes = function(req, res) {
    Votes.findById(req.params.id, function(err, votes) {
      votes.remove(function(err) {
        if(!err) {
      console.log('Votes with Id "'+ req.params.id +'" Removed Succefull');
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });
  }