const runner = require("./test-runner-common");
const BroowzerBrowser = require("./launchers/broowzer-web-ext").Browser;

runner.run(new BroowzerBrowser());
