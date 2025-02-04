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
 * Commands for the Moodle "tiny_ubicast" plugin.
 *
 * @module      tiny_ubicast
 * @copyright   2025 UbiCast {@link https://www.ubicast.eu}
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {icon, component} from 'tiny_ubicast/common';
import {getUbicastURL, getUseFilter, getCourseId} from 'tiny_ubicast/options';
import UbicastModal from 'tiny_ubicast/modal';

/**
 * Add a correction on the current selection.
 * @param {tinyMCE} editor
 * @returns {void}
 */
async function insertMedia(editor) {
    const courseId = getCourseId(editor);
    const useFilter = getUseFilter(editor) === '1';
    const ubicastURL = getUbicastURL(editor);

    const modal = await UbicastModal.create({
        templateContext: {
            elementid: editor.id,
            mediawidth: '100%',
            mediaheight: '300px',
        }
    });

    const root = await modal.getRoot()[0];
    const form = root.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const mediaId = form.querySelector('input[name=mediaid]').value;
        const mediaWidth = form.querySelector('input[name=mediawidth]').value;
        const mediaHeight = form.querySelector('input[name=mediaheight]').value;
        const mediaThumb = form.querySelector('input[name=mediaimg]').value || '/static/mediaserver/images/video.svg';

        let html;
        if (mediaId) {
            if (useFilter) {
                html = '<img class="atto_ubicast mediaid_' + mediaId + '" ' +
                    'style="display: block; width: ' + mediaWidth + '; height: ' + mediaHeight + ';" ' +
                    'src="' + ubicastURL + mediaThumb + '" alt=""/>';
            } else {
                html = '<iframe class="nudgis-iframe" ' +
                    'style="width:' + mediaWidth + '; height: ' + mediaHeight + '; background-color: #ddd;" ' +
                    'src="' + window.M.cfg.wwwroot + '/lib/editor/tiny/plugins/ubicast/view.php' +
                    '?course=' + courseId + ' &video= + ' + mediaId + '" ' +
                    'allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen">' +
                    '</iframe>';
            }
        }

        if (html) {
            editor.insertContent(html);
        }
        modal.destroy();
    });
    root.querySelector('.tiny_ubicast_close').addEventListener('click', (event) => {
        event.preventDefault();
        modal.destroy();
    });
    root.querySelector('.tiny_ubicast_insert').addEventListener('click', (event) => {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    });

    setTimeout(function() {
        // Use setTimeout to wait for MediaSelector loading.
        new window.MediaSelector({
            moodleURL: window.M.cfg.wwwroot + '/mod/ubicast/lti.php?id=' + courseId,
            nudgisURL: ubicastURL,
            filterBySpeaker: true,
            target: editor.id + '_tiny_ubicast_dialog'
        });
    }, (window.MediaSelector ? 10 : 2000));
}


export const getSetup = async() => {
    const [
        tooltipText,
        buttonImage,
    ] = await Promise.all([
        getString('tooltip', component),
        getButtonImage('icon', component),
    ]);

    return (editor) => {
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Register the insert media Toolbar Button.
        editor.ui.registry.addButton('ubicast_media', {
            icon: icon,
            tooltip: tooltipText,
            onAction: () => insertMedia(editor)
        });
    };
};
