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

import fixedTemplate from 'raw-loader!../layout/res/templates/fixed.html';
import legacyRegistry from 'legacyRegistry';

legacyRegistry.register("platform/features/fixed", {
    "name": "Fixed position components.",
    "description": "Plug in adding Fixed Position object type.",
    "extensions": {
        "views": [
            {
                "key": "fixed-display",
                "name": "Fixed Position Display",
                "cssClass": "icon-box-with-dashed-lines",
                "type": "telemetry.fixed",
                "template": fixedTemplate,
                "uses": [
                    "composition"
                ],
                "editable": true,
                "toolbar": {
                    "sections": [
                        {
                            "items": [
                                {
                                    "method": "add",
                                    "cssClass": "icon-plus",
                                    "control": "menu-button",
                                    "text": "Add",
                                    "options": [
                                        {
                                            "name": "Box",
                                            "cssClass": "icon-box",
                                            "key": "fixed.box"
                                        },
                                        {
                                            "name": "Line",
                                            "cssClass": "icon-line-horz",
                                            "key": "fixed.line"
                                        },
                                        {
                                            "name": "Text",
                                            "cssClass": "icon-T",
                                            "key": "fixed.text"
                                        },
                                        {
                                            "name": "Image",
                                            "cssClass": "icon-image",
                                            "key": "fixed.image"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "items": [
                                {
                                    "method": "order",
                                    "cssClass": "icon-layers",
                                    "control": "menu-button",
                                    "title": "Layering",
                                    "description": "Move the selected object above or below other objects",
                                    "options": [
                                        {
                                            "name": "Move to Top",
                                            "cssClass": "icon-arrow-double-up",
                                            "key": "top"
                                        },
                                        {
                                            "name": "Move Up",
                                            "cssClass": "icon-arrow-up",
                                            "key": "up"
                                        },
                                        {
                                            "name": "Move Down",
                                            "cssClass": "icon-arrow-down",
                                            "key": "down"
                                        },
                                        {
                                            "name": "Move to Bottom",
                                            "cssClass": "icon-arrow-double-down",
                                            "key": "bottom"
                                        }
                                    ]
                                },
                                {
                                    "property": "fill",
                                    "cssClass": "icon-paint-bucket",
                                    "title": "Fill color",
                                    "description": "Set fill color",
                                    "control": "color"
                                },
                                {
                                    "property": "stroke",
                                    "cssClass": "icon-line-horz",
                                    "title": "Border color",
                                    "description": "Set border color",
                                    "control": "color"
                                },
                                {
                                    "property": "color",
                                    "cssClass": "icon-T",
                                    "title": "Text color",
                                    "description": "Set text color",
                                    "mandatory": true,
                                    "control": "color"
                                },
                                {
                                    "property": "url",
                                    "cssClass": "icon-image",
                                    "control": "dialog-button",
                                    "title": "Image Properties",
                                    "description": "Edit image properties",
                                    "dialog": {
                                        "control": "textfield",
                                        "name": "Image URL",
                                        "cssClass": "l-input-lg",
                                        "required": true
                                    }
                                },
                                {
                                    "property": "text",
                                    "cssClass": "icon-gear",
                                    "control": "dialog-button",
                                    "title": "Text Properties",
                                    "description": "Edit text properties",
                                    "dialog": {
                                        "control": "textfield",
                                        "name": "Text",
                                        "required": true
                                    }
                                },
                                {
                                    "method": "showTitle",
                                    "cssClass": "icon-two-parts-both",
                                    "control": "button",
                                    "title": "Show title",
                                    "description": "Show telemetry element title"
                                },
                                {
                                    "method": "hideTitle",
                                    "cssClass": "icon-two-parts-one-only",
                                    "control": "button",
                                    "title": "Hide title",
                                    "description": "Hide telemetry element title"
                                }
                            ]
                        },
                        {
                            "items": [
                                {
                                    "method": "remove",
                                    "control": "button",
                                    "cssClass": "icon-trash"
                                }
                            ]
                        }
                    ]
                }
            }
        ],
        "types": [
            {
                "key": "telemetry.fixed",
                "name": "Fixed Position Display",
                "cssClass": "icon-box-with-dashed-lines",
                "description": "Collect and display telemetry elements in " +
                "alphanumeric format in a simple canvas workspace. " +
                "Elements can be positioned and sized. " +
                "Lines, boxes and images can be added as well.",
                "priority": 899,
                "delegates": [
                    "telemetry"
                ],
                "features": "creation",
                "contains": [
                    {
                        "has": "telemetry"
                    }
                ],
                "model": {
                    "layoutGrid": [64, 16],
                    "composition": []
                },
                "properties": [
                    {
                        "name": "Layout Grid",
                        "control": "composite",
                        "items": [
                            {
                                "name": "Horizontal grid (px)",
                                "control": "textfield",
                                "cssClass": "l-input-sm l-numeric"
                            },
                            {
                                "name": "Vertical grid (px)",
                                "control": "textfield",
                                "cssClass": "l-input-sm l-numeric"
                            }
                        ],
                        "pattern": "^(\\d*[1-9]\\d*)?$",
                        "property": "layoutGrid",
                        "conversion": "number[]"
                    }
                ],
                "views": [
                    "fixed-display"
                ]
            }
        ]
    }
});
