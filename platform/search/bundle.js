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

import SearchController from './src/controllers/SearchController';
import SearchMenuController from './src/controllers/SearchMenuController';
import GenericSearchProvider from './src/services/GenericSearchProvider';
import SearchAggregator from './src/services/SearchAggregator';
import searchItemTemplate from 'raw-loader!./res/templates/search-item.html';
import searchTemplate from 'raw-loader!./res/templates/search.html';
import searchMenuTemplate from 'raw-loader!./res/templates/search-menu.html';
import searchWorkerText from 'raw-loader!./src/services/GenericSearchWorker.js';
import legacyRegistry from 'legacyRegistry';

legacyRegistry.register("platform/search", {
    "name": "Search",
    "description": "Allows the user to search through the file tree.",
    "extensions": {
        "constants": [
            {
                "key": "GENERIC_SEARCH_ROOTS",
                "value": [
                    "ROOT"
                ],
                "priority": "fallback"
            }
        ],
        "controllers": [
            {
                "key": "SearchController",
                "implementation": SearchController,
                "depends": [
                    "$scope",
                    "searchService"
                ]
            },
            {
                "key": "SearchMenuController",
                "implementation": SearchMenuController,
                "depends": [
                    "$scope",
                    "types[]"
                ]
            }
        ],
        "representations": [
            {
                "key": "search-item",
                "template": searchItemTemplate
            }
        ],
        "templates": [
            {
                "key": "search",
                "template": searchTemplate
            },
            {
                "key": "search-menu",
                "template": searchMenuTemplate
            }
        ],
        "components": [
            {
                "provides": "searchService",
                "type": "provider",
                "implementation": GenericSearchProvider,
                "depends": [
                    "$q",
                    "$log",
                    "modelService",
                    "workerService",
                    "topic",
                    "GENERIC_SEARCH_ROOTS",
                    "openmct"
                ]
            },
            {
                "provides": "searchService",
                "type": "aggregator",
                "implementation": SearchAggregator,
                "depends": [
                    "$q",
                    "objectService"
                ]
            }
        ],
        "workers": [
            {
                "key": "genericSearchWorker",
                "scriptText": searchWorkerText
            }
        ]
    }
});
