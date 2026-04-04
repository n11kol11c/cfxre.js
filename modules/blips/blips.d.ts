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
