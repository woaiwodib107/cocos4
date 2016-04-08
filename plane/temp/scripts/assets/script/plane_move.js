"use strict";
cc._RFpush(module, '3235fee71xBHYms6rUd1I8u', 'plane_move');
// script/plane_move.js

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
        jumpDuration: 0.5 },
    //飞机移动速度，越小越快

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
    },
    plane_move: function plane_move(x, y) {
        var h = cc.winSize.height / 2;
        var w = cc.winSize.width / 2;
        // console.log(x+" "+w);
        if (w - x < this.node.width / 2) x = w - this.node.width / 2; //让飞机始终在视野内
        if (w + x < this.node.width / 2) x = -w + this.node.width / 2;
        if (h - y < this.node.height / 2) y = h - this.node.width / 2;
        if (h + y < this.node.height / 2) y = -h + this.node.height / 2;
        var jumpUp = cc.moveTo(0.5, cc.p(x, y));
        this.node.runAction(jumpUp);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();