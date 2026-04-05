/**
 * A utility class for 3D vector mathematics and world coordinate manipulation.
 * @class Vector3
 */
export class Vector3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    constructor(x?: number, y?: number, z?: number);

    /**
     * Calculates the Euclidean distance to another 3D vector.
     * @param v The target vector.
     */
    distanceTo(v: Vector3): number;

    /**
     * Returns a new Vector3 representing the sum of this and another vector.
     * @param v The vector to add.
     */
    add(v: Vector3): Vector3;

    /**
     * Converts the vector components into a numerical array [x, y, z].
     */
    toArray(): [number, number, number];
}

/**
 * A utility class for 2D vector mathematics, typically used for UI or screen coordinates.
 * @class Vector2
 */
export class Vector2 {
    readonly x: number;
    readonly y: number;

    constructor(x?: number, y?: number);

    /**
     * Calculates the Euclidean distance to another 2D vector.
     * @param v The target vector.
     */
    distanceTo(v: Vector2): number;

    /**
     * Returns a new Vector2 representing the sum of this and another vector.
     * @param v The vector to add.
     */
    add(v: Vector2): Vector2;

    /**
     * Converts the vector components into a numerical array [x, y].
     */
    toArray(): [number, number];
}
