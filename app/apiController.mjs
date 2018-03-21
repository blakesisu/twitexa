import OAuth from 'oauth';

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const environment = process.env.NODE_ENV;

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  consumer_key,
  consumer_secret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

// enter search paramaters here
// https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
const params = {
  q: 'realoverheardla',
  until: `${datestring()}`,
  result_type: 'mixed',
  count: 100
}

const paramsLen = Object.keys(params).length;
const urlSuffix = Object.keys(params).reduce(( acc, curr, idx) => {
  let suffix = idx === paramsLen - 1 ? '' : '&';
  acc += `${curr}=${params[curr]}${suffix}`;
  return acc;
}, '')

console.log(`check suffix ${urlSuffix}`);

oauth.get(
  `https://api.twitter.com/1.1/search/tweets.json?${urlSuffix}`,
  access_token,
  access_token_secret,
  function (error, data, response){
    if (error) console.error(error);
    data = JSON.parse(data);
    const show = data.statuses.map(datum => {
      return datum.text;
    })
    .filter(datum => {
      return datum.indexOf('//') < 0 && datum.length > 75;
    })
    .map(datum => datum.replace(/(\r\n\t|\n|\r\t)/gm,""))
    .map(datum => datum.replace(/"/g, ''))

    console.log(JSON.stringify(show, 0, 2));
});

function datestring () {
  var d = new Date();
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +  (d.getDate() - Math.floor(Math.random() * 7));
};
