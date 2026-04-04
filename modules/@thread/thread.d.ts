/**
 * Represents the return type of a thread iteration.
 * - `false`: Terminates the loop.
 * - `number`: Overrides the default sleep duration for the next tick.
 * - `void`: Continues the loop with the default delay.
 */
export type ThreadResult = Promise<boolean | number | void> | boolean | number | void;

/**
 * A callback function executed within the managed thread loop.
 * Can be synchronous or asynchronous.
 */
export type ThreadCallback = () => ThreadResult;

/**
 * Custom High-Performance Asynchronous Thread Wrapper.
 * Provides a managed execution loop for continuous tasks within the Cfx.re environment.
 * @param f - The task to be executed. Returning `false` terminates the loop. 
 * Returning a `number` sets a custom delay for the next iteration.
 * @param ms - Default idle time (tick rate) between iterations in milliseconds. Defaults to 0.
 * @returns A promise that resolves when the loop is manually terminated.
 * * @example
 * CfxThread(async () => {
 * if (IsControlJustPressed(0, 36)) console.log("Pressed!");
 * if (shouldStop) return false;
 * return 500; // Sleep for 500ms this time
 * }, 0);
 */
export declare const CfxThread: (f: ThreadCallback, ms?: number) => Promise<void>;
