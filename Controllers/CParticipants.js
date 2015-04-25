var mongoose = require('mongoose');
var Participants = mongoose.model('Participants');

  //GET - Return all Users in the DB
  exports.findAllParticipants = function(req, res) {
    console.log(Participants);
    Participants.find(function(err, participants) {
      console.log(participants);
      if(!err) {
        res.send(participants);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified ID
  exports.findParticipantsById = function(req, res) {
      Participants.findById(req.params.id,function(err, participants) {
      if(!err) {
        res.send(participants);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified UserName
  exports.findParticipansByAdvertising = function (req, res) {
      Participants.find({ IdAdvertising: req.params.IdAdvertising }, function (err, participants) {
          console.log(req.params);
          if (!err) {
              res.send(participants);
          } else {
              console.log('ERROR: ' + err);
          }
      });
  };

  //GET - Return a User with specified UserName
  exports.findParticipansByFacebook = function(req, res) {
      Participants.find({ IdFacebook: req.params.IdFacebook, IdAdvertising: req.params.IdAdvertising }, function (err, participants) {
      console.log(req.params);
      if(!err) {
          res.send(participants);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified UserName
  exports.findParticipansByTwitter = function (req, res) {
      Participants.find({ IdTwitter: req.params.IdTwitter, IdAdvertising: req.params.IdAdvertising }, function (err, participants) {
          console.log(req.params);
          if (!err) {
              res.send(participants);
          } else {
              console.log('ERROR: ' + err);
          }
      });
  };

  //POST - Insert a new User in the DB
  exports.addParticipants = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
        var participants = new Participants({
            Name: req.body.Name,
            IdAdvertising: req.body.IdAdvertising,
            IdFacebook: req.body.IdFacebook,
            IdTwitter: req.body.IdTwitter,
            Image: req.body.Image
      });

      participants.save(function(err) {
        if(!err) {
          console.log('Participants Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(participants);
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a User already exists
  exports.updateParticipants = function(req, res)
  {
      Participants.findById(req.params.id, function (err, participants) {
          console.log(participants);
          participants.Name= req.body.Name,
          participants.IdAdvertising= req.body.IdAdvertising,
          participants.IdFacebook= req.body.IdFacebook,
          participants.IdTwitter= req.body.IdTwitter,
          participants.Image= req.body.Image

      participants.save(function(err) {
        if(!err) 
        {
          console.log('Participants Updated Succefull');
        }
        else
        {
          //console.log('ERROR: ' + err);
        }

        res.send(participants);
      });
    });
  };

  //DELETE - Delete a User with specified ID
  exports.deleteParticipants = function(req, res) {
    Participants.findById(req.params.id, function(err, participants) {
      participants.remove(function(err) {
        if(!err) {
      console.log('Participants Id "'+ req.params.id +'" Removed Succefull');
        } else {
      console.log('ERROR: ' + err);
        }
      });
    });
  };