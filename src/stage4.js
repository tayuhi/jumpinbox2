//矢印移動↓
var startTouchstage4;
var endTouchstage4;
var touchingstage4 = false;

var cocos_boxstage4;
var arrow_nodestage4;
var arrow_linestage4;
var debug_label1stage4;
var debug_label2stage4;
//↑矢印
var worldstage4;
var shapeArraystage4 = [];
var sawariflagstage4 = false;

var dXstage4 = 0;
var dYstage4 = 0;
var dZstage4 = 0;
var shapestage4;
var shapeground1stage4;
var nanameyuka1stage4;
var nanameyuka2stage4;
var sayuu1stage4;
var midorijama1stage4;
var midorijamp1stage4 = 0;
var akajama1stage4;
var akajamp1stage4 = 0;
var aojama1stage4;
var aojamp1stage4 = 0;
var haijama1stage4;
var haijamp1stage4 = 0;
var yuka;

var erebetajougestage4 = 150;
var erebetasayuustage4 = 670;
var erebetaflagstage4 = false;
var erebeta2flagstage4 = false;
var konbeaflag = false;
var erebeta2stage4;
var kurutayuka = 0;
/*var miss2 = 10;
var missText2;

var miss = 0;
var missText;

var miss3 = 9999;
var missText3;
*/
var pickedTilesstage4 = [];
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
    SpriteTag.hidari = 121; //左右エれべタ
    SpriteTag.sinu = 44; //落下死
    SpriteTag.konbea = 20; //ベルコン
    SpriteTag.jougeere = 22; //上下エレベタ
};
var gameLayerstage4;

var gameScene4 = cc.Scene.extend({
    onEnter: function() {
        this._super();
        gameLayerstage4 = new game4();
        gameLayerstage4.init();
        this.addChild(gameLayerstage4, 1);

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            audioEngine.playMusic("res/koujou.mp3", true);
            //audioEngine.playMusic(res.kurisutarubgm, true);
        }
        //矢印移動はじ
        var size = cc.director.getWinSize();

        debug_label1stage4 = cc.LabelTTF.create("", "Arial", 26);
        debug_label1stage4.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(debug_label1stage4, 1);
        debug_label2stage4 = cc.LabelTTF.create(" ", "Arial", 26);
        debug_label2stage4.setPosition(size.width * 2 / 3, size.height * 0.74);
        this.addChild(debug_label2stage4, 1);

        missText3 = cc.LabelTTF.create("ボーナスは9999", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText3, 1);
        missText3.setPosition(250, 650);
        missText3.setScale(0.7);
        //ステジ回数
        missText = cc.LabelTTF.create("ステージ2", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
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

        cocos_boxstage4 = cc.Sprite.create( /*res.totem_png*/ );
        cocos_boxstage4.setScale(0.5);
        cocos_boxstage4.setPosition(size.width / 2, size.height / 2);

        this.addChild(cocos_boxstage4, 1);
        //cocos_boxstage4.setVisible(false);

        arrow_nodestage4 = new cc.DrawNode();
        this.addChild(arrow_nodestage4, 10);
        arrow_linestage4 = new cc.DrawNode();
        this.addChild(arrow_linestage4, 11);

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
        arrow_nodestage4.drawPoly(points, fillColor, lineWidth, lineColor);
        arrow_nodestage4.setPosition(size.width / 2, size.height / 2);

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
        startTouchstage4 = touch.getLocation();

        cocos_boxstage4.setPosition(startTouchstage4);
        arrow_nodestage4.setPosition(startTouchstage4);

        return true;
    },
    onTouchMoved: function(touch, event) {
        endTouchstage4 = touch.getLocation();
        touchingstage4 = true;

    },
    onTouchEnded: function(touch, event) {

        endTouchstage4 = touch.getLocation();
        touchingstage4 = false;
        if (sawariflagstage4 == true) {
            shapestage4.body.applyImpulse(cp.v(dXstage4 * -2, dYstage4 * -2), cp.v(10, 0))
            miss2--;
            missText2.setString("残りジャンプできる回数は" + miss2);
        }
        //sawariflagstage4 = true;
        //cc.director.runScene(new MyScene());

    },

    update: function(dt) {
        stagebgm = 4;
        miss3--;
        missText3.setString("ボーナスは" + miss3);
        if (miss3 < 0) {
            miss3 = 0;
        }
        if (touchingstage4 && sawariflagstage4 == true) {

            //現在タッチしているX座標と前回の座標の差分をとる
            arrow_linestage4.setVisible(true);
            arrow_nodestage4.setVisible(true);

            this.calcDirection();
        } else {
            arrow_linestage4.setVisible(false);
            arrow_linestage4.clear();
            arrow_nodestage4.setVisible(false);
            arrow_nodestage4.clear();

        }

    },
    calcDirection: function() {

        /*var*/
        dXstage4 = endTouchstage4.x - startTouchstage4.x;
        /*var*/
        dYstage4 = endTouchstage4.y - startTouchstage4.y;
        /*var*/
        dZstage4 = Math.sqrt(dXstage4 * dXstage4 + dYstage4 * dYstage4);

        //  debug_label1stage4.setString(Math.floor(dZstage4 * Math.pow(10, 2)) / Math.pow(10, 2));

        //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
        if (dZstage4 > 60) {

            //  if (Math.abs(dXstage4) > 5 || Math.abs(dYstage4) > 5) {
            //角度（ラジアン）を求める
            var radian = Math.atan2(dYstage4, dXstage4)
            //角度（ラジアン）を角度（度数）に変換
            var angle = radian * 180 / Math.PI;
            //矢印を回転させる

            //前回の描画を消す
            arrow_linestage4.clear();
            arrow_nodestage4.clear();

            var pos = cocos_boxstage4.getPosition();

            //ドラックした長さを矢印のしっぽの位置にする
            var points = [new cc.Point(0, 0),
                new cc.Point(-35, -35),
                new cc.Point(-15, -35),
                new cc.Point(0, -(dZstage4 - 10)),
                new cc.Point(15, -35),
                new cc.Point(35, -35),
            ]

            //矢印を描画する
            var fillColor = new cc.Color(128, 228, 78, 240);
            var lineWidth = 1;
            var lineColor = new cc.Color(255, 255, 255, 128);
            arrow_nodestage4.drawPoly(points, fillColor, lineWidth, lineColor);
            //矢印はもともと270度の位置にあるので、回転角度を減算する
            arrow_nodestage4.setRotation(270 - angle);

        }

        //矢印移動おわ

    }
});

var game4 = cc.Layer.extend({
    init: function() {
        this._super();

        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
        this.addChild(backgroundLayer);
        worldstage4 = new cp.Space();
        worldstage4.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(worldstage4);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);


        var wallBottom = new cp.SegmentShape(worldstage4.staticBody,
            cp.v(-4294967294, -100), // start point
            cp.v(4294967295, -100), // MAX INT:4294967295
            0); // thickness of wall
        worldstage4.addStaticShape(wallBottom);
        //雪山の拝啓はここ
        var haikei = cc.Sprite.create(res.koujou);
        haikei.setPosition(470, 370);
        haikei.setScale(0.5, 0.7);
        this.addChild(haikei, 0);

        for (i = 0; i < 1; i++) {
            var tile = new MemoryTileue();
            this.addChild(tile, 1);
            //タイルを格子状に配置する計算式
            tile.setPosition(100, 700);
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
            tilereset.setScale(0.3, 0.3);

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

        this.addBody(800, 388, 50, 50, true, res.totem_png, SpriteTag.totem);
        this.addBody(574, 532, 50, 50, true, res.haiteki, SpriteTag.haiiromono);
        this.addBody(584, 532, 50, 50, true, res.haiteki, SpriteTag.haiiromono);
        this.addBody(554, 532, 50, 50, true, res.haiteki, SpriteTag.haiiromono);
        this.addBody(554, 532, 50, 50, true, res.haiteki, SpriteTag.haiiromono);
        this.addBody(340, 200, 85, 20, false, res.erebeta, SpriteTag.ground);
        this.addBody(90, 575, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        this.addBody(700, 180, 150, 30, false, res.sayuuerebeta, SpriteTag.ground1);
    //    this.addBody(30, 110, 200, 50, false, res.kikaiyuka2, SpriteTag.ground);

        this.addBody(780, 265, 50, 50, false, res.kikaiyuka, SpriteTag.ground);
        this.addBody(500, 10, 150, 60, false, res.berutokonbea, SpriteTag.konbea);
        this.addBody(325, 470, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(745, 570, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(530, 470, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        //this.addBody(645, 310, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        //this.addBody(700, 10, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(20, 570, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        this.addBody(20, 370, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        this.addBody(835, 265, 50, 50, false, res.kikaiyuka, SpriteTag.ground);
        this.addBody(635, 518, 50, 50, false, res.kikaiyuka, SpriteTag.ground);
        this.addBody(873, 390, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        this.addBody(873, 600, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        //this.addBody(855, 100, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        //this.addBody(110, 200, 50, 480, true, res.icegroundwall, SpriteTag.ground);
        this.addBody(325, 700, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(530, 700, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(745, 700, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(120, 700, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        //this.addBody(165, 500, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        this.addBody(165, 400, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);

        this.addBody(340, 10, 150, 60, false, res.berutokonbea, SpriteTag.konbea);
        this.addBody(670, 10, 150, 60, false, res.berutokonbea, SpriteTag.konbea);
        this.addBody(170, 10, 150, 60, false, res.berutokonbea, SpriteTag.konbea);
        this.addBody(0, 10, 150, 60, false, res.berutokonbea, SpriteTag.konbea);
        this.addBody(840, 10, 150, 60, false, res.berutokonbea, SpriteTag.konbea);
        this.addBody(750, 632, 50, 50, false, res.medamayaki, SpriteTag.gooru);
        this.addBody(500, -10, 6000000000, 10, false, res.w, SpriteTag.sinu);


        this.scheduleUpdate();
        cc.eventManager.addListener(touchListenerstage4, this);
        worldstage4.setDefaultCollisionHandler(this.collisionBegin, null, null, null);

    },
    addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {

        if (isDynamic) {
            var body = new cp.Body(1, cp.momentForBox(1, width, height));
        } else {
            var body = new cp.Body(Infinity, Infinity);
        }
        body.setPos(cp.v(posX, posY));
        var bodySprite = cc.Sprite.create(spriteImage);
        gameLayerstage4.addChild(bodySprite, 0);
        bodySprite.setPosition(posX, posY);
        if (isDynamic) {
            worldstage4.addBody(body);
        }

        shapestage4 = new cp.BoxShape(body, width, height);
        shapestage4.setFriction(1);
        shapestage4.setElasticity(0);
        shapestage4.name = type;
        shapestage4.setCollisionType(type);
        shapestage4.image = bodySprite;
        worldstage4.addShape(shapestage4);
        shapeArraystage4.push(shapestage4);
        //        shapestage4 = shapeArraystage4[0];

        shapeground1stage4 = new cp.BoxShape(body, width, height);

        shapeground1stage4 = shapeArraystage4[5];

        erebeta2stage4 = new cp.BoxShape(body, width, height);

        erebeta2stage4 = shapeArraystage4[6];

  /*      nanameyuka1stage4 = new cp.BoxShape(body, width, height);
        nanameyuka1stage4.setFriction(1);
        nanameyuka1stage4.setElasticity(0);
        nanameyuka1stage4.name = type;
        nanameyuka1stage4.setCollisionType(type);
        nanameyuka1stage4.image = bodySprite;
        worldstage4.addShape(nanameyuka1stage4);

        nanameyuka1stage4 = shapeArraystage4[13];

        nanameyuka2stage4 = new cp.BoxShape(body, width, height);
        nanameyuka2stage4.setFriction(1);
        nanameyuka2stage4.setElasticity(0);
        nanameyuka2stage4.name = type;
        nanameyuka2stage4.setCollisionType(type);
        nanameyuka2stage4.image = bodySprite;
        worldstage4.addShape(nanameyuka2stage4);

        nanameyuka2stage4 = shapeArraystage4[11];
*/
        midorijama1stage4 = new cp.BoxShape(body, width, height);


        midorijama1stage4 = shapeArraystage4[1];

        akajama1stage4 = new cp.BoxShape(body, width, height);



        akajama1stage4 = shapeArraystage4[2];

        aojama1stage4 = new cp.BoxShape(body, width, height);


        aojama1stage4 = shapeArraystage4[3];

        haijama1stage4 = new cp.BoxShape(body, width, height);


        haijama1stage4 = shapeArraystage4[4];

        sayuu1stage4 = new cp.BoxShape(body, width, height);


        sayuu1stage4 = shapeArraystage4[7];
        //cc.Sprite.create(res.akateki);


        /*berutokonbea1stage4 = new cp.BoxShape(body, width, height);
        berutokonbea1stage4.setFriction(1);
        berutokonbea1stage4.setElasticity(0);
        berutokonbea1stage4.name = type;
        berutokonbea1stage4.setCollisionType(type);
        berutokonbea1stage4.image = bodySprite;
        worldstage4.addShape(berutokonbea1stage4);
        berutokonbea1stage4 = shapeArraystage4[4];
        */

    },
    update: function(dt) {
        kurutayuka += 0.005;
        //  nanameyuka1stage4.body.setAngle(150);
        //nanameyuka2stage4.body.setAngle(66.5);
        shapeground1stage4.body.setPos(cp.v(90, erebetajougestage4))
        erebeta2stage4.body.setPos(cp.v(500, 250))
        erebeta2stage4.body.setAngle(kurutayuka);
        sayuu1stage4.body.setPos(cp.v(erebetasayuustage4, 160))
        //        shape.body.setPos(cp.v(1, 1))
        midorijamp1stage4 += 1;
        if (midorijamp1stage4 == 200) {
            midorijama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(50, 50))
        }
        if (midorijamp1stage4 == 400) {
            midorijama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(-50, -50))
            midorijamp1stage4 = -100;
        }
        akajamp1stage4 += 1;
        if (akajamp1stage4 == 200) {
            akajama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(-50, -50))
        }
        if (akajamp1stage4 == 250) {
            akajama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(50, 50))

        }
        if (akajamp1stage4 == 350) {
            akajama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(50, 50))
        }
        if (akajamp1stage4 == 400) {
            akajama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(-50, -50))
            akajamp1stage4 = -100;
        }

        aojamp1stage4 += 1;
        if (aojamp1stage4 == 100) {
            aojama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(50, 50))
        }
        if (aojamp1stage4 == 200) {
            aojama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(-50, -50))

        }
        if (aojamp1stage4 == 300) {
            aojama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(-50, -50))

        }
        if (aojamp1stage4 == 400) {
            aojama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(50, 50))
            aojamp1stage4 = 0;
        }
        haijamp1stage4 += 1;
        if (haijamp1stage4 == 200) {
            haijama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(50, 50))
        }
        if (haijamp1stage4 == 400) {
            haijama1stage4.body.applyImpulse(cp.v(0, 100), cp.v(-50, -50))
            haijamp1stage4 = -100;
        }
        worldstage4.step(dt);
        for (var i = shapeArraystage4.length - 1; i >= 0; i--) {
            shapeArraystage4[i].image.x = shapeArraystage4[i].body.p.x
            shapeArraystage4[i].image.y = shapeArraystage4[i].body.p.y
            var angle = Math.atan2(-shapeArraystage4[i].body.rot.y, shapeArraystage4[i].body.rot.x);
            shapeArraystage4[i].image.rotation = angle * 57.2957795;

        }
        //        shapeground1tage2.body.applyImpulse(cp.v(erebetasayuu, erebetajougestage4), cp.v(0, 0))
        if (erebetajougestage4 <= 110) {
            erebetaflagstage4 = false;
        } else if (erebetajougestage4 >= 600) {
            erebetaflagstage4 = true;
        }
        if (erebetaflagstage4 == false) {
            erebetajougestage4 += 0.5;
        } else if (erebetaflagstage4 == true) {
            erebetajougestage4 -= 0.5;
        }
        //左右動き
        if (erebetasayuustage4 <= 210) {
            erebeta2flagstage4 = false;
        } else if (erebetasayuustage4 >= 320) {
//            erebeta2flagstage4 = true;
        }
        if (erebeta2flagstage4 == false) {
            //erebetasayuustage4 += 0.5;
        } else if (erebeta2flagstage4 == true) {
            erebetasayuustage4 -= 0.5;
        }

        if (miss2 == 0) {
            cc.director.runScene(new loseScene());
            miss2 = 10;
        }

        if (konbeaflag == true) {
            shapestage4.body.applyImpulse(cp.v(35, 0), cp.v(10, 10))
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
            cc.director.runScene(new WinScene());
            stageflag = 4;
            //gameLayerstage4.removeChild(haijama1stage4.image);
            cc.audioEngine.playEffect(res.eyeshine1);
            miss += miss3;
            miss3 = 9999;
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.akaimono) {
            cc.director.runScene(new loseScene());
            cc.audioEngine.playEffect(res.gameover);
            miss3 = 9999;
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.haiiromono) {
            shapestage4.body.applyImpulse(cp.v(30, 530), cp.v(1000, 1000))



        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.ground1) {
            erebeta2flagstage4 = true;
        }

        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.konbea) {
            konbeaflag = true;
        } else {
            konbeaflag = false;
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
            pickedTilesstage4.push(target);

            ueniiku();


        }
    }
});




var touchListenerstage4 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
    swallowTouches: false, // 以降のノードにタッチイベントを渡す

    onTouchBegan: function(touch, event) { // タッチ時
        var pos = touch.getLocation();
        console.log("shapeArraystage4.length:", shapeArraystage4.length)
        // すべてのshapをチェックする
        for (var i = 0; i < shapeArraystage4.length; i++) {
            /*var*/
            shapestage4 = shapeArraystage4[i];
            //shapeground1tage2 = shapeArraystage4[i];
            console.log("shape.type:", i, shapestage4.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
            if (shapestage4.pointQuery(cp.v(pos.x, pos.y)) != undefined) {
                console.log("hit ")
                /*  if (shape.name == SpriteTag.destroyable) {
                      //ブロックをタップしたときは、消去する
                      worldstage4.removeBody(shape.getBody());
                      worldstage4.removeShape(shape);
                      gameLayerstage4.removeChild(shape.image);
                      shapeArraystage4.splice(i, 1);
                      console.log("remove block")
                      return;
                  }
                  else*/
                if (shapestage4.name == SpriteTag.totem) {

                    // トーテムをタップしたときは、衝撃を与える
                    //shape.body.applyImpulse(cp.v(dXstage4 * -2, dY * -2), cp.v(10, 10))
                    dXstage4 = 0;
                    dYstage4 = 0;
                    sawariflagstage4 = true;

                    return;


                }

            }
        }
        // 何も無い場所をタップしたときは箱を追加する

        sawariflagstage4 = false;
        //        gameLayerstage4.addBody(pos.x, pos.y, 24, 24, true, res.brick1x1_png, SpriteTag.destroyable);
        return;

    },
    //下の使わない
    onTouchMoved: function(touch, event) {


    },
    onTouchEnded: function(touch, event) {

        //  shape.body.applyImpulse(cp.v(dXstage4 * -1, dY * -1), cp.v(10, 0))
        console.log("Oh no!!!!");

    },


});

/*
var touchListenerstage4 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) {
        for(var i=shapeArraystage4.length-1;i>=0;i--){
            if(shapeArraystage4[i].pointQuery(cp.v(touch.getLocation().x,touch.getLocation().y))!=undefined){
                if(shapeArraystage4[i].name== SpriteTag.destroyable ){
                    gameLayerstage4.removeChild(shapeArraystage4[i].image);
                    worldstage4.removeBody(shapeArraystage4[i].getBody())
                    worldstage4.removeShape(shapeArraystage4[i])
                    shapeArraystage4.splice(i,1);
                }
            }
        }
    }
});
*/
function ueniiku() {
    //playerSprite.initWithFile(res.paintmansiro2);

    cc.director.runScene(new FirstScene());
    //tekimove(0, -1);
    /*var pause = setTimeout(function() {

    }, 500);
    */
}
