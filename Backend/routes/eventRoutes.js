const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventsByCity,
  searchEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

// Get all events
router.get("/", getAllEvents);

// Search events
router.get("/search", searchEvents);

// Get events by city
router.get("/city/:city", getEventsByCity);

// Get event by ID
router.get("/:id", getEventById);

// Create event
router.post("/", createEvent);

// Update event
router.put("/:id", updateEvent);

// Delete event
router.delete("/:id", deleteEvent);

module.exports = router;

