import { CfxMarker, CfxMarkerSystem } from '@cfxmodules/markers/markers.js';
import { CfxAuth } from '@cfxmodules/markers/markersauth.js';
import { CfxRegisterESXCommand, CfxRegisterQboxCommand } from '@cfxmodules/commands/registercommands.js';
import { Blips } from '@cfxmodules/blips/blips.js';
import { CfxPromise } from '@cfxmodules/@syncpromise/promise';
import { getCurrentVersion, getCurrentAuthor } from '@cfxmodules/@meta/meta';

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
