/** @type {import('./blips').BlipsModule} */
const Blips = {
    activeBlips: new Map(),

    /**
     * @param {string} id 
     * @param {import('./blips').BlipConfig} config
     * @returns {number}
     */
    create(id, config) {
        const { 
            coords = { x: 0, y: 0, z: 0 }, 
            entity = null, 
            sprite = 1, 
            color = 0, 
            label = "Marker", 
            scale = 0.8,
            alpha = 255,
            display = 4,
            shortRange = true,
            flashing = false,
            route = false,
            radius = null,
            secondaryColor = null,
            priority = 0,
            category = 1,
            bright = false
        } = config;

        let blip;

        if (entity && DoesEntityExist(entity)) {
            blip = AddBlipForEntity(entity);
        } else if (radius && coords) {
            blip = AddBlipForRadius(coords.x, coords.y, coords.z, radius);
            SetBlipAlpha(blip, 128);
        } else if (coords) {
            blip = AddBlipForCoord(coords.x, coords.y, coords.z);
        }

        if (!blip) return 0;

        SetBlipSprite(blip, sprite);
        SetBlipDisplay(blip, display);
        SetBlipScale(blip, scale);
        SetBlipColour(blip, color);
        SetBlipAlpha(blip, alpha);
        SetBlipAsShortRange(blip, shortRange);
        SetBlipPriority(blip, priority);
        SetBlipCategory(blip, category);
        
        if (bright) SetBlipBright(blip, true);

        if (route) {
            SetBlipRoute(blip, true);
            if (secondaryColor) SetBlipRouteColour(blip, secondaryColor);
        }

        if (flashing) {
            SetBlipFlashes(blip, true);
            SetBlipFlashInterval(blip, 500);
        }

        BeginTextCommandSetBlipName("STRING");
        AddTextComponentString(label);
        EndTextCommandSetBlipName(blip);

        this.activeBlips.set(id, blip);
        return blip;
    },

    /** 
     * @param {string} id 
     * @param {import('./blips').Vector3} newCoords 
     */
    updateCoords(id, newCoords) {
        const blip = this.activeBlips.get(id);
        if (blip) SetBlipCoords(blip, newCoords.x, newCoords.y, newCoords.z);
    },

    /** 
     * @param {string} id 
     * @param {number} displayType 
     */
    setDisplay(id, displayType) {
        const blip = this.activeBlips.get(id);
        if (blip) SetBlipDisplay(blip, displayType); 
    },

    /** 
     * @param {string} id 
     * @param {number} rotation 
     */
    setRotation(id, rotation) {
        const blip = this.activeBlips.get(id);
        if (blip) SetBlipRotation(blip, Math.ceil(rotation));
    },

    /** @param {string} id */
    exists(id) {
        const blip = this.activeBlips.get(id);
        if (blip === undefined) return false;
        return this.activeBlips.has(id) && DoesBlipExist(blip);
    },

    /** @param {string} prefix */
    removeByPrefix(prefix) {
        for (const [id, blip] of this.activeBlips.entries()) {
            if (id.startsWith(prefix)) {
                if (DoesBlipExist(blip)) RemoveBlip(blip);
                this.activeBlips.delete(id);
            }
        }
    },

    /** @param {string} id */
    remove(id) {
        const blip = this.activeBlips.get(id);
        if (blip) {
            if (DoesBlipExist(blip)) RemoveBlip(blip);
            this.activeBlips.delete(id);
        }
    },

    removeAll() {
        this.activeBlips.forEach(blip => {
            if (DoesBlipExist(blip)) RemoveBlip(blip);
        });
        this.activeBlips.clear();
    }
};

export { Blips };
