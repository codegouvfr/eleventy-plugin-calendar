const {DateTime} = require("luxon");

const parseDate = (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, {zone: "utc"});
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
    let time;
    if (!(date.hour || date.minute)) {
        // ALl day event
        time = {
            "start":
                [date.year, date.month, date.day],
            "end":
                [date.year, date.month, date.day.plus({ days: 1 })]
        }
    } else {
        time = {
            "start":
                [date.year, date.month, date.day, date.hour, date.minute],
            "duration":
                {
                    "minutes": event.data.duration || options.defaultDuration
                }
        }
    }
    const organizer = event.data.organizer ? {
        "organizer": {
            "name": event.data.organizer.name,
            "email": event.data.organizer.email
        }
    } : {
        "organizer": {
            "name" : options.defaultOrganizer?.name,
            "email": options.defaultOrganizer?.email
        }
    };
    return {
        ...time,
        ...{
            "title": event.data?.title,
            "description": event.data?.description,
            "location": event.data?.location
        },
        ...organizer
    }
};

module.exports = {
    eventToJsonEvent,
    toHtmlString
}
