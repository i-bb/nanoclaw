/**
 * Utility for ECHO to call ARIA's webhook API programmatically.
 * Uses Railway's internal private network.
 */
export interface AriaHandoffRequest {
    message: string;
    sessionTag: string;
    deliver?: boolean;
    channel?: string;
}
export declare function callAria(req: AriaHandoffRequest): Promise<boolean>;
//# sourceMappingURL=call-aria.d.ts.map