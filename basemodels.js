const mongoose = require("mongoose");

const BaseInfoSchema = new mongoose.Schema({
    _id: Number,
    id: Number,
    publishedDate: Date,
    lastApplicationDate: Date,
    title: String,  
    occupation: String,
    workplace: String,
    workplaceName: String,
    unspecifiedWorkplace: Boolean,
    published: Boolean,
    positions: Number,
    sourceLinks: String,
});

const BaseInfo = mongoose.model("baseinfo", BaseInfoSchema);

module.exports = BaseInfo;