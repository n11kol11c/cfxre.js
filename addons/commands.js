Cfxjs.ConsoleCommand('getversion', 'Get current cfxre.js library version', [], false, 
    /**
     * @param {number} source - Player ID (gathered by server)
     * @param {string[]} args - Arguments list
     * @param {string} raw - Raw input
     */
    (source, args, raw) => {
        const version = Cfxjs.version;
        
        if (source === 0) {
            console.log(`^2[cfxjs]^7 Current version: ^5${version}^7`);
        } else {
            emitNet('chat:addMessage', source, {
                args: ['^2[cfxjs]', `Current version: ^5${version}`]
            });
        }
    }
);
