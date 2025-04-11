require('dotenv').config();
var request = require("request");

const clientID = process.env.FATSECRET_CLIENT_ID;
const clientSecret = process.env.FATSECRET_CLIENT_SECRET;
let accessToken = null;

function getNewAccessToken() {
    var options = {
        method: 'POST',
        url: 'https://oauth.fatsecret.com/connect/token',
        method : 'POST',
        auth : {
           user : clientID,
           password : clientSecret
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded'},
        form: {
           'grant_type': 'client_credentials',
           'scope' : 'basic'
        },
        json: true
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
  
        accessToken = body.access_token;
  
        console.log("New access token:", accessToken);

        setTimeout(getNewAccessToken, (body.expires_in - 60) * 1000); 
    });
} 

getNewAccessToken();

function lookUp(name, brand){
    
}


