"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toRad(angle) {
    return (angle * Math.PI) / 180;
}
function computeDistance(from, to) {
    const prevLatInRad = toRad(from[0]);
    const prevLongInRad = toRad(from[1]);
    const latInRad = toRad(to[0]);
    const longInRad = toRad(to[1]);
    if (prevLatInRad == 0 || prevLongInRad == 0 || latInRad == 0 || longInRad == 0) {
        return 0;
    }
    return Math.round(6377.830272 *
        Math.acos(Math.sin(prevLatInRad) * Math.sin(latInRad) +
            Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad)));
}
exports.default = computeDistance;
//# sourceMappingURL=Geo.js.map