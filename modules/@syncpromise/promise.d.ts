// @file promise.d.ts
// @autor Matija
// @versiopn 1.0.0

/**
 * Callback function to terminate an active loop.
 */
export type StopLoopCallback = () => void;

/**
 * Represents a task executed within a loop.
 * Can be synchronous or asynchronous. Returning `false` or calling `stop()` 
 * will terminate the loop execution.
 */
export type LoopCallback = (stop: StopLoopCallback) => Promise<boolean | void> | boolean | void;

/**
 * Core utility module for handling asynchronous operations and time formatting 
 * within the Cfx.re (FiveM/RedM) environment.
 */
export interface CfxPromiseModule {
    /**
     * Pauses the execution of the current thread for a specified duration.
     * * @param ms - The duration to wait in milliseconds.
     * @returns A promise that resolves after the timeout.
     * * @example
     * await CfxPromise.wait(1000); // Wait for 1 second
     */
    wait(ms: number): Promise<void>;

    /**
     * Periodically executes a callback function with a specified delay between iterations.
     * * @param ms - The delay between iterations in milliseconds.
     * @param callback - The function to execute. Receives a `stop` function as an argument.
     * @returns A promise that resolves when the loop is stopped.
     * * @example
     * CfxPromise.loop(500, (stop) => {
     * if (someCondition) stop();
     * console.log("Tick");
     * });
     */
    loop(ms: number, callback: LoopCallback): Promise<void>;

    /**
     * Returns the current system timestamp in milliseconds.
     * Useful for performance measuring or cooldown logic.
     * * @returns The number of milliseconds elapsed since the epoch.
     */
    now(): number;

    /**
     * Formats a duration in seconds into a human-readable "MM:SS" string.
     * * @param seconds - The total number of seconds to format.
     * @returns A string formatted as "minutes:seconds" (e.g., "05:24").
     * * @example
     * const display = CfxPromise.formatTime(125); // Returns "02:05"
     */
    formatTime(seconds: number): string;
}

/**
 * Global instance of the Promise and Time utility module.
 */
export const CfxPromise: CfxPromiseModule;
