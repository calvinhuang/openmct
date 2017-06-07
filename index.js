var THIRTY_MINUTES = 30 * 60 * 1000;
console.log('OpenMCT index.js');
import openmct from './openmct.js';

[
    'example/imagery',
    'example/eventGenerator',
    'example/styleguide'
].forEach(
    openmct.legacyRegistry.enable.bind(openmct.legacyRegistry)
);
openmct.install(openmct.plugins.MyItems());
openmct.install(openmct.plugins.LocalStorage());
openmct.install(openmct.plugins.Espresso());
openmct.install(openmct.plugins.Generator());
openmct.install(openmct.plugins.UTCTimeSystem());
openmct.time.clock('local', {start: -THIRTY_MINUTES, end: 0});
openmct.time.timeSystem('utc');
openmct.start();
