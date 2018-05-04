var inventory;

(function() {
  var currentId = -1;

  inventory = {
    collection: [],

    setDate: function() {
      var date = new Date();
      $('#order_date').text(date.toUTCString());
    },

    cacheTemplate: function() {
      var $temp = $('#inventory_item').remove();
      this.template = $temp.html();
    },

    nextId: function() {
      return String(currentId += 1);
    },

    bindEventHandlers: function() {
      this.bindAddNewItem();
      this.bindUpdateCollection();
      this.bindRemoveItem();
    },

    bindAddNewItem: function() {
      $('#add_item').on('click', function(e) {
        e.preventDefault();
        this.addItemToCollection();
        this.addItemToHtml();
      }.bind(this));
    },

    addItemToCollection: function() {
      this.collection.push({
        id: this.nextId(),
        name: '',
        stockNumber: '',
        quantity: '1',
      });
    },

    addItemToHtml: function() {
      var templateWithId = this.template.replace(/ID/g, currentId);
      $('#inventory').append(templateWithId);
    },

    bindUpdateCollection: function() {
      $('#inventory').on('blur', ':input', function(e) {
        this.updateCollectionItem(e);
      }.bind(this));
    },

    updateCollectionItem: function(e) {
      var itemId = this.findId(e);
      var elementName = $(e.target).attr('name').split('_')[1];
      var collectionItem = this.collection.find(function(item) {
        return item.id === itemId;
      });

      if (elementName === 'name') {
        collectionItem.name = $(e.target).val();
      } else if (elementName === 'stock') {
        collectionItem.stockNumber = $(e.target).val();
      } else if (elementName === 'quantity') {
        collectionItem.quantity = $(e.target).val();
      }
    },

    bindRemoveItem: function() {
      $('#inventory').on('click', 'a.delete', function(e) {
        e.preventDefault();
        var itemId = this.findId(e);

        this.removeItemFromHtml(e);
        this.removeItemFromCollection(itemId);
      }.bind(this));
    },

    removeItemFromHtml: function(e) {
      $(e.target).closest('tr').remove();
    },

    removeItemFromCollection: function(itemId) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== itemId;
      });
    },

    findId: function(e) {
      return $(e.target).closest('tr').find('input[type=hidden]').val();
    },

    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEventHandlers();
    }
  };
})();

$(inventory.init.bind(inventory));
