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
Object.defineProperty(exports, "__esModule", { value: true });
var BitBucketServerGit_1 = require("./bitbucket_server/BitBucketServerGit");
/** Handles conforming to the Platform Interface for BitBucketServer, API work is handle by BitBucketServerAPI */
var BitBucketServer = /** @class */ (function () {
    function BitBucketServer(api) {
        var _this = this;
        this.api = api;
        /**
         * Get the Code Review description metadata
         *
         * @returns {Promise<any>} JSON representation
         */
        this.getReviewInfo = function () { return _this.api.getPullRequestInfo(); };
        /**
         * Get the Code Review diff representation
         *
         * @returns {Promise<GitDSL>} the git DSL
         */
        this.getPlatformGitRepresentation = function () { return BitBucketServerGit_1.default(_this.api); };
        /**
         * Gets inline comments for current PR
         */
        this.getInlineComments = function (_) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (_resolve, reject) { return reject(); })
                /**
                 * Fails the current build, if status setting succeeds
                 * then return true.
                 */
            ];
        }); }); };
        /**
         * Fails the current build, if status setting succeeds
         * then return true.
         */
        this.updateStatus = function (passed, message, url) { return __awaiter(_this, void 0, void 0, function () {
            var pr, latestCommit, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getPullRequestInfo()];
                    case 1:
                        pr = _a.sent();
                        latestCommit = pr.fromRef.latestCommit;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.api.postBuildStatus(latestCommit, {
                                state: passed ? "SUCCESSFUL" : "FAILED",
                                key: "danger.systems",
                                name: process.env["PERIL_INTEGRATION_ID"] ? "Peril" : "Danger",
                                url: url || "http://danger.systems/js",
                                description: message,
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Returns the `bitBucket_server` object on the Danger DSL
         *
         * @returns {Promise<BitBucketServerDSL>} JSON response of the DSL
         */
        this.getPlatformDSLRepresentation = function () { return __awaiter(_this, void 0, void 0, function () {
            var pr, _a, commits, comments, activities, issues;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getReviewInfo()];
                    case 1:
                        pr = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        process.exitCode = 1;
                        throw "\n        Could not find pull request information,\n        perhaps Danger does not have permission to access the repo.\n      ";
                    case 3: return [4 /*yield*/, this.api.getPullRequestCommits()];
                    case 4:
                        commits = _b.sent();
                        return [4 /*yield*/, this.api.getPullRequestComments()];
                    case 5:
                        comments = _b.sent();
                        return [4 /*yield*/, this.api.getPullRequestActivities()];
                    case 6:
                        activities = _b.sent();
                        return [4 /*yield*/, this.api.getIssues()];
                    case 7:
                        issues = _b.sent();
                        return [2 /*return*/, {
                                metadata: this.api.repoMetadata,
                                pr: pr,
                                commits: commits,
                                comments: comments,
                                activities: activities,
                                issues: issues,
                            }];
                }
            });
        }); };
        /**
         * Returns the response for the new comment
         *
         * @param {string} comment you want to post
         * @returns {Promise<any>} JSON response of new comment
         */
        this.createComment = function (comment) { return _this.api.postPRComment(comment); };
        /**
         * Makes an inline comment if possible. If platform can't make an inline comment with given arguments,
         * it returns a promise rejection. (e.g. platform doesn't support inline comments or line was out of diff).
         *
         * @returns {Promise<any>} JSON response of new comment
         */
        this.createInlineComment = function (_git, _comment, _path, _line) {
            return new Promise(function (_resolve, reject) { return reject(); });
        };
        /**
         * Updates an inline comment if possible. If platform can't update an inline comment,
         * it returns a promise rejection. (e.g. platform doesn't support inline comments or line was out of diff).
         *
         * @returns {Promise<any>} JSON response of new comment
         */
        this.updateInlineComment = function (_comment, _commentId) {
            return new Promise(function (_resolve, reject) { return reject(); });
        };
        /**
         * Deletes an inline comment, used when you have
         * fixed all your failures.
         *
         * @returns {Promise<boolean>} did it work?
         */
        this.deleteInlineComment = function (_id) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (_resolve, reject) { return reject(); })
                /**
                 * Deletes the main Danger comment, used when you have
                 * fixed all your failures.
                 *
                 * @returns {Promise<boolean>} did it work?
                 */
            ];
        }); }); };
        /**
         * Deletes the main Danger comment, used when you have
         * fixed all your failures.
         *
         * @returns {Promise<boolean>} did it work?
         */
        this.deleteMainComment = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var comments, _i, comments_1, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getDangerComments(dangerID)];
                    case 1:
                        comments = _a.sent();
                        _i = 0, comments_1 = comments;
                        _a.label = 2;
                    case 2:
                        if (!(_i < comments_1.length)) return [3 /*break*/, 5];
                        comment = comments_1[_i];
                        return [4 /*yield*/, this.api.deleteComment(comment)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, comments.length > 0];
                }
            });
        }); };
        this.getFileContents = this.api.getFileContents;
        this.name = "BitBucketServer";
    }
    BitBucketServer.prototype.supportsCommenting = function () {
        return true;
    };
    BitBucketServer.prototype.supportsInlineComments = function () {
        return false;
    };
    /**
     * Either updates an existing comment, or makes a new one
     *
     * @param {string} newComment string value of comment
     * @returns {Promise<boolean>} success of posting comment
     */
    BitBucketServer.prototype.updateOrCreateComment = function (dangerID, newComment) {
        return __awaiter(this, void 0, void 0, function () {
            var comments, _i, comments_2, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getDangerComments(dangerID)];
                    case 1:
                        comments = _a.sent();
                        if (!comments.length) return [3 /*break*/, 7];
                        // Edit the first comment
                        return [4 /*yield*/, this.api.updateComment(comments[0], newComment)
                            // Delete any dupes
                        ];
                    case 2:
                        // Edit the first comment
                        _a.sent();
                        _i = 0, comments_2 = comments;
                        _a.label = 3;
                    case 3:
                        if (!(_i < comments_2.length)) return [3 /*break*/, 6];
                        comment = comments_2[_i];
                        if (!(comment !== comments[0])) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.api.deleteComment(comment)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.createComment(newComment)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/, true];
                }
            });
        });
    };
    return BitBucketServer;
}());
exports.BitBucketServer = BitBucketServer;
//# sourceMappingURL=BitBucketServer.js.map