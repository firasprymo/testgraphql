const Event = require('../../models/eventModel');
const { transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      return createdEvent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteEvent: async (args) => {
    try {
      const event = await Event.findByIdAndDelete(args._id);
      return event;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getEventByTitle: async (args) => {
    const fetchedEvent = await Event.find({ title: args.eventTitle });
    return fetchedEvent.map((event) => {
      return transformEvent(event);
    });
  },
};
