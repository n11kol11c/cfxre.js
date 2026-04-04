/** @type {import('./promise').CfxPromiseModule} */
export const CfxPromise = {
    /**
     * Suspends the execution of the current thread.
     * @param {number} ms - Duration to wait in milliseconds.
     * @returns {Promise<void>}
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Runs a periodic loop with a specific delay between iterations.
     * @param {number} ms - Delay between iterations in milliseconds.
     * @param {import('./promise').LoopCallback} callback - Function to execute. Receives 'stop' to terminate.
     * @returns {Promise<void>}
     */
    async loop(ms, callback) {
        let running = true;
        const stop = () => { running = false; };
        
        while (running) {
            // Executes the callback and allows it to be asynchronous
            const result = await callback(stop);
            
            // Allow termination by returning false from the callback
            if (result === false || !running) break;
            
            await this.wait(ms);
        }
    },

    /**
     * Retrieves the current system timestamp.
     * @returns {number} Current timestamp in milliseconds.
     */
    now() {
        return Date.now();
    },

    /**
     * Formats total seconds into a "MM:SS" time string.
     * @param {number} seconds - Total seconds to format.
     * @returns {string} Formatted time string (e.g., "02:05").
     */
    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
};
