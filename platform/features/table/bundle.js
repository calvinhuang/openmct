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

import MCTTable from './src/directives/MCTTable';
import TelemetryTableController from './src/controllers/TelemetryTableController';
import TableOptionsController from './src/controllers/TableOptionsController';
import Region from '../../commonUI/regions/src/Region';
import InspectorRegion from '../../commonUI/browse/src/InspectorRegion';
import tableOptionsEditTemplate from 'raw-loader!./res/templates/table-options-edit.html';
import telemetryTableTemplate from 'raw-loader!./res/templates/telemetry-table.html';
import legacyRegistry from 'legacyRegistry';

/**
 * Two region parts are defined here. One that appears only in browse
 * mode, and one that appears only in edit mode. For not they both point
 * to the same representation, but a different key could be used here to
 * include a customized representation for edit mode.
 */
var tableInspector = new InspectorRegion(),
    tableOptionsEditRegion = new Region({
        name: "table-options",
        title: "Table Options",
        modes: ['edit'],
        content: {
            key: "table-options-edit"
        }
    });
tableInspector.addRegion(tableOptionsEditRegion);

legacyRegistry.register("platform/features/table", {
    "extensions": {
        "types": [
            {
                "key": "table",
                "name": "Telemetry Table",
                "cssClass": "icon-tabular-realtime",
                "description": "A table of values over a given time period. The table will be automatically updated with new values as they become available",
                "priority": 861,
                "features": "creation",
                "delegates": [
                    "telemetry"
                ],
                "inspector": tableInspector,
                "contains": [
                    {
                        "has": "telemetry"
                    }
                ],
                "model": {
                    "composition": []
                },
                "views": [
                    "table"
                ]
            }
        ],
        "controllers": [
            {
                "key": "TelemetryTableController",
                "implementation": TelemetryTableController,
                "depends": ["$scope", "$timeout", "openmct"]
            },
            {
                "key": "TableOptionsController",
                "implementation": TableOptionsController,
                "depends": ["$scope"]
            }

        ],
        "views": [
            {
                "name": "Telemetry Table",
                "key": "table",
                "cssClass": "icon-tabular-realtime",
                "template": telemetryTableTemplate,
                "needs": [
                    "telemetry"
                ],
                "delegation": true,
                "editable": false
            }
        ],
        "directives": [
            {
                "key": "mctTable",
                "implementation": MCTTable,
                "depends": ["$timeout"]
            }
        ],
        "representations": [
            {
                "key": "table-options-edit",
                "template": tableOptionsEditTemplate
            }
        ],
        "stylesheets": [
            {
                "stylesheetUrl": "css/table.css",
                "priority": "mandatory"
            }
        ]
    }
});
