//矢印移動↓
var startTouchstage2;
var endTouchstage2;
var touchingstage2 = false;

var cocos_boxstage2;
var arrow_nodestage2;
var arrow_linestage2;
var debug_label1stage2;
var debug_label2stage2;
//↑矢印
var worldstage2;
var shapeArraystage2 = [];
var sawariflagstage2 = false;

var dXstage2 = 0;
var dYstage2 = 0;
var dZstage2 = 0;
var shapestage2;
var shapeground1stage2;
var nanameyuka1stage2;
var nanameyuka2stage2;
var midorijama1stage2;
var midorijamp1stage2 = 0;
var akajama1stage2;
var akajamp1stage2 = 0;
var aojama1stage2;
var aojamp1stage2 = 0;
var haijama1stage2;
var haijamp1stage2 = 0;
var yuka;

var erebetajougestage2 = 150;
var erebetasayuu = 0;
var erebetaflagstage2 = false;

var kusari1stage2;
var kusari2stage2;
var kusari3stage2;
var kusari4stage2;
var kusari5stage2;
var kusari6stage2;
var kusari7stage2;
/*var miss2 = 10;
var missText2;

var miss = 0;
var missText;

var miss3 = 9999;
var missText3;
*/
var pickedTilesstage2 = [];
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
    SpriteTag.sinu = 44; //落下死
    SpriteTag.hidari = 21; //左右エれべタ
};
var gameLayerstage2;

var gameScene2 = cc.Scene.extend({
    onEnter: function() {
        this._super();
        gameLayerstage2 = new game2();
        gameLayerstage2.init();
        this.addChild(gameLayerstage2, 1);

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            audioEngine.playMusic("res/mori.mp3", true);
            //audioEngine.playMusic(res.kurisutarubgm, true);
        }
        //矢印移動はじ
        var size = cc.director.getWinSize();

        debug_label1stage2 = cc.LabelTTF.create("", "Arial", 26);
        debug_label1stage2.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(debug_label1stage2, 1);
        debug_label2stage2 = cc.LabelTTF.create(" ", "Arial", 26);
        debug_label2stage2.setPosition(size.width * 2 / 3, size.height * 0.74);
        this.addChild(debug_label2stage2, 1);

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

        cocos_boxstage2 = cc.Sprite.create( /*res.totem_png*/ );
        cocos_boxstage2.setScale(0.5);
        cocos_boxstage2.setPosition(size.width / 2, size.height / 2);

        this.addChild(cocos_boxstage2, 1);
        //cocos_boxstage2.setVisible(false);

        arrow_nodestage2 = new cc.DrawNode();
        this.addChild(arrow_nodestage2, 10);
        arrow_linestage2 = new cc.DrawNode();
        this.addChild(arrow_linestage2, 11);

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
        arrow_nodestage2.drawPoly(points, fillColor, lineWidth, lineColor);
        arrow_nodestage2.setPosition(size.width / 2, size.height / 2);

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
        startTouchstage2 = touch.getLocation();

        cocos_boxstage2.setPosition(startTouchstage2);
        arrow_nodestage2.setPosition(startTouchstage2);

        return true;
    },
    onTouchMoved: function(touch, event) {
        endTouchstage2 = touch.getLocation();
        touchingstage2 = true;

    },
    onTouchEnded: function(touch, event) {

        endTouchstage2 = touch.getLocation();
        touchingstage2 = false;
        if (sawariflagstage2 == true) {
            shapestage2.body.applyImpulse(cp.v(dXstage2 * -2, dYstage2 * -2), cp.v(10, 0))
            miss2--;
            missText2.setString("残りジャンプできる回数は" + miss2);
        }
        //sawariflagstage2 = true;
        //cc.director.runScene(new MyScene());

    },

    update: function(dt) {
        stagebgm = 2;
        miss3--;
        missText3.setString("ボーナスは" + miss3);
        if (miss3 < 0) {
            miss3 = 0;
        }
        if (touchingstage2 && sawariflagstage2 == true) {

            //現在タッチしているX座標と前回の座標の差分をとる
            arrow_linestage2.setVisible(true);
            arrow_nodestage2.setVisible(true);

            this.calcDirection();
        } else {
            arrow_linestage2.setVisible(false);
            arrow_linestage2.clear();
            arrow_nodestage2.setVisible(false);
            arrow_nodestage2.clear();

        }

    },
    calcDirection: function() {

        /*var*/
        dXstage2 = endTouchstage2.x - startTouchstage2.x;
        /*var*/
        dYstage2 = endTouchstage2.y - startTouchstage2.y;
        /*var*/
        dZstage2 = Math.sqrt(dXstage2 * dXstage2 + dYstage2 * dYstage2);

        //  debug_label1stage2.setString(Math.floor(dZstage2 * Math.pow(10, 2)) / Math.pow(10, 2));

        //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
        if (dZstage2 > 60) {

            //  if (Math.abs(dXstage2) > 5 || Math.abs(dYstage2) > 5) {
            //角度（ラジアン）を求める
            var radian = Math.atan2(dYstage2, dXstage2)
            //角度（ラジアン）を角度（度数）に変換
            var angle = radian * 180 / Math.PI;
            //矢印を回転させる

            //前回の描画を消す
            arrow_linestage2.clear();
            arrow_nodestage2.clear();

            var pos = cocos_boxstage2.getPosition();

            //ドラックした長さを矢印のしっぽの位置にする
            var points = [new cc.Point(0, 0),
                new cc.Point(-35, -35),
                new cc.Point(-15, -35),
                new cc.Point(0, -(dZstage2 - 10)),
                new cc.Point(15, -35),
                new cc.Point(35, -35),
            ]

            //矢印を描画する
            var fillColor = new cc.Color(128, 228, 78, 240);
            var lineWidth = 1;
            var lineColor = new cc.Color(255, 255, 255, 128);
            arrow_nodestage2.drawPoly(points, fillColor, lineWidth, lineColor);
            //矢印はもともと270度の位置にあるので、回転角度を減算する
            arrow_nodestage2.setRotation(270 - angle);

        }

        //矢印移動おわ

    }
});

var game2 = cc.Layer.extend({
    init: function() {
        this._super();

        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
        this.addChild(backgroundLayer);
        worldstage2 = new cp.Space();
        worldstage2.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(worldstage2);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);


        var wallBottom = new cp.SegmentShape(worldstage2.staticBody,
            cp.v(-4294967294, -100), // start point
            cp.v(4294967295, -100), // MAX INT:4294967295
            0); // thickness of wall
        worldstage2.addStaticShape(wallBottom);
        //雪山の拝啓はここ
        var haikei = cc.Sprite.create(res.haikeimori);
        haikei.setPosition(240, 200);
        haikei.setScale(1);
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

        this.addBody(50, 150, 50, 50, true, res.totem_png, SpriteTag.totem);
        this.addBody(694, 232, 50, 50, true, res.midoriteki, SpriteTag.destroyable);
        this.addBody(185, 610, 150, 75, false, res.kusattaki, SpriteTag.kusariki);
        this.addBody(640, 110, 150, 75, false, res.kusattaki, SpriteTag.kusariki2);
        this.addBody(235, 110, 150, 75, false, res.kusattaki, SpriteTag.kusariki3);
        this.addBody(655, 380, 150, 75, false, res.kusattaki, SpriteTag.kusariki4);
        this.addBody(340, 610, 150, 75, false, res.kusattaki, SpriteTag.kusariki5);
        this.addBody(495, 610, 150, 75, false, res.kusattaki, SpriteTag.kusariki6);
        this.addBody(495, 690, 150, 75, false, res.kusattaki, SpriteTag.kusariki7);
        //this.addBody(204, 532, 50, 50, true, res.akateki, SpriteTag.akaimono);
        //this.addBody(354, 532, 50, 50, true, res.aoteki, SpriteTag.akaimono);
        //this.addBody(354, 132, 50, 50, true, res.haiteki, SpriteTag.haiiromono);
        //this.addBody(340, 200, 85, 20, false, res.erebeta, SpriteTag.ground1);
        this.addBody(400, 110, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(80, 110, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(180, 450, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(335, 530, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(490, 530, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(665, 580, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(335, 450, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(30, 530, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(25, 450, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(25, 690, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(180, 690, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(335, 690, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(940, 270, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(805, 190, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(940, 490, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(490, 300, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(330, 370, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(820, 380, 150, 75, false, res.hutuunoki, SpriteTag.ground);
        this.addBody(25, 790, 11150, 75, false, res.hutuunoki, SpriteTag.ground);

        this.addBody(200, 532, 50, 50, false, res.medamayaki, SpriteTag.gooru);
        this.addBody(500, -100, 60000, 10, false, res.w, SpriteTag.sinu);

        this.scheduleUpdate();
        cc.eventManager.addListener(touchListenerstage2, this);
        worldstage2.setDefaultCollisionHandler(this.collisionBegin, null, null, null);

    },
    addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {

        if (isDynamic) {
            var body = new cp.Body(1, cp.momentForBox(1, width, height));
        } else {
            var body = new cp.Body(Infinity, Infinity);
        }
        body.setPos(cp.v(posX, posY));
        var bodySprite = cc.Sprite.create(spriteImage);
        gameLayerstage2.addChild(bodySprite, 0);
        bodySprite.setPosition(posX, posY);
        if (isDynamic) {
            worldstage2.addBody(body);
        }

        shapestage2 = new cp.BoxShape(body, width, height);
        shapestage2.setFriction(1);
        shapestage2.setElasticity(0);
        shapestage2.name = type;
        shapestage2.setCollisionType(type);
        shapestage2.image = bodySprite;
        worldstage2.addShape(shapestage2);
        shapeArraystage2.push(shapestage2);
        //  shapestage2 = shapeArraystage2[0];

        shapeground1stage2 = new cp.BoxShape(body, width, height);

        //shapeArraystage2.push(shapeground1tage2);
        //shapeground1tage2 = SpriteTag.totem;
        shapeground1stage2 = shapeArraystage2[5];
        //shape.body.setPos(cp.v(1, 1))

        nanameyuka1stage2 = new cp.BoxShape(body, width, height);


        nanameyuka1stage2 = shapeArraystage2[14];

        nanameyuka2stage2 = new cp.BoxShape(body, width, height);


        nanameyuka2stage2 = shapeArraystage2[11];

        midorijama1stage2 = new cp.BoxShape(body, width, height);


        midorijama1stage2 = shapeArraystage2[1];
        /*
                akajama1stage2 = new cp.BoxShape(body, width, height);
                akajama1stage2.setFriction(1);
                akajama1stage2.setElasticity(0);
                akajama1stage2.name = type;
                akajama1stage2.setCollisionType(type);
                akajama1stage2.image = bodySprite;
                worldstage2.addShape(akajama1stage2);

                akajama1stage2 = shapeArraystage2[2];
                */
        /*
                aojama1stage2 = new cp.BoxShape(body, width, height);
                aojama1stage2.setFriction(1);
                aojama1stage2.setElasticity(0);
                aojama1stage2.name = type;
                aojama1stage2.setCollisionType(type);
                aojama1stage2.image = bodySprite;
                worldstage2.addShape(aojama1stage2);
                aojama1stage2 = shapeArraystage2[3];
                */
        /*
                haijama1stage2 = new cp.BoxShape(body, width, height);
                haijama1stage2.setFriction(1);
                haijama1stage2.setElasticity(0);
                haijama1stage2.name = type;
                haijama1stage2.setCollisionType(type);
                haijama1stage2.image = bodySprite;
                worldstage2.addShape(haijama1stage2);
                haijama1stage2 = shapeArraystage2[4];
          */ //cc.Sprite.create(res.akateki);
        kusari1stage2 = new cp.BoxShape(body, width, height);

        kusari1stage2 = shapeArraystage2[2];

        kusari2stage2 = new cp.BoxShape(body, width, height);

        kusari2stage2 = shapeArraystage2[3];

        kusari3stage2 = new cp.BoxShape(body, width, height);

        kusari3stage2 = shapeArraystage2[4];

        kusari4stage2 = new cp.BoxShape(body, width, height);

        kusari4stage2 = shapeArraystage2[5];

        kusari5stage2 = new cp.BoxShape(body, width, height);

        kusari5stage2 = shapeArraystage2[6];

        kusari6stage2 = new cp.BoxShape(body, width, height);

        kusari6stage2 = shapeArraystage2[7];

        kusari7stage2 = new cp.BoxShape(body, width, height);

        kusari7stage2 = shapeArraystage2[8];

    },
    update: function(dt) {

        nanameyuka1stage2.body.setAngle(150.4);
        //      nanameyuka2stage2.body.setAngle(66.5);
        //kusari1stage2.body.setPos(cp.v(500, erebetajougestage2))

        //        shape.body.setPos(cp.v(1, 1))
        midorijamp1stage2 += 1;
        if (midorijamp1stage2 == 200) {
            midorijama1stage2.body.applyImpulse(cp.v(0, 100), cp.v(0, 100))
        }
        if (midorijamp1stage2 == 400) {
            midorijama1stage2.body.applyImpulse(cp.v(0, 200), cp.v(0, 0))
            midorijamp1stage2 = -100;
        }
        /*        akajamp1stage2 += 1;
                if (akajamp1stage2 == 200) {
                    akajama1stage2.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
                }
                if (akajamp1stage2 == 250) {
                    akajama1stage2.body.applyImpulse(cp.v(0, -100), cp.v(0, 0))

                }
                if (akajamp1stage2 == 350) {
                    akajama1stage2.body.applyImpulse(cp.v(0, 150), cp.v(0, 0))
                }
                if (akajamp1stage2 == 400) {
                    akajama1stage2.body.applyImpulse(cp.v(0, -100), cp.v(0, 0))
                    akajamp1stage2 = -100;
                }

                aojamp1stage2 += 1;
                if (aojamp1stage2 == 100) {
                    aojama1stage2.body.applyImpulse(cp.v(-20, 80), cp.v(0, 0))
                }
                if (aojamp1stage2 == 200) {
                    aojama1stage2.body.applyImpulse(cp.v(20, 80), cp.v(0, 0))

                }
                if (aojamp1stage2 == 300) {
                    aojama1stage2.body.applyImpulse(cp.v(20, 80), cp.v(0, 0))

                }
                if (aojamp1stage2 == 400) {
                    aojama1stage2.body.applyImpulse(cp.v(-20, 80), cp.v(0, 0))
                    aojamp1stage2 = 0;
                }
                haijamp1stage2 += 1;
                if (haijamp1stage2 == 200) {
                    haijama1stage2.body.applyImpulse(cp.v(0, 100), cp.v(30, 30))
                }
                if (haijamp1stage2 == 400) {
                    haijama1stage2.body.applyImpulse(cp.v(0, 100), cp.v(-30, -30))
                    haijamp1stage2 = -100;
                }
                */
        worldstage2.step(dt);
        for (var i = shapeArraystage2.length - 1; i >= 0; i--) {
            shapeArraystage2[i].image.x = shapeArraystage2[i].body.p.x
            shapeArraystage2[i].image.y = shapeArraystage2[i].body.p.y
            var angle = Math.atan2(-shapeArraystage2[i].body.rot.y, shapeArraystage2[i].body.rot.x);
            shapeArraystage2[i].image.rotation = angle * 57.2957795;

        }
        //        shapeground1tage2.body.applyImpulse(cp.v(erebetasayuu, erebetajougestage2), cp.v(0, 0))
        if (erebetajougestage2 <= 110) {
            erebetaflagstage2 = false;
        } else if (erebetajougestage2 >= 320) {
            erebetaflagstage2 = true;
        }
        if (erebetaflagstage2 == false) {
            erebetajougestage2 += 0.5;
        } else if (erebetaflagstage2 == true) {
            erebetajougestage2 -= 0.5;
        }

        if (miss2 == 0) {
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
            cc.director.runScene(new WinScene());
            stageflag = 2;
            //gameLayerstage2.removeChild(haijama1stage2.image);
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
            shapestage2.body.applyImpulse(cp.v(30, 30), cp.v(1000, 1000))

        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.kusariki) {
            kusari1stage2.body.setPos(cp.v(-1000, -1000))
            //gameLayerstage2.removeChild(kusari1stage2.image);
            //  shapeArraystage2.splice(i, 1);

        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.kusariki2) {
            kusari2stage2.body.setPos(cp.v(-1100, -1100))
            //gameLayerstage2.removeChild(kusari2stage2.image);
            //  shapeArraystage2.splice(i, 1);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.kusariki3) {
            kusari3stage2.body.setPos(cp.v(-1200, -1200))
            //gameLayerstage2.removeChild(kusari3stage2.image);
            //shapeArraystage2.splice(i, 1);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.kusariki4) {
            kusari4stage2.body.setPos(cp.v(-1300, -1300))
            //gameLayerstage2.removeChild(kusari4stage2.image);
            //shapeArraystage2.splice(i, 1);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.kusariki5) {
            kusari5stage2.body.setPos(cp.v(-1300, -4300))
            //gameLayerstage2.removeChild(kusari4stage2.image);
            //shapeArraystage2.splice(i, 1);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.kusariki6) {
            kusari6stage2.body.setPos(cp.v(-1300, -2300))
            //gameLayerstage2.removeChild(kusari4stage2.image);
            //shapeArraystage2.splice(i, 1);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.kusariki7) {
            kusari7stage2.body.setPos(cp.v(-1500, -1300))
            //gameLayerstage2.removeChild(kusari4stage2.image);
            //shapeArraystage2.splice(i, 1);
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
            pickedTilesstage2.push(target);

            ueniiku();


        }
    }
});


var touchListenerstage2 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
    swallowTouches: false, // 以降のノードにタッチイベントを渡す

    onTouchBegan: function(touch, event) { // タッチ時
        var pos = touch.getLocation();
        console.log("shapeArraystage2.length:", shapeArraystage2.length)
        // すべてのshapをチェックする
        for (var i = 0; i < shapeArraystage2.length; i++) {
            /*var*/
            shapestage2 = shapeArraystage2[i];
            //shapeground1tage2 = shapeArraystage2[i];
            console.log("shape.type:", i, shapestage2.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
            if (shapestage2.pointQuery(cp.v(pos.x, pos.y)) != undefined) {
                console.log("hit ")
                /*  if (shape.name == SpriteTag.destroyable) {
                      //ブロックをタップしたときは、消去する
                      worldstage2.removeBody(shape.getBody());
                      worldstage2.removeShape(shape);
                      gameLayerstage2.removeChild(shape.image);
                      shapeArraystage2.splice(i, 1);
                      console.log("remove block")
                      return;
                  }
                  else*/
                if (shapestage2.name == SpriteTag.totem) {

                    // トーテムをタップしたときは、衝撃を与える
                    //shape.body.applyImpulse(cp.v(dXstage2 * -2, dY * -2), cp.v(10, 10))
                    dXstage2 = 0;
                    dYstage2 = 0;
                    sawariflagstage2 = true;

                    return;


                }

            }
        }
        // 何も無い場所をタップしたときは箱を追加する

        sawariflagstage2 = false;
        //        gameLayerstage2.addBody(pos.x, pos.y, 24, 24, true, res.brick1x1_png, SpriteTag.destroyable);
        return;

    },
    //下の使わない
    onTouchMoved: function(touch, event) {


    },
    onTouchEnded: function(touch, event) {

        //  shape.body.applyImpulse(cp.v(dXstage2 * -1, dY * -1), cp.v(10, 0))
        console.log("Oh no!!!!");

    },


});

/*
var touchListenerstage2 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) {
        for(var i=shapeArraystage2.length-1;i>=0;i--){
            if(shapeArraystage2[i].pointQuery(cp.v(touch.getLocation().x,touch.getLocation().y))!=undefined){
                if(shapeArraystage2[i].name== SpriteTag.destroyable ){
                    gameLayerstage2.removeChild(shapeArraystage2[i].image);
                    worldstage2.removeBody(shapeArraystage2[i].getBody())
                    worldstage2.removeShape(shapeArraystage2[i])
                    shapeArraystage2.splice(i,1);
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
