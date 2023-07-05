// unfotunate name here, to represent the model of a vehicle...
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicle_model = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description : {type : String, required:true, minLength : 3, maxLength : 150}
});

vehicle_model.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/home/all_vehicle_category/${this._id}`;
});
module.exports = mongoose.model("vehicle_model", vehicle_model);