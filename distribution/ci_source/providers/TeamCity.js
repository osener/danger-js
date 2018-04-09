"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ci_source_helpers_1 = require("../ci_source_helpers");
/**
 *
 * ### CI Setup
 *
 * You need to add `DANGER_GITHUB_API_TOKEN` to the ENV for the build or machine manually.
 * Then you also need to figure out how to provide the URL for the pull request in `PULL_REQUEST_URL` ENV.
 *
 * TeamCity provides the `%teamcity.build.branch%` variable that contains something like `pull/123` that you can use:
 * ```sh
 * PULL_REQUEST_URL='https://github.com/dager/danger-js/%teamcity.build.branch%'
 * ```
 *
 */
var TeamCity = /** @class */ (function () {
    function TeamCity(env) {
        this.env = env;
    }
    Object.defineProperty(TeamCity.prototype, "name", {
        get: function () {
            return "TeamCity";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeamCity.prototype, "isCI", {
        get: function () {
            return ci_source_helpers_1.ensureEnvKeysExist(this.env, ["TEAMCITY_VERSION"]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeamCity.prototype, "isPR", {
        get: function () {
            if (ci_source_helpers_1.ensureEnvKeysExist(this.env, ["PULL_REQUEST_URL"])) {
                return true;
            }
            var mustHave = ["PULL_REQUEST_URL"];
            return ci_source_helpers_1.ensureEnvKeysExist(this.env, mustHave);
        },
        enumerable: true,
        configurable: true
    });
    TeamCity.prototype._prParseURL = function () {
        var prUrl = this.env.PULL_REQUEST_URL || "";
        var splitSlug = prUrl.split("/");
        if (splitSlug.length === 7) {
            var owner = splitSlug[3];
            var reponame = splitSlug[4];
            var id = splitSlug[6];
            return { owner: owner, reponame: reponame, id: id };
        }
        return {};
    };
    Object.defineProperty(TeamCity.prototype, "pullRequestID", {
        get: function () {
            var id = this._prParseURL().id;
            return id || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeamCity.prototype, "repoSlug", {
        get: function () {
            var _a = this._prParseURL(), owner = _a.owner, reponame = _a.reponame;
            return owner && reponame ? owner + "/" + reponame : "";
        },
        enumerable: true,
        configurable: true
    });
    return TeamCity;
}());
exports.TeamCity = TeamCity;
//# sourceMappingURL=TeamCity.js.map