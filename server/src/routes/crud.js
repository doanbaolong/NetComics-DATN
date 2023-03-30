const express = require("express");
const router = express.Router();

const crudController = require("../app/controllers/CRUDController");

// homeController.index
router.post("/post-crud", crudController.creat);
router.get("/show", crudController.show);
router.get("/edit/:id", crudController.edit);
router.put("/:id", crudController.update);
router.get("/delete/:id", crudController.delete);
router.get("/", crudController.index);

module.exports = router;
