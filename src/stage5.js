//矢印移動↓
var startTouchstage5;
var endTouchstage5;
var touchingstage5 = false;

var cocos_boxstage5;
var arrow_nodestage5;
var arrow_linestage5;
var debug_label1stage5;
var debug_label2stage5;
//↑矢印
var worldstage5;
var shapeArraystage5 = [];
var sawariflagstage5 = false;
var syokengorosistage5;
var dXstage5 = 0;
var dYstage5 = 0;
var dZstage5 = 0;
var shapestage5;
var shapeground1stage5;
var shapeground2stage5;
var shapeground3stage5;
var shapeground4stage5;
var shapeground5stage5;
var shapeground6stage5;
var shapeground7stage5;
var shapeground8stage5;
var shapeground9stage5;
var shapeground10stage5;
var shapeground11stage5;
var shapeground12stage5;
var shapeground13stage5;
var nanameyuka1stage5;
var nanameyuka2stage5;
var sayuu1stage5;
var midorijama1stage5;
var midorijamp1stage5 = 0;
var akajama1stage5;
var akajamp1stage5 = 0;
var aojama1stage5;
var aojamp1stage5 = 0;
var haijama1stage5;
var haijamp1stage5 = 0;
var yuka;

var syokengorosiflagstage5 = false;
var syokengorosirakkastage5 = 662;
var erebetajougestage5 = 150;
var erebetasayuustage5 = 670;
var erebetaflagstage5 = false;
var erebeta2flagstage5 = false;
var konbeaflag = false;
var erebeta2stage5;
var kurutayuka = 0;
/*var miss2 = 10;
var missText2;

var miss = 0;
var missText;

var miss3 = 9999;
var missText3;
*/
var pickedTilesstage5 = [];
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
var gameLayerstage5;

var gameScene5 = cc.Scene.extend({
    onEnter: function() {
        this._super();
        gameLayerstage5 = new game5();
        gameLayerstage5.init();
        this.addChild(gameLayerstage5, 1);

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            audioEngine.playMusic("res/kazan2.mp3", true);
            //audioEngine.playMusic(res.kurisutarubgm, true);
        }
        //矢印移動はじ
        var size = cc.director.getWinSize();

        debug_label1stage5 = cc.LabelTTF.create("", "Arial", 26);
        debug_label1stage5.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(debug_label1stage5, 1);
        debug_label2stage5 = cc.LabelTTF.create(" ", "Arial", 26);
        debug_label2stage5.setPosition(size.width * 2 / 3, size.height * 0.74);
        this.addChild(debug_label2stage5, 1);

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

        cocos_boxstage5 = cc.Sprite.create( /*res.totem_png*/ );
        cocos_boxstage5.setScale(0.5);
        cocos_boxstage5.setPosition(size.width / 2, size.height / 2);

        this.addChild(cocos_boxstage5, 1);
        //cocos_boxstage5.setVisible(false);

        arrow_nodestage5 = new cc.DrawNode();
        this.addChild(arrow_nodestage5, 10);
        arrow_linestage5 = new cc.DrawNode();
        this.addChild(arrow_linestage5, 11);

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
        arrow_nodestage5.drawPoly(points, fillColor, lineWidth, lineColor);
        arrow_nodestage5.setPosition(size.width / 2, size.height / 2);

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
        startTouchstage5 = touch.getLocation();

        cocos_boxstage5.setPosition(startTouchstage5);
        arrow_nodestage5.setPosition(startTouchstage5);

        return true;
    },
    onTouchMoved: function(touch, event) {
        endTouchstage5 = touch.getLocation();
        touchingstage5 = true;

    },
    onTouchEnded: function(touch, event) {

        endTouchstage5 = touch.getLocation();
        touchingstage5 = false;
        if (sawariflagstage5 == true) {
            shapestage5.body.applyImpulse(cp.v(dXstage5 * -2, dYstage5 * -2), cp.v(10, 0))
            miss2--;
            missText2.setString("残りジャンプできる回数は" + miss2);
        }
        //sawariflagstage5 = true;
        //cc.director.runScene(new MyScene());

    },

    update: function(dt) {
        stagebgm = 4;
        miss3--;
        missText3.setString("ボーナスは" + miss3);
        if (miss3 < 0) {
            miss3 = 0;
        }
        if (touchingstage5 && sawariflagstage5 == true) {

            //現在タッチしているX座標と前回の座標の差分をとる
            arrow_linestage5.setVisible(true);
            arrow_nodestage5.setVisible(true);

            this.calcDirection();
        } else {
            arrow_linestage5.setVisible(false);
            arrow_linestage5.clear();
            arrow_nodestage5.setVisible(false);
            arrow_nodestage5.clear();

        }

    },
    calcDirection: function() {

        /*var*/
        dXstage5 = endTouchstage5.x - startTouchstage5.x;
        /*var*/
        dYstage5 = endTouchstage5.y - startTouchstage5.y;
        /*var*/
        dZstage5 = Math.sqrt(dXstage5 * dXstage5 + dYstage5 * dYstage5);

        //  debug_label1stage5.setString(Math.floor(dZstage5 * Math.pow(10, 2)) / Math.pow(10, 2));

        //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
        if (dZstage5 > 60) {

            //  if (Math.abs(dXstage5) > 5 || Math.abs(dYstage5) > 5) {
            //角度（ラジアン）を求める
            var radian = Math.atan2(dYstage5, dXstage5)
            //角度（ラジアン）を角度（度数）に変換
            var angle = radian * 180 / Math.PI;
            //矢印を回転させる

            //前回の描画を消す
            arrow_linestage5.clear();
            arrow_nodestage5.clear();

            var pos = cocos_boxstage5.getPosition();

            //ドラックした長さを矢印のしっぽの位置にする
            var points = [new cc.Point(0, 0),
                new cc.Point(-35, -35),
                new cc.Point(-15, -35),
                new cc.Point(0, -(dZstage5 - 10)),
                new cc.Point(15, -35),
                new cc.Point(35, -35),
            ]

            //矢印を描画する
            var fillColor = new cc.Color(128, 228, 78, 240);
            var lineWidth = 1;
            var lineColor = new cc.Color(255, 255, 255, 128);
            arrow_nodestage5.drawPoly(points, fillColor, lineWidth, lineColor);
            //矢印はもともと270度の位置にあるので、回転角度を減算する
            arrow_nodestage5.setRotation(270 - angle);

        }

        //矢印移動おわ

    }
});

var game5 = cc.Layer.extend({
    init: function() {
        this._super();

        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
        this.addChild(backgroundLayer);
        worldstage5 = new cp.Space();
        worldstage5.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(worldstage5);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);


        var wallBottom = new cp.SegmentShape(worldstage5.staticBody,
            cp.v(-4294967294, -100), // start point
            cp.v(4294967295, -100), // MAX INT:4294967295
            0); // thickness of wall
        worldstage5.addStaticShape(wallBottom);
        //雪山の拝啓はここ
        var haikei = cc.Sprite.create(res.kazan);
        haikei.setPosition(470, 370);
        haikei.setScale(0.7, 0.7);
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

        this.addBody(800, 608, 50, 50, true, res.totem_png, SpriteTag.totem);
        this.addBody(514, 592, 50, 50, false, res.yokotoge, SpriteTag.akaimono);
        this.addBody(514, 532, 50, 50, false, res.yokotoge, SpriteTag.akaimono);
        this.addBody(224, 662, 70, 50, false, res.sitatoge, SpriteTag.akaimono);
        this.addBody(404, 662, 50, 50, false, res.sitatoge, SpriteTag.akaimono);
        this.addBody(00, 00, 56, 416, false, res.maguma, SpriteTag.sinu);
        //    this.addBody(90, 575, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        //  this.addBody(700, 180, 150, 30, false, res.sayuuerebeta, SpriteTag.ground1);
        //    this.addBody(30, 110, 200, 50, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(20, 00, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(165, 00, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(235, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(305, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(375, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(445, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(515, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(585, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(655, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        //this.addBody(655, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(725, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(795, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(865, 0, 56, 416, false, res.maguma, SpriteTag.sinu);
        this.addBody(150, 365, 50, 50, false, res.magumayuka, SpriteTag.ground);

        this.addBody(325, 370, 150, 30, false, res.sayuuerebeta, SpriteTag.ground);
        this.addBody(845, 570, 150, 30, false, res.sayuuerebeta, SpriteTag.ground);
        this.addBody(530, 270, 150, 30, false, res.sayuuerebeta, SpriteTag.ground);
        //this.addBody(645, 310, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        //this.addBody(700, 10, 200, 40, false, res.kikaiyuka2, SpriteTag.ground);
        this.addBody(20, 570, 30, 150, false, res.magumakabe, SpriteTag.ground);
        this.addBody(20, 370, 30, 150, false, res.magumakabe, SpriteTag.ground);
        this.addBody(270, 295, 50, 50, false, res.magumayuka, SpriteTag.ground);
        this.addBody(165, 618, 50, 50, false, res.magumayuka, SpriteTag.ground);
        this.addBody(273, 470, 30, 150, false, res.magumakabe, SpriteTag.ground);
        this.addBody(473, 570, 30, 150, false, res.magumakabe, SpriteTag.ground);
        //this.addBody(855, 100, 40, 200, false, res.kikaiyuka3, SpriteTag.ground);
        //this.addBody(110, 200, 50, 480, true, res.icegroundwall, SpriteTag.ground);
        this.addBody(325, 700, 150, 30, false, res.sayuuerebeta, SpriteTag.ground);
        this.addBody(530, 700, 150, 30, false, res.sayuuerebeta, SpriteTag.ground);
        this.addBody(145, 250, 150, 30, false, res.sayuuerebeta, SpriteTag.ground1);
        this.addBody(120, 700, 150, 30, false, res.sayuuerebeta, SpriteTag.ground);
        this.addBody(165, 500, 30, 150, false, res.magumakabe, SpriteTag.ground);



        this.addBody(70, 632, 50, 50, false, res.medamayaki, SpriteTag.gooru);
        this.addBody(500, -10, 6000000, 10, false, res.w, SpriteTag.sinu);


        this.scheduleUpdate();
        cc.eventManager.addListener(touchListenerstage5, this);
        worldstage5.setDefaultCollisionHandler(this.collisionBegin, null, null, null);

    },
    addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {

        if (isDynamic) {
            var body = new cp.Body(1, cp.momentForBox(1, width, height));
        } else {
            var body = new cp.Body(Infinity, Infinity);
        }
        body.setPos(cp.v(posX, posY));
        var bodySprite = cc.Sprite.create(spriteImage);
        gameLayerstage5.addChild(bodySprite, 0);
        bodySprite.setPosition(posX, posY);
        if (isDynamic) {
            worldstage5.addBody(body);
        }

        shapestage5 = new cp.BoxShape(body, width, height);
        shapestage5.setFriction(1);
        shapestage5.setElasticity(0);
        shapestage5.name = type;
        shapestage5.setCollisionType(type);
        shapestage5.image = bodySprite;
        worldstage5.addShape(shapestage5);
        shapeArraystage5.push(shapestage5);
        //        shapestage5 = shapeArraystage5[0];

        shapeground1stage5 = new cp.BoxShape(body, width, height);

        shapeground1stage5 = shapeArraystage5[5];

        shapeground2stage5 = new cp.BoxShape(body, width, height);

        shapeground2stage5 = shapeArraystage5[6];

        shapeground3stage5 = new cp.BoxShape(body, width, height);

        shapeground3stage5 = shapeArraystage5[7];

        shapeground4stage5 = new cp.BoxShape(body, width, height);

        shapeground4stage5 = shapeArraystage5[8];

        shapeground5stage5 = new cp.BoxShape(body, width, height);

        shapeground5stage5 = shapeArraystage5[9];

        shapeground6stage5 = new cp.BoxShape(body, width, height);

        shapeground6stage5 = shapeArraystage5[10];

        shapeground7stage5 = new cp.BoxShape(body, width, height);

        shapeground7stage5 = shapeArraystage5[11];

        shapeground8stage5 = new cp.BoxShape(body, width, height);

        shapeground8stage5 = shapeArraystage5[12];

        shapeground9stage5 = new cp.BoxShape(body, width, height);

        shapeground9stage5 = shapeArraystage5[13];

        shapeground10stage5 = new cp.BoxShape(body, width, height);

        shapeground10stage5 = shapeArraystage5[14];

        shapeground11stage5 = new cp.BoxShape(body, width, height);

        shapeground11stage5 = shapeArraystage5[15];

        shapeground12stage5 = new cp.BoxShape(body, width, height);

        shapeground12stage5 = shapeArraystage5[16];

        shapeground13stage5 = new cp.BoxShape(body, width, height);

        shapeground13stage5 = shapeArraystage5[17];

        syokengorosistage5 = new cp.BoxShape(body, width, height);

        syokengorosistage5 = shapeArraystage5[3];

        erebeta2stage5 = new cp.BoxShape(body, width, height);

        erebeta2stage5 = shapeArraystage5[6];

        /*      nanameyuka1stage5 = new cp.BoxShape(body, width, height);
        nanameyuka1stage5.setFriction(1);
        nanameyuka1stage5.setElasticity(0);
        nanameyuka1stage5.name = type;
        nanameyuka1stage5.setCollisionType(type);
        nanameyuka1stage5.image = bodySprite;
        worldstage5.addShape(nanameyuka1stage5);

        nanameyuka1stage5 = shapeArraystage5[13];

        nanameyuka2stage5 = new cp.BoxShape(body, width, height);
        nanameyuka2stage5.setFriction(1);
        nanameyuka2stage5.setElasticity(0);
        nanameyuka2stage5.name = type;
        nanameyuka2stage5.setCollisionType(type);
        nanameyuka2stage5.image = bodySprite;
        worldstage5.addShape(nanameyuka2stage5);

        nanameyuka2stage5 = shapeArraystage5[11];
*/
        midorijama1stage5 = new cp.BoxShape(body, width, height);


        midorijama1stage5 = shapeArraystage5[1];

        akajama1stage5 = new cp.BoxShape(body, width, height);



        akajama1stage5 = shapeArraystage5[2];

        aojama1stage5 = new cp.BoxShape(body, width, height);


        aojama1stage5 = shapeArraystage5[3];

        haijama1stage5 = new cp.BoxShape(body, width, height);


        haijama1stage5 = shapeArraystage5[4];

        sayuu1stage5 = new cp.BoxShape(body, width, height);


        sayuu1stage5 = shapeArraystage5[7];
        //cc.Sprite.create(res.akateki);


        /*berutokonbea1stage5 = new cp.BoxShape(body, width, height);
        berutokonbea1stage5.setFriction(1);
        berutokonbea1stage5.setElasticity(0);
        berutokonbea1stage5.name = type;
        berutokonbea1stage5.setCollisionType(type);
        berutokonbea1stage5.image = bodySprite;
        worldstage5.addShape(berutokonbea1stage5);
        berutokonbea1stage5 = shapeArraystage5[4];
        */

    },
    update: function(dt) {

        kurutayuka += 0.005;
        //  nanameyuka1stage5.body.setAngle(150);
        //nanameyuka2stage5.body.setAngle(66.5);
        shapeground1stage5.body.setPos(cp.v(90, erebetajougestage5))
        shapeground2stage5.body.setPos(cp.v(165, erebetajougestage5))
        shapeground3stage5.body.setPos(cp.v(235, erebetajougestage5))
        shapeground4stage5.body.setPos(cp.v(305, erebetajougestage5))
        shapeground5stage5.body.setPos(cp.v(375, erebetajougestage5))
        shapeground6stage5.body.setPos(cp.v(445, erebetajougestage5))
        shapeground7stage5.body.setPos(cp.v(515, erebetajougestage5))
        shapeground8stage5.body.setPos(cp.v(585, erebetajougestage5))
        shapeground9stage5.body.setPos(cp.v(655, erebetajougestage5))
        shapeground10stage5.body.setPos(cp.v(20, erebetajougestage5))
        shapeground11stage5.body.setPos(cp.v(725, erebetajougestage5))
        shapeground12stage5.body.setPos(cp.v(795, erebetajougestage5))
        shapeground13stage5.body.setPos(cp.v(865, erebetajougestage5))
        syokengorosistage5.body.setPos(cp.v(224, syokengorosirakkastage5))
        //  erebeta2stage5.body.setPos(cp.v(500, 250))
        //    erebeta2stage5.body.setAngle(kurutayuka);
        //  sayuu1stage5.body.setPos(cp.v(erebetasayuustage5, 160))
        //        shape.body.setPos(cp.v(1, 1))
        midorijamp1stage5 += 1;
        if (syokengorosiflagstage5 == true){
          syokengorosirakkastage5 -= 10;
        }
        if (midorijamp1stage5 == 200) {
            midorijama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
        }
        if (midorijamp1stage5 == 400) {
            midorijama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
            midorijamp1stage5 = -100;
        }
        akajamp1stage5 += 1;
        if (akajamp1stage5 == 200) {
            akajama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
        }
        if (akajamp1stage5 == 250) {
            akajama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))

        }
        if (akajamp1stage5 == 350) {
            akajama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
        }
        if (akajamp1stage5 == 400) {
            akajama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
            akajamp1stage5 = -100;
        }

        aojamp1stage5 += 1;
        if (aojamp1stage5 == 100) {
            aojama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
        }
        if (aojamp1stage5 == 200) {
            aojama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))

        }
        if (aojamp1stage5 == 300) {
            aojama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))

        }
        if (aojamp1stage5 == 400) {
            aojama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
            aojamp1stage5 = 0;
        }
        haijamp1stage5 += 1;
        if (haijamp1stage5 == 200) {
            haijama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
        }
        if (haijamp1stage5 == 400) {
            haijama1stage5.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
            haijamp1stage5 = -100;
        }
        worldstage5.step(dt);
        for (var i = shapeArraystage5.length - 1; i >= 0; i--) {
            shapeArraystage5[i].image.x = shapeArraystage5[i].body.p.x
            shapeArraystage5[i].image.y = shapeArraystage5[i].body.p.y
            var angle = Math.atan2(-shapeArraystage5[i].body.rot.y, shapeArraystage5[i].body.rot.x);
            shapeArraystage5[i].image.rotation = angle * 57.2957795;

        }
        //        shapeground1tage2.body.applyImpulse(cp.v(erebetasayuu, erebetajougestage5), cp.v(0, 0))
        if (erebetajougestage5 <= -200) {
            erebetaflagstage5 = false;
        } else if (erebetajougestage5 >= 150) {
            erebetaflagstage5 = true;
        }
        if (erebetaflagstage5 == false) {
            erebetajougestage5 += 0.5;
        } else if (erebetaflagstage5 == true) {
            erebetajougestage5 -= 0.5;
        }
        //左右動き
        if (erebetasayuustage5 <= 210) {
            erebeta2flagstage5 = false;
        } else if (erebetasayuustage5 >= 320) {
            //            erebeta2flagstage5 = true;
        }
        if (erebeta2flagstage5 == false) {
            //erebetasayuustage5 += 0.5;
        } else if (erebeta2flagstage5 == true) {
            erebetasayuustage5 -= 0.5;
        }

        if (miss2 == 0) {
            cc.director.runScene(new loseScene());
            miss2 = 10;
        }

        if (konbeaflag == true) {
            shapestage5.body.applyImpulse(cp.v(35, 0), cp.v(10, 10))
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
            cc.director.runScene(new FirstScene());
            stageflag = 0;
            //gameLayerstage5.removeChild(haijama1stage5.image);
            cc.audioEngine.playEffect(res.eyeshine1);
            miss += miss3;
            miss3 = 9999;
            audioEngine.stopMusic();
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.akaimono) {
            cc.director.runScene(new loseScene());
            cc.audioEngine.playEffect(res.gameover);
            miss3 = 9999;
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.haiiromono) {
            shapestage5.body.applyImpulse(cp.v(30, 530), cp.v(1000, 1000))



        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.ground1) {
            erebeta2flagstage5 = true;
            syokengorosiflagstage5 = true;
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
            pickedTilesstage5.push(target);

            ueniiku();


        }
    }
});




var touchListenerstage5 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
    swallowTouches: false, // 以降のノードにタッチイベントを渡す

    onTouchBegan: function(touch, event) { // タッチ時
        var pos = touch.getLocation();
        console.log("shapeArraystage5.length:", shapeArraystage5.length)
        // すべてのshapをチェックする
        for (var i = 0; i < shapeArraystage5.length; i++) {
            /*var*/
            shapestage5 = shapeArraystage5[i];
            //shapeground1tage2 = shapeArraystage5[i];
            console.log("shape.type:", i, shapestage5.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
            if (shapestage5.pointQuery(cp.v(pos.x, pos.y)) != undefined) {
                console.log("hit ")
                /*  if (shape.name == SpriteTag.destroyable) {
                      //ブロックをタップしたときは、消去する
                      worldstage5.removeBody(shape.getBody());
                      worldstage5.removeShape(shape);
                      gameLayerstage5.removeChild(shape.image);
                      shapeArraystage5.splice(i, 1);
                      console.log("remove block")
                      return;
                  }
                  else*/
                if (shapestage5.name == SpriteTag.totem) {

                    // トーテムをタップしたときは、衝撃を与える
                    //shape.body.applyImpulse(cp.v(dXstage5 * -2, dY * -2), cp.v(10, 10))
                    dXstage5 = 0;
                    dYstage5 = 0;
                    sawariflagstage5 = true;

                    return;


                }

            }
        }
        // 何も無い場所をタップしたときは箱を追加する

        sawariflagstage5 = false;
        //        gameLayerstage5.addBody(pos.x, pos.y, 24, 24, true, res.brick1x1_png, SpriteTag.destroyable);
        return;

    },
    //下の使わない
    onTouchMoved: function(touch, event) {


    },
    onTouchEnded: function(touch, event) {

        //  shape.body.applyImpulse(cp.v(dXstage5 * -1, dY * -1), cp.v(10, 0))
        console.log("Oh no!!!!");

    },


});

/*
var touchListenerstage5 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) {
        for(var i=shapeArraystage5.length-1;i>=0;i--){
            if(shapeArraystage5[i].pointQuery(cp.v(touch.getLocation().x,touch.getLocation().y))!=undefined){
                if(shapeArraystage5[i].name== SpriteTag.destroyable ){
                    gameLayerstage5.removeChild(shapeArraystage5[i].image);
                    worldstage5.removeBody(shapeArraystage5[i].getBody())
                    worldstage5.removeShape(shapeArraystage5[i])
                    shapeArraystage5.splice(i,1);
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
