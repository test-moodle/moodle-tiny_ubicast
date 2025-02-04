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
 * Options values for the Moodle "tiny_ubicast" plugin.
 *
 * @module      tiny_ubicast
 * @copyright   2025 UbiCast {@link https://www.ubicast.eu}
 * @author      Nicolas Alexandropoulos <nicolas.alexandropoulos@unil.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from './common';

const useFilter = getPluginOptionName(pluginName, 'use_filter');
const ubicastURL = getPluginOptionName(pluginName, 'ubicast_url');
const courseId = getPluginOptionName(pluginName, 'course_id');

/**
 * Options registration function.
 *
 * @param {tinyMCE} editor
 */
export const register = (editor) => {

    // For each option, register it with the editor.
    // Valid type are defined in https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.editoroptions/
    editor.options.register(useFilter, {
        processor: 'string'
    });
    editor.options.register(ubicastURL, {
        processor: 'string'
    });
    editor.options.register(courseId, {
        processor: 'number'
    });
};

export const getUseFilter = (editor) => editor.options.get(useFilter);

export const getUbicastURL = (editor) => editor.options.get(ubicastURL);

export const getCourseId = (editor) => editor.options.get(courseId);
