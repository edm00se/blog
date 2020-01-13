// const https = require('https');
const fetch = require('node-fetch');
const querystring = require('querystring');
const BASE_URL = 'https://www.google-analytics.com/collect';

function getIpFromEvent (event) {
  return event.headers['client-ip'] || event.headers['x-client-ip'] || event.headers['x-forwarded-for'];
}

function getQueryParamsFromEvent (event) {
  return {...event.queryStringParameters};
}

function buildRequestUrl (myIp, queryParams) {
  let qParms = {...queryParams}
  if(!Object.keys(qParms).includes('uip')){
    qParms.uip = myIp;
  }
  const qString = querystring.stringify(qParms);
  return `${BASE_URL}${qString ? '?' : ''}${qString}`;
}

async function getData(url){
  try{
    const res = await fetch(url);
    return res;
  } catch(er) {
    console.error(er);
    return er;
  }
}

exports.handler = async (event, context) => {
  const builtUrl = buildRequestUrl(getIpFromEvent(event), getQueryParamsFromEvent(event));

  const res = await getData(builtUrl);
  const { statusCode, data } = res;

  return {
    statusCode: statusCode || 500,
    body: data || JSON.stringify(res)
  };

}
