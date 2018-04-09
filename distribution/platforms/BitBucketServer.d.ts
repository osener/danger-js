import { GitJSONDSL, GitDSL } from "../dsl/GitDSL";
import { BitBucketServerPRDSL, BitBucketServerJSONDSL } from "../dsl/BitBucketServerDSL";
import { BitBucketServerAPI } from "./bitbucket_server/BitBucketServerAPI";
import { Platform, Comment } from "./platform";
/** Handles conforming to the Platform Interface for BitBucketServer, API work is handle by BitBucketServerAPI */
export declare class BitBucketServer implements Platform {
    readonly api: BitBucketServerAPI;
    name: string;
    constructor(api: BitBucketServerAPI);
    /**
     * Get the Code Review description metadata
     *
     * @returns {Promise<any>} JSON representation
     */
    getReviewInfo: () => Promise<BitBucketServerPRDSL>;
    /**
     * Get the Code Review diff representation
     *
     * @returns {Promise<GitDSL>} the git DSL
     */
    getPlatformGitRepresentation: () => Promise<GitJSONDSL>;
    /**
     * Gets inline comments for current PR
     */
    getInlineComments: (_: string) => Promise<Comment[]>;
    /**
     * Fails the current build, if status setting succeeds
     * then return true.
     */
    updateStatus: (passed: boolean, message: string, url?: string | undefined) => Promise<boolean>;
    /**
     * Returns the `bitBucket_server` object on the Danger DSL
     *
     * @returns {Promise<BitBucketServerDSL>} JSON response of the DSL
     */
    getPlatformDSLRepresentation: () => Promise<BitBucketServerJSONDSL>;
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
    createInlineComment: (_git: GitDSL, _comment: string, _path: string, _line: number) => Promise<any>;
    /**
     * Updates an inline comment if possible. If platform can't update an inline comment,
     * it returns a promise rejection. (e.g. platform doesn't support inline comments or line was out of diff).
     *
     * @returns {Promise<any>} JSON response of new comment
     */
    updateInlineComment: (_comment: string, _commentId: string) => Promise<any>;
    /**
     * Deletes an inline comment, used when you have
     * fixed all your failures.
     *
     * @returns {Promise<boolean>} did it work?
     */
    deleteInlineComment: (_id: string) => Promise<boolean>;
    /**
     * Deletes the main Danger comment, used when you have
     * fixed all your failures.
     *
     * @returns {Promise<boolean>} did it work?
     */
    deleteMainComment: (dangerID: string) => Promise<boolean>;
    /**
     * Either updates an existing comment, or makes a new one
     *
     * @param {string} newComment string value of comment
     * @returns {Promise<boolean>} success of posting comment
     */
    updateOrCreateComment(dangerID: string, newComment: string): Promise<boolean>;
    getFileContents: (filePath: string, repoSlug: string, refspec: string) => Promise<string>;
}
