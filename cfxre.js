import { CfxMarker, CfxMarkerSystem } from './modules/markers/markers.js';
import { CfxAuth } from './modules/markers/markersauth.js';
import { CfxRegisterCommand } from './modules/commands/registercommands.js';

export const Cfxjs = {
    Marker: (id) => new CfxMarker(id),
    MarkerSystem: CfxMarkerSystem,
    MarkersAuth: CfxAuth,
    ConsoleCommand: CfxRegisterCommand,
    version: '1.0.0',
    author: 'Matija',
};

global.Cfxjs = Cfxjs;
