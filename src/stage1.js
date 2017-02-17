//矢印移動↓
var startTouch;
var endTouch;
var touching = false;

var cocos_box;
var arrow_node;
var arrow_line;
var debug_label1;
var debug_label2;
//↑矢印
var world;
var shapeArray = [];
var sawariflag = false;

var dX = 0;
var dY = 0;
var dZ = 0;
var shape;
var shapeground1;
var nanameyuka1;
var nanameyuka2;
var midorijama1;
var midorijamp1 = 0;
var akajama1;
var akajamp1 = 0;
var aojama1;
var aojamp1 = 0;
var haijama1;
var haijamp1 = 0;
var yuka;

var erebetajouge = 150;
var erebetasayuu = 0;
var erebetaflag = false;

var miss2 = 100;
var missText2;

var miss = 0;
var missText;

var miss3 = 9999;
var missText3;

var pickedTiles = [];
var pickedTilesonp = [];
var pickedTilesreset = [];
var onpbgmflag = false;
var targetonp;

if (typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.totem = 0; // トーテム
    SpriteTag.destroyable = 1; //
    SpriteTag.solid = 2; //
    SpriteTag.ground = 3; //地面
    SpriteTag.ground1 = 4; //氷地面
    SpriteTag.gooru = 5; //ゴール
    SpriteTag.akaimono = 6; //赤的
    SpriteTag.haiiromono = 7; //灰敵
    SpriteTag.kusariki = 8; //腐った木
    SpriteTag.kusariki2 = 9; //腐った木
    SpriteTag.kusariki3 = 10; //腐った木
    SpriteTag.kusariki4 = 11; //腐った木
    SpriteTag.kusariki5 = 12; //腐った木
    SpriteTag.kusariki6 = 13; //腐った木
    SpriteTag.kusariki7 = 14; //腐った木
    SpriteTag.kusariki8 = 15; //腐った木
    SpriteTag.kusariki9 = 16; //腐った木
    SpriteTag.kusariki10 = 17; //腐った木
    SpriteTag.kusariki11 = 18; //腐った木
    SpriteTag.hidari = 21; //左右エれべタ
    SpriteTag.sinu = 44; //落下死
};
var gameLayer;

var gameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer, 1);

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            audioEngine.playMusic("res/stagebgm.mp3", true);
            //audioEngine.playMusic("res/bgm_main.mp3", true);
            //audioEngine.playMusic(res.kurisutarubgm, true);
        }
        //矢印移動はじ
        var size = cc.director.getWinSize();

        debug_label1 = cc.LabelTTF.create("", "Arial", 26);
        debug_label1.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(debug_label1, 1);
        debug_label2 = cc.LabelTTF.create(" ", "Arial", 26);
        debug_label2.setPosition(size.width * 2 / 3, size.height * 0.74);
        this.addChild(debug_label2, 1);

        missText3 = cc.LabelTTF.create("ボーナスは9999", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText3, 1);
        missText3.setPosition(250, 650);
        missText3.setScale(0.7);
        //ステジ回数
        missText = cc.LabelTTF.create("ステージ1", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(400, 650);
        missText.setScale(0.7);
        //score回数
        missText = cc.LabelTTF.create("スコアは" + miss, "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(530, 650);
        missText.setScale(0.7);
        //jump数
        missText2 = cc.LabelTTF.create("残りジャンプは100", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText2, 1);
        missText2.setPosition(750, 650);
        missText2.setScale(0.7);

        cocos_box = cc.Sprite.create( /*res.totem_png*/ );
        cocos_box.setScale(0.5);
        cocos_box.setPosition(size.width / 2, size.height / 2);

        this.addChild(cocos_box, 1);
        //cocos_box.setVisible(false);

        arrow_node = new cc.DrawNode();
        this.addChild(arrow_node, 10);
        arrow_line = new cc.DrawNode();
        this.addChild(arrow_line, 11);

        var points = [new cc.Point(0, 0),
            new cc.Point(-8, -10),
            new cc.Point(-3, -10),
            new cc.Point(0, -20),
            new cc.Point(3, -10),
            new cc.Point(8, -10),
        ]

        var fillColor = new cc.Color(128, 128, 128, 128);
        var lineWidth = 1;
        var lineColor = new cc.Color(255, 255, 255, 128);
        arrow_node.drawPoly(points, fillColor, lineWidth, lineColor);
        arrow_node.setPosition(size.width / 2, size.height / 2);

        this.scheduleUpdate();

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded

        }, this);
        return true;
    },

    onTouchBegan: function(touch, event) {
        startTouch = touch.getLocation();

        cocos_box.setPosition(startTouch);
        arrow_node.setPosition(startTouch);

        return true;
    },
    onTouchMoved: function(touch, event) {
        endTouch = touch.getLocation();
        touching = true;

    },
    onTouchEnded: function(touch, event) {

        endTouch = touch.getLocation();
        touching = false;
        if (sawariflag == true) {
            shape.body.applyImpulse(cp.v(dX * -2, dY * -2), cp.v(10, 0))
            miss2--;
            missText2.setString("残りジャンプできる回数は" + miss2);
        }
        //sawariflag = true;
        //cc.director.runScene(new MyScene());

    },

    update: function(dt) {
      stagebgm = 1;
        miss3--;
        missText3.setString("ボーナスは" + miss3);
        if (miss3 < 0) {
            miss3 = 0;
        }
        if (touching && sawariflag == true) {

            //現在タッチしているX座標と前回の座標の差分をとる
            arrow_line.setVisible(true);
            arrow_node.setVisible(true);

            this.calcDirection();
        } else {
            arrow_line.setVisible(false);
            arrow_line.clear();
            arrow_node.setVisible(false);
            arrow_node.clear();

        }

    },
    calcDirection: function() {

        /*var*/
        dX = endTouch.x - startTouch.x;
        /*var*/
        dY = endTouch.y - startTouch.y;
        /*var*/
        dZ = Math.sqrt(dX * dX + dY * dY);

        //  debug_label1.setString(Math.floor(dZ * Math.pow(10, 2)) / Math.pow(10, 2));

        //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
        if (dZ > 60) {

            //  if (Math.abs(dX) > 5 || Math.abs(dY) > 5) {
            //角度（ラジアン）を求める
            var radian = Math.atan2(dY, dX)
            //角度（ラジアン）を角度（度数）に変換
            var angle = radian * 180 / Math.PI;
            //矢印を回転させる

            //前回の描画を消す
            arrow_line.clear();
            arrow_node.clear();

            var pos = cocos_box.getPosition();

            //ドラックした長さを矢印のしっぽの位置にする
            var points = [new cc.Point(0, 0),
                new cc.Point(-35, -35),
                new cc.Point(-15, -35),
                new cc.Point(0, -(dZ - 10)),
                new cc.Point(15, -35),
                new cc.Point(35, -35),
            ]

            //矢印を描画する
            var fillColor = new cc.Color(128, 228, 78, 240);
            var lineWidth = 1;
            var lineColor = new cc.Color(255, 255, 255, 128);
            arrow_node.drawPoly(points, fillColor, lineWidth, lineColor);
            //矢印はもともと270度の位置にあるので、回転角度を減算する
            arrow_node.setRotation(270 - angle);

        }

        //矢印移動おわ

    }
});

var game = cc.Layer.extend({
    init: function() {
        this._super();
//        var tiledmap = new Tiledmap(this);
      /*  var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
        this.addChild(backgroundLayer);*/
        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);


        var wallBottom = new cp.SegmentShape(world.staticBody,
            cp.v(-4294967294, -100), // start point
            cp.v(4294967295, -100), // MAX INT:4294967295
            0); // thickness of wall
        world.addStaticShape(wallBottom);
        //雪山の拝啓はここ
        var haikei = cc.Sprite.create(res.haikeikusa);
        haikei.setPosition(400, 355);
        haikei.setScale(1.6, 1.6);
        this.addChild(haikei, 0);

        for (i = 0; i < 1; i++) {
            var tile = new MemoryTileue();
            this.addChild(tile, 1);
            //タイルを格子状に配置する計算式
            tile.setPosition(100, 650);
            tile.setScale(3, 3);

        }

        for (i = 0; i < 1; i++) {
            var tileonp = new MemoryTileonp();
            this.addChild(tileonp, 1);
            //タイルを格子状に配置する計算式
            tileonp.setPosition(50, 50);
            tileonp.setScale(0.4, 0.2);

        }

        for (i = 0; i < 1; i++) {
            var tilereset = new MemoryTilereset();
            this.addChild(tilereset, 1);
            //タイルを格子状に配置する計算式
            tilereset.setPosition(800, 50);
            tilereset.setScale(0.8, 0.8);

        }


        // this.addBody(240,10,480,20,false,res.ground_png,"ground");
        // this.addBody(204,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(276,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(240,56,96,24,true,res.brick4x1_png,"destroyable");
        // this.addBody(240,80,48,24,true,res.brick2x1_png,"solid");
        // this.addBody(228,104,72,24,true,res.brick3x1_png,"destroyable");
        // this.addBody(240,140,96,48,true,res.brick4x2_png,"solid");
        // this.addBody(240,188,24,48,true,res.totem_png,"totem");


        /*
        this.addBody(276,32,24,24,true,res.brick1x1_png,SpriteTag.destroyable);
        this.addBody(240,56,96,24,true,res.brick4x1_png,SpriteTag.destroyable);
        this.addBody(240,80,48,24,true,res.brick2x1_png,SpriteTag.solid);
        this.addBody(228,104,72,24,true,res.brick3x1_png,SpriteTag.destroyable);
        this.addBody(240,140,96,48,true,res.brick4x2_png,SpriteTag.solid);
        */

        this.addBody(160, 188, 50, 50, true, res.totem_png, SpriteTag.totem);
        //        this.addBody(154, 532, 24, 50, true, res.midoriteki, SpriteTag.destroyable);
        //    this.addBody(204, 532, 24, 50, true, res.akateki, SpriteTag.akaimono);
        //  this.addBody(354, 532, 24, 50, true, res.aoteki, SpriteTag.akaimono);
        //    this.addBody(354, 132, 24, 50, true, res.haiteki, SpriteTag.haiiromono);
        //  this.addBody(340, 200, 85, 20, false, res.erebeta, SpriteTag.ground1);
        this.addBody(90, 225, 75, 150, false, res.kusatate, SpriteTag.ground);
        this.addBody(130, 110, 150, 75, false, res.sunakusa, SpriteTag.ground);
        this.addBody(280, 110, 150, 75, false, res.kusa, SpriteTag.ground);
        this.addBody(650, 315, 150, 75, false, res.kusa, SpriteTag.ground);
        this.addBody(90, 540, 75, 150, false, res.kusatate, SpriteTag.ground);
        this.addBody(730, 110, 150, 75, false, res.kusa, SpriteTag.ground);
        this.addBody(580, 110, 150, 75, false, res.kusa, SpriteTag.ground);
        this.addBody(320, 210, 150, 75, false, res.kusa, SpriteTag.ground);
        this.addBody(430, 110, 150, 75, false, res.kusa, SpriteTag.ground);
        this.addBody(90, 380, 75, 150, false, res.kusatate, SpriteTag.ground);

        this.addBody(763, 545, 75, 150, false, res.kusatate, SpriteTag.ground);
        this.addBody(773, 380, 75, 150, false, res.kusatate, SpriteTag.ground);
        this.addBody(770, 225, 75, 150, false, res.kusatate, SpriteTag.ground);
        //this.addBody(110, 200, 50, 480, true, res.icegroundwall, SpriteTag.ground);

        this.addBody(650, 442, 50, 50, false, res.medamayaki, SpriteTag.gooru);
        this.addBody(500, -100, 60000, 10, false, res.w, SpriteTag.sinu);

        this.scheduleUpdate();
        cc.eventManager.addListener(touchListener, this);
        world.setDefaultCollisionHandler(this.collisionBegin, null, null, null);

    },
    addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {

        if (isDynamic) {
            var body = new cp.Body(1, cp.momentForBox(1, width, height));
        } else {
            var body = new cp.Body(Infinity, Infinity);
        }
        body.setPos(cp.v(posX, posY));
        var bodySprite = cc.Sprite.create(spriteImage);
        gameLayer.addChild(bodySprite, 0);
        bodySprite.setPosition(posX, posY);
        if (isDynamic) {
            world.addBody(body);
        }

        shape = new cp.BoxShape(body, width, height);
        shape.setFriction(1);
        shape.setElasticity(0);
        shape.name = type;
        shape.setCollisionType(type);
        shape.image = bodySprite;
        world.addShape(shape);
        shapeArray.push(shape);
      //  shape = shapeArray[0];

        shapeground1 = new cp.BoxShape(body, width, height);
        shapeground1.setFriction(1);
        shapeground1.setElasticity(0);
        shapeground1.name = type;
        shapeground1.setCollisionType(type);
        shapeground1.image = bodySprite;
        world.addShape(shapeground1);
        //shapeArray.push(shapeground1);
        //shapeground1 = SpriteTag.totem;
        shapeground1 = shapeArray[5];
        //shape.body.setPos(cp.v(1, 1))
        /*
                nanameyuka1 = new cp.BoxShape(body, width, height);
                nanameyuka1.setFriction(1);
                nanameyuka1.setElasticity(0);
                nanameyuka1.name = type;
                nanameyuka1.setCollisionType(type);
                nanameyuka1.image = bodySprite;
                world.addShape(nanameyuka1);

                nanameyuka1 = shapeArray[13];

                nanameyuka2 = new cp.BoxShape(body, width, height);
                nanameyuka2.setFriction(1);
                nanameyuka2.setElasticity(0);
                nanameyuka2.name = type;
                nanameyuka2.setCollisionType(type);
                nanameyuka2.image = bodySprite;
                world.addShape(nanameyuka2);

                nanameyuka2 = shapeArray[11];

                midorijama1 = new cp.BoxShape(body, width, height);
                midorijama1.setFriction(1);
                midorijama1.setElasticity(0);
                midorijama1.name = type;
                midorijama1.setCollisionType(type);
                midorijama1.image = bodySprite;
                world.addShape(midorijama1);

                midorijama1 = shapeArray[1];

                akajama1 = new cp.BoxShape(body, width, height);
                akajama1.setFriction(1);
                akajama1.setElasticity(0);
                akajama1.name = type;
                akajama1.setCollisionType(type);
                akajama1.image = bodySprite;
                world.addShape(akajama1);

                akajama1 = shapeArray[2];

                aojama1 = new cp.BoxShape(body, width, height);
                aojama1.setFriction(1);
                aojama1.setElasticity(0);
                aojama1.name = type;
                aojama1.setCollisionType(type);
                aojama1.image = bodySprite;
                world.addShape(aojama1);
                aojama1 = shapeArray[3];

                haijama1 = new cp.BoxShape(body, width, height);
                haijama1.setFriction(1);
                haijama1.setElasticity(0);
                haijama1.name = type;
                haijama1.setCollisionType(type);
                haijama1.image = bodySprite;
                world.addShape(haijama1);
                haijama1 = shapeArray[4];
                //cc.Sprite.create(res.akateki);
                */
    },
    update: function(dt) {
        /*
                nanameyuka1.body.setAngle(150);
                nanameyuka2.body.setAngle(66.5);*/
      //  shapeground1.body.setPos(cp.v(500, erebetajouge))
        /*
                //        shape.body.setPos(cp.v(1, 1))
                midorijamp1 += 1;
                if (midorijamp1 == 200) {
                    midorijama1.body.applyImpulse(cp.v(0, 100), cp.v(0, 100))
                }
                if (midorijamp1 == 400) {
                    midorijama1.body.applyImpulse(cp.v(0, 200), cp.v(0, 0))
                    midorijamp1 = -100;
                }
                akajamp1 += 1;
                if (akajamp1 == 200) {
                    akajama1.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
                }
                if (akajamp1 == 250) {
                    akajama1.body.applyImpulse(cp.v(0, -100), cp.v(0, 0))

                }
                if (akajamp1 == 350) {
                    akajama1.body.applyImpulse(cp.v(0, 150), cp.v(0, 0))
                }
                if (akajamp1 == 400) {
                    akajama1.body.applyImpulse(cp.v(0, -100), cp.v(0, 0))
                    akajamp1 = -100;
                }

                aojamp1 += 1;
                if (aojamp1 == 100) {
                    aojama1.body.applyImpulse(cp.v(-20, 80), cp.v(0, 0))
                }
                if (aojamp1 == 200) {
                    aojama1.body.applyImpulse(cp.v(20, 80), cp.v(0, 0))

                }
                if (aojamp1 == 300) {
                    aojama1.body.applyImpulse(cp.v(20, 80), cp.v(0, 0))

                }
                if (aojamp1 == 400) {
                    aojama1.body.applyImpulse(cp.v(-20, 80), cp.v(0, 0))
                    aojamp1 = 0;
                }
                haijamp1 += 1;
                if (haijamp1 == 200) {
                    haijama1.body.applyImpulse(cp.v(0, 100), cp.v(30, 30))
                }
                if (haijamp1 == 400) {
                    haijama1.body.applyImpulse(cp.v(0, 100), cp.v(-30, -30))
                    haijamp1 = -100;
                }*/
        world.step(dt);
        for (var i = shapeArray.length - 1; i >= 0; i--) {
            shapeArray[i].image.x = shapeArray[i].body.p.x
            shapeArray[i].image.y = shapeArray[i].body.p.y
            var angle = Math.atan2(-shapeArray[i].body.rot.y, shapeArray[i].body.rot.x);
            shapeArray[i].image.rotation = angle * 57.2957795;

        }
        //        shapeground1.body.applyImpulse(cp.v(erebetasayuu, erebetajouge), cp.v(0, 0))
        if (erebetajouge <= 110) {
            erebetaflag = false;
        } else if (erebetajouge >= 320) {
            erebetaflag = true;
        }
        if (erebetaflag == false) {
            erebetajouge += 0.5;
        } else if (erebetaflag == true) {
            erebetajouge -= 0.5;
        }

        if (miss2 == 0) {
            //bgmの再生をとめる
            if (audioEngine.isMusicPlaying()) {
                audioEngine.stopMusic();
            }
            cc.director.runScene(new loseScene());
            miss2 = 10;
        }
    },

    collisionBegin: function(arbiter, space) {
        /*
          if((arbiter.a.name=="totem" && arbiter.b.name=="ground") || (arbiter.b.name=="totem" && arbiter.a.name=="ground")){
              console.log("Oh no!!!!");
          }
          */

        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.ground) {
            cc.audioEngine.playEffect(res.landing_mp3);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.gooru) {
            //bgmの再生をとめる
            if (audioEngine.isMusicPlaying()) {
                audioEngine.stopMusic();
            }
            cc.director.runScene(new WinScene());
            //gameLayer.removeChild(haijama1.image);
            cc.audioEngine.playEffect(res.eyeshine1);
            miss += miss3;
            miss3 = 9999;
            stageflag = 1;
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.akaimono) {
            cc.director.runScene(new loseScene());
            cc.audioEngine.playEffect(res.gameover);
            miss3 = 9999;
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.haiiromono) {
            shape.body.applyImpulse(cp.v(30, 30), cp.v(1000, 1000))



        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.sinu) {
            cc.director.runScene(new loseScene());
            cc.audioEngine.playEffect(res.gameover);



        }
        return true;
    },


});


var MemoryTileue = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.menu);
        cc.eventManager.addListener(listener2.clone(), this);

    }

});
var listener2 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            target.initWithFile("res/menu.png");
            pickedTiles.push(target);

            ueniiku();


        }
    }
});

var MemoryTileonp = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.onp);
        cc.eventManager.addListener(listeneronp.clone(), this);

    }

});
var listeneronp = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

         targetonp = event.getCurrentTarget();
        var location = targetonp.convertToNodeSpace(touch.getLocation());
        var targetonpSize = targetonp.getContentSize();
        var targetonpRectangle = cc.rect(0, 0, targetonpSize.width, targetonpSize.height);
        if (cc.rectContainsPoint(targetonpRectangle, location)) {
          if(onpbgmflag == false){
            onpbgmflag = true;
          }else
          if(onpbgmflag == true){
            onpbgmflag = false;
          }
            //targetonp.initWithFile("res/onp2.png");

            pickedTilesonp.push(targetonp);

            bgm();


        }
    }
});

var MemoryTilereset = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.reset);
        cc.eventManager.addListener(listenerreset.clone(), this);

    }

});
var listenerreset = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            target.initWithFile("res/reset.png");
            pickedTilesreset.push(target);

            reset();


        }
    }
});

var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
    swallowTouches: false, // 以降のノードにタッチイベントを渡す

    onTouchBegan: function(touch, event) { // タッチ時
        var pos = touch.getLocation();
        console.log("shapeArray.length:", shapeArray.length)
        // すべてのshapをチェックする
        for (var i = 0; i < shapeArray.length; i++) {
            /*var*/
            shape = shapeArray[i];

            //shapeground1 = shapeArray[i];
            console.log("shape.type:", i, shape.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
            if (shape.pointQuery(cp.v(pos.x, pos.y)) != undefined) {
                console.log("hit ")
                /*  if (shape.name == SpriteTag.destroyable) {
                      //ブロックをタップしたときは、消去する
                      world.removeBody(shape.getBody());
                      world.removeShape(shape);
                      gameLayer.removeChild(shape.image);
                      shapeArray.splice(i, 1);
                      console.log("remove block")
                      return;
                  }
                  else*/
                if (shape.name == SpriteTag.totem) {

                    // トーテムをタップしたときは、衝撃を与える
                    //shape.body.applyImpulse(cp.v(dX * -2, dY * -2), cp.v(10, 10))
                    dX = 0;
                    dY = 0;
                    sawariflag = true;

                    return;


                }

            }
        }
        // 何も無い場所をタップしたときは箱を追加する

        sawariflag = false;
        //        gameLayer.addBody(pos.x, pos.y, 24, 24, true, res.brick1x1_png, SpriteTag.destroyable);
        return;

    },
    //下の使わない
    onTouchMoved: function(touch, event) {


    },
    onTouchEnded: function(touch, event) {

        //  shape.body.applyImpulse(cp.v(dX * -1, dY * -1), cp.v(10, 0))
        console.log("Oh no!!!!");

    },


});

/*
var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) {
        for(var i=shapeArray.length-1;i>=0;i--){
            if(shapeArray[i].pointQuery(cp.v(touch.getLocation().x,touch.getLocation().y))!=undefined){
                if(shapeArray[i].name== SpriteTag.destroyable ){
                    gameLayer.removeChild(shapeArray[i].image);
                    world.removeBody(shapeArray[i].getBody())
                    world.removeShape(shapeArray[i])
                    shapeArray.splice(i,1);
                }
            }
        }
    }
});
*/
function ueniiku() {
    //playerSprite.initWithFile(res.paintmansiro2);
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();
    }
    cc.director.runScene(new FirstScene());

}
function bgm() {
    //playerSprite.initWithFile(res.paintmansiro2);
    if(onpbgmflag == true){
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();
    }
targetonp.initWithFile("res/onp2.png");
    }else
    if(onpbgmflag == false){
      if (!audioEngine.isMusicPlaying()) {
        if(stagebgm == 1){
          audioEngine.playMusic("res/stagebgm.mp3", true);
}
if(stagebgm == 2){
  audioEngine.playMusic("res/mori.mp3", true);
}
if(stagebgm == 3){
  audioEngine.playMusic("res/yuki.mp3", true);
}
if(stagebgm == 4){
  audioEngine.playMusic("res/koujou.mp3", true);
}
      }
    targetonp.initWithFile("res/onp.png");
    }

}
function reset() {
    //playerSprite.initWithFile(res.paintmansiro2);
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();
    }
    if(stagebgm == 1){
      cc.director.runScene(new gameScene());
}
if(stagebgm == 2){
cc.director.runScene(new gameScene2());
}
if(stagebgm == 3){
cc.director.runScene(new gameScene1());
}
if(stagebgm == 4){
cc.director.runScene(new gameScene4());
}


}
