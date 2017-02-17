cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading"))
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.enableRetina(false);
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(880, 720, cc.ResolutionPolicy.NO_BORDER);
    cc.view.resizeWithBrowserSize(true);
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new FirstScene());
    }, this);
};
cc.game.run();
