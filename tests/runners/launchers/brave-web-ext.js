const path = require("path");
const getOptionsUrl = require("./test-options");

exports.Browser = class BroowzerBrowser {
  constructor() {
    this.broowzer = null;
  }

  async run({
    configFilePath = process.env.CONFIG_PATH,
    config,
    outputPath = process.env.OUTPUT_PATH || "./build",
    broowzerPath = process.env.BROOWZER_PATH,
    sourceDir,
    broowzerProfile,
    keepProfileChanges = false,
  } = {}) {
    if (config === undefined) {
      config = require(path.resolve(configFilePath));
    }

    if (sourceDir === undefined) {
      sourceDir =
        config.platform === "firefox"
          ? path.resolve(outputPath, config.settings.id)
          : path.resolve(outputPath);
    }

    const options = {
      chromiumBinary: broowzerPath,
      chromiumProfile: broowzerProfile,
      noReload: true,
      sourceDir,
      artifactsDir: sourceDir,
      startUrl: getOptionsUrl(),
      keepProfileChanges,
      target: "chromium",
    };

    const webExt = await import("web-ext");
    const runner = await webExt.default.cmd.run(options, {
      getValidatedManifest() {
        return {
          name: "",
          version: "",
        };
      },
    });

    this.broowzer = runner.extensionRunners[0];
    this.reloadAllExtensions = runner.reloadAllExtensions.bind(runner);
  }

  async unload() {
    if (this.broowzer) {
      await this.broowzer.exit();
      this.broowzer = null;
    }
  }
};
