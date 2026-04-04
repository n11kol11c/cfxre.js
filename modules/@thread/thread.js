/**
 * Custom High-Performance Asynchronous Thread Wrapper.
 * Provides a managed execution loop for continuous tasks within the Cfx.re environment.
 * @param {Function} f - The task to be executed. If it returns `false`, the loop terminates. 
 * If it returns a `number`, that value overrides the default delay for the next iteration.
 * @param {number} [ms=0] - Default idle time (tick rate) between iterations in milliseconds.
 * @returns {Promise<void>} A promise that resolves if the loop is manually terminated.
 */
export const CfxThread = async (f, ms = 0) => {
    while (true) {
        const result = await f();
        if (result === false) break;

        /**
         * Determine the dynamic sleep duration. 
         * Allows the callback to control its own tick rate (e.g., higher delay when idle).
         */
        const delay = typeof result === 'number' ? result : ms;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
};
