/* Load Dependant Modules */
var jwt = require('jsonwebtoken');

module.exports = {

    // Function to generate token for Payload
    generate: function (data, expiryTime) {

        // Set the expiry date in the token data
        data.exp = expiryTime;

		return jwt.sign(data, 'test12345value');
    },

    // Function to verify the token and decode Payload
    verify: function (req, cb) {

        // verify a token symmetric
        jwt.verify(req.headers.authorization, 'test12345value', function (error, decoded) {
            if (error) {
                console.log(' -- error :- ', error);
                cb({message: error.message}, null);
            }
            else {
                console.log(' -- decoded: ', decoded);
                cb(null, decoded);
            }
        });
    },
};

// Encrypted uuid type token to string
// function encryption(uuidValue) {
//     var cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET);
 
//      // To handle 'bad decrypted value due to wrong key'  
//      try {
//          var crypted = cipher.update(uuidValue, 'utf-8', 'hex');
//          crypted += cipher.final('hex');
//          console.log(' -- token_crypted: ' + crypted);
 
//          return crypted
//      } catch (err) {
//          return err.message
//      }
//  }
 
//  // Decrypt encoded token
//  function decrytion(tokenId){
     
//      console.log(' -- tokenId: ' + tokenId);
     
//      // To handle error 'bad decrypted value due to wrong key'  
//      try{
//          var decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET);
//          var decrypted = decipher.update(tokenId, 'hex', 'utf-8');
//              decrypted += decipher.final('utf-8');
         
//          console.log(' -- decrypted: ' + decrypted);
         
//          return decrypted;
//      }
//      catch(err){
//          console.log(" -- decrypted_catch_err: " + err.message);
//          callback(401, 'Unauthorized');
//      }
//  }