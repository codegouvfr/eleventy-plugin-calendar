const calendarPlugin = require("../");

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(calendarPlugin, {
        defaultOrganizer: {
            name: "hjonin"
        }
    });
};
