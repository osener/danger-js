"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var GitHubUtils_1 = require("./github/GitHubUtils");
var GitHubGit_1 = require("./github/GitHubGit");
var debug = require("debug");
/** Handles conforming to the Platform Interface for GitHub, API work is handle by GitHubAPI */
var GitHub = /** @class */ (function () {
    function GitHub(api) {
        var _this = this;
        this.api = api;
        this.d = debug("danger:GitHub");
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
        this.getPlatformGitRepresentation = function () { return GitHubGit_1.default(_this.api); };
        /**
         * Gets issue specific metadata for a PR
         */
        this.getIssue = function () { return __awaiter(_this, void 0, void 0, function () {
            var issue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getIssue()];
                    case 1:
                        issue = _a.sent();
                        return [2 /*return*/, issue || { labels: [] }];
                }
            });
        }); };
        /**
         * Gets inline comments for current PR
         */
        this.getInlineComments = function (dangerID) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.api.getPullRequestInlineComments(dangerID)
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
            var ghAPI, prJSON, ref, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ghAPI = this.api.getExternalAPI();
                        return [4 /*yield*/, this.api.getPullRequestInfo()];
                    case 1:
                        prJSON = _a.sent();
                        ref = prJSON.head;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, ghAPI.repos.createStatus({
                                repo: ref.repo.name,
                                owner: ref.repo.owner.login,
                                sha: ref.sha,
                                state: passed ? "success" : "failure",
                                context: process.env["PERIL_INTEGRATION_ID"] ? "Peril" : "Danger",
                                target_url: url || "http://danger.systems/js",
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
         * Returns the `github` object on the Danger DSL
         *
         * @returns {Promise<GitHubDSL>} JSON response of the DSL
         */
        this.getPlatformDSLRepresentation = function () { return __awaiter(_this, void 0, void 0, function () {
            var pr, _a, issue, commits, reviews, requested_reviewers, thisPR;
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
                        throw "\n        Could not find pull request information,\n        if you are using a private repo then perhaps\n        Danger does not have permission to access that repo.\n      ";
                    case 3: return [4 /*yield*/, this.getIssue()];
                    case 4:
                        issue = _b.sent();
                        return [4 /*yield*/, this.api.getPullRequestCommits()];
                    case 5:
                        commits = _b.sent();
                        return [4 /*yield*/, this.api.getReviews()];
                    case 6:
                        reviews = _b.sent();
                        return [4 /*yield*/, this.api.getReviewerRequests()];
                    case 7:
                        requested_reviewers = _b.sent();
                        thisPR = this.APIMetadataForPR(pr);
                        return [2 /*return*/, {
                                issue: issue,
                                pr: pr,
                                commits: commits,
                                reviews: reviews,
                                requested_reviewers: requested_reviewers,
                                thisPR: thisPR,
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
        this.createInlineComment = function (git, comment, path, line) {
            if (!_this.supportsInlineComments) {
                return new Promise(function (_resolve, reject) { return reject(); });
            }
            var commitId = git.commits[git.commits.length - 1].sha;
            _this.d("Creating inline comment. Commit: " + commitId);
            return _this.findPositionForInlineComment(git, line, path).then(function (position) {
                return _this.api.postInlinePRComment(comment, commitId, path, position);
            });
        };
        /**
         * Updates an inline comment if possible. If platform can't update an inline comment,
         * it returns a promise rejection. (e.g. platform doesn't support inline comments or line was out of diff).
         *
         * @returns {Promise<any>} JSON response of new comment
         */
        this.updateInlineComment = function (comment, commentId) {
            if (!_this.supportsInlineComments) {
                return new Promise(function (_resolve, reject) { return reject(); });
            }
            _this.d("Updating inline comment. CommentId: " + commentId + "comment: " + comment);
            return _this.api.updateInlinePRComment(comment, commentId);
        };
        /**
         * Finds a position in given diff. This is needed for GitHub API, more on the position finder
         * can be found here: https://developer.github.com/v3/pulls/comments/#create-a-comment
         *
         * @returns {Promise<number>} A number with given position
         */
        this.findPositionForInlineComment = function (git, line, path) {
            _this.d("Finding position for inline comment." + path + "#" + line);
            return git.structuredDiffForFile(path).then(function (diff) {
                return new Promise(function (resolve, reject) {
                    if (diff === undefined) {
                        _this.d("Diff not found for inline comment." + path + "#" + line + ". Diff: " + JSON.stringify(diff));
                        reject();
                    }
                    _this.d("Diff found for inline comment, now getting a position." +
                        path +
                        "#" +
                        line +
                        ". Diff: " +
                        JSON.stringify(diff));
                    var fileLine = 0;
                    for (var _i = 0, _a = diff.chunks; _i < _a.length; _i++) {
                        var chunk = _a[_i];
                        // Search for a change (that is not a deletion). "ln" is for normal changes, "ln2" for additions,
                        // thus need to check for either of them
                        var index = chunk.changes.findIndex(function (c) { return c.type != "del" && (c.ln == line || c.ln2 == line); });
                        if (index != -1) {
                            fileLine += index + 1;
                            break;
                        }
                        else {
                            fileLine += chunk.changes.length + 1;
                        }
                    }
                    _this.d("Position found for inline comment: " + fileLine + "." + path + "#" + line);
                    resolve(fileLine);
                });
            });
        };
        /**
         * Deletes the main Danger comment, used when you have
         * fixed all your failures.
         *
         * @returns {Promise<boolean>} did it work?
         */
        this.deleteMainComment = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var commentIDs, _i, commentIDs_1, commentID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getDangerCommentIDs(dangerID)];
                    case 1:
                        commentIDs = _a.sent();
                        _i = 0, commentIDs_1 = commentIDs;
                        _a.label = 2;
                    case 2:
                        if (!(_i < commentIDs_1.length)) return [3 /*break*/, 5];
                        commentID = commentIDs_1[_i];
                        this.d("Deleting comment " + commentID);
                        return [4 /*yield*/, this.api.deleteCommentWithID(commentID)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, commentIDs.length > 0];
                }
            });
        }); };
        /**
         * Deletes an inline comment, used when you have
         * fixed all your failures.
         *
         * @returns {Promise<boolean>} did it work?
         */
        this.deleteInlineComment = function (id) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.api.deleteInlineCommentWithID(id)
                /**
                 * Either updates an existing comment, or makes a new one
                 *
                 * @param {string} newComment string value of comment
                 * @returns {Promise<boolean>} success of posting comment
                 */
            ];
        }); }); };
        /**
         * Converts the PR JSON into something easily used by the Github API client.
         */
        this.APIMetadataForPR = function (pr) {
            return {
                number: pr.number,
                repo: pr.base.repo.name,
                owner: pr.base.repo.owner.login,
            };
        };
        this.getFileContents = this.api.fileContents;
        this.name = "GitHub";
    }
    GitHub.prototype.supportsCommenting = function () {
        return true;
    };
    GitHub.prototype.supportsInlineComments = function () {
        return true;
    };
    /**
     * Either updates an existing comment, or makes a new one
     *
     * @param {string} newComment string value of comment
     * @returns {Promise<boolean>} success of posting comment
     */
    GitHub.prototype.updateOrCreateComment = function (dangerID, newComment) {
        return __awaiter(this, void 0, void 0, function () {
            var commentIDs, _i, commentIDs_2, commentID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getDangerCommentIDs(dangerID)];
                    case 1:
                        commentIDs = _a.sent();
                        if (!commentIDs.length) return [3 /*break*/, 7];
                        // Edit the first comment
                        this.d("Updating comment " + commentIDs[0]);
                        return [4 /*yield*/, this.api.updateCommentWithID(commentIDs[0], newComment)
                            // Delete any dupes
                        ];
                    case 2:
                        _a.sent();
                        _i = 0, commentIDs_2 = commentIDs;
                        _a.label = 3;
                    case 3:
                        if (!(_i < commentIDs_2.length)) return [3 /*break*/, 6];
                        commentID = commentIDs_2[_i];
                        if (!(commentID !== commentIDs[0])) return [3 /*break*/, 5];
                        this.d("Deleting comment " + commentID);
                        return [4 /*yield*/, this.api.deleteCommentWithID(commentID)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        this.d("Creating new comment");
                        return [4 /*yield*/, this.createComment(newComment)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/, true];
                }
            });
        });
    };
    return GitHub;
}());
exports.GitHub = GitHub;
// This class should get un-classed, but for now we can expand by functions
exports.githubJSONToGitHubDSL = function (gh, api) {
    return __assign({}, gh, { api: api, utils: GitHubUtils_1.default(gh.pr, api) });
};
//# sourceMappingURL=GitHub.js.map