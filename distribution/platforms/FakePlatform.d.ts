import { GitDSL } from "../dsl/GitDSL";
import { CISource } from "../ci_source/ci_source";
import { Platform, Comment } from "./platform";
export declare class FakePlatform implements Platform {
    readonly name: string;
    readonly ciSource: CISource;
    constructor();
    getPlatformDSLRepresentation(): Promise<any>;
    getPlatformGitRepresentation(): Promise<GitDSL>;
    getInlineComments(_: string): Promise<Comment[]>;
    supportsCommenting(): boolean;
    supportsInlineComments(): boolean;
    updateOrCreateComment(_newComment: string): Promise<boolean>;
    createComment(_comment: string): Promise<any>;
    createInlineComment(_git: GitDSL, _comment: string, _path: string, _line: number): Promise<any>;
    updateInlineComment(_comment: string, _commentId: string): Promise<any>;
    deleteInlineComment(_id: string): Promise<boolean>;
    deleteMainComment(): Promise<boolean>;
    updateStatus(_success: boolean, _message: string): Promise<boolean>;
    getFileContents: (path: string) => Promise<string>;
}
