/// <reference types="@citizenfx/client" />
/// <reference types="@citizenfx/server" />
/// <reference types="@types/node" />

/**
 * Main library interface providing access to all modular systems of the framework.
 */
export interface CfxjsLibrary {
    /**
     * Creates a new instance of a world marker.
     * @param id - Unique identifier for the marker.
     */
    Marker: (id: string) => import('@cfxmodules/markers/markers').CfxMarker;

    /**
     * The core marker management system for handling bulk updates and rendering.
     */
    MarkerSystem: typeof import('@cfxmodules/markers/markers').CfxMarkerSystem;

    /**
     * Authentication and permission handling for marker-related actions.
     */
    MarkersAuth: typeof import('@cfxmodules/markers/markersauth').CfxAuth;

    /**
     * Utility for registering client or server console commands.
     * @param name - The command name.
     * @param description - Help text for the command.
     * @param params - List of expected parameters.
     * @param restricted - Permission level or restriction flag.
     * @param callback - Function to execute when command is triggered.
     */
    ConsoleCommand: typeof import('@cfxmodules/commands/registercommands').CfxRegisterCommand;

    /**
     * Map blip management system for creating and tracking icons on the radar.
     */
    Blips: import('@cfxmodules/blips/blips').BlipsModule;

    /**
     * Asynchronous utilities, including advanced loops and time formatting.
     */
    Promise: import('@cfxmodules/@syncpromise/promise').CfxPromiseModule;

    /**
     * Current version of the Cfxjs library.
     */
    version: string;

    /**
     * Primary author/developer of the library.
     */
    author: string;
}

/**
 * Global declaration to ensure the 'Cfxjs' object is accessible 
 * throughout the entire FiveM environment without explicit imports.
 */
declare global {
    /**
     * Global instance of the Cfxjs library.
     */
    var Cfxjs: CfxjsLibrary;
}
