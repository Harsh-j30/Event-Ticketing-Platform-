const Event = require("../models/Event");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, city, description, image, price, date, location } = req.body;

    if (!name || !city || !description || !image || !price || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      name,
      city,
      description,
      image,
      price,
      date,
      location,
      createdBy: req.user?.id || null
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// Get events by city
exports.getEventsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const events = await Event.find({ city: new RegExp(city, "i") }).populate("createdBy", "name email");
    
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this city" });
    }

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// Search events by name
exports.searchEvents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const events = await Event.find({
      $or: [
        { name: new RegExp(query, "i") },
        { city: new RegExp(query, "i") },
        { description: new RegExp(query, "i") }
      ]
    }).populate("createdBy", "name email");

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Error searching events", error: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// Update event (only admin/creator)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, description, image, price, date, location } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update fields
    if (name) event.name = name;
    if (city) event.city = city;
    if (description) event.description = description;
    if (image) event.image = image;
    if (price) event.price = price;
    if (date) event.date = date;
    if (location) event.location = location;

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

// Delete event (only admin/creator)
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

