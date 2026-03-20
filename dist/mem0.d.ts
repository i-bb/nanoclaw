/**
 * Mem0 integration for ECHO (NanoClaw).
 * Adds before/after turn hooks:
 *   - beforeTurn: fetches relevant memories and prepends them to the system context
 *   - afterTurn: sends the completed turn to Mem0 for extraction and storage
 *
 * All memories are tagged agent_id: "echo", user_id: "operator".
 */
export declare function recallMemories(query: string): Promise<string>;
export declare function captureMemory(userMessage: string, assistantMessage: string, sessionTag?: string): Promise<void>;
export declare function captureRoutingDecision(decision: string, reasoning: string): Promise<void>;
//# sourceMappingURL=mem0.d.ts.map