"use strict";
cc._RFpush(module, 'be5a6OQOT1DuazVNlDhFhyA', 'enemy');
// script/enemy.js

cc.Class({
    "extends": cc.Component,

    properties: {
        enemy: {
            "default": null,
            type: cc.Prefab
        },
        direction: 3, //飞机速度 越小越快
        interval: 0.5 },
    //间隔时间
    onLoad: function onLoad() {},
    getnewenemy: function getnewenemy(num) {
        // 使用给定的模板在场景中生成一个新节点
        this.schedule(function () {
            var enemy = cc.instantiate(this.enemy);
            this.node.addChild(enemy);
            enemy.setPosition(0, enemy.height + cc.winSize.height / 2);
            enemy.timer = 0;
            var anima = cc.moveTo(this.direction, cc.p(cc.winSize.width / 2 + enemy.width, -cc.winSize.height + enemy.height));
            enemy.runAction(anima);
        }, this.interval, num - 1);
        //        }, interval, repeat, delay);间隔时间，重复次数，开始延时
    }

});
// called every frame, uncomment this function to activate update callback

cc._RFpop();