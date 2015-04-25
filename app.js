
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

mongoose.connect('mongodb://Administrator:Ramjets2015!@ds041337.mongolab.com:41337/ramjets', function (err, res) {
//mongoose.connect('mongodb://localhost/GuiaDB', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
    console.log(res);
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var MAdvertising = require('./models/Advertising')(app, mongoose);
var AdvertisingCtrl = require('./Controllers/CAdvertising');
var MParticipants = require('./models/Participants')(app, mongoose);
var ParticipantsCtrl = require('./Controllers/CParticipants');
var MTokensApps = require('./models/TokensApps')(app, mongoose);
var TokensAppsCtrl = require('./Controllers/CTokensApp');
var MVotes = require('./models/Votes')(app, mongoose);
var VotesCtrl = require('./Controllers/CVotes');


var router = express.Router();
router.get('/', function(req, res) {
    res.send("<h1>Api Rest Web Publicidades Ramjets With MongoDB running...</h1>");
});


app.use(router);

router.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// API routes

//---------Inicio rutas Advertising--------------//
var RAdvertising = express.Router();

RAdvertising.route('/advertising').get(AdvertisingCtrl.findAllAdvertisings);
RAdvertising.route('/advertising/Insert').post(AdvertisingCtrl.addAdvertisings);
RAdvertising.route('/advertising/:id').get(AdvertisingCtrl.findAdvertisingsById);
RAdvertising.route('/advertising/Update/:id').put(AdvertisingCtrl.updateAdvertising);
RAdvertising.route('/advertising/Delete/:id').delete(AdvertisingCtrl.deleteAdvertising);
//----------Fin rutas Advertising-------------------//

//------------Inicio rutas Tokens App-----------//
var RTokensApp = express.Router();

RTokensApp.route('/tokensapp').get(TokensAppsCtrl.findAllTokensApp);
RTokensApp.route('/tokensapp/Insert').post(TokensAppsCtrl.addTokensApp);
RTokensApp.route('/tokensapp/:id').get(TokensAppsCtrl.findTokensAppById);
RTokensApp.route('/tokensapp/Update/:id').put(TokensAppsCtrl.updateTokensApp);
RTokensApp.route('/tokensapp/Delete/:id').delete(TokensAppsCtrl.deleteTokensApp);
//-------------Fin rutas Tokens App----------------//

//------------Inicio rutas Participants-----------//
var RParticipants = express.Router();

RParticipants.route('/participants').get(ParticipantsCtrl.findAllParticipants);
RParticipants.route('/participants/Insert').post(ParticipantsCtrl.addParticipants);
RParticipants.route('/participants/Advertising/:IdAdvertising').get(ParticipantsCtrl.findParticipansByAdvertising);
RParticipants.route('/participants/Facebook/:IdFacebook/:IdAdvertising').get(ParticipantsCtrl.findParticipansByFacebook);
RParticipants.route('/participants/Twitter/:IdTwitter/:IdAdvertising').get(ParticipantsCtrl.findParticipansByTwitter);
RParticipants.route('/participants/:id').get(ParticipantsCtrl.findParticipantsById);
RParticipants.route('/participants/Update/:id').put(ParticipantsCtrl.updateParticipants)
RParticipants.route('/participants/Delete/:id').delete(ParticipantsCtrl.deleteParticipants);
//-------------Fin rutas Participants----------------//

//------------Inicio rutas Payment Type-----------//
var RVotes = express.Router();

RVotes.route('/votes').get(VotesCtrl.findAllVotes);
RVotes.route('/votes/Insert').post(VotesCtrl.addVotes);
RVotes.route('/votes/Competitor/:IdCompetitor/:IdAdvertising').get(VotesCtrl.findAllVotes);
RVotes.route('/votes/Voter/:IdVoter/:IdAdvertising').get(VotesCtrl.findAllVotes);
RVotes.route('/votes/Update/:id').put(VotesCtrl.updateVotes)
RVotes.route('/votes/Delete/:id').delete(VotesCtrl.deleteVotes);
//-------------Fin rutas Payment Type----------------//

app.use('/api', RAdvertising);
app.use('/api', RTokensApp);
app.use('/api', RParticipants);
app.use('/api', RVotes);

var Port = process.env.PORT || 8888;//3050;//
app.listen(Port, function() {
    console.log("Node server running on http://localhost:3000. Server Web Publicidades Ramjets With MongoDB");
});