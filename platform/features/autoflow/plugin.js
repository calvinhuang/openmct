import autoflowTabularTemplate from 'raw-loader!./res/templates/autoflow-tabular.html';
import AutoflowTabularController from './src/AutoflowTabularController';
import MCTAutoflowTable from './src/MCTAutoflowTable';

export default function (options) {
    return function (openmct) {
        openmct.legacyRegistry.register("platform/features/autoflow", {
            "name": "WARP Telemetry Adapter",
            "description": "Retrieves telemetry from the WARP Server and provides related types and views.",
            "resources": "res",
            "extensions": {
                "views": [
                    {
                        "key": "autoflow",
                        "name": "Autoflow Tabular",
                        "cssClass": "icon-packet",
                        "description": "A tabular view of packet contents.",
                        "template": autoflowTabularTemplate,
                        "type": options && options.type,
                        "needs": [
                            "telemetry"
                        ],
                        "delegation": true
                    }
                ],
                "controllers": [
                    {
                        "key": "AutoflowTabularController",
                        "implementation": AutoflowTabularController,
                        "depends": [
                            "$scope",
                            "$timeout",
                            "telemetrySubscriber"
                        ]
                    }
                ],
                "directives": [
                    {
                        "key": "mctAutoflowTable",
                        "implementation": MCTAutoflowTable
                    }
                ]
            }
        });
        openmct.legacyRegistry.enable("platform/features/autoflow");
    };
};
