import { CfxMarker, CfxMarkerSystem } from '@modules/markers/markers.js';
import { CfxAuth } from '@modules/markers/markersauth.js';
import { CfxRegisterCommand } from '@modules/commands/registercommands.js';
import { Blips } from '@modules/blips/blips.js';
import { CfxPromise } from '@modules/@syncpromise/promise';

/**
 * @type {import('@cfxtypes').CfxjsLibrary} Cfxjs
 */
export const Cfxjs = {
    Marker: (id) => new CfxMarker(id),
    MarkerSystem: CfxMarkerSystem,
    MarkersAuth: CfxAuth,
    ConsoleCommand: CfxRegisterCommand,
    Blips: Blips,
    Promise: CfxPromise,
    version: '1.0.0',
    author: 'Matija',
};

globalThis.Cfxjs = Cfxjs;
