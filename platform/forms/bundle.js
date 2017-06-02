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

import MCTForm from './src/MCTForm';
import MCTToolbar from './src/MCTToolbar';
import MCTControl from './src/MCTControl';
import DateTimeController from './src/controllers/DateTimeController';
import CompositeController from './src/controllers/CompositeController';
import ColorController from './src/controllers/ColorController';
import DialogButtonController from './src/controllers/DialogButtonController';
import checkboxTemplate from 'raw-loader!./res/templates/controls/checkbox.html';
import datetimeTemplate from 'raw-loader!./res/templates/controls/datetime.html';
import selectTemplate from 'raw-loader!./res/templates/controls/select.html';
import textfieldTemplate from 'raw-loader!./res/templates/controls/textfield.html';
import textareaTemplate from 'raw-loader!./res/templates/controls/textarea.html';
import buttonTemplate from 'raw-loader!./res/templates/controls/button.html';
import colorTemplate from 'raw-loader!./res/templates/controls/color.html';
import compositeTemplate from 'raw-loader!./res/templates/controls/composite.html';
import menuButtonTemplate from 'raw-loader!./res/templates/controls/menu-button.html';
import dialogTemplate from 'raw-loader!./res/templates/controls/dialog.html';
import radioTemplate from 'raw-loader!./res/templates/controls/radio.html';
import legacyRegistry from 'legacyRegistry';

legacyRegistry.register("platform/forms", {
    "name": "MCT Forms",
    "description": "Form generator; includes directive and some controls.",
    "extensions": {
        "directives": [
            {
                "key": "mctForm",
                "implementation": MCTForm
            },
            {
                "key": "mctToolbar",
                "implementation": MCTToolbar
            },
            {
                "key": "mctControl",
                "implementation": MCTControl,
                "depends": [
                    "templateLinker",
                    "controls[]"
                ]
            }
        ],
        "controls": [
            {
                "key": "checkbox",
                "template": checkboxTemplate
            },
            {
                "key": "radio",
                "template": radioTemplate
            },
            {
                "key": "datetime",
                "template": datetimeTemplate
            },
            {
                "key": "select",
                "template": selectTemplate
            },
            {
                "key": "textfield",
                "template": textfieldTemplate
            },
            {
                "key": "textarea",
                "template": textareaTemplate
            },
            {
                "key": "button",
                "template": buttonTemplate
            },
            {
                "key": "color",
                "template": colorTemplate
            },
            {
                "key": "composite",
                "template": compositeTemplate
            },
            {
                "key": "menu-button",
                "template": menuButtonTemplate
            },
            {
                "key": "dialog-button",
                "template": dialogTemplate
            }
        ],
        "controllers": [
            {
                "key": "DateTimeController",
                "implementation": DateTimeController,
                "depends": [
                    "$scope"
                ]
            },
            {
                "key": "CompositeController",
                "implementation": CompositeController
            },
            {
                "key": "ColorController",
                "implementation": ColorController
            },
            {
                "key": "DialogButtonController",
                "implementation": DialogButtonController,
                "depends": [
                    "$scope",
                    "dialogService"
                ]
            }
        ]
    }
});
