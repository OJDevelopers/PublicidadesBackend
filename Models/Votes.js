exports = module.exports = function(app, mongoose) {
    var TPaymentSchema = new mongoose.Schema({
      IdAdvertising: String,
      IdCompetitor: String,
      IdVoter: String
  });

  mongoose.model('Votes', TPaymentSchema);
};