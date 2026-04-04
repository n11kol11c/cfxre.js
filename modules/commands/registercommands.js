/**
 * @file registercommand.js
 * @description Command registration wrappers for Qbox and ESX frameworks.
 * @version 1.0.0
 * @author Matija (cfxjs)
 */

/**
 * Registers a command with integrated Qbox permission checks.
 * @param {string} name - Command name.
 * @param {string} description - Chat suggestion description.
 * @param {object[]} params - Parameters for chat suggestion.
 * @param {string|boolean} restricted - Permission string or false for public access.
 * @param {function} callback - Callback function (source, args, raw).
 */
export const CfxRegisterQboxCommand = (name, description, params, restricted, callback) => {
    RegisterCommand(name, 
        /**
         * @param {number} source - Player ID (0 for server console)
         * @param {string[]} args - List of arguments passed after the command
         * @param {string} raw - The entire raw command string
         */
        (source, args, raw) => {
        if (source === 0) {
            return callback(source, args, raw);
        }

        if (restricted) {
            const hasPerm = exports['qbx_core'].HasPermission(source, restricted);
            
            if (!hasPerm) {
                console.log(`^1[cfxjs-Auth]^7 Access denied for /${name} (Player: ${source})`);
                return;
            }
        }

        callback(source, args, raw);
    }, false);

    emit('chat:addSuggestion', `/${name}`, description, params);
};

/**
 * Registers a command with integrated ESX Job and Group checks.
 * @param {string} name - Command name.
 * @param {string} description - Chat suggestion description.
 * @param {object[]} params - Parameters for chat suggestion.
 * @param {string|object|boolean} restricted - String (group), Object (job/grade), or false.
 * @param {function} callback - Callback function (source, args, raw, xPlayer).
 */
export const CfxRegisterESXCommand = (name, description, params, restricted, callback) => {
    RegisterCommand(name, 
        /**
         * @param {number} source - Player ID (0 for server console)
         * @param {string[]} args - List of arguments passed after the command
         * @param {string} raw - The entire raw command string
         */
        (source, args, raw) => {
        if (source === 0) {
            return callback(source, args, raw);
        }

        const ESX = exports['es_extended'].getSharedObject();
        const xPlayer = ESX.GetPlayerFromId(source);

        if (!xPlayer) return;

        if (restricted) {
            let authorized = false;

            if (typeof restricted === 'string') {
                authorized = xPlayer.getGroup() === restricted || xPlayer.getGroup() === 'superadmin';
            } 
            else if (typeof restricted === 'object' && restricted.job) {
                const playerJob = xPlayer.getJob();
                const isCorrectJob = playerJob.name === restricted.job;
                const isMinGrade = restricted.grade ? playerJob.grade >= restricted.grade : true;
                
                authorized = isCorrectJob && isMinGrade;
            }

            if (!authorized) {
                TriggerClientEvent('esx:showNotification', source, "~r~Insufficient Permissions.");
                return;
            }
        }

        callback(source, args, raw, xPlayer);
    }, false);

    emit('chat:addSuggestion', `/${name}`, description, params);
};
