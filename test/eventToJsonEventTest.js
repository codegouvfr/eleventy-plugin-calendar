const test = require("ava");
const {DateTime} = require("luxon");

const calendar = require("../calendar");

test("test event with invalid date", async t => {
    const event = {
        data: {}
    };
    t.throws(() => calendar.eventToJsonEvent(event));
});

test("test default options", async t => {
    const event = {
        data: {
            start: DateTime.utc(2023, 9, 10).toJSDate()
        }
    };
    const options = {
        defaultLocation: "online",
        defaultOrganizer: {
            name: "John Doe"
        }
    }
    const jsonEvent = calendar.eventToJsonEvent(event, options);
    t.like(jsonEvent, {
            location: "online",
            organizer: {
                name: "John Doe"
            }
        }
    );
});

test("test all day event (event with no end nor duration)", async t => {
    const event = {
        data: {
            start: DateTime.utc(2023, 9, 10).toJSDate()
        }
    };
    const jsonEvent = calendar.eventToJsonEvent(event);
    t.true(jsonEvent.start.length === 3);
    t.true(jsonEvent.end.length === 3);
    t.false("duration" in jsonEvent);
    t.like(jsonEvent, {
            start: [
                2023,
                9,
                10,
            ],
            end: [
                2023,
                9,
                11,
            ]
        }
    );
});

test("test multi all-day event (event with start and end dates)", async t => {
    const event = {
        data: {
            start: DateTime.utc(2023, 9, 10).toJSDate(),
            end: DateTime.utc(2023, 10, 12).toJSDate()
        }
    };
    const jsonEvent = calendar.eventToJsonEvent(event);
    t.true(jsonEvent.start.length === 3);
    t.true(jsonEvent.end.length === 3);
    t.false("duration" in jsonEvent);
    t.like(jsonEvent, {
            start: [
                2023,
                9,
                10,
            ],
            end: [
                2023,
                10,
                12,
            ]
        }
    );
});

test("test event with both end date and duration", async t => {
    const event = {
        data: {
            start: DateTime.utc(2023, 9, 10).toJSDate(),
            end: DateTime.utc(2023, 10, 12).toJSDate(),
            duration: {
                minutes: 60
            }
        }
    };
    const jsonEvent = calendar.eventToJsonEvent(event);
    t.false("duration" in jsonEvent);
    t.like(jsonEvent, {
            start: [
                2023,
                9,
                10,
            ],
            end: [
                2023,
                10,
                12,
            ]
        }
    );
});

test("test event with duration", async t => {
    const event = {
        data: {
            start: DateTime.utc(2023, 9, 10).toJSDate(),
            duration: {
                minutes: 60
            }
        }
    };
    const jsonEvent = calendar.eventToJsonEvent(event);
    t.false("end" in jsonEvent);
    t.like(jsonEvent, {
            start: [
                2023,
                9,
                10,
            ],
            duration: {
                minutes: 60
            }
        }
    );
});

test("test event with start and end datetimes", async t => {
    const event = {
        data: {
            start: DateTime.utc(2023, 9, 10, 9, 30).toJSDate(),
            end: DateTime.utc(2023, 9, 10, 18, 0).toJSDate()
        }
    };
    const jsonEvent = calendar.eventToJsonEvent(event);
    t.like(jsonEvent, {
            start: [
                2023,
                9,
                10,
                9,
                30
            ],
            end: [
                2023,
                9,
                10,
                18,
                0
            ]
        }
    );
});
