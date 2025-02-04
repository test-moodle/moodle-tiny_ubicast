// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Main file for the Moodle "tiny_ubicast" plugin.
 *
 * @module      tiny_ubicast
 * @copyright   2025 UbiCast {@link https://www.ubicast.eu}
 * @author      Nicolas Alexandropoulos <nicolas.alexandropoulos@unil.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getTinyMCE} from 'editor_tiny/loader';
import {getPluginMetadata} from 'editor_tiny/utils';
import {component, pluginName} from './common';
import {getSetup as getCommandSetup} from './commands';
import * as Configuration from './configuration';
import {register as registerOptions} from './options';

// Setup the tiny_ubicast plugin.
// eslint-disable-next-line no-async-promise-executor
export default new Promise(async(resolve) => {
    // Note: The PluginManager.add function does not support asynchronous configuration.
    // Perform any asynchronous configuration here, and then call the PluginManager.add function.
    const [
        tinyMCE,
        setupCommands,
        pluginMetadata,
    ] = await Promise.all([
        getTinyMCE(),
        getCommandSetup(),
        getPluginMetadata(component, pluginName),
    ]);

    // Load the media selector script from Ubicast.
    if (!window.MediaSelector) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = window.M.cfg.wwwroot + '/mod/ubicast/statics/media_selector.js?_=m7';
        document.head.appendChild(script);
    }

    // Reminder: Any asynchronous code must be run before this point.
    tinyMCE.PluginManager.add(pluginName, (editor) => {
        // Register options.
        registerOptions(editor);

        // Setup any commands such as buttons, menu items, and so on.
        setupCommands(editor);

        // Return the pluginMetadata object. This is used by TinyMCE to display a help link for your plugin.
        return pluginMetadata;
    });

    resolve([pluginName, Configuration]);
});
