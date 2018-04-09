"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// End of Danger DSL definition
function isInline(violation) {
    return violation.file !== undefined && violation.line !== undefined;
}
exports.isInline = isInline;
//# sourceMappingURL=Violation.js.map