$(function(){
    cardo0 = new _Cardo_Enemy_(0).appendTo($("#enemy"));
    cardo1 = new _Cardo_Enemy_(1).appendTo($("#enemy"));
    cardo2 = new _Cardo_Enemy_(2).appendTo($("#enemy"));
    cardo3 = new _Cardo_Enemy_(3).appendTo($("#enemy"));
    cardo4 = new _Cardo_Enemy_(4).appendTo($("#enemy"));
    cardo5 = new _Cardo_Enemy_(5).appendTo($("#enemy"));

    enemy_cardo_slot = [];
    my_cardo_slot = [];

    enemy_cardo_slot[0] = cardo0;
    enemy_cardo_slot[1] = cardo1;
    enemy_cardo_slot[2] = cardo2;
    enemy_cardo_slot[3] = cardo3;
    enemy_cardo_slot[4] = cardo4;
    enemy_cardo_slot[5] = cardo5;

    mcardo0 = new _Cardo_My_(0).appendTo($("#me"));
    mcardo1 = new _Cardo_My_(1).appendTo($("#me"));
    mcardo2 = new _Cardo_My_(2).appendTo($("#me"));
    mcardo3 = new _Cardo_My_(3).appendTo($("#me"));
    mcardo4 = new _Cardo_My_(4).appendTo($("#me"));
    mcardo5 = new _Cardo_My_(5).appendTo($("#me"));

    my_cardo_slot[0] = mcardo0;
    my_cardo_slot[1] = mcardo1;
    my_cardo_slot[2] = mcardo2;
    my_cardo_slot[3] = mcardo3;
    my_cardo_slot[4] = mcardo4;
    my_cardo_slot[5] = mcardo5;
});
