const {DateTime} = require("luxon");

const parseDate = (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, {zone: "utc"});
}

const isAllDayEvent = (duration) => {
    return duration.days && !duration.hours && !duration.minutes;
}

const toHtmlString = (date) => {
    return parseDate(date).toFormat("yyyy-LL-dd");
}

const eventToJsonEvent = (event, options = {}) => {
    if (!event) {
        return null;
    }
    const parsedDate = parseDate(event.data.date);
    const date = parsedDate.isValid ? parsedDate : DateTime.now();
    const duration = event.data.duration || options.defaultDuration || {};
    let time;
    if (isAllDayEvent(duration)) {
        // Day event
        time = {
            "start":
                [date.year, date.month, date.day],
            "end":
                [date.year, date.month, date.plus({ days: duration.days }).day]
        }
    } else {
        time = {
            "start":
                [date.year, date.month, date.day, date.hour, date.minute],
            duration
        }
    }
    return {
        ...time,
        ...{
            title: event.data?.title,
            description: event.data?.description,
            location: event.data?.location
        },
        organizer : event.data.organizer || options.defaultOrganizer
    }
};

module.exports = {
    eventToJsonEvent,
    toHtmlString
}
