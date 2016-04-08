"use strict";
cc._RFpush(module, '638470SlRpFZIsB3JFC+xnw', 'mouse');
// script/mouse.js

cc.Class({
    'extends': cc.Component,

    properties: {
        plane: {
            'default': null,
            type: cc.Node
        },
        ball_sence: {
            'default': null,
            type: cc.Node
        },
        enemy_sence: {
            'default': null,
            type: cc.Node
        },
        timeb: 0, //运来判断子弹的时间
        timee: 0, //用来判断敌机的时间
        ball_disappear: 3, //子弹消失时间
        enemy_disappear: 5, //敌机消失时间
        balltime: 0.3, //子弹出现间隔
        enemytime: 3, //敌机出现的间隔
        enemy_num: 5 },
    //敌机数量
    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        // self.enemy_sence.getComponent('enemy').getnewenemy(self.enemy_num);
        self.plane.getComponent('plane_move').plane_move(0, -cc.winSize.height / 2); //初始化飞机位置
        self.node.on('touchstart', function (event) {
            //  self.ball_sence.getComponent('ball').getnewball(self.plane.getPositionX(),self.plane.getPositionY(),self.ball_disappear);

            var x = event.getLocationX() - cc.winSize.width / 2; //调整坐标
            var y = event.getLocationY() - cc.winSize.height / 2;
            self.plane.getComponent('plane_move').plane_move(x, y);
        });
    },
    update: function update(dt) {
        var i, time;
        if (this.timeb > this.balltime) //发射子弹
            {
                this.ball_sence.getComponent('ball').getnewball(this.plane.getPositionX(), this.plane.getPositionY(), this.ball_disappear);
                this.timeb -= this.balltime;
            }
        if (this.timee > this.enemytime) //出现敌机
            {
                this.enemy_sence.getComponent('enemy').getnewenemy(this.enemy_num);
                this.timee -= this.enemytime;
            }
        for (i = 0; i < this.ball_sence.children.length; i++) //销毁子弹
        {
            this.ball_sence.children[i].timer += dt;
            time = this.ball_sence.children[i].timer;
            if (time > this.ball_disappear) this.ball_sence.children[i].destroy();
        }
        for (i = 0; i < this.enemy_sence.children.length; i++) //销毁敌机
        {
            this.enemy_sence.children[i].timer += dt;
            time = this.enemy_sence.children[i].timer;
            if (time > this.enemy_disappear) this.enemy_sence.children[i].destroy();
        }
        //  for(var i=1;i<this.node.children.length;i++)//销毁子弹 敌机
        // {
        //     this.node.children[i].timer+=dt;
        //     var name=this.node.children[i].name;
        //     var time=this.node.children[i].timer;
        //     if(name.indexOf("ball")!=-1 && time>this.ball_disappear)
        //         this.node.children[i].destroy();
        //     if(name.indexOf("enemy")!=-1 && time>this.enemy_disappear)
        //         this.node.children[i].destroy();
        // }
        this.timeb += dt;
        this.timee += dt;
    }
});

cc._RFpop();