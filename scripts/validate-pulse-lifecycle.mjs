import assert from "node:assert/strict";
import {
  canCheckinPulse,
  hasActivePulsePlace,
  isPulseAcceptingJoins
} from "../src/pulseLifecycle.js";

assert.equal(isPulseAcceptingJoins("matching"), true);
assert.equal(isPulseAcceptingJoins("open"), true);
assert.equal(isPulseAcceptingJoins("full"), false);
assert.equal(isPulseAcceptingJoins("expired"), false);
assert.equal(isPulseAcceptingJoins("ended"), false);

assert.equal(hasActivePulsePlace("discovered"), false);
assert.equal(hasActivePulsePlace("left"), false);
assert.equal(hasActivePulsePlace("joined"), true);
assert.equal(hasActivePulsePlace("checked_in"), true);

assert.equal(canCheckinPulse("joined", "matching"), true);
assert.equal(canCheckinPulse("joined", "open"), true);
assert.equal(canCheckinPulse("joined", "full"), true);
assert.equal(canCheckinPulse("joined", "expired"), true);
assert.equal(canCheckinPulse("joined", "ended"), false);
assert.equal(canCheckinPulse("left", "open"), false);
assert.equal(canCheckinPulse("checked_in", "open"), false);

console.log("Validated Pulse lifecycle join, leave, capacity, expiry, and end-state rules.");
