/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
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
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/


import TimeConductorController from './src/ui/TimeConductorController';
import ConductorAxisController from './src/ui/ConductorAxisController';
import ConductorTOIController from './src/ui/ConductorTOIController';
import ConductorTOIDirective from './src/ui/ConductorTOIDirective';
import TimeOfInterestController from './src/ui/TimeOfInterestController';
import ConductorAxisDirective from './src/ui/ConductorAxisDirective';
import NumberFormat from './src/ui/NumberFormat';
import timeConductorTemplate from 'raw-loader!./res/templates/time-conductor.html';
import modeSelectorTemplate from 'raw-loader!./res/templates/mode-selector/mode-selector.html';
import modeMenuTemplate from 'raw-loader!./res/templates/mode-selector/mode-menu.html';
import timeOfInterest from 'raw-loader!./res/templates/time-of-interest.html';
import legacyRegistry from 'legacyRegistry';

legacyRegistry.register("platform/features/conductor/core", {
    "extensions": {
        "controllers": [
            {
                "key": "TimeConductorController",
                "implementation": TimeConductorController,
                "depends": [
                    "$scope",
                    "$window",
                    "openmct",
                    "formatService",
                    "CONDUCTOR_CONFIG"
                ]
            },
            {
                "key": "ConductorTOIController",
                "implementation": ConductorTOIController,
                "depends": [
                    "$scope",
                    "openmct",
                    "formatService"
                ]
            },
            {
                "key": "TimeOfInterestController",
                "implementation": TimeOfInterestController,
                "depends": [
                    "$scope",
                    "openmct",
                    "formatService"
                ]
            }
        ],
        "directives": [
            {
                "key": "conductorAxis",
                "implementation": ConductorAxisDirective,
                "depends": [
                    "openmct",
                    "formatService"
                ]
            },
            {
                "key": "conductorToi",
                "implementation": ConductorTOIDirective
            }
        ],
        "stylesheets": [
            {
                "stylesheetUrl": "css/time-conductor-espresso.css",
                "theme": "espresso"
            },
            {
                "stylesheetUrl": "css/time-conductor-snow.css",
                "theme": "snow"
            }
        ],
        "templates": [
            {
                "key": "conductor",
                "template": timeConductorTemplate
            },
            {
                "key": "mode-menu",
                "template": modeMenuTemplate
            },
            {
                "key": "mode-selector",
                "template": modeSelectorTemplate
            },
            {
                "key": "time-of-interest",
                "template": timeOfInterest
            }
        ],
        "representations": [
            {
                "key": "time-conductor",
                "template": timeConductorTemplate
            }
        ],
        "licenses": [
            {
                "name": "D3: Data-Driven Documents",
                "version": "4.1.0",
                "author": "Mike Bostock",
                "description": "D3 (or D3.js) is a JavaScript library for visualizing data using web standards. D3 helps you bring data to life using SVG, Canvas and HTML. D3 combines powerful visualization and interaction techniques with a data-driven approach to DOM manipulation, giving you the full capabilities of modern browsers and the freedom to design the right visual interface for your data.",
                "website": "https://d3js.org/",
                "copyright": "Copyright 2010-2016 Mike Bostock",
                "license": "BSD-3-Clause",
                "link": "https://github.com/d3/d3/blob/master/LICENSE"
            }
        ],
        "formats": [
            {
                "key": "number",
                "implementation": NumberFormat
            }
        ]
    }
});
