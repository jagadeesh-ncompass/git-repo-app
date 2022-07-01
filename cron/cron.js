const cron = require("node-cron");
const pushRepositories = require("./helpers");

cron.schedule("0 * * * * *", () => {
  pushRepositories();
});
