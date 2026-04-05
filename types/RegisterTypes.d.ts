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
     * @example await CfxPromise.wait(1000); // Wait for 1 second
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
export declare const CfxPromise: CfxPromiseModule;

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

/**
 * Represents 3D coordinates within the FiveM world space.
 */
interface Vector3 {
    x: number;
    y: number;
    z: number;
}

/**
 * Configuration object for creating a highly customizable map blip.
 */
interface BlipConfig {
    /** The world coordinates where the blip will appear. Required if `entity` is not provided. */
    coords?: Vector3;
    /** The Network ID or Entity Handle to attach the blip to for real-time tracking. */
    entity?: number;
    /** The icon ID (e.g., 1 for a circle, 357 for a garage). Defaults to 1. */
    sprite?: number;
    /** The color ID for the blip (e.g., 1 for red, 3 for blue). Defaults to 0. */
    color?: number;
    /** The text label displayed in the map legend. Defaults to "Marker". */
    label?: string;
    /** The visual scale/size of the blip on the map. Defaults to 0.8. */
    scale?: number;
    /** The opacity of the blip (0 to 255). Defaults to 255. */
    alpha?: number;
    /** The display mode (e.g., 4 to show on both main map and minimap). Defaults to 4. */
    display?: number;
    /** If true, the blip only shows when the player is in close proximity. Defaults to true. */
    shortRange?: boolean;
    /** Whether the blip should flash on the map to draw attention. */
    flashing?: boolean;
    /** If true, draws a GPS path from the player to the blip. */
    route?: boolean;
    /** If provided, creates an area circle (radius) instead of a standard icon. */
    radius?: number | null;
    /** The color of the GPS route line if `route` is enabled. */
    secondaryColor?: number | null;
    /** Sorting priority of the blip on the map. */
    priority?: number;
    /** The category ID in the map legend for grouping. */
    category?: number;
    /** If true, uses the brighter variant of the selected color. */
    bright?: boolean;
}

/**
 * Core module for managing map blips with automatic state tracking and utility helpers.
 */
export interface BlipsModule {
    /** Internal registry of all active blips mapped by their unique identifiers. */
    activeBlips: Map<string, number>;
    
    /**
     * Creates a customizable blip. Supports static coordinates, radius zones, and entity-attached tracking.
     * @param id - A unique string identifier used for future updates or removal.
     * @param config - The appearance and behavior settings for the blip.
     * @returns The handle (ID) of the created blip.
     */
    create(id: string, config: BlipConfig): number;
    
    /**
     * Updates the world coordinates of an existing blip.
     * @param id - The unique ID of the blip to update.
     * @param newCoords - The new {x, y, z} position.
     */
    updateCoords(id: string, newCoords: Vector3): void;
    
    /**
     * Changes the blip's display type (e.g., visibility on minimap vs. main map).
     * @param id - The unique ID of the blip.
     * @param displayType - The FiveM display integer.
     */
    setDisplay(id: string, displayType: number): void;
    
    /**
     * Sets the rotation of the blip icon.
     * @param id - The unique ID of the blip.
     * @param rotation - The rotation angle in degrees (0-360).
     */
    setRotation(id: string, rotation: number): void;
    
    /**
     * Checks if a blip exists in the local registry and is still valid in the game world.
     * @param id - The unique ID of the blip.
     * @returns True if the blip is active and valid.
     */
    exists(id: string): boolean;

    /**
     * Removes all blips whose ID starts with a specific string (e.g., 'delivery_').
     * @param prefix - The string to match against the start of blip IDs.
     */
    removeByPrefix(prefix: string): void;
    
    /**
     * Removes a specific blip from the map and the local registry.
     * @param id - The unique ID of the blip to remove.
     */
    remove(id: string): void;
    
    /**
     * Destroys all blips managed by this module and clears the registry.
     */
    removeAll(): void;
}

/**
 * Exported instance of the Blips management module.
 */
export const Blips: BlipsModule;

export interface CommandParam {
    name: string;
    help: string;
}

/**
 * Job-based restriction object.
 * @property job - The internal name of the job (e.g., 'ambulance').
 * @property grade - Optional minimum job grade required.
 */
export interface JobRestriction {
    job: string;
    grade?: number;
}

/**
 * The callback signature for all cfxjs commands.
 * @param source - Player ID (0 for console).
 * @param args - Array of command arguments.
 * @param raw - The entire raw command string.
 * @param xPlayer - Optional ESX player object (if using ESX wrapper).
 */
export type CommandCallback = (
    source: number, 
    args: string[], 
    raw: string,
    xPlayer?: any 
) => void;

/**
 * Qbox Command Wrapper
 */
export function CfxRegisterQboxCommand(
    name: string,
    description: string,
    params: CommandParam[],
    restricted: string | boolean,
    callback: CommandCallback
): void;

/**
 * ESX Command Wrapper
 */
export function CfxRegisterESXCommand(
    name: string,
    description: string,
    params: CommandParam[],
    restricted: string | JobRestriction | boolean,
    callback: CommandCallback
): void;

/**
 * Represents a single dynamic marker in the game world.
 */
export class CfxMarker {
    /** @param id - Unique identifier for the marker instance. */
    constructor(id: string);
    id: string;
    active: boolean;                                                    // Toggle for logic and rendering
    isPlayerInside: boolean;                                            // Tracks if local player is within interactDistance
    pos: { x: number; y: number; z: number };                           // Visual marker position
    interactPos: { x: number; y: number; z: number };                   // Interaction trigger position
    type: number;                                                       // Native GTA marker type ID
    dir: { x: number; y: number; z: number };
    rot: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
    rgba: { r: number; g: number; b: number; a: number };
    bob: boolean;                                                       // Float up and down effect
    faceCamera: boolean;                                                // Always rotate towards the player's camera
    rotate: boolean;                                                    // Constant rotation on the Z-axis
    rotationOrder: number;
    texture: { dict: string | null; name: string | null };
    drawOnEnts: boolean;                                                // Whether to render the marker on top of entities
    drawDistance: number;                                               // Distance at which the marker becomes visible
    interactDistance: number;                                           // Distance at which onEnter/onAction triggers
    zTolerance: number;                                                 // Height difference allowed for interaction
    job: string | null;                                                 // Job requirement (ESX/Qbox)
    citizenid: null | boolean;                                          // Specific Citizen ID requirement
    requireKeyPress: boolean;                                           // If true, onAction only triggers on key press
    interactKey: number;                                                // Native key code (e.g., 38 for 'E')
    text: string | null;                                                // Floating 3D text content
    textScale: number;
    textFont: number;
    textColor: { r: number; g: number; b: number; a: number };
    textOffsetZ: number;                                                // Height offset for the floating text
    textOutline: boolean;
    textShadow: boolean;
    textCenter: boolean;

    /** Updates the visual position of the marker. */
    setMarkerPos(x: number, y: number, z: number): this;

    /** Configures the interaction trigger area and key requirements. */
    setTriggerPos(x: number, y: number, z: number, range?: number, key?: number, needsKey?: boolean): this;

    /** Configures marker appearance, dimensions, and color. */
    setMarkerVisuals(type: number, scaleX: number, scaleY: number, scaleZ: number, r: number, g: number, b: number, a: number): this;

    /** Toggles marker animations like bobbing and rotation. */
    setMarkerAnimation(bob: boolean, rotate: boolean, faceCamera: boolean): this;

    /** Applies a custom texture dictionary and name to the marker. */
    setMarkerTexture(dict: string | null, name: string | null, drawOnEnts?: boolean): this;

    /** Sets the static rotation and rotation order of the marker. */
    setMarkerRotation(x: number, y: number, z: number, order?: number): this;

    /** Sets the direction vector for the marker's orientation. */
    setMarkerDirection(x: number, y: number, z: number): this;

    /** Restricts marker access to specific jobs, ranks, or Citizen IDs. */
    setRestriction(jobName?: string | null, minRank?: number, cid?: string | null): this;

    /** Configures 3D floating text displayed above the marker. */
    setText(content: string, scale?: number, font?: number, r?: number, g?: number, b?: number, a?: number, offsetZ?: number, outline?: boolean, shadow?: boolean, center?: boolean): this;

    /** Defines draw distance and vertical tolerance for performance optimization. */
    setLogic(drawDist: number, zTol: number): this;

    // --- Event Callbacks ---

    /** Triggered once when the player enters the interactDistance. */
    onEnter(cb: (pos: { x: number; y: number; z: number }) => void): this;

    /** Triggered once when the player exits the interactDistance. */
    onExit(cb: (pos: { x: number; y: number; z: number }) => void): this;

    /** Triggered when the player interacts with the marker (Immediate or via KeyPress). */
    onAction(cb: (pos: { x: number; y: number; z: number }) => void): this;

    // --- Execution Methods ---

    /** Registers the marker within the CfxMarkerSystem. */
    spawn(): this;

    /** Internal method to render the marker via DrawMarker native. */
    draw(): void;

    /** Internal method to render the floating 3D text. */
    drawText(): void;
}

/**
 * Global Management System for all CfxMarkers.
 */
export const CfxMarkerSystem: {
    /** Map of all spawned markers, indexed by their ID. */
    markers: Map<string, CfxMarker>;
    
    /** Global toggle for the system logic thread. */
    active: boolean;

    /** Adds a marker instance to the system. */
    add(m: CfxMarker): void;

    /** Removes and cleans up a marker by its ID. */
    remove(id: string): void;

    /** Starts the main tick handler for rendering and distance checks. */
    start(): void;
};

/**
 * Interface representing the restriction criteria for a marker.
 */
export interface MarkerRestriction {
    /** Whether the marker has any active restrictions. */
    restricted: boolean;
    /** The internal job name required (e.g., 'police'). */
    job?: string | null;
    /** The minimum job grade level required (0 to ignore). */
    rank: number;
    /** A specific Citizen ID required for access. */
    citizenid?: string | null;
}

/**
 * Global authorization utility for validating player access rights.
 */
export declare interface CfxAuth {
    /**
     * Checks the local player's Qbox data against marker restrictions.
     * @param marker - An object containing restriction data.
     */
    canAccess(marker: MarkerRestriction): boolean;
}
