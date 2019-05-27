'use strict';

const request = require('request');
const token = "Crusty5oil!";
const url = "http://54.197.196.151/v1/graphql";

module.exports.query = async (event) => {
  let q = decodeURI(event.pathParameters.q);
  //let q = "{ing{name type}}";
  let data = {
    "query": q
  }

  let getData = await hasuraPost(data);
  return getData;
};

function hasuraPost(data) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: "POST",
      headers: { 'x-hasura-admin-secret': token },
      json: true,
      body: data
    }, function (error, response, body) {
      if (error) reject(rtn(400, error));
      else if(body.errors) reject(rtn(400, body.errors));
      else resolve(rtn(200, body));
    });
  });
}

function rtn(status, returnMsg){
  return {
    statusCode: status,
    body: JSON.stringify({
      message:  returnMsg
    }, null, 2),
  };
}
