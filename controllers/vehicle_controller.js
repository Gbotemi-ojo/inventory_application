const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Vehicle = require("../models/vehicle");
const vehicle_category = require("../models/vehicle_category");
exports.vehicle_list = asyncHandler(async (req, res, next) => {
    const allVehicles = await Vehicle.find().sort({ name: 1 }).exec();
    res.render("vehicle_list", {
        title: "vehicle List",
        vehicle_list: allVehicles,
    });
});
exports.vehicle_detail = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id).populate("category").exec()
    res.render("vehicle_details", {
        vehicle
    })
});
exports.vehicle_form_get = asyncHandler(async (req, res) => {
    const categories = await vehicle_category.find().exec()
    res.render("vehicle_form", {
        categories: categories,
    });
});
// Handle book create on POST.
exports.vehicle_form_post = [
    body("name", "vehicle name must be minimum of 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description", "description must be at least 10 characters long")
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body("category", "select a category")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "enter vehicle price")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("number_in_stocks", "enter stock number")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const vehicle = new Vehicle({
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            number_in_stocks: req.body.number_in_stocks,
        });
        if (!errors.isEmpty()) {
            res.render("vehicle_form", {
                vehicle,
                errors: errors.array()
            });
            return;
        }
        else {
            const vehicle_exists = await Vehicle.findOne({ name: req.body.name })
            if (vehicle_exists) {
                res.redirect(vehicle_exists.url)
            }
            else {
                await vehicle.save();
                res.redirect(vehicle.url);
            }
        }
    })];
exports.vehicle_delete_get = asyncHandler(async (req, res, next) => {
    const required_vehicle = await Vehicle.findById(req.params.id).exec();
    res.render("vehicle_delete", {
        vehicle: required_vehicle
    });
})
exports.vehicle_delete_post = asyncHandler(async (req, res, next) => {
    await Vehicle.findByIdAndRemove(req.body.vehicleid);
    res.redirect("/");
})
exports.vehicle_update_get = asyncHandler(async (req, res, next) => {
    const [vehicle, categories] = await Promise.all([
        Vehicle.findById(req.params.id).exec(),
        await vehicle_category.find().exec()
    ])
    res.render("vehicle_form", {
        vehicle,
        categories
    });
})
exports.vehicle_update_post = [
    body("name", "vehicle name must be minimum of 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description", "description must be at least 10 characters long")
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body("category", "select a category")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "enter vehicle price")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("number_in_stocks", "enter stock number")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const vehicle = new Vehicle({
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            number_in_stocks: req.body.number_in_stocks,
            _id: req.params.id
        });
        if (!errors.isEmpty()) {
            res.render("vehicle_form", {
                vehicle,
                errors: errors.array()
            })
            return;
        }
        else{
            const vehicle_exists = Vehicle.findOne({name : req.body.name})
            if(vehicle_exists){
                res.redirect(vehicle_exists)
            }
            else{
                const updated_vehicle = await Vehicle.findByIdAndUpdate(req.params.id, vehicle, { new: true });
                res.redirect(updated_vehicle.url);
            }
        }
    })]