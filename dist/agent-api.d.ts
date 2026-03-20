export interface AgentApiRequest {
    task: string;
    payload?: string;
    returnTo: 'group' | 'private';
    sessionTag: string;
}
export declare function startAgentApiServer(): void;
//# sourceMappingURL=agent-api.d.ts.map