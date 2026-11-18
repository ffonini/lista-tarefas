const express = require("express");
const router = express.Router();
const validateTask = require("../middlewares/validateTask")
const validateTaskUpdate = require("../middlewares/validateTaskUpdate");
const validateTaskFilters = require("../middlewares/validateTaskFilters");

const {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasksController");

router.get("/", validateTaskFilters, getTasks);
router.get("/:id", getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTaskUpdate, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;