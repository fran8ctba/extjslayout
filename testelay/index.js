Ext.require(['*']);

Ext.onReady(function () {

    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));



    plNorth = new Ext.Panel({
        region: 'north',
        height: 100,
        minHeight: 60,
        html: 'north'
    });

    plCenter = new Ext.Panel({
        region: 'center',
        html: 'center center',
        minHeight: 80,
        items: [cw = Ext.create('Ext.Window', {
            xtype: 'window',
            closable: false,
            minimizable: true,
            title: 'Constrained Window',
            height: 200,
            width: 400,
            constrain: true,
            html: 'I am in a Container',
            itemId: 'center-window',
            minimize: function () {
                this.floatParent.down('button#toggleCw').toggle();
            }
        })]
    });

    plSouth = new Ext.Panel({
        region: 'south',
        collapsible: true,
        split: true,
        preventHeader: true,
        height: 200,
        minHeight: 120,
        layout: {
            type: 'border',
            padding: 5
        },
        items: [{
            title: 'South Central',
            region: 'center',
            minWidth: 80,
            html: 'South Central'
        }, {
            title: 'South Western',
            region: 'west',                      
            collapsed: true,
            flex: 1,
            minWidth: 80,
            html: 'South Western',
            split: true,
            collapsible: true
        }]
    });





    Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items: [
            plCenter,
            plNorth,
            plSouth
        ]
    });

    // Ext.create('Ext.container.Container', {
    //     layout: {
    //         type: 'hbox'
    //     },
    //     renderTo: Ext.getBody(),
    //     border: 1,
    //     style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
    //     defaults: {
    //         // labelWidth: 80,
    //         // implicitly create Container by specifying xtype
    //         // xtype: 'datefield',
    //         flex: 1,
    //     },
    //     items: [{
    //        html:'oiiiiiiiiiiiiiii'
    //     },{
    //         layout: {
    //             type: 'border',
    //         },
    //         items: [
    //             plCenter,
    //             plNorth,
    //             plSouth
    //         ]
    //     }]
    // });


});
