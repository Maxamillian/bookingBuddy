var config = process.env || require('../../env.config');
var hotWireApiKey = config.HOTWIRE_API_KEY;
var md5 = require('md5');
var cid = config.EXPEDIA_CID;
var apiKey = config.EXPEDIA_API_KEY;
var secret = config.EXPEDIA_SECRET;

var queryOptions = {
  cid: '379639',
  apiKey: '65cc419lbqf590p1njeuv4p0q0',
  secret: 'bvp038hq772sm',
  sig: md5('65cc419lbqf590p1njeuv4p0q0' + 'bvp038hq772sm' + Math.floor(new Date() / 1000)),
  locale: 'en_US', // optional defaults to en_US
  currencyCode: 'USD' // optional defaults to USD
};

var expedia = require('expedia')(queryOptions);

module.exports.expediaAPI = function(req, res, next) {
  console.log('Inside expediaA Api...', req.body);
  var options = {
    customerSessionId: 'thisisauniqueID',
    customerIpAddress: '127.0.0.1',
    customerUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko)',
    HotelListRequest: {
      city: req.body.location,
      countryCode: 'US',
      arrivalDate: req.body.beginningDate,
      departureDate: req.body.endingDate,
      RoomGroup: {
        Room: { numberOfAdults: '2' }
      },
      numberOfResults: '12'
    }
  };
  var returned = false;
  expedia.hotels.list(options, function(err, data) {
    if (err) {
      console.log('ERROR', err);
    }
    console.log('Getting Expedia Hotel Data...');
    res.send(data.HotelListResponse.HotelList);
    returned = true;
  });

  var handleExpediaFail = function() {
    console.log('setTimeout for expedia error handling');
    if (!returned) {
      console.log('Expdedia is having a moment... ');
      res.send({ err: 'Expdedia is having a moment... ' });
    }
  };

  setTimeout(handleExpediaFail.bind(this), 5000);
};

// Bookmarks
module.exports.expediaBookmarksAPI = function(req, res, next) {
  console.log('Inside expedia Bookmarks Api...', req.body);
  var bookmarkOptions = {
    customerSessionId: 'thisisauniqueID',
    customerIpAddress: '127.0.0.1',
    customerUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko)',
    HotelListRequest: {
      hotelIdList: req.body.hotelIdList,
      arrivalDate: req.body.beginningDate,
      departureDate: req.body.endingDate,
      RoomGroup: {
        Room: { numberOfAdults: '2' }
      },
      numberOfResults: '1'
    }
  };

  expedia.hotels.list(bookmarkOptions, function(err, data) {
    if (err) {
      console.log('ERROR', err);
    }
    console.log('Getting Expedia Hotel BOOKMARK Data...');
    console.log('BOOKMARK data returned from expedia: ', data);
    res.send(data.HotelListResponse.HotelList);
  });
};

var Hotwire = require('hotwire');
var hotwire = new Hotwire(process.env.HOTWIRE_API_KEY || hotWireApiKey);
var options = {
  cid: '379639',
  apiKey: '65cc419lbqf590p1njeuv4p0q0'
  // secret : "bvp038hq772sm"
};

var Hotwire = require('hotwire');
var hotwire = new Hotwire(process.env.HOTWIRE_API_KEY || hotWireApiKey);

module.exports.hotwirePostRequest = function(req, res, next) {
  console.log('Inside Hotwire Api...');
  hotwire.hotelDeals(
    {
      format: 'json',
      price: '*~' + req.body.sum,
      limit: 10,
      startdate: req.body.dates[0] + '~' + req.body.dates[1],
      duration: parseInt(req.body.dates[2])
    },
    function(err, response, body) {
      if (err) {
        console.log(err, 'ERR');
      }
      res.send(JSON.parse(body));
    }
  );
};
