"use strict";
cc._RFpush(module, 'ebdb4glue5Ek57K70QWBGst', 'ballscript');
// script/ballscript.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        //var x=this.node.parent.parent.getChildren('enemy_sence')[0].getPosition();
        //    console.log(x);
    }
});

cc._RFpop();