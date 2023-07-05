const express = require("express");
const router = express.Router();

const Vehicle = require("../controllers/vehicle_controller");
const Vehicle_category = require("../controllers/vehicle_category_controller");

router.get("/vehicle_form", Vehicle.vehicle_form_get);
router.post("/vehicle_form", Vehicle.vehicle_form_post);
router.get("/all_vehicle", Vehicle.vehicle_list);
router.get("/all_vehicle/:id",Vehicle.vehicle_detail);

router.get("/all_vehicle_category",Vehicle_category.vehicle_category_list);
router.get("/all_vehicle_category/:id", Vehicle_category.vehicle_category_detail);
router.get("/vehicle_category_form",Vehicle_category.vehicle_category_form_get);
router.post("/vehicle_category_form",Vehicle_category.vehicle_category_form_post);

router.get("/all_vehicle/:id/delete",Vehicle.vehicle_delete_get);
router.post("/all_vehicle/:id/delete",Vehicle.vehicle_delete_post);

router.get("/all_vehicle/:id/update",Vehicle.vehicle_update_get);
router.post("/all_vehicle/:id/update",Vehicle.vehicle_update_post);

router.get("/all_vehicle_category/:id/delete",Vehicle_category.vehicle_category_delete_get);
router.post("/all_vehicle_category/:id/delete",Vehicle_category.vehicle_category_delete_post);

router.get("/all_vehicle_category/:id/update",Vehicle_category.vehicle_category_update_get);
router.post("/all_vehicle_category/:id/update", Vehicle_category.vehicle_category_update_post)
module.exports = router;
