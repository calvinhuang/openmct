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

import NotificationIndicatorController from './src/NotificationIndicatorController';
import NotificationIndicator from './src/NotificationIndicator';
import NotificationService from './src/NotificationService';
import notificationIndicatorTemplate from 'raw-loader!./res/notification-indicator.html';
import legacyRegistry from 'legacyRegistry';

legacyRegistry.register("platform/commonUI/notification", {
    "extensions": {
        "constants": [
            {
                "key": "DEFAULT_AUTO_DISMISS",
                "value": 3000
            },
            {
                "key": "FORCE_AUTO_DISMISS",
                "value": 1000
            },
            {
                "key": "MINIMIZE_TIMEOUT",
                "value": 300
            }
        ],
        "templates": [
            {
                "key": "notificationIndicatorTemplate",
                "template": notificationIndicatorTemplate
            }
        ],
        "controllers": [
            {
                "key": "NotificationIndicatorController",
                "implementation": NotificationIndicatorController,
                "depends": [
                    "$scope",
                    "notificationService",
                    "dialogService"
                ]
            }
        ],
        "indicators": [
            {
                "implementation": NotificationIndicator,
                "priority": "fallback"
            }
        ],
        "services": [
            {
                "key": "notificationService",
                "implementation": NotificationService,
                "depends": [
                    "$timeout",
                    "topic",
                    "DEFAULT_AUTO_DISMISS",
                    "MINIMIZE_TIMEOUT"
                ]
            }
        ]
    }
});
