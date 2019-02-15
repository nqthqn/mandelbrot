'use strict';

const $  = global.jQuery;

class Search {

  constructor() {
    const self = this;

    $('#search-input').on('keyup blur change', function() {
      const key = this.value.toUpperCase();
      $('.Navigation ul').each(function() {
        self.search(this, key);
      });
    });
  }

  search(list, key) {
    let childTree, $li, i;
    const li = $(list).children('li');
    let match = false;

    for (i = 0; i < li.length; i++) {
      $li = $(li[i]);
      childTree = $(li[i]).children('ul');

      if ($li.parents('.Tree-collection').find('> .Tree-collectionLabel').text().toUpperCase().indexOf(key) !== -1 || 
          $li.text().toUpperCase().indexOf(key) !== -1 || 
          ($li.find('[data-tags]').length > 0 && $li.find('[data-tags]').attr('data-tags').toUpperCase().indexOf(key) !== -1)
      ) {
        match = true;
        $li.parents('.Tree-collection').removeClass('is-closed');
        $li.show();
        this.search(childTree, key);
      } else {
        match = false;
        $li.hide();
      }
    }
    return match;
  }
}

module.exports = Search;