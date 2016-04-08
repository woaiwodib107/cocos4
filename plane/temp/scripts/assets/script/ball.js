"use strict";
cc._RFpush(module, '4b240mei0tMup2Q5Qvko1fS', 'ball');
// script/ball.js

cc.Class({
    "extends": cc.Component,

    properties: {
        ball1x: -53, //左中右三个子弹的初始位置
        ball1y: 49,
        ball2x: 53,
        ball2y: 49,
        ball3x: 0,
        ball3y: 125,
        direction: 2.5, // 子弹速度 越小越快
        ball: {
            "default": null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},
    getnewball: function getnewball(x, y, t) {
        // 使用给定的模板在场景中生成一个新节点
        var ball1 = cc.instantiate(this.ball);
        var ball2 = cc.instantiate(this.ball);
        var ball3 = cc.instantiate(this.ball);
        this.node.addChild(ball1);
        this.node.addChild(ball2);
        this.node.addChild(ball3);
        // 将新增的节点添加到space节点下面
        // 设置ball位置
        ball1.setPosition(x + this.ball1x, y + this.ball1y);
        ball2.setPosition(x + this.ball2x, y + this.ball2y);
        ball3.setPosition(x + this.ball3x, y + this.ball3y);
        ball1.rotation = -45; //左右子弹旋转
        ball2.rotation = 45;
        ball1.timer = 0; //子弹已出现时间
        ball2.timer = 0;
        ball3.timer = 0;
        // ball1.disappear=t;
        // ball2.disappear=t;
        // ball3.disappear=t;
        var anima1 = cc.moveBy(this.direction, cc.p(-1400, 1400)); //动画 让子弹消失在远方
        var anima2 = cc.moveBy(this.direction, cc.p(1400, 1400));
        var anima3 = cc.moveBy(this.direction, cc.p(0, 2000));
        ball1.runAction(anima1);
        ball2.runAction(anima2);
        ball3.runAction(anima3);
    }
});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {
//     if(this.time>this.disappeara)
//             this.node.destroy();
//     this.time+=dt;
// },

cc._RFpop();