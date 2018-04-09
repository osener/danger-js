import { GitJSONDSL, GitDSL } from "../dsl/GitDSL";
import { GitHubPRDSL, GitHubDSL, GitHubIssue, GitHubAPIPR, GitHubJSONDSL } from "../dsl/GitHubDSL";
import { GitHubAPI } from "./github/GitHubAPI";
import * as NodeGitHub from "@octokit/rest";
import { Platform, Comment } from "./platform";
/** Handles conforming to the Platform Interface for GitHub, API work is handle by GitHubAPI */
export declare class GitHub implements Platform {
    readonly api: GitHubAPI;
    private readonly d;
    name: string;
    constructor(api: GitHubAPI);
    /**
     * Get the Code Review description metadata
     *
     * @returns {Promise<any>} JSON representation
     */
    getReviewInfo: () => Promise<GitHubPRDSL>;
    /**
     * Get the Code Review diff representation
     *
     * @returns {Promise<GitDSL>} the git DSL
     */
    getPlatformGitRepresentation: () => Promise<GitJSONDSL>;
    /**
     * Gets issue specific metadata for a PR
     */
    getIssue: () => Promise<GitHubIssue>;
    /**
     * Gets inline comments for current PR
     */
    getInlineComments: (dangerID: string) => Promise<Comment[]>;
    /**
     * Fails the current build, if status setting succeeds
     * then return true.
     */
    updateStatus: (passed: boolean | "pending", message: string, url?: string | undefined) => Promise<boolean>;
    /**
     * Returns the `github` object on the Danger DSL
     *
     * @returns {Promise<GitHubDSL>} JSON response of the DSL
     */
    getPlatformDSLRepresentation: () => Promise<GitHubJSONDSL>;
    supportsCommenting(): boolean;
    supportsInlineComments(): boolean;
    /**
     * Returns the response for the new comment
     *
     * @param {string} comment you want to post
     * @returns {Promise<any>} JSON response of new comment
     */
    createComment: (comment: string) => Promise<any>;
    /**
     * Makes an inline comment if possible. If platform can't make an inline comment with given arguments,
     * it returns a promise rejection. (e.g. platform doesn't support inline comments or line was out of diff).
     *
     * @returns {Promise<any>} JSON response of new comment
     */
    createInlineComment: (git: GitDSL, comment: string, path: string, line: number) => Promise<any>;
    /**
     * Updates an inline comment if possible. If platform can't update an inline comment,
     * it returns a promise rejection. (e.g. platform doesn't support inline comments or line was out of diff).
     *
     * @returns {Promise<any>} JSON response of new comment
     */
    updateInlineComment: (comment: string, commentId: string) => Promise<any>;
    /**
     * Finds a position in given diff. This is needed for GitHub API, more on the position finder
     * can be found here: https://developer.github.com/v3/pulls/comments/#create-a-comment
     *
     * @returns {Promise<number>} A number with given position
     */
    findPositionForInlineComment: (git: GitDSL, line: number, path: string) => Promise<number>;
    /**
     * Deletes the main Danger comment, used when you have
     * fixed all your failures.
     *
     * @returns {Promise<boolean>} did it work?
     */
    deleteMainComment: (dangerID: string) => Promise<boolean>;
    /**
     * Deletes an inline comment, used when you have
     * fixed all your failures.
     *
     * @returns {Promise<boolean>} did it work?
     */
    deleteInlineComment: (id: string) => Promise<boolean>;
    /**
     * Either updates an existing comment, or makes a new one
     *
     * @param {string} newComment string value of comment
     * @returns {Promise<boolean>} success of posting comment
     */
    updateOrCreateComment(dangerID: string, newComment: string): Promise<boolean>;
    /**
     * Converts the PR JSON into something easily used by the Github API client.
     */
    APIMetadataForPR: (pr: GitHubPRDSL) => GitHubAPIPR;
    getFileContents: (path: string, repoSlug?: string | undefined, ref?: string | undefined) => Promise<string>;
}
export declare const githubJSONToGitHubDSL: (gh: GitHubJSONDSL, api: NodeGitHub) => GitHubDSL;
