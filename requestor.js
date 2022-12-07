const req = require("request");
const mongoose = require('mongoose');
const fs = require("fs");
const { exit } = require("process");
const baseModel = require("./basemodels");
const log = console.log;





const requestToAF = function (processRecord) {
  const afURL = "https://platsbanken-api.arbetsformedlingen.se/jobs/v1/search";
  const reqDataFilter = fs.readFileSync("./req-data.js");
  //log(JSON.parse(reqDataFilter.toString()));
  const reqData = {
    filters: JSON.parse(reqDataFilter.toString()),
    fromDate: "2022-11-28T23:00:00.000Z",
    order: "relevance",
    maxRecords: 100,
    startIndex: 0,
    toDate: "2022-12-06T19:46:07.136Z",
    source: "pb",
  };
  //log(reqData);
  //exit();

  req.post(
    {
      url: afURL,
      json: reqData,
      headers: { "content-type": "application/json" },
    },
    (error, respons, body) => {
      if (error) log("Error:", error);
      else {
        //log('response:', respons);
        log("body:", body.positions, body.numberOfAds, body.offsetLimit);
        body.ads.forEach((record) => { processRecord(record); });
      }
    }
  );
};

const funcStoreBrfRecord = function (record) {

    const instance = new baseModel(record);
    instance._id = record.id;
    instance.sourceLinks =  "https://platsbanken-api.arbetsformedlingen.se/jobs/v1/job/" + record.id;
    //log(record.id)
    //log("instance:", instance);
     instance.save().then(
        () => { log("Write record", instance._id); },
        (err) => { log("Error saving record:",err);}
     );
}


const funcPrintBrfRecord = function (record) {
  log(
    "https://platsbanken-api.arbetsformedlingen.se/jobs/v1/job/" +
      record.id +
      '  "' +
      record.lastApplicationDate +
      '"  "' +
      record.occupation +
      '"  "' +
      record.title +
      '"  "' +
      record.workplaceName +
      '"  "' +
      record.workplace +
      '" '
  );
};

const doFetch = function () {
  requestToAF(funcStoreBrfRecord);
}

module.exports = doFetch;