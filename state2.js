demo.state2 = function () {};
demo.state2.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#9400D3';
        addChangeStateEventListeners();
    },
    update: function () {}
};