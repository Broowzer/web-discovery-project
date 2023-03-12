/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* globals describeModule, chai */

const expect = chai.expect;

export default describeModule(
  "core/helpers/strip-api-headers",
  () => ({}),
  function () {
    describe("#isSafeToRemoveHeaders", function () {
      let isSafeToRemoveHeaders;

      beforeEach(function () {
        isSafeToRemoveHeaders = this.module().isSafeToRemoveHeaders;
      });

      const safeToRemoveHosts = [
        "wdp.broowzer.com",
        "star.wdp.broowzer.com",
        "star.wdp.broowzer.software",
      ];
      for (const hostname of safeToRemoveHosts) {
        it(`should modify requests to whitelisted hosts: ${hostname}`, () => {
          expect(isSafeToRemoveHeaders(hostname)).to.be.true;
        });
      }

      const protectedHosts = [
        "www.google.com",
        "www.amazon.com",
        "localhost",
        "127.0.0.1",
        "search.broowzer.com",
        "search.broowzer.software",
        "anotherdomain.broowzer.com",
        "any-domain-ending-with.broowzer.software",
      ];
      for (const hostname of protectedHosts) {
        it(`should not modify requests non-whitelisted hosts: ${hostname}`, () => {
          expect(isSafeToRemoveHeaders(hostname)).to.be.false;
        });
      }
    });
  }
);
