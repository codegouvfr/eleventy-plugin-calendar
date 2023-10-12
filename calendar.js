const {DateTime} = require("luxon");

const parseDate = (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, {zone: "utc"});
}

const toHtmlString = (dateObj) => {
    return parseDate(dateObj).toFormat("yyyy-LL-dd");
}

const isAllDay = (date) => {
    return !date.hour
        && !date.minute
        && !date.second;
}

const eventToJsonEvent = (event, options = {}) => {
    const time = {};
    let start = parseDate(event.data.start);
    if (!start.isValid) {
        throw new TypeError("Invalid or missing event start date.");
    }
    if (isAllDay(start) || !event.data.end) {
        time.start = [start.year, start.month, start.day];
    } else {
        time.start = [start.year, start.month, start.day, start.hour, start.minute];
    }
    if (event.data.end) {
        let end = parseDate(event.data.end);
        if (isAllDay(start) && isAllDay(end)) {
            time.end = [end.year, end.month, end.day];
        } else {
            time.end = [end.year, end.month, end.day, end.hour, end.minute];
        }
    } else if (event.data.duration) {
        time.duration = event.data.duration;
    } else {
        // All day event
        const nextDay = start.plus({days: 1});
        time.end = [nextDay.year, nextDay.month, nextDay.day]
    }
    return {
        ...time,
        ...{
            title: event.data?.title,
            description: event.data?.description,
            location: event.data?.location || options.defaultLocation,
            organizer: event.data.organizer || options.defaultOrganizer
        }
    }
};

module.exports = {
    eventToJsonEvent,
    toHtmlString
}
