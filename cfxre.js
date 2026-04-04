import { CfxMarker, CfxMarkerSystem } from '@modules/markers/markers.js';
import { CfxAuth } from '@modules/markers/markersauth.js';
import { CfxRegisterESXCommand, CfxRegisterQboxCommand } from '@modules/commands/registercommands.js';
import { Blips } from '@modules/blips/blips.js';
import { CfxPromise } from '@modules/@syncpromise/promise';
import { getCurrentVersion, getCurrentAuthor } from '@modules/@meta/meta';

/**
 * @type {import('@cfxtypes').CfxjsLibrary} Cfxjs
 */
export const Cfxjs = {
    Marker: (id) => new CfxMarker(id),
    MarkerSystem: CfxMarkerSystem,
    MarkersAuth: CfxAuth,
    ConsoleCommand: CfxRegisterESXCommand,
    Blips: Blips,
    Promise: CfxPromise,
    version: getCurrentVersion(),
    author: getCurrentAuthor(),
};

globalThis.Cfxjs = Cfxjs;
