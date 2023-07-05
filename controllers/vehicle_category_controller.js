const vehicle_category = require("../models/vehicle_category");
const vehicle = require("../models/vehicle");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
exports.vehicle_category_list = asyncHandler(async (req, res, next) => {
    const all_vehicle_category_list = await vehicle_category.find().sort({ name: 1 }).exec();
    res.render("vehicle_category_list", {
        vehicle_category_list: all_vehicle_category_list
    });
});
exports.vehicle_category_detail = asyncHandler(async (req, res, next) => {
    const [vehicle_details, vehicleCategory] = await Promise.all([
        vehicle.find({ category: req.params.id }).exec(),
        vehicle_category.findById(req.params.id).exec()
    ])
    res.render("vehicle_category_details", {
        vehicles: vehicle_details,
        vehicle_category: vehicleCategory
    });
});
exports.vehicle_category_form_get = asyncHandler(async (req, res, next) => {
    res.render("vehicle_category_form")
});
exports.vehicle_category_form_post = [
    body("name", "category name must be at least 3 characters long")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description", "description must be at least 10 characters long")
        .trim()
        .isLength({ min: 10 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const category = new vehicle_category({
            name: req.body.name,
            description: req.body.description
        });
        if (!errors.isEmpty()) {
            res.render("vehicle_category_form", {
                category,
                errors: errors.array(),
            });
            return;
        }
        else {
            const categoryExists = await vehicle_category.findOne({ name: req.body.name }).exec();
            if (categoryExists) {
                res.redirect(categoryExists.url);
            } else {
                await category.save();
                res.redirect(category.url);
            }
        }
    })]
exports.vehicle_category_delete_get = asyncHandler(async (req, res, next) => {
    const [Vehicles, vehicle_cat] = await Promise.all([
        vehicle.find({ category: req.params.id }),
        vehicle_category.findById({ _id: req.params.id })
    ])
    res.render("vehicle_category_delete", {
        Vehicles, vehicle_cat
    })
});
exports.vehicle_category_delete_post = asyncHandler(async (req, res, next) => {
    await vehicle_category.findByIdAndRemove(req.body.vehicle_category_id);
    res.redirect("/");
});
exports.vehicle_category_update_get = asyncHandler(async (req, res, next) => {
    const category = await vehicle_category.findById(req.params.id).exec();
    res.render("vehicle_category_form", {
        category,
    });
});
exports.vehicle_category_update_post = [
    body("name", "category name must be at least 3 characters long")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description", "description must be at least 10 characters long")
        .trim()
        .isLength({ min: 10 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const vehicle_cat = {
            name: req.body.name,
            description: req.body.description
        }
        if (!errors.isEmpty()) {
            res.render("vehicle_category_form", {
                category: vehicle_cat,
                errors: errors.array()
            })
        }
        else {
            const categoryExists = await vehicle_category.findOne({ name: req.body.name }).exec();
            if (categoryExists) {
                res.redirect(categoryExists.url)
            }
            else {
                await vehicle_category.save();
                res.redirect(vehicle_category.url);
            }
        }
        const updated_category = await vehicle_category.findByIdAndUpdate(req.params.id, vehicle_cat, { new: true });
        res.redirect(updated_category.url);
    })];