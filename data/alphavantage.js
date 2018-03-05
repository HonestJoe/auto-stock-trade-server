"use strict";
var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;
var Apikey = 'COTLNG8YXNJ8QO1I';
var alphaVantageAPI = new AlphaVantageAPI(Apikey, 'compact', true);

var fetch = require('node-fetch')
console.log(Apikey)
// var fetch;
// if (typeof window === 'undefined') {
//   // Seems like we are using Node.js
//   fetch = __webpack_require__(1);
// } else {
//   fetch = window.fetch;
// }



// series_type = close / open / high / low

//HT Trendline/mode
// function, symbol, interval, series_type, apikey

//MACD
// function, symbol, interval, series_type, apikey

//RSI
// function, symbol, interval, time_period(numdatapoints), series_type, apikey

//var Stocks = ['GOOG', 'TSLA', 'AAPL', 'BA', 'AMD', 'BAC']
//var Functions = ['HT_TRENDLINE', 'HT_TRENDMODE', 'MACD', 'MACDEXT', 'RSI', "BBANDS"]

const DEFAULT_URL = 'https://www.alphavantage.co/query?'

console.log(getTechnical('MACD', 'MSFT', '5min'))

function getTechnical(func, sym, inter, time='undefined')
{
	// console.log(Apikey)
 //  if (typeof ApiKey === 'undefined')
 //  {
 //    throw new Error("error1")
 //  }

  var params = {
  	function: func,
    symbol: sym,
    interval: inter,
    series_type: 'open',
  };

  if (func == "RSI")
  {
  	if (time != 'undefined')
  	{
  		params.time_period = time;
  	}
  	else
  	{
  		throw new Error('error2');
  	}
  }
  console.log(Apikey)
  params.apikey = Apikey;

  return new Promise((resolve, reject) =>
  {
  	var encoded = Object.keys(params).map(
    key => `${key}=${params[key]}`
  	).join('&');

    var url = DEFAULT_URL + encoded;

    fetch(url).then(function (response)
    {
      return response.json();

    }).then(function (data)
    {
    	console.log(url + "\n")
    	console.log(data);
      if (typeof data['Error Message'] !== 'undefined')
      {
        throw new Error('error3')
      }

      resolve(data);
    });
  });
}


// function getStockDaily(stock_symbol)
// {
// 	alphaVantageAPI.getDailyData(stock_symbol)
// 		.then(dailyData => {

// 			return dailyData;
// 		})
// 		.catch(err => {
//         console.error(err);
//     });
// }

// // interval is 1min / 5min / 15min / 30min / 60min

// function getStockIntraday(stock_symbol, interval)
// {
// 	alphaVantageAPI.getIntradayData(stock_symbol, interval)
// 		.then(intradayData => {

// 			return intradayData;
// 		})
// 		.catch(err => {
//         	console.error(err);
//     });
// }





// alphaVantageAPI.getDailyData('MSFT')
//     .then(dailyData => {

//         //console.log("Daily data:");
//         //console.log(dailyData);



//     })
//     .catch(err => {
//         console.error(err);
//     