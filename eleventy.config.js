const ics = require("ics");

const calendar = require("./calendar");

module.exports = (eleventyConfig, options = {}) => {
    eleventyConfig.addFilter("slugifyEvent", (event) => {
        return `${eleventyConfig.getFilter("slugify")(event.data.title)}-${calendar.toHtmlString(event.data.date)}`;
    });

    eleventyConfig.addFilter("toCalendar", (events) => {
        const jsonEvents = (events || []).map(event => calendar.eventToJsonEvent(event, options));
        const {error, value} = ics.createEvents(jsonEvents);
        error ? console.warn(error) : null;
        return value;
    });

    eleventyConfig.addFilter("toCalendarEvent", (event) => {
        const jsonEvent = calendar.eventToJsonEvent(event, options);
        const {error, value} = ics.createEvent(jsonEvent);
        error ? console.warn(error) : null;
        return value;
    });
}
