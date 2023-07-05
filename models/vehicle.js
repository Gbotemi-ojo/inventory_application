const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicle= new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required:true, minLength: 3, maxLength: 150 },
    category: { type: Schema.Types.ObjectId, ref: "vehicle_model", required: true },
    price : {type : Number, required:true},
    number_in_stocks : {type:Number, required:true}
});
// const obj = 
// {
//     "name": "aventador",
//     "description" : "super fast",
//     "category" : "lamborghini",
//     "price" : 200000,
//     "number_in_stock" : 7
// }
vehicle.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/home/all_vehicle/${this._id}`;
});
module.exports = mongoose.model("vehicle", vehicle);