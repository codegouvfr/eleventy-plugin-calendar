const calendarPlugin = require("../");

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(calendarPlugin, {
        defaultDuration: 60,
        defaultOrganizer: {
            name: "hjonin",
            email: "hjonin@foo.bar"
        }
    });
};
