# eleventy-plugin-calendar

[Eleventy](https://www.11ty.dev/) plugin containing filters for generating ICS calendar and ICS events using the Nunjucks templating engine.

## Motivations

Turn your posts directly into events that will show up in a published ICS calendar, or that you can import into another calendar!

## Installation

```
npm install eleventy-plugin-calendar 
```

Open up your Eleventy config file (probably `eleventy.config.js`) and use `addPlugin`:
```js
const calendarPlugin = require("eleventy-plugin-calendar");

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(calendarPlugin);
};
```

You're now supplied with the following filters:
- `slugifyEvent`: slugify event name and date. Useful for setting calendar event permalink.
- `toCalendar`: turn a collection into an ICS calendar.
- `toCalendarEvent`: turn an event into an ICS event.

### Options

```js
const calendarPlugin = require("eleventy-plugin-calendar");

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(calendarPlugin, {
        defaultDuration: 60,
        defaultOrganizer: {
            name: "hjonin",
            email: "hjonin@foo.bar"
        }
    });
};
```

### Usage

See [`sample/calendar.njk`](sample/calendar.njk) for an example ICS calendar template and [`sample/calendar-event.njk`](sample/calendar-event.njk) for an example ICS event template.

Copy and paste these templates and modify the YAML frontmatter to match your calendar’s needs. Make sure `collections.events` (the collection of post files using the `events` tag) matches the template collection you want to provide a calendar and calendar events for.

Place the files anywhere in your project and they will be transformed into a `calendar.ics` and `calendar/{eventName-eventDate}.ics` file at the root of your website (or depending on your calendar and events permalinks if you've changed them) when Eleventy builds it.

Ultimately your calendar will be available at `https://yourwebsite.com/calendar.ics`.

Run the example:
```
npm run sample
[npm clean]
```

### Note on dates

They must be of HTML format, see [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#examples) for examples.

## Development and testing

Install dependencies:
```
npm install
```

Test:
```
npm test
```

### Publishing

```
npm version [version]
npm publish
```
