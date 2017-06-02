/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2017, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

import legacyRegistry from 'legacyRegistry';
import '../src/adapter/bundle';
import '../src/api/objects/bundle';
import '../src/api/telemetry/bundle';
import '../example/builtins/bundle';
import '../example/composite/bundle';
import '../example/eventGenerator/bundle';
import '../example/export/bundle';
import '../example/extensions/bundle';
import '../example/forms/bundle';
import '../example/identity/bundle';
import '../example/imagery/bundle';
import '../example/mobile/bundle';
import '../example/msl/bundle';
import '../example/notifications/bundle';
import '../example/persistence/bundle';
import '../example/plotOptions/bundle';
import '../example/policy/bundle';
import '../example/profiling/bundle';
import '../example/scratchpad/bundle';
import '../example/styleguide/bundle';
import '../example/taxonomy/bundle';
import '../example/worker/bundle';

import '../platform/commonUI/about/bundle';
import '../platform/commonUI/browse/bundle';
import '../platform/commonUI/dialog/bundle';
import '../platform/commonUI/edit/bundle';
import '../platform/commonUI/formats/bundle';
import '../platform/commonUI/general/bundle';
import '../platform/commonUI/inspect/bundle';
import '../platform/commonUI/mobile/bundle';
import '../platform/commonUI/notification/bundle';
import '../platform/commonUI/regions/bundle';
import '../platform/commonUI/themes/espresso/bundle';
import '../platform/commonUI/themes/snow/bundle';
import '../platform/containment/bundle';
import '../platform/core/bundle';
import '../platform/entanglement/bundle';
import '../platform/execution/bundle';
import '../platform/exporters/bundle';
import '../platform/features/clock/bundle';
import '../platform/features/fixed/bundle';
import '../platform/features/conductor/core/bundle';
import '../platform/features/conductor/compatibility/bundle';
import '../platform/features/imagery/bundle';
import '../platform/features/layout/bundle';
import '../platform/features/my-items/bundle';
import '../platform/features/pages/bundle';
import '../platform/features/plot/bundle';
import '../platform/features/static-markup/bundle';
import '../platform/features/table/bundle';
import '../platform/features/timeline/bundle';
import '../platform/forms/bundle';
import '../platform/framework/bundle';
import '../platform/framework/src/load/Bundle';
import '../platform/identity/bundle';
import '../platform/persistence/aggregator/bundle';
import '../platform/persistence/couch/bundle';
import '../platform/persistence/elastic/bundle';
import '../platform/persistence/local/bundle';
import '../platform/persistence/queue/bundle';
import '../platform/policy/bundle';
import '../platform/representation/bundle';
import '../platform/search/bundle';
import '../platform/status/bundle';
import '../platform/telemetry/bundle';

var DEFAULTS = [
    'src/adapter',
    'src/api/objects',
    'src/api/telemetry',
    'platform/framework',
    'platform/core',
    'platform/representation',
    'platform/commonUI/about',
    'platform/commonUI/browse',
    'platform/commonUI/edit',
    'platform/commonUI/dialog',
    'platform/commonUI/formats',
    'platform/commonUI/general',
    'platform/commonUI/inspect',
    'platform/commonUI/mobile',
    'platform/commonUI/notification',
    'platform/containment',
    'platform/execution',
    'platform/exporters',
    'platform/telemetry',
    'platform/features/clock',
    'platform/features/fixed',
    'platform/features/imagery',
    'platform/features/layout',
    'platform/features/pages',
    'platform/features/plot',
    'platform/features/timeline',
    'platform/features/table',
    'platform/forms',
    'platform/identity',
    'platform/persistence/aggregator',
    'platform/persistence/queue',
    'platform/policy',
    'platform/entanglement',
    'platform/search',
    'platform/status',
    'platform/commonUI/regions'
];

DEFAULTS.forEach(function (bundlePath) {
    legacyRegistry.enable(bundlePath);
});

export default legacyRegistry;
