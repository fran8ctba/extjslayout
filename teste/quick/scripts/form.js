Ext.onReady(function () {
  Ext.QuickTips.init();
  var qTip = "<p style='color:blue;font-weight:bold;'>Follow the below instruction to enter valid username</p><dl><dt><b style='color:red;'>Lenght:</b></dt><dd>- Minimum: 4 char</dd><dd>- Maximun: 12 char</dd><dt><b style='color:red;'>Character:</b></dt><dd>- Atleast one numeric char</dd><dd>- Special char not allowed</dd>";
  Ext.create('Ext.form.Panel', {
    width: 400,
    frame: true,
    title: 'Login Form - TechZoo',
    padding: 10,
    fieldDefaults: {
      msgTarget: 'side',
      labelWidth: 75
    },
    defaultType: 'textfield',
    defaults: {
      anchor: '98%'
    },
    items: [{
      xtype: 'displayfield',
      value: '<p>Please make sure you follows all the form validation instruction to successfully submit the form.<img id= "questionQTip" src="images/question_white.png" /></p>',
      afterRender: function() {
        var me = this;
        me.mon(Ext.get('questionQTip'),
          'click',
          function(e,t) {e.stopEvent();},
          me
        );
      },
      listeners: {
        afterrender: function(me, e){
          Ext.QuickTips.register({
            dismissDelay: 5000,
            target: 'questionQTip',
            text  : qTip,
            cls   : 'qBodyStyle',
            width : 100
          });
          Ext.get('questionQTip').dom.style.cursor = 'help';
        }
      }
    },{
      fieldLabel: 'First Name',
      name: 'first',
      allowBlank: false
    },{
      fieldLabel: 'Last Name',
      name: 'last',
      allowBlank: false
    }],
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'bottom',
      ui: 'footer',
      items: [{
        xtype: 'tbfill'
      },{
        text: 'Cancel'
      },{
        text: 'Submit Form'
      }]
    }],
    renderTo: 'output'
  });
});
