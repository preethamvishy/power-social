var request = require('request');
var config = require('./config');

functions = {
    authorize: function (req, res) {
        var header = config.consumerkey + ':' + config.consumersecret;
        var encodedHeader = new Buffer(header).toString('base64');
        var finalheader = 'Basic ' + encodedHeader;

        request.post('https://api.twitter.com/oauth2/token', {
            form: { 'grant_type': 'client_credentials' },
            headers: { Authorization: finalheader }
        }, function (error, response, body) {
            if (error)
                console.log(error);
            else {
                config.bearertoken = JSON.parse(body).access_token;
                res.json({ success: true, data: config.bearertoken });
            }
        });
    },

    search: function (req, res) {
        var searchquery = req.body.query;
        var encodedSearchQuery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + encodedSearchQuery +
            '&result_type=recent', { headers: { Authorization: bearerheader } }, function (error, body, response) {
                if (error)
                    console.log(error);
                else {
                    res.json({ success: true, data: JSON.parse(body.body) });
                }
            });
    },
    user: function (req, res) {
        var searchquery = req.body.screenname;
        var encodedSearchQuery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + encodedSearchQuery + '&count=200&tweet_mode=extended', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error)
                console.log(error);
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        });
    },
    list: function (req, res) {
        var screenname = encodeURIComponent(req.body.screenname);
        var listslug = encodeURIComponent(req.body.slug);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/lists/statuses.json?slug=' + listslug + '&owner_screen_name=' + screenname + '&count=200&tweet_mode=extended', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error)
                console.log(error);
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        }, err => console.log(err));
    },
    favs: function (req, res) {
        var searchquery = req.body.screenname;
        var encodedSearchQuery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/favorites/list.json?count=200&screen_name=' + encodedSearchQuery + '&tweet_mode=extended', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error)
                console.log(error);
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        });
    },
    following: function (req, res) {
        var searchquery = req.body.screenname;
        var encodedSearchQuery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/friends/list.json?screen_name=' + encodedSearchQuery + '&skip_status=true&include_user_entities=false&count=200', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error)
                console.log(error);
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        });
    },
    fetchTweetById: function (req, res) {
        var searchquery = req.body.id;
        var encodedSearchQuery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/statuses/show.json?id=' + encodedSearchQuery + '&tweet_mode=extended', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error)
                console.log(error);
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        });
    },
}

module.exports = functions;