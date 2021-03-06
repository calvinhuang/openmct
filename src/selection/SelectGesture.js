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

import $ from 'webpack-zepto';

function SelectGesture(selection, contextManager) {
    this.selection = selection;
    this.contextManager = contextManager;
}

SelectGesture.prototype.apply = function (htmlElement, item) {
    var $element = $(htmlElement);
    var contextManager = this.contextManager;
    var selection = this.selection;
    var path = contextManager.path(item, htmlElement);

    function select() {
        selection.add(path);
    }

    function change() {
        var selected = selection.primary();
        $element.toggleClass(
            'selected',
            selected && path.matches(selected)
        );
    }

    $element.addClass('selectable');
    $element.on('click', select);
    selection.on('change', change);
    change(); // Initialize

    return function () {
        contextManager.release(htmlElement);
        $element.off('click', select);
        selection.off('change', change);
    };
};

export default SelectGesture;
