"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var debug = require("debug");
var _require = require("require-from-string");
var transpiler_1 = require("./utils/transpiler");
var cleanDangerfile_1 = require("./utils/cleanDangerfile");
var resultsForCaughtError_1 = require("./utils/resultsForCaughtError");
var d = debug("danger:inline_runner");
/**
 * Executes a Dangerfile at a specific path, with a context.
 * The values inside a Danger context are applied as globals to the Dangerfiles runtime.
 *
 * @param {DangerContext} dangerfileContext the global danger context
 */
function createDangerfileRuntimeEnvironment(dangerfileContext) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, dangerfileContext];
        });
    });
}
exports.createDangerfileRuntimeEnvironment = createDangerfileRuntimeEnvironment;
/**
 * Executes a Dangerfile at a specific path, with a context.
 * The values inside a Danger context are applied as globals to the Dangerfiles runtime.
 *
 * @param {string} filename the file path for the dangerfile
 * @param {any} environment the results of createDangerfileRuntimeEnvironment
 * @returns {DangerResults} the results of the run
 */
function runDangerfileEnvironment(filename, originalContents, environment) {
    return __awaiter(this, void 0, void 0, function () {
        var customModuleHandler, content, compiled, key, element, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customModuleHandler = function (module, filename) {
                        if (!filename.includes("node_modules")) {
                            d("Handling custom module: ", filename);
                        }
                        var contents = fs.readFileSync(filename, "utf8");
                        var compiled = transpiler_1.default(contents, filename);
                        module._compile(compiled, filename);
                    };
                    // Tell all these filetypes to ge the custom compilation
                    require.extensions[".ts"] = customModuleHandler;
                    require.extensions[".tsx"] = customModuleHandler;
                    require.extensions[".js"] = customModuleHandler;
                    require.extensions[".jsx"] = customModuleHandler;
                    // Require our dangerfile
                    originalContents = originalContents || fs.readFileSync(filename, "utf8");
                    content = cleanDangerfile_1.default(originalContents);
                    compiled = transpiler_1.default(content, filename);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // Move all the DSL attributes into the global scope
                    for (key in environment) {
                        if (environment.hasOwnProperty(key)) {
                            element = environment[key];
                            global[key] = element;
                        }
                    }
                    d("Started parsing Dangerfile: ", filename);
                    _require(compiled, filename, {});
                    d("Finished running dangerfile: ", filename);
                    // Don't stop all current async code from breaking,
                    // however new code (without Peril support) can run
                    // without the scheduler
                    return [4 /*yield*/, runAllScheduledTasks(environment.results)];
                case 2:
                    // Don't stop all current async code from breaking,
                    // however new code (without Peril support) can run
                    // without the scheduler
                    _a.sent();
                    return [2 /*return*/, environment.results];
                case 3:
                    error_1 = _a.sent();
                    console.error("Unable to evaluate the Dangerfile\n", error_1);
                    d("Got a parse error: ", error_1);
                    environment.results = resultsForCaughtError_1.default(filename, content, error_1);
                    return [2 /*return*/, environment.results];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.runDangerfileEnvironment = runDangerfileEnvironment;
var runAllScheduledTasks = function (results) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!results.scheduled) return [3 /*break*/, 2];
                d("Scheduler waiting on: " + results.scheduled.length + " tasks");
                return [4 /*yield*/, Promise.all(results.scheduled.map(function (fnOrPromise) {
                        if (fnOrPromise instanceof Promise) {
                            return fnOrPromise;
                        }
                        if (fnOrPromise.length === 1) {
                            // callback-based function
                            return new Promise(function (res) { return fnOrPromise(res); });
                        }
                        return fnOrPromise();
                    }))];
            case 1:
                _a.sent();
                d("Finished scheduled tasks");
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var defaultExport = {
    createDangerfileRuntimeEnvironment: createDangerfileRuntimeEnvironment,
    runDangerfileEnvironment: runDangerfileEnvironment,
};
exports.default = defaultExport;
//# sourceMappingURL=inline.js.map