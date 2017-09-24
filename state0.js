var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, adam, speed = 6;//declara as variaiveis
var centerX = 1500/2;//variável de posição x
var centerY = 1000/2;//variável de posição y
demo.state0 = function () {};
demo.state0.prototype = {
    preload: function () {
        game.load.spritesheet('adam', 'assets/spritesheets/adamSheet.png', 240, 370);
        /*load a imagem de sprite, depois de Adam.png 
        trocamos para o spritesheet para adiiconar movimento, adicionou 240 e 370 que são as dimensões da imagem*/
        game.load.image('tree', 'assets/backgrounds/treeBG.png');//load a imagem de background floresta
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);//ativa a Física no jogo
        game.stage.backgroundColor = '#808080';//fundo da tela original state 0
        console.log('state0');//diz no console que está no state 0
        game.world.setBounds(0, 0, 2813, 1000);//coloca as fronteiras do nosso mundo que é o comprimento da imagem de background
        addChangeStateEventListeners();//coloca ativadores de eventos
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//ajusta tamanho da tela
        var treeBG = game.add.sprite(0,0,'tree');//variável local de background
        adam = game.add.sprite(centerX, centerY, 'adam');//adiciona o sprite na tela
        adam.anchor.setTo(0.5,0.5);//coloca ele no meio da tela
        adam.scale.setTo(0.7, 0.7);//diminiu a escala do personagem, truque de virar de lado é colocar negativo no 1º valor
        game.physics.enable(adam);//libera a Física para o adam
        adam.body.collideWorldBounds = true;//faz com que o adam para de andar quando atinge a fronteira do mundo
        adam.animations.add('walk', [0,1,2,3,4]);
        
        game.camera.follow(adam);//pede pra camera seguir o adam
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);//colocar onde é a nossa zona morta
        
        
    },
    update: function () { //aqui, você tem a movimentação do personagem na tela de acordo com os eventos de tecla pressionada
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            adam.scale.setTo(0.7, 0.7);//ele vira na direção normal quando pressiona direita
            adam.x += speed;
            adam.animations.play('walk', 14, true);//14 é framerate
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            adam.scale.setTo(-0.7, 0.7);//quando coloca negativo ele vira de lado quand pressiona tecla esquerda
            adam.x -= speed;
            adam.animations.play('walk', 14, true);
        }
        else {
            adam.animations.stop('walk');//este else resolve o problema da animação continuar com o adam parado
            adam.frame = 0;
        }
            
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            adam.y -= speed;
            if(adam.y < 395){//faz com que o adam não ultrapasse a estradinha de terra
                adam.y = 395;
            }
        }
         else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            adam.y += speed;
        }
    }
};

function changeState(i, stateNum){
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
    
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);

  
}