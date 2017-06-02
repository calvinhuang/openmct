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

/*global window,requirejs*/

import 'requirejs';
import Constants from './Constants';
import FrameworkInitializer from './FrameworkInitializer';
import LogLevel from './LogLevel';
import BundleLoader from './load/BundleLoader';
import ImplementationLoader from './resolve/ImplementationLoader';
import ExtensionResolver from './resolve/ExtensionResolver';
import BundleResolver from './resolve/BundleResolver';
import RequireConfigurator from './resolve/RequireConfigurator';
import CustomRegistrars from './register/CustomRegistrars';
import ExtensionRegistrar from './register/ExtensionRegistrar';
import ExtensionSorter from './register/ExtensionSorter';
import ApplicationBootstrapper from './bootstrap/ApplicationBootstrapper';

function FrameworkLayer($http, $log) {
    this.$http = $http;
    this.$log = $log;
}

FrameworkLayer.prototype.initializeApplication = function (
    angular,
    legacyRegistry,
    logLevel
) {
    var $http = this.$http,
        $log = this.$log,
        app = angular.module(Constants.MODULE_NAME, ["ngRoute"]),
        loader = new BundleLoader($http, $log, legacyRegistry),
        resolver = new BundleResolver(
            new ExtensionResolver(
                new ImplementationLoader('require'),
                $log
            ),
            new RequireConfigurator('requirejs'),
            $log
        ),
        registrar = new ExtensionRegistrar(
            app,
            new CustomRegistrars(app, $log),
            new ExtensionSorter($log),
            $log
        ),
        bootstrapper = new ApplicationBootstrapper(
            angular,
            window.document,
            $log
        ),
        initializer = new FrameworkInitializer(
            loader,
            resolver,
            registrar,
            bootstrapper
        );

    // Apply logging levels; this must be done now, before the
    // first log statement.
    new LogLevel(logLevel).configure(app, $log);

    // Initialize the application
    $log.info("Initializing application.");
    initializer.runApplication();
};

export default FrameworkLayer;
