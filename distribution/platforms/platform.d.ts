import { Env, CISource } from "../ci_source/ci_source";
import { GitJSONDSL, GitDSL } from "../dsl/GitDSL";
/** A type that represents the downloaded metadata about a code review session */
export declare type Metadata = any;
/** A type that represents a comment */
export declare type Comment = {
    /**
     *  UUID for the comment
     *
     * @type {string}
     */
    id: string;
    /**
     * Textual representation of comment
     *
     * @type {string} body string
     */
    body: string;
    /**
     * Was this posted by the account Danger has access to?
     *
     * @type {boolean} true if Danger can edit
     */
    ownedByDanger: boolean;
};
export interface Platform {
    /** Mainly for logging and error reporting */
    readonly name: string;
    /** Pulls in the platform specific metadata for inspection */
    getPlatformDSLRepresentation: () => Promise<any>;
    /** Pulls in the Code Review Diff, and offers a succinct user-API for it */
    getPlatformGitRepresentation: () => Promise<GitJSONDSL>;
    /** Gets inline comments for current PR */
    getInlineComments: (dangerID: string) => Promise<Comment[]>;
    /** Can it update comments? */
    supportsCommenting: () => boolean;
    /** Does the platform support inline comments? */
    supportsInlineComments: () => boolean;
    /** Creates a comment on the PR */
    createComment: (dangerID: string, body: string) => Promise<any>;
    /** Creates an inline comment on the PR if possible */
    createInlineComment: (git: GitDSL, comment: string, path: string, line: number) => Promise<any>;
    /** Updates an inline comment */
    updateInlineComment: (comment: string, commentId: string) => Promise<any>;
    /** Delete an inline comment */
    deleteInlineComment: (commentId: string) => Promise<boolean>;
    /** Delete the main Danger comment */
    deleteMainComment: (dangerID: string) => Promise<boolean>;
    /** Replace the main Danger comment */
    updateOrCreateComment: (dangerID: string, newComment: string) => Promise<any>;
    /** Sets the current PR's status */
    updateStatus: (passed: boolean | "pending", message: string, url?: string) => Promise<boolean>;
    /** Get the contents of a file at a path */
    getFileContents: (path: string, slug?: string, ref?: string) => Promise<string>;
}
/**
 * Pulls out a platform for Danger to communicate on based on the environment
 * @param {Env} env The environment.
 * @param {CISource} source The existing source, to ensure they can run against each other
 * @returns {Platform} returns a platform if it can be supported
 */
export declare function getPlatformForEnv(env: Env, source: CISource, requireAuth?: boolean): Platform;
