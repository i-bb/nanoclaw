/**
 * Railway Runner for NanoClaw
 * Spawns agent-runner as a child Node.js process instead of Docker container.
 * Used when running on Railway (no Docker-in-Docker support).
 */
import { ChildProcess } from 'child_process';
import { ContainerInput, ContainerOutput } from './container-runner.js';
import { RegisteredGroup } from './types.js';
export declare function runRailwayAgent(group: RegisteredGroup, input: ContainerInput, onProcess: (proc: ChildProcess, containerName: string) => void, onOutput?: (output: ContainerOutput) => Promise<void>): Promise<ContainerOutput>;
//# sourceMappingURL=railway-runner.d.ts.map