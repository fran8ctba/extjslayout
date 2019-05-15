Ext.Loader.setConfig({
  enabled: true
});

Ext.Loader.setPath('Ext.ux', '../../../ux');

delete Ext.tip.Tip.prototype.minWidth;

Ext.util.Format.decimalSeparator = ',';
Ext.util.Format.thousandSeparator = '.';

Ext.MessageBox.buttonText = {
    ok : "OK",
    cancel : "Cancelar",
    yes : "Sim",
    no : "Não"
};

Ext.ux.comboBoxRenderer = function(combo) {
  return function(value, metadata, record) {
    //var idx = combo.store.findExact(combo.valueField, value);
    var rec = combo.store.findRecord(combo.valueField, value, 0, false, true, true);
    return (rec == null ? '' : rec.get(combo.displayField));
  };
}

/**
 * Custom implementation of {@link Ext.menu.Menu} that has preconfigured items for entering numeric
 * range comparison values: less-than, greater-than, and equal-to. This is used internally
 * by {@link Ext.ux.grid.filter.NumericFilter} to create its menu.
 */
Ext.define('Ext.ux.grid.menu.RangeMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} fieldCls
     * The Class to use to construct each field item within this menu
     * Defaults to:<pre>
     * fieldCls : Ext.form.field.Number
     * </pre>
     */
    fieldCls : 'Ext.form.field.Number',

    /**
     * @cfg {Object} fieldCfg
     * The default configuration options for any field item unless superseded
     * by the <code>{@link #fields}</code> configuration.
     * Defaults to:<pre>
     * fieldCfg : {}
     * </pre>
     * Example usage:
     * <pre><code>
fieldCfg : {
    width: 150,
},
     * </code></pre>
     */

    /**
     * @cfg {Object} fields
     * The field items may be configured individually
     * Defaults to <tt>undefined</tt>.
     * Example usage:
     * <pre><code>
fields : {
    gt: { // override fieldCfg options
        width: 200,
        fieldCls: Ext.ux.form.CustomNumberField // to override default {@link #fieldCls}
    }
},
     * </code></pre>
     */

    /**
     * @cfg {Object} itemIconCls
     * The itemIconCls to be applied to each comparator field item.
     * Defaults to:<pre>
itemIconCls : {
    gt : 'ux-rangemenu-gt',
    lt : 'ux-rangemenu-lt',
    eq : 'ux-rangemenu-eq'
}
     * </pre>
     */
    itemIconCls : {
        gt : 'ux-rangemenu-gt',
        lt : 'ux-rangemenu-lt',
        eq : 'ux-rangemenu-eq'
    },

    /**
     * @cfg {Object} fieldLabels
     * Accessible label text for each comparator field item. Can be overridden by localization
     * files. Defaults to:<pre>
fieldLabels : {
     gt: 'Greater Than',
     lt: 'Less Than',
     eq: 'Equal To'
}</pre>
     */
    fieldLabels: {
        gt: 'Greater Than',
        lt: 'Less Than',
        eq: 'Equal To',
        nil: 'Empty',
        filled: 'Filled'
    },

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     * Defaults to:<pre>
menuItemCfgs : {
    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125
}
     * </pre>
     */
    menuItemCfgs : {
        emptyText: 'Enter Number...',
        selectOnFocus: false,
        width: 155
    },

    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu.  Items are added to the menu
     * according to their position within this array. Defaults to:<pre>
     * menuItems : ['lt','gt','-','eq']
     * </pre>
     */
    menuItems : ['lt', 'gt', '-', 'eq'],
    
    
    /**
     * @cfg {Boolean} useNilFilled
     * Create nill and filled menu
     * Defaults to false.
     */
    
    useNilFilled: false,
    
    /**
     * @cfg {String} nilText
     * Create nill and filled menu
     * Defaults to Empty.
     */
    
    nilText: 'Empty',
    
    /**
     * @cfg {String} filledText
     * Create nill and filled menu
     * Defaults to Filled.
     */
    
    filledText: 'Filled',
    

    plain: true,
    
    constructor : function (config) {
        var me = this,
            fields, fieldCfg, i, len, item, cfg, Cls;

        me.callParent(arguments);

        fields = me.fields = me.fields || {};
        fieldCfg = me.fieldCfg = me.fieldCfg || {};
        
        me.addEvents(
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
      
        me.updateTask = Ext.create('Ext.util.DelayedTask', me.fireUpdate, me);
    
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                // defaults
                cfg = {
                    itemId: 'range-' + item,
                    enableKeyEvents: true,
                    hideEmptyLabel: false,
                    labelCls: 'ux-rangemenu-icon ' + me.itemIconCls[item],
                    labelSeparator: '',
                    labelWidth: 29,
                    listeners: {
                        scope: me,
                        change: me.onInputChange,
                        keyup: me.onInputKeyUp,
                        el: {
                            click: this.stopFn
                        }
                    },
                    activate: Ext.emptyFn,
                    deactivate: Ext.emptyFn
                };
                Ext.apply(
                    cfg,
                    // custom configs
                    Ext.applyIf(fields[item] || {}, fieldCfg[item]),
                    // configurable defaults
                    me.menuItemCfgs
                );
                Cls = cfg.fieldCls || me.fieldCls;
                item = fields[item] = Ext.create(Cls, cfg);
            }
            me.add(item);
        }
        if(me.useNilFilled){
            me.add('-');
            
            cfg = Ext.create('Ext.menu.CheckItem', {
                text: me.nilText,
                itemId: 'range-nil',
                group: null,
                hideOnClick: false,
                value: 'nil'
            });
            cfg.on('checkchange', me.onInputChange, me);
            item = fields['nil'] = cfg;
            me.add(item);
            cfg = Ext.create('Ext.menu.CheckItem', {
                text: me.filledText,
                itemId: 'range-filled',
                group: null,
                hideOnClick: false,
                value: 'filled'
            });
            cfg.on('checkchange', me.onInputChange, me);
            item = fields['filled'] = cfg;
            me.add(item);
        }
    },
    
    stopFn: function(e) {
        e.stopPropagation();
    },

    /**
     * @private
     * called by this.updateTask
     */
    fireUpdate : function () {
        this.fireEvent('update', this);
    },
    
    /**
     * Get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var result = {},
            fields = this.fields, 
            key, field;
            
        for (key in fields) {
            if(key != 'nil' && key != 'filled'){
                if (fields.hasOwnProperty(key)) {
                    field = fields[key];
                    if (field.isValid() && field.getValue() !== null) {
                        result[key] = field.getValue();
                    }
                }
            }else{
                if(this.useNilFilled){
                    var nil = fields.nil,
                    filled = fields.filled;
                    
                    if(nil.checked){
                        result['nil'] = 'nil';
                    }
                    if(filled.checked){
                        result['filled'] = 'filled';
                    }
                }
            }
        }
        return result;
    },
  
    /**
     * Set the value of this menu and fires the 'update' event.
     * @param {Object} data The data to assign to this menu
     */	
    setValue : function (data) {
        var me = this,
            fields = me.fields,
            key,
            field;

        for (key in fields) {
            if (fields.hasOwnProperty(key)) {
                // Prevent field's change event from tiggering a Store filter. The final upate event will do that
                field =fields[key];
                field.suspendEvents();
                field.setValue(key in data ? data[key] : '');
                field.resumeEvents();
            }
        }

        // Trigger the filering of the Store
        me.fireEvent('update', me);
    },

    /**  
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp: function(field, e) {
        if (e.getKey() === e.RETURN && field.isValid()) {
            e.stopEvent();
            this.hide();
        }
    },

    /**
     * @private
     * Handler method called when the user changes the value of one of the input
     * items in this menu.
     */
    onInputChange: function(field) {
        var me = this,
            fields = me.fields,
            eq = fields.eq,
            gt = fields.gt,
            lt = fields.lt,
            nil = fields.nil,
            filled = fields.filled;
        if(field.itemId != 'range-nil' && field.itemId != 'range-filled'){
            if (field == eq) {
                if (gt) {
                    gt.setValue(null);
                }
                if (lt) {
                    lt.setValue(null);
                }
            }
            else {
                eq.setValue(null);
            }
        }else{
            if(field.checked){
                gt.setValue(null);
                lt.setValue(null);
                eq.setValue(null);
                eq.setDisabled(true);
                lt.setDisabled(true);
                gt.setDisabled(true);
                if(field.value == 'nil'){
                    filled.setChecked(false, true);
                }else{
                    nil.setChecked(false, true);
                }
            }else{
                eq.setDisabled(false);
                lt.setDisabled(false);
                gt.setDisabled(false);
            }
            
        }

        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
});



Ext.define('Ext.ux.grid.filter.NumericFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.numeric',
    uses: ['Ext.form.field.Number'],

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var me = this,
            menu;
        menu = Ext.create('Ext.ux.grid.menu.RangeMenu', config);
        menu.on('update', me.fireUpdate, me);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setValue(value);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var values = this.getValue(),
            key;
        for (key in values) {
            if(key != 'nil' && key != 'filled'){
                if (values[key] !== undefined) {
                    return true;
                }
            }else{
                if(values[key] == key)
                    return true;
            }
            
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var key,
            args = [],
            values = this.menu.getValue();
        for (key in values) {
            args.push({
                type: 'numeric',
                comparison: key,
                value: values[key]
            });
        }
        return args;
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex),
            values = this.getValue(),
            isNumber = Ext.isNumber;
        if (isNumber(values.eq) && val != values.eq) {
            return false;
        }
        if (isNumber(values.lt) && val >= values.lt) {
            return false;
        }
        if (isNumber(values.gt) && val <= values.gt) {
            return false;
        }
        return true;
    }
});



Ext.define('Ext.ux.grid.menu.ListMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} labelField
     * Defaults to 'text'.
     */
    labelField :  'text',
    /**
     * @cfg {String} paramPrefix
     * Defaults to 'Loading...'.
     */
    loadingText : 'Loading...',
    /**
     * @cfg {Boolean} loadOnShow
     * Defaults to true.
     */
    loadOnShow : true,
    /**
     * @cfg {Boolean} single
     * Specify true to group all items in this list into a single-select
     * radio button group. Defaults to false.
     */
    single : false,
    
    /**
     * @cfg {Boolean} useNilFilled
     * Create nill and filled menu
     * Defaults to false.
     */
    
    useNilFilled: false,
    
    /**
     * @cfg {String} nilText
     * Create nill and filled menu
     * Defaults to Empty.
     */
    
    nilText: 'Empty',
    
    /**
     * @cfg {String} filledText
     * Create nill and filled menu
     * Defaults to Filled.
     */
    
    filledText: 'Filled',

    constructor : function (cfg) {
        this.selected = [];
        this.addEvents(
            /**
             * @event checkchange
             * Fires when there is a change in checked items from this list
             * @param {Object} item Ext.menu.CheckItem
             * @param {Object} checked The checked value that was set
             */
            'checkchange'
        );

        this.callParent([cfg = cfg || {}]);

        if(!cfg.store && cfg.options){
            var options = [];
            for(var i=0, len=cfg.options.length; i<len; i++){
                var value = cfg.options[i];
                switch(Ext.type(value)){
                    case 'array':  options.push(value); break;
                    case 'object': options.push([value.id, value[this.labelField]]); break;
                    case 'string': options.push([value, value]); break;
                }
            }

            this.store = Ext.create('Ext.data.ArrayStore', {
                fields: ['id', this.labelField],
                data:   options,
                listeners: {
                    'load': this.onLoad,
                    scope:  this
                }
            });
            this.loaded = true;
        } else {
            this.add({text: this.loadingText, iconCls: 'loading-indicator'});
            this.store.on('load', this.onLoad, this);
        }
        
        this.autoScroll = true;
    },

    destroy : function () {
        if (this.store) {
            this.store.destroyStore();
        }
        this.callParent();
    },

    /**
     * Lists will initially show a 'loading' item while the data is retrieved from the store.
     * In some cases the loaded data will result in a list that goes off the screen to the
     * right (as placement calculations were done with the loading item). This adapter will
     * allow show to be called with no arguments to show with the previous arguments and
     * thus recalculate the width and potentially hang the menu from the left.
     */
    show : function () {
          var lastArgs = null;
          return function(){
              if(!arguments){
                  this.callParent(lastArgs);
              } else {
                  lastArgs = arguments;
                  if (this.loadOnShow && !this.loaded) {
                      this.store.load();
                  }
                  this.callParent(arguments);
              }
          };
      }(),

    /** @private */
    onLoad : function (store, records) {
        var me = this,
            visible = me.isVisible(),
            gid, item, itemValue, i, len;

        me.hide(false);

        me.removeAll(true);

        gid = me.single ? Ext.id() : null;
        for (i = 0, len = records.length; i < len; i++) {
            itemValue = records[i].get('id');
            item = Ext.create('Ext.menu.CheckItem', {
                text: records[i].get(me.labelField),
                group: gid,
                checked: Ext.Array.contains(me.selected, itemValue),
                hideOnClick: false,
                value: itemValue
            });

            item.on('checkchange', me.checkChange, me);

            me.add(item);
        }
        
        if(me.useNilFilled){
            me.add('-');
            item = Ext.create('Ext.menu.CheckItem', {
                text: me.nilText,
                group: gid,
                hideOnClick: false,
                value: 'nil'
            });
            item.on('checkchange', me.checkChange, me);
            me.add(item);
            item = Ext.create('Ext.menu.CheckItem', {
                text: me.filledText,
                group: gid,
                hideOnClick: false,
                value: 'filled'
            });
            item.on('checkchange', me.checkChange, me);
            me.add(item);
        }

        me.loaded = true;

        if (visible) {
            me.show();
        }
        me.fireEvent('load', me, records);
    },

    /**
     * Get the selected items.
     * @return {Array} selected
     */
    getSelected : function () {
        return this.selected;
    },

    /** @private */
    setSelected : function (value) {
        value = this.selected = [].concat(value);

        if (this.loaded) {
            this.items.each(function(item){
                item.setChecked(false, true);
                for (var i = 0, len = value.length; i < len; i++) {
                    if (item.value == value[i]) {
                        item.setChecked(true, true);
                    }
                }
            }, this);
        }
    },

    /**
     * Handler for the 'checkchange' event from an check item in this menu
     * @param {Object} item Ext.menu.CheckItem
     * @param {Object} checked The checked value that was set
     */
    checkChange : function (item, checked) {
        var value = [];
        
        
        if((item.value == 'nil' || item.value == 'filled') && !this.single){
            if(checked){
//                value.push(item.value)
                this.items.each(function(item2){
                    if(item2.value != undefined){
                        if(item.value != item2.value){
//                            if(item2.value != 'nil' && item2.value != 'filled')
//                                item2.disableCheckChange();
//                            if (item2.checked)
//                                item2.setChecked(false, true);
                            if(item.value == 'nil' && item2.value == 'filled'){
                                if (item2.checked)
                                    item2.setChecked(false, true);
                            }
                            if(item.value == 'filled' && item2.value == 'nil'){
                                if (item2.checked)
                                    item2.setChecked(false, true);
                            }
                        }
                    }
                },this);
            }else{
//                this.items.each(function(item2){
//                    if(item2.value != undefined){
//                        if(item2.value != 'nil' && item2.value != 'filled')
//                            item2.enableCheckChange();
//                    }
//                },this);
            }
            this.items.each(function(item){
                if (item.checked) {
                    value.push(item.value);
                }
            },this);
        }else{
            this.items.each(function(item){
                if (item.checked) {
                    value.push(item.value);
                }
            },this);
        }
        this.selected = value;

        this.fireEvent('checkchange', item, checked);
    }
});


Ext.define('Ext.ux.grid.filter.DateFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.date',
    uses: ['Ext.picker.Date', 'Ext.menu.Menu'],

    /**
     * @cfg {String} afterText
     * Defaults to 'After'.
     */
    afterText : 'After',
    /**
     * @cfg {String} beforeText
     * Defaults to 'Before'.
     */
    beforeText : 'Before',
    /**
     * @cfg {Object} compareMap
     * Map for assigning the comparison values used in serialization.
     */
    compareMap : {
        before: 'lt',
        after:  'gt',
        on:     'eq', 
        nil:    'nil',
        filled: 'filled'
    },
    /**
     * @cfg {String} dateFormat
     * The date format to return when using getValue.
     * Defaults to 'm/d/Y'.
     */
    dateFormat : 'm/d/Y',

    /**
     * @cfg {Date} maxDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Date} minDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu
     * Defaults to:<pre>
     * menuItems : ['before', 'after', '-', 'on'],
     * </pre>
     */
    menuItems : ['before', 'after', '-', 'on', '-', 'nil', 'filled'],

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     */
    menuItemCfgs : {
        selectOnFocus: true,
        width: 125
    },

    /**
     * @cfg {String} onText
     * Defaults to 'On'.
     */
    onText : 'On',
    
    /**
     * @cfg {String} nilText
     * Defaults to 'Nil'.
     */
    nilText : 'Vazio',
    
    /**
     * @cfg {String} filledText
     * Defaults to 'Filled'.
     */
    filledText : 'Preenchido',
    
    /**
     * @cfg {Object} pickerOpts
     * Configuration options for the date picker associated with each field.
     */
    pickerOpts : {},

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var me = this,
            pickerCfg, i, len, item, cfg;

        pickerCfg = Ext.apply(me.pickerOpts, {
            xtype: 'datepicker',
            minDate: me.minDate,
            maxDate: me.maxDate,
            format:  me.dateFormat,
            listeners: {
                scope: me,
                select: me.onMenuSelect
            }
        });

        me.fields = {};
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                if(item == 'nil' || item == 'filled'){
                    cfg = {
                        itemId: 'range-' + item,
                        text: me[item + 'Text'],
                        listeners: {
                            scope: me,
                            checkchange: me.onCheckChange
                        }
                    };
                }else{
                    cfg = {
                        itemId: 'range-' + item,
                        text: me[item + 'Text'],
                        menu: Ext.create('Ext.menu.Menu', {
                            items: [
                                Ext.apply(pickerCfg, {
                                    itemId: item
                                })
                            ]
                        }),
                        listeners: {
                            scope: me,
                            checkchange: me.onCheckChange
                        }
                    };
                }
                
                item = me.fields[item] = Ext.create('Ext.menu.CheckItem', cfg);
            }
            //me.add(item);
            me.menu.add(item);
        }
    },

    onCheckChange : function (item) {
        if(item.itemId == 'range-nil'){
            this.fields.before.setChecked(false, true);
            this.fields.after.setChecked(false, true);
            this.fields.on.setChecked(false, true);
            this.fields.filled.setChecked(false, true);
        }
        if(item.itemId == 'range-filled'){
            this.fields.before.setChecked(false, true);
            this.fields.after.setChecked(false, true);
            this.fields.on.setChecked(false, true);
            this.fields.nil.setChecked(false, true);
        }
        this.setActive(this.isActivatable());
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
        }
    },

    /**
     * Handler for when the DatePicker for a field fires the 'select' event
     * @param {Ext.picker.Date} picker
     * @param {Object} picker
     * @param {Object} date
     */
    onMenuSelect : function (picker, date) {
        var fields = this.fields,
            field = this.fields[picker.itemId];

        field.setChecked(true);
        this.fields.nil.setChecked(false, true);
        this.fields.filled.setChecked(false, true);
        if (field == fields.on) {
            fields.before.setChecked(false, true);
            fields.after.setChecked(false, true);
        } else {
            fields.on.setChecked(false, true);
            if (field == fields.after && this.getFieldValue('before') < date) {
                fields.before.setChecked(false, true);
            } else if (field == fields.before && this.getFieldValue('after') > date) {
                fields.after.setChecked(false, true);
            }
        }
        this.fireEvent('update', this);

        picker.up('menu').hide();
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var key, result = {};
        for (key in this.fields) {
            if (this.fields[key].checked) {
                result[key] = this.getFieldValue(key);
            }
        }
        return result;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     * @param {Boolean} preserve true to preserve the checked status
     * of the other fields.  Defaults to false, unchecking the
     * other fields
     */
    setValue : function (value, preserve) {
        var key;
        for (key in this.fields) {
            if(value[key]){
                this.getPicker(key).setValue(value[key]);
                this.fields[key].setChecked(true);
            } else if (!preserve) {
                this.fields[key].setChecked(false);
            }
        }
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var key;
        for (key in this.fields) {
            if (this.fields[key].checked) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var args = [];
        for (var key in this.fields) {
            if(this.fields[key].checked){
                if(key == 'nil' || key == 'filled'){
                    args.push({
                        type: 'date_filter',
                        comparison: this.compareMap[key],
                        value: true
                    });
                }else{
                    args.push({
                        type: 'date',
                        comparison: this.compareMap[key],
                        value: Ext.Date.format(this.getFieldValue(key), this.dateFormat)
                    });
                }
            }
        }
        return args;
    },

    /**
     * Get and return the date menu picker value
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Date} Gets the current selected value of the date field
     */
    getFieldValue : function(item){
        return this.getPicker(item).getValue();
    },

    /**
     * Gets the menu picker associated with the passed field
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Object} The menu picker
     */
    getPicker : function(item){
        return this.fields[item].menu.items.first();
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var key,
            pickerValue,
            val = record.get(this.dataIndex),
            clearTime = Ext.Date.clearTime;

        if(!Ext.isDate(val)){
            return false;
        }
        val = clearTime(val, true).getTime();

        for (key in this.fields) {
            if (this.fields[key].checked) {
                pickerValue = clearTime(this.getFieldValue(key), true).getTime();
                if (key == 'before' && pickerValue <= val) {
                    return false;
                }
                if (key == 'after' && pickerValue >= val) {
                    return false;
                }
                if (key == 'on' && pickerValue != val) {
                    return false;
                }
            }
        }
        return true;
    }
});


Ext.define('Ext.ux.grid.filter.StringFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.string',

    /**
     * @cfg {String} iconCls
     * The iconCls to be applied to the menu item.
     * Defaults to <tt>'ux-gridfilter-text-icon'</tt>.
     */
    iconCls : 'ux-gridfilter-text-icon',

    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125,

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
      Ext.applyIf(config, {
          enableKeyEvents: true,
          iconCls: this.iconCls,
          hideLabel: true,
          width: this.width,
          listeners: {
              scope: this,
              keyup: this.onInputKeyUp,
              el: {
                  click: function(e) {
                      e.stopPropagation();
                  }
              }
          }
      });	

      this.inputItem = Ext.create('Ext.form.field.Text', config);

      this.menu.add(this.inputItem);


      this.checkboxItemVazio = Ext.create('Ext.menu.CheckItem', {
          text: 'Vazio',
          hideOnClick: false,
          value: 'empty',
          scope:this
      })

      this.checkboxItemPreenchido = Ext.create('Ext.menu.CheckItem', {
          text: 'Preenchido',
          hideOnClick: false,
          value: 'full',
          scope:this
      })

      this.menu.add(this.checkboxItemVazio);
      this.menu.add(this.checkboxItemPreenchido);

      this.checkboxItemVazio.addEvents('checkchange');

      this.checkboxItemVazio.on('checkchange', this.onCheckChange, this);	

      this.checkboxItemPreenchido.addEvents('checkchange');

      this.checkboxItemPreenchido.on('checkchange', this.onCheckChange, this);	

      this.updateTask = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },
    checkChange:function (item, checked){
      if (item.checked) {
          this.fireEvent('checkchange', item, checked);
      }else{
        this.fireEvent('checkchange', item, checked);
      }
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        if(this.checkboxItemVazio.checked)
            return this.checkboxItemVazio.value;
        if(this.checkboxItemPreenchido.checked)
            return this.checkboxItemPreenchido.value;
        return this.inputItem.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.value.setValue(value);
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
      if(this.checkboxItemVazio.checked || this.checkboxItemPreenchido.checked) {
              return true;
      }
      else return this.inputItem.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        if(this.checkboxItemVazio.checked || this.checkboxItemPreenchido.checked) {
            return {type: 'string_filter', value: this.getValue()};
        }else{
            return {type: 'string', value: this.getValue()};
        }
    },


    onCheckChange:function (){
        if(this.checkboxItemVazio.checked){
            this.checkboxItemPreenchido.setDisabled(true);
            this.inputItem.setValue('');
            this.inputItem.setDisabled(true);
        }
        if(this.checkboxItemPreenchido.checked){
            this.checkboxItemVazio.setDisabled(true);
            this.inputItem.setValue('');
            this.inputItem.setDisabled(true);
        }
        if(!this.checkboxItemPreenchido.checked && !this.checkboxItemVazio.checked){
            this.checkboxItemVazio.setDisabled(false);
            this.checkboxItemPreenchido.setDisabled(false);
            this.inputItem.setDisabled(false);
        }
        this.updateTask.delay(this.updateBuffer);
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex);
        if(typeof val != 'string') {
            return (this.getValue().length === 0);
        }

        if(this.checkboxItemVazio.checked || this.checkboxItemPreenchido.checked) {
          return true;
        }
        else {
          return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
        }
    },

    /**
     * @private
     * Handler method called when there is a keyup event on this.inputItem
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
            return;
        }
        this.updateTask.delay(this.updateBuffer);
    }
});

Ext.override(Ext.data.writer.Writer, {    
    /**
     * @cfg {Array of string} alwaysSendFields
     * Array list of fields that always will send to server when writeAllFields are false.
     * Note that any fields that have {@link Ext.data.Field#persist} set to false will still be ignored.
     */
    
    alwaysSendFields: [],


    /**
     * Formats the data for each record before sending it to the server. This
     * method should be overridden to format the data in a way that differs from the default.
     * @param {Ext.data.Model} record The record that we are writing to the server.
     * @param {Ext.data.Operation} [operation] An operation object.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function(record, operation) {
        var isPhantom = record.phantom === true,
            writeAll = this.writeAllFields || isPhantom,
            fields = record.fields,
            fieldItems = fields.items,
            data = {},
            clientIdProperty = record.clientIdProperty,
            changes,
            field,
            key,
            mappedIdProperty,
            f, fLen;

        if (writeAll) {
            fLen = fieldItems.length;

            for (f = 0; f < fLen; f++) {
                field = fieldItems[f];
                if (field.persist) {
                    this.writeValue(data, field, record);
                }
            }
        } else {
            // Only write the changes
            changes = record.getChanges();
            for (key in changes) {
                if (changes.hasOwnProperty(key)) {
                    field = fields.get(key);
                    if (field.persist) {
                        this.writeValue(data, field, record);
                    }
                }
            }
            
            var sendFields = this.alwaysSendFields;
            fLen = sendFields.length;
            for(f = 0; f < fLen; f++){
                key = sendFields[f];
                field = fields.get(key);
                if (field.persist) {
                    this.writeValue(data, field, record);
                }
            }
        }
        if (isPhantom) {
            if (clientIdProperty && operation && operation.records.length > 1) {
                // include clientId for phantom records, if multiple records are being written to the server in one operation.
                // The server can then return the clientId with each record so the operation can match the server records with the client records
                data[clientIdProperty] = record.internalId;
            }
        } else if (this.writeRecordId) {
            // Make sure that if a mapping is in place the mapped id name is used instead of the default field name. 
            mappedIdProperty = fields.get(record.idProperty)[this.nameProperty] || record.idProperty;
            data[mappedIdProperty] = record.getId();
        }

        return data;
    }
});
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


