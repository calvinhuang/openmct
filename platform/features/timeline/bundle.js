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


import ExportTimelineAsCSVAction from './src/actions/ExportTimelineAsCSVAction';
import TimelineController from './src/controllers/TimelineController';
import TimelineGraphController from './src/controllers/TimelineGraphController';
import TimelineDateTimeController from './src/controllers/TimelineDateTimeController';
import TimelineZoomController from './src/controllers/TimelineZoomController';
import TimelineTickController from './src/controllers/TimelineTickController';
import TimelineTableController from './src/controllers/TimelineTableController';
import TimelineGanttController from './src/controllers/TimelineGanttController';
import ActivityModeValuesController from './src/controllers/ActivityModeValuesController';
import ActivityTimespanCapability from './src/capabilities/ActivityTimespanCapability';
import TimelineTimespanCapability from './src/capabilities/TimelineTimespanCapability';
import UtilizationCapability from './src/capabilities/UtilizationCapability';
import GraphCapability from './src/capabilities/GraphCapability';
import CostCapability from './src/capabilities/CostCapability';
import MCTSwimlaneDrop from './src/directives/MCTSwimlaneDrop';
import MCTSwimlaneDrag from './src/directives/MCTSwimlaneDrag';
import ObjectLoader from './src/services/ObjectLoader';
import MCTTimelineChart from './src/chart/MCTTimelineChart';
import valuesTemplate from 'raw-loader!./res/templates/values.html';
import timelineTemplate from 'raw-loader!./res/templates/timeline.html';
import activityGanttTemplate from 'raw-loader!./res/templates/activity-gantt.html';
import tabularSwimlaneColsTreeTemplate from 'raw-loader!./res/templates/tabular-swimlane-cols-tree.html';
import tabularSwimlaneColsDataTemplate from 'raw-loader!./res/templates/tabular-swimlane-cols-data.html';
import resourceGraphsTemplate from 'raw-loader!./res/templates/resource-graphs.html';
import resourceGraphLabelsTemplate from 'raw-loader!./res/templates/resource-graph-labels.html';
import legendItemTemplate from 'raw-loader!./res/templates/legend-item.html';
import ticksTemplate from 'raw-loader!./res/templates/ticks.html';
import datetimeTemplate from 'raw-loader!./res/templates/controls/datetime.html';
import legacyRegistry from 'legacyRegistry';

legacyRegistry.register("platform/features/timeline", {
    "name": "Timelines",
    "description": "Resources, templates, CSS, and code for Timelines.",
    "resources": "res",
    "extensions": {
        "actions": [
            {
                "key": "timeline.export",
                "name": "Export Timeline as CSV",
                "category": "contextual",
                "implementation": ExportTimelineAsCSVAction,
                "depends": [
                    "$log",
                    "exportService",
                    "notificationService",
                    "resources[]"
                ]
            }
        ],
        "constants": [
            {
                "key": "TIMELINE_MINIMUM_DURATION",
                "description": "The minimum duration to display in a timeline view (one hour.)",
                "value": 3600000
            },
            {
                "key": "TIMELINE_MAXIMUM_OFFSCREEN",
                "description": "Maximum amount, in pixels, of a Gantt bar which may go off screen.",
                "value": 1000
            },
            {
                "key": "TIMELINE_ZOOM_CONFIGURATION",
                "description": "Describes major tick sizes in milliseconds, and width in pixels.",
                "value": {
                    "levels": [
                        1000,
                        2000,
                        5000,
                        10000,
                        20000,
                        30000,
                        60000,
                        120000,
                        300000,
                        600000,
                        1200000,
                        1800000,
                        3600000,
                        7200000,
                        14400000,
                        28800000,
                        43200000,
                        86400000,
                        86400000 * 2,
                        86400000 * 5,
                        86400000 * 10,
                        86400000 * 20,
                        86400000 * 30,
                        86400000 * 60,
                        86400000 * 120,
                        86400000 * 240,
                        86400000 * 365
                    ],
                    "width": 200
                }
            }
        ],
        "types": [
            {
                "key": "timeline",
                "name": "Timeline",
                "cssClass": "icon-timeline",
                "description": "A time-oriented container that lets you enclose and organize other Timelines and Activities. The Timeline view provides both tabular and Gantt views as well as resource utilization graphing of Activities.",
                "priority": 502,
                "features": [
                    "creation"
                ],
                "contains": [
                    "timeline",
                    "activity"
                ],
                "properties": [
                    {
                        "name": "Start date/time",
                        "control": "timeline-datetime",
                        "required": true,
                        "property": [
                            "start"
                        ],
                        "options": [
                            "SET"
                        ]
                    },
                    {
                        "name": "Battery capacity (Watt-hours)",
                        "control": "textfield",
                        "required": false,
                        "conversion": "number",
                        "property": [
                            "capacity"
                        ],
                        "pattern": "^-?\\d+(\\.\\d*)?$"
                    },
                    {
                        "name": "Battery starting SOC (%)",
                        "control": "textfield",
                        "required": false,
                        "conversion": "number",
                        "property": [
                            "startingSOC"
                        ],
                        "pattern": "^([0-9](\\.\\d*)?|[1-9][0-9](\\.\\d*)?|100)%?$"
                    }
                ],
                "model": {
                    "composition": [],
                    "start": {
                        "timestamp": 0
                    }
                }
            },
            {
                "key": "activity",
                "name": "Activity",
                "cssClass": "icon-activity",
                "features": [
                    "creation"
                ],
                "contains": [
                    "activity"
                ],
                "description": "An event or process that starts and ends at a discrete datetime. Activities can be nested in other Activities, and can be added to Timelines. Activity Modes can be added to an Activity to define its resource utilization over time.",
                "priority": 501,
                "properties": [
                    {
                        "name": "Start date/time",
                        "control": "timeline-datetime",
                        "required": true,
                        "property": [
                            "start"
                        ],
                        "options": [
                            "SET"
                        ]
                    },
                    {
                        "name": "Duration",
                        "control": "duration",
                        "required": true,
                        "property": [
                            "duration"
                        ]
                    }
                ],
                "model": {
                    "composition": [],
                    "relationships": {
                        "modes": []
                    },
                    "start": {
                        "timestamp": 0
                    },
                    "duration": {
                        "timestamp": 0
                    }
                }
            },
            {
                "key": "mode",
                "name": "Activity Mode",
                "cssClass": "icon-activity-mode",
                "features": [
                    "creation"
                ],
                "description": "When a sub-system utilizes Power or Communications resources over time, you can define those values in an Activity Mode. Activity Modes can then be linked to Activities to allow resource utilization graphing and estimating in a Timeline.",
                "priority": 500,
                "model": {
                    "resources": {
                        "comms": 0,
                        "power": 0
                    }
                },
                "properties": [
                    {
                        "name": "Comms (Kbps)",
                        "control": "textfield",
                        "conversion": "number",
                        "pattern": "^-?\\d+(\\.\\d*)?$",
                        "property": [
                            "resources",
                            "comms"
                        ]
                    },
                    {
                        "name": "Power (watts)",
                        "control": "textfield",
                        "conversion": "number",
                        "pattern": "^-?\\d+(\\.\\d*)?$",
                        "property": [
                            "resources",
                            "power"
                        ]
                    }
                ]
            }
        ],
        "views": [
            {
                "key": "values",
                "name": "Values",
                "cssClass": "icon-activity-mode",
                "template": valuesTemplate,
                "type": "mode",
                "uses": [
                    "cost"
                ],
                "editable": false
            },
            {
                "key": "timeline",
                "name": "Timeline",
                "cssClass": "icon-timeline",
                "type": "timeline",
                "description": "A time-oriented container that lets you enclose and organize other Timelines and Activities. The Timeline view provides both tabular and Gantt views as well as resource utilization graphing of Activities.",
                "template": timelineTemplate,
                "editable": true,
                "toolbar": {
                    "sections": [
                        {
                            "items": [
                                {
                                    "method": "add",
                                    "control": "menu-button",
                                    "text": "Add",
                                    "options": [
                                        {
                                            "name": "Timeline",
                                            "cssClass": "icon-timeline",
                                            "key": "timeline"
                                        },
                                        {
                                            "name": "Activity",
                                            "cssClass": "icon-activity",
                                            "key": "activity"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "items": [
                                {
                                    "cssClass": "icon-plot-resource",
                                    "description": "Graph Resource Utilization",
                                    "control": "button",
                                    "method": "toggleGraph"
                                },
                                {
                                    "cssClass": "icon-activity-mode",
                                    "control": "dialog-button",
                                    "description": "Apply Activity Modes...",
                                    "title": "Apply Activity Modes",
                                    "dialog": {
                                        "control": "selector",
                                        "name": "Modes",
                                        "type": "mode",
                                        "layout": "controls-under"
                                    },
                                    "property": "modes"
                                },
                                {
                                    "cssClass": "icon-chain-links",
                                    "description": "Edit Activity Link",
                                    "title": "Activity Link",
                                    "control": "dialog-button",
                                    "dialog": {
                                        "control": "textfield",
                                        "name": "Link",
                                        "pattern": "^(ftp|https?)\\:\\/\\/\\w+(\\.\\w+)*(\\:\\d+)?(\\/\\S*)*$",
                                        "cssClass": "l-input-lg"
                                    },
                                    "property": "link"
                                },
                                {
                                    "cssClass": "icon-gear",
                                    "description": "Edit Properties...",
                                    "control": "button",
                                    "method": "properties"
                                }
                            ]
                        },
                        {
                            "items": [
                                {
                                    "method": "remove",
                                    "description": "Remove Item",
                                    "control": "button",
                                    "cssClass": "icon-trash"
                                }
                            ]
                        }
                    ]
                }
            }
        ],
        "stylesheets": [
            {
                "stylesheetUrl": "css/timeline.css"
            },
            {
                "stylesheetUrl": "css/timeline-espresso.css",
                "theme": "espresso"
            },
            {
                "stylesheetUrl": "css/timeline-snow.css",
                "theme": "snow"
            }
        ],
        "representations": [
            {
                "key": "gantt",
                "template": activityGanttTemplate,
                "uses": [
                    "timespan",
                    "type"
                ]
            }
        ],
        "templates": [
            {
                "key": "timeline-tabular-swimlane-cols-tree",
                "priority": "mandatory",
                "template": tabularSwimlaneColsTreeTemplate
            },
            {
                "key": "timeline-tabular-swimlane-cols-data",
                "priority": "mandatory",
                "template": tabularSwimlaneColsDataTemplate
            },
            {
                "key": "timeline-resource-graphs",
                "priority": "mandatory",
                "template": resourceGraphsTemplate
            },
            {
                "key": "timeline-resource-graph-labels",
                "priority": "mandatory",
                "template": resourceGraphLabelsTemplate
            },
            {
                "key": "timeline-legend-item",
                "priority": "mandatory",
                "template": legendItemTemplate
            },
            {
                "key": "timeline-ticks",
                "priority": "mandatory",
                "template": ticksTemplate
            }
        ],
        "controls": [
            {
                "key": "timeline-datetime",
                "template": datetimeTemplate
            },
            {
                "key": "duration",
                "template": datetimeTemplate
            }
        ],
        "controllers": [
            {
                "key": "TimelineController",
                "implementation": TimelineController,
                "depends": [
                    "$scope",
                    "$q",
                    "objectLoader",
                    "TIMELINE_MINIMUM_DURATION"
                ]
            },
            {
                "key": "TimelineGraphController",
                "implementation": TimelineGraphController,
                "depends": [
                    "$scope",
                    "resources[]"
                ]
            },
            {
                "key": "TimelineDateTimeController",
                "implementation": TimelineDateTimeController,
                "depends": [
                    "$scope"
                ]
            },
            {
                "key": "TimelineZoomController",
                "implementation": TimelineZoomController,
                "depends": [
                    "$scope",
                    "$window",
                    "TIMELINE_ZOOM_CONFIGURATION"
                ]
            },
            {
                "key": "TimelineTickController",
                "implementation": TimelineTickController
            },
            {
                "key": "TimelineTableController",
                "implementation": TimelineTableController
            },
            {
                "key": "TimelineGanttController",
                "implementation": TimelineGanttController,
                "depends": [
                    "TIMELINE_MAXIMUM_OFFSCREEN"
                ]
            },
            {
                "key": "ActivityModeValuesController",
                "implementation": ActivityModeValuesController,
                "depends": [
                    "resources[]"
                ]
            }
        ],
        "capabilities": [
            {
                "key": "timespan",
                "implementation": ActivityTimespanCapability,
                "depends": [
                    "$q"
                ]
            },
            {
                "key": "timespan",
                "implementation": TimelineTimespanCapability,
                "depends": [
                    "$q"
                ]
            },
            {
                "key": "utilization",
                "implementation": UtilizationCapability,
                "depends": [
                    "$q"
                ]
            },
            {
                "key": "graph",
                "implementation": GraphCapability,
                "depends": [
                    "$q"
                ]
            },
            {
                "key": "cost",
                "implementation": CostCapability
            }
        ],
        "directives": [
            {
                "key": "mctSwimlaneDrop",
                "implementation": MCTSwimlaneDrop,
                "depends": [
                    "dndService"
                ]
            },
            {
                "key": "mctSwimlaneDrag",
                "implementation": MCTSwimlaneDrag,
                "depends": [
                    "dndService"
                ]
            },
            {
                "key": "mctTimelineChart",
                "implementation": MCTTimelineChart,
                "depends": [
                    "$interval",
                    "$log"
                ]
            }
        ],
        "services": [
            {
                "key": "objectLoader",
                "implementation": ObjectLoader,
                "depends": [
                    "$q"
                ]
            }
        ],
        "resources": [
            {
                "key": "power",
                "name": "Power",
                "units": "watts"
            },
            {
                "key": "comms",
                "name": "Comms",
                "units": "Kbps"
            },
            {
                "key": "battery",
                "name": "Battery State-of-Charge",
                "units": "%"
            }
        ]
    }
});
