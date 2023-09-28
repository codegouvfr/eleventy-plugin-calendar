const test = require("ava");
const {DateTime} = require("luxon");

const calendar = require("../calendar");

test("test null event", async t => {
    const event = null;
    const jsonEvent = calendar.eventToJsonEvent(event);
    t.is(jsonEvent, null);
});

test("test invalid date", async t => {
    const event = {
        data: {
            date: "invalid date"
        }
    };
    const jsonEvent = calendar.eventToJsonEvent(event);
    t.like(jsonEvent, {
            start: [
                DateTime.now().year,
                DateTime.now().month,
                DateTime.now().day,
                DateTime.now().hour,
                DateTime.now().minute
            ]
        }
    );
});

test("test default options", async t => {
    const event = {
        data: {}
    };
    const options = {
        defaultDuration: 60,
        defaultOrganizer: {
            name: "John Doe",
            email: "john@doe.org"
        }
    }
    const jsonEvent = calendar.eventToJsonEvent(event, options);
    t.like(jsonEvent, {
            duration: {
                minutes: 60
            },
            organizer: {
                name: "John Doe",
                email: "john@doe.org"
            }
        }
    );
});

test("test all day event", async t => {
    const event = {
        data: {
            date: DateTime.fromFormat("2023-09-10", "yyyy-MM-dd", {zone: "utc"}).toJSDate()
        }
    };
    const jsonEvent = calendar.eventToJsonEvent(event);
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
