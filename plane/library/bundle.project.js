require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ballscript":[function(require,module,exports){
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
},{}],"ball":[function(require,module,exports){
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
},{}],"enemy":[function(require,module,exports){
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
},{}],"mouse":[function(require,module,exports){
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
},{}],"plane_move":[function(require,module,exports){
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
},{}]},{},["plane_move","ball","mouse","enemy","ballscript"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdC9iYWxsc2NyaXB0LmpzIiwiYXNzZXRzL3NjcmlwdC9iYWxsLmpzIiwiYXNzZXRzL3NjcmlwdC9lbmVteS5qcyIsImFzc2V0cy9zY3JpcHQvbW91c2UuanMiLCJhc3NldHMvc2NyaXB0L3BsYW5lX21vdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdlYmRiNGdsdWU1RWs1N0s3MFFXQkdzdCcsICdiYWxsc2NyaXB0Jyk7XG4vLyBzY3JpcHQvYmFsbHNjcmlwdC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIC8vdmFyIHg9dGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q2hpbGRyZW4oJ2VuZW15X3NlbmNlJylbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coeCk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0YjI0MG1laTB0TXVwMlE1UXZrbzFmUycsICdiYWxsJyk7XG4vLyBzY3JpcHQvYmFsbC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYmFsbDF4OiAtNTMsIC8v5bem5Lit5Y+z5LiJ5Liq5a2Q5by555qE5Yid5aeL5L2N572uXG4gICAgICAgIGJhbGwxeTogNDksXG4gICAgICAgIGJhbGwyeDogNTMsXG4gICAgICAgIGJhbGwyeTogNDksXG4gICAgICAgIGJhbGwzeDogMCxcbiAgICAgICAgYmFsbDN5OiAxMjUsXG4gICAgICAgIGRpcmVjdGlvbjogMi41LCAvLyDlrZDlvLnpgJ/luqYg6LaK5bCP6LaK5b+rXG4gICAgICAgIGJhbGw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcbiAgICBnZXRuZXdiYWxsOiBmdW5jdGlvbiBnZXRuZXdiYWxsKHgsIHksIHQpIHtcbiAgICAgICAgLy8g5L2/55So57uZ5a6a55qE5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5paw6IqC54K5XG4gICAgICAgIHZhciBiYWxsMSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmFsbCk7XG4gICAgICAgIHZhciBiYWxsMiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmFsbCk7XG4gICAgICAgIHZhciBiYWxsMyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmFsbCk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiYWxsMSk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiYWxsMik7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiYWxsMyk7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsHNwYWNl6IqC54K55LiL6Z2iXG4gICAgICAgIC8vIOiuvue9rmJhbGzkvY3nva5cbiAgICAgICAgYmFsbDEuc2V0UG9zaXRpb24oeCArIHRoaXMuYmFsbDF4LCB5ICsgdGhpcy5iYWxsMXkpO1xuICAgICAgICBiYWxsMi5zZXRQb3NpdGlvbih4ICsgdGhpcy5iYWxsMngsIHkgKyB0aGlzLmJhbGwyeSk7XG4gICAgICAgIGJhbGwzLnNldFBvc2l0aW9uKHggKyB0aGlzLmJhbGwzeCwgeSArIHRoaXMuYmFsbDN5KTtcbiAgICAgICAgYmFsbDEucm90YXRpb24gPSAtNDU7IC8v5bem5Y+z5a2Q5by55peL6L2sXG4gICAgICAgIGJhbGwyLnJvdGF0aW9uID0gNDU7XG4gICAgICAgIGJhbGwxLnRpbWVyID0gMDsgLy/lrZDlvLnlt7Llh7rnjrDml7bpl7RcbiAgICAgICAgYmFsbDIudGltZXIgPSAwO1xuICAgICAgICBiYWxsMy50aW1lciA9IDA7XG4gICAgICAgIC8vIGJhbGwxLmRpc2FwcGVhcj10O1xuICAgICAgICAvLyBiYWxsMi5kaXNhcHBlYXI9dDtcbiAgICAgICAgLy8gYmFsbDMuZGlzYXBwZWFyPXQ7XG4gICAgICAgIHZhciBhbmltYTEgPSBjYy5tb3ZlQnkodGhpcy5kaXJlY3Rpb24sIGNjLnAoLTE0MDAsIDE0MDApKTsgLy/liqjnlLsg6K6p5a2Q5by55raI5aSx5Zyo6L+c5pa5XG4gICAgICAgIHZhciBhbmltYTIgPSBjYy5tb3ZlQnkodGhpcy5kaXJlY3Rpb24sIGNjLnAoMTQwMCwgMTQwMCkpO1xuICAgICAgICB2YXIgYW5pbWEzID0gY2MubW92ZUJ5KHRoaXMuZGlyZWN0aW9uLCBjYy5wKDAsIDIwMDApKTtcbiAgICAgICAgYmFsbDEucnVuQWN0aW9uKGFuaW1hMSk7XG4gICAgICAgIGJhbGwyLnJ1bkFjdGlvbihhbmltYTIpO1xuICAgICAgICBiYWxsMy5ydW5BY3Rpb24oYW5pbWEzKTtcbiAgICB9XG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuLy8gICAgIGlmKHRoaXMudGltZT50aGlzLmRpc2FwcGVhcmEpXG4vLyAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuLy8gICAgIHRoaXMudGltZSs9ZHQ7XG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmU1YTZPUU9UMUR1YXpWTmxEaEZoeUEnLCAnZW5lbXknKTtcbi8vIHNjcmlwdC9lbmVteS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZW5lbXk6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIGRpcmVjdGlvbjogMywgLy/po57mnLrpgJ/luqYg6LaK5bCP6LaK5b+rXG4gICAgICAgIGludGVydmFsOiAwLjUgfSxcbiAgICAvL+mXtOmalOaXtumXtFxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG4gICAgZ2V0bmV3ZW5lbXk6IGZ1bmN0aW9uIGdldG5ld2VuZW15KG51bSkge1xuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15KTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChlbmVteSk7XG4gICAgICAgICAgICBlbmVteS5zZXRQb3NpdGlvbigwLCBlbmVteS5oZWlnaHQgKyBjYy53aW5TaXplLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgZW5lbXkudGltZXIgPSAwO1xuICAgICAgICAgICAgdmFyIGFuaW1hID0gY2MubW92ZVRvKHRoaXMuZGlyZWN0aW9uLCBjYy5wKGNjLndpblNpemUud2lkdGggLyAyICsgZW5lbXkud2lkdGgsIC1jYy53aW5TaXplLmhlaWdodCArIGVuZW15LmhlaWdodCkpO1xuICAgICAgICAgICAgZW5lbXkucnVuQWN0aW9uKGFuaW1hKTtcbiAgICAgICAgfSwgdGhpcy5pbnRlcnZhbCwgbnVtIC0gMSk7XG4gICAgICAgIC8vICAgICAgICB9LCBpbnRlcnZhbCwgcmVwZWF0LCBkZWxheSk76Ze06ZqU5pe26Ze077yM6YeN5aSN5qyh5pWw77yM5byA5aeL5bu25pe2XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2Mzg0NzBTbFJwRlpJc0IzSkZDK3hudycsICdtb3VzZScpO1xuLy8gc2NyaXB0L21vdXNlLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGxhbmU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYmFsbF9zZW5jZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBlbmVteV9zZW5jZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICB0aW1lYjogMCwgLy/ov5DmnaXliKTmlq3lrZDlvLnnmoTml7bpl7RcbiAgICAgICAgdGltZWU6IDAsIC8v55So5p2l5Yik5pat5pWM5py655qE5pe26Ze0XG4gICAgICAgIGJhbGxfZGlzYXBwZWFyOiAzLCAvL+WtkOW8uea2iOWkseaXtumXtFxuICAgICAgICBlbmVteV9kaXNhcHBlYXI6IDUsIC8v5pWM5py65raI5aSx5pe26Ze0XG4gICAgICAgIGJhbGx0aW1lOiAwLjMsIC8v5a2Q5by55Ye6546w6Ze06ZqUXG4gICAgICAgIGVuZW15dGltZTogMywgLy/mlYzmnLrlh7rnjrDnmoTpl7TpmpRcbiAgICAgICAgZW5lbXlfbnVtOiA1IH0sXG4gICAgLy/mlYzmnLrmlbDph49cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyBzZWxmLmVuZW15X3NlbmNlLmdldENvbXBvbmVudCgnZW5lbXknKS5nZXRuZXdlbmVteShzZWxmLmVuZW15X251bSk7XG4gICAgICAgIHNlbGYucGxhbmUuZ2V0Q29tcG9uZW50KCdwbGFuZV9tb3ZlJykucGxhbmVfbW92ZSgwLCAtY2Mud2luU2l6ZS5oZWlnaHQgLyAyKTsgLy/liJ3lp4vljJbpo57mnLrkvY3nva5cbiAgICAgICAgc2VsZi5ub2RlLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyAgc2VsZi5iYWxsX3NlbmNlLmdldENvbXBvbmVudCgnYmFsbCcpLmdldG5ld2JhbGwoc2VsZi5wbGFuZS5nZXRQb3NpdGlvblgoKSxzZWxmLnBsYW5lLmdldFBvc2l0aW9uWSgpLHNlbGYuYmFsbF9kaXNhcHBlYXIpO1xuXG4gICAgICAgICAgICB2YXIgeCA9IGV2ZW50LmdldExvY2F0aW9uWCgpIC0gY2Mud2luU2l6ZS53aWR0aCAvIDI7IC8v6LCD5pW05Z2Q5qCHXG4gICAgICAgICAgICB2YXIgeSA9IGV2ZW50LmdldExvY2F0aW9uWSgpIC0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgc2VsZi5wbGFuZS5nZXRDb21wb25lbnQoJ3BsYW5lX21vdmUnKS5wbGFuZV9tb3ZlKHgsIHkpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHZhciBpLCB0aW1lO1xuICAgICAgICBpZiAodGhpcy50aW1lYiA+IHRoaXMuYmFsbHRpbWUpIC8v5Y+R5bCE5a2Q5by5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxsX3NlbmNlLmdldENvbXBvbmVudCgnYmFsbCcpLmdldG5ld2JhbGwodGhpcy5wbGFuZS5nZXRQb3NpdGlvblgoKSwgdGhpcy5wbGFuZS5nZXRQb3NpdGlvblkoKSwgdGhpcy5iYWxsX2Rpc2FwcGVhcik7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lYiAtPSB0aGlzLmJhbGx0aW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aW1lZSA+IHRoaXMuZW5lbXl0aW1lKSAvL+WHuueOsOaVjOaculxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlfc2VuY2UuZ2V0Q29tcG9uZW50KCdlbmVteScpLmdldG5ld2VuZW15KHRoaXMuZW5lbXlfbnVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVlIC09IHRoaXMuZW5lbXl0aW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5iYWxsX3NlbmNlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSAvL+mUgOavgeWtkOW8uVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmJhbGxfc2VuY2UuY2hpbGRyZW5baV0udGltZXIgKz0gZHQ7XG4gICAgICAgICAgICB0aW1lID0gdGhpcy5iYWxsX3NlbmNlLmNoaWxkcmVuW2ldLnRpbWVyO1xuICAgICAgICAgICAgaWYgKHRpbWUgPiB0aGlzLmJhbGxfZGlzYXBwZWFyKSB0aGlzLmJhbGxfc2VuY2UuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmVuZW15X3NlbmNlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSAvL+mUgOavgeaVjOaculxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmVuZW15X3NlbmNlLmNoaWxkcmVuW2ldLnRpbWVyICs9IGR0O1xuICAgICAgICAgICAgdGltZSA9IHRoaXMuZW5lbXlfc2VuY2UuY2hpbGRyZW5baV0udGltZXI7XG4gICAgICAgICAgICBpZiAodGltZSA+IHRoaXMuZW5lbXlfZGlzYXBwZWFyKSB0aGlzLmVuZW15X3NlbmNlLmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAgZm9yKHZhciBpPTE7aTx0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoO2krKykvL+mUgOavgeWtkOW8uSDmlYzmnLpcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLnRpbWVyKz1kdDtcbiAgICAgICAgLy8gICAgIHZhciBuYW1lPXRoaXMubm9kZS5jaGlsZHJlbltpXS5uYW1lO1xuICAgICAgICAvLyAgICAgdmFyIHRpbWU9dGhpcy5ub2RlLmNoaWxkcmVuW2ldLnRpbWVyO1xuICAgICAgICAvLyAgICAgaWYobmFtZS5pbmRleE9mKFwiYmFsbFwiKSE9LTEgJiYgdGltZT50aGlzLmJhbGxfZGlzYXBwZWFyKVxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5kZXN0cm95KCk7XG4gICAgICAgIC8vICAgICBpZihuYW1lLmluZGV4T2YoXCJlbmVteVwiKSE9LTEgJiYgdGltZT50aGlzLmVuZW15X2Rpc2FwcGVhcilcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMudGltZWIgKz0gZHQ7XG4gICAgICAgIHRoaXMudGltZWUgKz0gZHQ7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICczMjM1ZmVlNzF4QkhZbXM2clVkMUk4dScsICdwbGFuZV9tb3ZlJyk7XG4vLyBzY3JpcHQvcGxhbmVfbW92ZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIGp1bXBEdXJhdGlvbjogMC41IH0sXG4gICAgLy/po57mnLrnp7vliqjpgJ/luqbvvIzotorlsI/otorlv6tcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgfSxcbiAgICBwbGFuZV9tb3ZlOiBmdW5jdGlvbiBwbGFuZV9tb3ZlKHgsIHkpIHtcbiAgICAgICAgdmFyIGggPSBjYy53aW5TaXplLmhlaWdodCAvIDI7XG4gICAgICAgIHZhciB3ID0gY2Mud2luU2l6ZS53aWR0aCAvIDI7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHgrXCIgXCIrdyk7XG4gICAgICAgIGlmICh3IC0geCA8IHRoaXMubm9kZS53aWR0aCAvIDIpIHggPSB3IC0gdGhpcy5ub2RlLndpZHRoIC8gMjsgLy/orqnpo57mnLrlp4vnu4jlnKjop4bph47lhoVcbiAgICAgICAgaWYgKHcgKyB4IDwgdGhpcy5ub2RlLndpZHRoIC8gMikgeCA9IC13ICsgdGhpcy5ub2RlLndpZHRoIC8gMjtcbiAgICAgICAgaWYgKGggLSB5IDwgdGhpcy5ub2RlLmhlaWdodCAvIDIpIHkgPSBoIC0gdGhpcy5ub2RlLndpZHRoIC8gMjtcbiAgICAgICAgaWYgKGggKyB5IDwgdGhpcy5ub2RlLmhlaWdodCAvIDIpIHkgPSAtaCArIHRoaXMubm9kZS5oZWlnaHQgLyAyO1xuICAgICAgICB2YXIganVtcFVwID0gY2MubW92ZVRvKDAuNSwgY2MucCh4LCB5KSk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oanVtcFVwKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyJdfQ==
