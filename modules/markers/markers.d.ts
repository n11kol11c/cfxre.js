/**
 * @file markers.d.ts
 * @description Advanced Marker System with authorization and spatial logic for cfxjs.
 */

import { CfxAuth } from './markersauth.js';

/**
 * Represents a single dynamic marker in the game world.
 */
export class CfxMarker {
    /** @param id - Unique identifier for the marker instance. */
    constructor(id: string);

    // --- State Properties ---
    id: string;
    active: boolean;                   // Toggle for logic and rendering
    isPlayerInside: boolean;           // Tracks if local player is within interactDistance
    
    // --- Spatial Properties ---
    pos: { x: number; y: number; z: number };           // Visual marker position
    interactPos: { x: number; y: number; z: number };   // Interaction trigger position
    
    // --- Visual Configuration ---
    type: number;                      // Native GTA marker type ID
    dir: { x: number; y: number; z: number };
    rot: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
    rgba: { r: number; g: number; b: number; a: number };
    
    // --- Animation & Rendering Flags ---
    bob: boolean;                      // Float up and down effect
    faceCamera: boolean;               // Always rotate towards the player's camera
    rotate: boolean;                   // Constant rotation on the Z-axis
    rotationOrder: number;
    texture: { dict: string | null; name: string | null };
    drawOnEnts: boolean;               // Whether to render the marker on top of entities
    
    // --- Logic Distances ---
    drawDistance: number;              // Distance at which the marker becomes visible
    interactDistance: number;          // Distance at which onEnter/onAction triggers
    zTolerance: number;                // Height difference allowed for interaction
    
    // --- Restrictions & Auth ---
    job: string | null;                // Job requirement (ESX/Qbox)
    citizenid: null | boolean;         // Specific Citizen ID requirement
    
    // --- Interaction & UI ---
    requireKeyPress: boolean;          // If true, onAction only triggers on key press
    interactKey: number;               // Native key code (e.g., 38 for 'E')
    text: string | null;               // Floating 3D text content
    textScale: number;
    textFont: number;
    textColor: { r: number; g: number; b: number; a: number };
    textOffsetZ: number;               // Height offset for the floating text
    textOutline: boolean;
    textShadow: boolean;
    textCenter: boolean;

    // --- Fluent API Methods (Setters) ---

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
