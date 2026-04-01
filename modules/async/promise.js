export const CfxPromise = {
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    async loop(ms, callback) {
        let running = true;
        const stop = () => { running = false; };
        
        while (running) {
            const result = await callback(stop);
            if (result === false) break;
            await this.wait(ms);
        }
    },

    now() {
        return Date.now();
    },

    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
};
