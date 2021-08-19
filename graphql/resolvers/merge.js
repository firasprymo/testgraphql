const Event = require('../../models/eventModel');
const { dateToString } = require('../../helpers/date');

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
};
const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
  };
};
exports.transformEvent = transformEvent;
