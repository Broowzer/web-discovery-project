/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const urls = require("./common/urls");

module.exports = {
  specific: "web-discovery-project",
  platform: "webextension",
  brocfile: "Brocfile.webextension.js",
  baseURL: "/modules/",
  pack: "web-ext build --source-dir build --artifacts-dir .",
  sourceMaps: false,
  format: "module",
  settings: {
    ...urls(),
    WDP_CHANNEL: "broowzer",
    WDP_PATTERNS_SIGNING: true,
    WDP_ENV: "production",
    ALLOWED_COUNTRY_CODES: [
      "de",
      "at",
      "ch",
      "es",
      "us",
      "fr",
      "nl",
      "gb",
      "it",
      "be",
      "se",
      "dk",
      "fi",
      "cz",
      "gr",
      "hu",
      "ro",
      "no",
      "ca",
      "au",
      "ru",
      "ua",
      "in",
      "pl",
      "jp",
      "br",
      "mx",
      "cn",
      "ar",
    ],
  },
  default_prefs: {
    "modules.web-discovery-project.enabled": true,
    "modules.hpnv2.enabled": true,
    "modules.fetcher.enabled": false,
  },
  bundles: [
    "core/content-script.bundle.js",
    "hpnv2/worker.wasm.bundle.js",
    "hpnv2/worker.asmjs.bundle.js",
    "webextension-specific/app.bundle.js",
  ],
  modules: [
    "core",
    "web-discovery-project",
    "hpnv2",
    "fetcher",
    "webrequest-pipeline",
    "webextension-specific",
  ],
};
