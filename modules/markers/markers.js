import { CfxAuth } from './markersauth.js';

export class Marker {
    constructor(id, options = {}) {
        this.id = id;
        this.active = options.active ?? true;
        this.isPlayerInside = false;

        this.pos = options.pos ?? { x: 0, y: 0, z: 0 };
        this.interactPos = options.interactPos ?? this.pos;

        this.type = options.type ?? 1;
        this.dir = options.dir ?? { x: 0.0, y: 0.0, z: 0.0 };
        this.rot = options.rot ?? { x: 0.0, y: 0.0, z: 0.0 };
        this.scale = options.scale ?? { x: 1.0, y: 1.0, z: 1.0 };
        this.rgba = options.rgba ?? { r: 255, g: 255, b: 255, a: 100 };
        this.bob = options.bob ?? false;
        this.faceCamera = options.faceCamera ?? false;
        this.rotationOrder = options.rotationOrder ?? 2;
        this.rotate = options.rotate ?? false;
        this.texture = options.texture ?? { dict: null, name: null };
        this.drawOnEnts = options.drawOnEnts ?? false;

        this.drawDistance = options.drawDistance ?? 10.0;
        this.interactDistance = options.interactDistance ?? 1.5;
        this.zTolerance = options.zTolerance ?? 2.0;
        this.requireKeyPress = options.requireKeyPress ?? true;
        this.interactKey = options.interactKey ?? 38;

        this.text = options.text ?? null;
        this.textOptions = {
            scale: options.textScale ?? 0.35,
            font: options.textFont ?? 4,
            color: options.textColor ?? { r: 255, g: 255, b: 255, a: 215 },
            offsetZ: options.textOffsetZ ?? 0.6,
            center: options.textCenter ?? true,
            outline: options.textOutline ?? true
        };

        this.onInteract = options.onInteract || null;
        this.onEnter = options.onEnter || null;
        this.onExit = options.onExit || null;
    }

    draw() {
        DrawMarker(
            this.type,
            this.pos.x, this.pos.y, this.pos.z,
            this.dir.x, this.dir.y, this.dir.z,
            this.rot.x, this.rot.y, this.rot.z,
            this.scale.x, this.scale.y, this.scale.z,
            this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a,
            this.bob, this.faceCamera, this.rotationOrder, this.rotate,
            this.texture.dict, this.texture.name, this.drawOnEnts
        );

        if (this.text) this.draw3DText();
    }

    draw3DText() {
        const [onScreen, x, y] = GetScreenCoordFromWorldCoord(
            this.pos.x, this.pos.y, this.pos.z + this.textOptions.offsetZ
        );
        if (onScreen) {
            SetTextScale(this.textOptions.scale, this.textOptions.scale);
            SetTextFont(this.textOptions.font);
            SetTextProportional(1);
            SetTextColour(
                this.textOptions.color.r,
                this.textOptions.color.g,
                this.textOptions.color.b,
                this.textOptions.color.a
            );
            if (this.textOptions.outline) SetTextOutline();
            SetTextEntry("STRING");
            if (this.textOptions.center) SetTextCentre(1);
            AddTextComponentString(this.text);
            DrawText(x, y);
        }
    }
}

export const MarkerSystem = {
    cache: new Map(),
    tickRunning: false,

    create(id, options) {
        const marker = new Marker(id, options);
        this.cache.set(id, marker);
        this.startLoop();
        return marker;
    },

    remove(id) {
        this.cache.delete(id);
    },

    clear() {
        this.cache.clear();
    },

    startLoop() {
        if (this.tickRunning) return;
        this.tickRunning = true;

        setTick(async () => {
            if (this.cache.size === 0) {
                this.tickRunning = false;
                return;
            }

            const pCoords = GetEntityCoords(PlayerPedId());
            let sleep = 1000;

            this.cache.forEach((m) => {
                if (!m.active) return;

                const dx = pCoords[0] - m.interactPos.x;
                const dy = pCoords[1] - m.interactPos.y;
                const dz = pCoords[2] - m.interactPos.z;
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < Math.pow(m.drawDistance, 2)) {
                    sleep = 0;
                    m.draw();

                    const isInside = (distSq < Math.pow(m.interactDistance, 2)) && (Math.abs(dz) < m.zTolerance);

                    if (isInside && !m.isPlayerInside) {
                        m.isPlayerInside = true;
                        if (m.onEnter) m.onEnter(m.interactPos);
                        if (!m.requireKeyPress && m.onInteract) m.onInteract(m.interactPos);
                    } else if (!isInside && m.isPlayerInside) {
                        m.isPlayerInside = false;
                        if (m.onExit) m.onExit(m.interactPos);
                    }

                    if (m.isPlayerInside && m.requireKeyPress && m.onInteract) {
                        if (IsControlJustReleased(0, m.interactKey)) {
                            m.onInteract(m.interactPos);
                        }
                    }
                } else {
                    m.isPlayerInside = false;
                }
            });

            if (sleep > 0) await new Promise(r => setTimeout(r, sleep));
        });
    }
};

export class CfxMarker {
    constructor(id) {
        this.id = id;
        this.active = true;
        this.isPlayerInside = false;

        this.pos = { x: 0, y: 0, z: 0 };
        this.interactPos = { x: 0, y: 0, z: 0 };
        this.type = 1;
        this.dir = { x: 0.0, y: 0.0, z: 0.0 };
        this.rot = { x: 0.0, y: 0.0, z: 0.0 };
        this.scale = { x: 1.0, y: 1.0, z: 1.0 };
        this.rgba = { r: 255, g: 255, b: 255, a: 150 };
        this.bob = false;
        this.faceCamera = false;
        this.rotate = false;
        this.rotationOrder = 2;
        this.texture = { dict: null, name: null };
        this.drawOnEnts = false;

        this.drawDistance = 15.0;
        this.interactDistance = 1.5;
        this.zTolerance = 2.0;
        this.requireKeyPress = true;
        this.interactKey = 38;

        this.text = null;
        this.textScale = 0.35;
        this.textFont = 4;
        this.textColor = { r: 255, g: 255, b: 255, a: 255 };
        this.textOffsetZ = 0.6;
        this.textOutline = true;
        this.textShadow = false;
        this.textCenter = true;

        this.job = null;
        this.rank = 0;
        this.citizenid = null;
        this.restricted = false;

        this.onInteract = null;
        this.onEnter = null;
        this.onExit = null;
    }

    setMarkerPos(x, y, z) {
        this.pos = { x, y, z };
        if (this.interactPos.x === 0) this.interactPos = { x, y, z };
        return this;
    }

    setTriggerPos(x, y, z, range = 1.5, key = 38, needsKey = true) {
        this.interactPos = { x, y, z };
        this.interactDistance = range;
        this.interactKey = key;
        this.requireKeyPress = needsKey;
        return this;
    }

    setMarkerVisuals(type, scaleX, scaleY, scaleZ, r, g, b, a) {
        this.type = type;
        this.scale = { x: scaleX, y: scaleY, z: scaleZ };
        this.rgba = { r, g, b, a };
        return this;
    }

    setMarkerAnimation(bob, rotate, faceCamera) {
        this.bob = bob;
        this.rotate = rotate;
        this.faceCamera = faceCamera;
        return this;
    }

    setMarkerTexture(dict, name, drawOnEnts = false) {
        this.texture = { dict, name };
        this.drawOnEnts = drawOnEnts;
        return this;
    }

    setMarkerRotation(x, y, z, order = 2) {
        this.rot = { x, y, z };
        this.rotationOrder = order;
        return this;
    }

    setMarkerDirection(x, y, z) {
        this.dir = { x, y, z };
        return this;
    }

    setRestriction(jobName = null, minRank = 0, cid = null) {
        this.job = jobName;
        this.rank = minRank;
        this.citizenid = cid;
        this.restricted = true;
        return this;
    }

    setText(content, scale, font, r, g, b, a, offsetZ, outline, shadow, center) {
        this.text = content;
        if (scale !== undefined) this.textScale = scale;
        if (font !== undefined) this.textFont = font;
        if (r !== undefined) this.textColor = { r, g, b, a };
        if (offsetZ !== undefined) this.textOffsetZ = offsetZ;
        if (outline !== undefined) this.textOutline = outline;
        if (shadow !== undefined) this.textShadow = shadow;
        if (center !== undefined) this.textCenter = center;
        return this;
    }

    setLogic(drawDist, zTol) {
        this.drawDistance = drawDist;
        this.zTolerance = zTol;
        return this;
    }

    onEnter(cb) {
        this.onEnter = cb;
        return this;
    }

    onExit(cb) {
        this.onExit = cb;
        return this;
    }

    onAction(cb) {
        this.onInteract = cb;
        return this;
    }

    spawn() {
        CfxMarkerSystem.add(this);
        return this;
    }

    draw() {
        DrawMarker(
            this.type, this.pos.x, this.pos.y, this.pos.z,
            this.dir.x, this.dir.y, this.dir.z,
            this.rot.x, this.rot.y, this.rot.z,
            this.scale.x, this.scale.y, this.scale.z,
            this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a,
            this.bob, this.faceCamera, this.rotationOrder, this.rotate,
            this.texture.dict, this.texture.name, this.drawOnEnts
        );
        if (this.text) this.drawText();
    }

    drawText() {
        const [onScreen, x, y] = GetScreenCoordFromWorldCoord(this.pos.x, this.pos.y, this.pos.z + this.textOffsetZ);
        if (onScreen) {
            SetTextScale(this.textScale, this.textScale);
            SetTextFont(this.textFont);
            SetTextColour(this.textColor.r, this.textColor.g, this.textColor.b, this.textColor.a);
            if (this.textOutline) SetTextOutline();
            if (this.textShadow) SetTextDropShadow();
            SetTextEntry("STRING");
            if (this.textCenter) SetTextCentre(1);
            AddTextComponentString(this.text);
            DrawText(x, y);
        }
    }
}

export const CfxMarkerSystem = {
    markers: new Map(),
    active: false,

    add(m) {
        this.markers.set(m.id, m);
        this.start();
    },

    remove(id) {
        this.markers.delete(id);
    },

    start() {
        if (this.active) return;
        this.active = true;

        setTick(async () => {
            if (this.markers.size === 0) return;
            const p = GetEntityCoords(PlayerPedId());
            let sleep = 1000;

            this.markers.forEach((m) => {
                if (!m.active) return;
                if (!CfxAuth.canAccess(m)) return;

                const dx = p[0] - m.interactPos.x;
                const dy = p[1] - m.interactPos.y;
                const dz = p[2] - m.interactPos.z;
                const d2 = dx*dx + dy*dy + dz*dz;

                if (d2 < (m.drawDistance * m.drawDistance)) {
                    sleep = 0;
                    m.draw();

                    const inside = (d2 < (m.interactDistance * m.interactDistance)) && (Math.abs(dz) < m.zTolerance);

                    if (inside && !m.isPlayerInside) {
                        m.isPlayerInside = true;
                        if (m.onEnter) m.onEnter(m.interactPos);
                        if (!m.requireKeyPress && m.onInteract) m.onInteract(m.interactPos);
                    } else if (!inside && m.isPlayerInside) {
                        m.isPlayerInside = false;
                        if (m.onExit) m.onExit(m.interactPos);
                    }

                    if (m.isPlayerInside && m.requireKeyPress && m.onInteract) {
                        if (IsControlJustReleased(0, m.interactKey)) m.onInteract(m.interactPos);
                    }
                } else {
                    m.isPlayerInside = false;
                }
            });

            if (sleep > 0) await new Promise(r => setTimeout(r, sleep));
        });
    }
};
