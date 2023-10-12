const calendarPlugin = require("../");

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(calendarPlugin, {
        defaultLocation: "online",
        defaultOrganizer: {
            name: "hjonin"
        }
    });
};
