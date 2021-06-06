const express = require("express");
const tasksController = require("../controllers/task");

const router = express.Router();

// /tasks => GET
router.get("/tasks", tasksController.getTasks);

// /task => POST
router.post("/tasks", tasksController.postTask);

// /tasks/:id => GET
router.get("/tasks/:id", tasksController.getTaskById);

// /tasks/:id => PUT
router.put("/tasks/:id", tasksController.putTask);

// /tasks/:id => DELETE
router.delete("/tasks/:id", tasksController.deleteTask);

module.exports = router;
