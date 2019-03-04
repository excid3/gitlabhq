import diffDiscussionsMockData from '../mock_data/diff_discussions';
import { diffViewerModes } from '~/ide/constants';
  const diffDiscussionMock = diffDiscussionsMockData;

    diffFile.added_lines = 2;
    diffFile.removed_lines = 1;

        props.diffFile.viewer.name = diffViewerModes.renamed;
        expect(filePaths()[0]).toHaveText(props.diffFile.old_path_html);
        expect(filePaths()[1]).toHaveText(props.diffFile.new_path_html);
      expect(button.dataset.clipboardText).toBe('{"text":"CHANGELOG.rb","gfm":"`CHANGELOG.rb`"}');
        props.diffFile.viewer.name = diffViewerModes.mode_changed;
        props.diffFile.viewer.name = diffViewerModes.text;

    describe('file actions', () => {
      it('should not render if diff file has a submodule', () => {
        props.diffFile.submodule = 'submodule';
        vm = mountComponentWithStore(Component, { props, store });

        expect(vm.$el.querySelector('.file-actions')).toEqual(null);
      });

      it('should not render if add merge request buttons is false', () => {
        props.addMergeRequestButtons = false;
        vm = mountComponentWithStore(Component, { props, store });

        expect(vm.$el.querySelector('.file-actions')).toEqual(null);
      });

      describe('with add merge request buttons enabled', () => {
        beforeEach(() => {
          props.addMergeRequestButtons = true;
          props.diffFile.edit_path = 'edit-path';
        });

        const viewReplacedFileButton = () => vm.$el.querySelector('.js-view-replaced-file');
        const viewFileButton = () => vm.$el.querySelector('.js-view-file-button');
        const externalUrl = () => vm.$el.querySelector('.js-external-url');

        it('should render if add merge request buttons is true and diff file does not have a submodule', () => {
          vm = mountComponentWithStore(Component, { props, store });

          expect(vm.$el.querySelector('.file-actions')).not.toEqual(null);
        });

        it('should not render view replaced file button if no replaced view path is present', () => {
          vm = mountComponentWithStore(Component, { props, store });

          expect(viewReplacedFileButton()).toEqual(null);
        });

        it('should render view replaced file button if replaced view path is present', () => {
          props.diffFile.replaced_view_path = 'replaced-view-path';
          vm = mountComponentWithStore(Component, { props, store });

          expect(viewReplacedFileButton()).not.toEqual(null);
          expect(viewReplacedFileButton().getAttribute('href')).toBe('replaced-view-path');
        });

        it('should render correct file view button path', () => {
          props.diffFile.view_path = 'view-path';
          vm = mountComponentWithStore(Component, { props, store });

          expect(viewFileButton().getAttribute('href')).toBe('view-path');
        });

        it('should not render external url view link if diff file has no external url', () => {
          vm = mountComponentWithStore(Component, { props, store });

          expect(externalUrl()).toEqual(null);
        });

        it('should render external url view link if diff file has external url', () => {
          props.diffFile.external_url = 'external_url';
          vm = mountComponentWithStore(Component, { props, store });

          expect(externalUrl()).not.toEqual(null);
          expect(externalUrl().getAttribute('href')).toBe('external_url');
        });
      });

      describe('without file blob', () => {
        beforeEach(() => {
          props.diffFile.blob = null;
          props.addMergeRequestButtons = true;
          vm = mountComponentWithStore(Component, { props, store });
        });

        it('should not render toggle discussions button', () => {
          expect(vm.$el.querySelector('.js-btn-vue-toggle-comments')).toEqual(null);
        });

        it('should not render edit button', () => {
          expect(vm.$el.querySelector('.js-edit-blob')).toEqual(null);
        });
      });
    });