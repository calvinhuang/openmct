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

import EmbeddedPageController from './src/EmbeddedPageController';
import iframeTemplate from 'raw-loader!./res/iframe.html';
import legacyRegistry from 'legacyRegistry';

legacyRegistry.register("platform/features/pages", {
    "extensions": {
        "types": [
            {
                "key": "example.page",
                "name": "Web Page",
                "cssClass": "icon-page",
                "description": "Embed a web page or web-based image in a resizeable window component. Can be added to Display Layouts. Note that the URL being embedded must allow iframing.",
                "priority": 50,
                "features": [
                    "creation"
                ],
                "properties": [
                    {
                        "key": "url",
                        "name": "URL",
                        "control": "textfield",
                        "pattern": "^(ftp|https?)\\:\\/\\/",
                        "required": true,
                        "cssClass": "l-input-lg"
                    }
                ]
            }
        ],
        "views": [
            {
                "template": iframeTemplate,
                "name": "Page",
                "type": "example.page",
                "key": "example.page",
                "editable": false
            }
        ],
        "controllers": [
            {
                "key": "EmbeddedPageController",
                "implementation": EmbeddedPageController,
                "depends": [
                    "$sce"
                ]
            }
        ]
    }
});
