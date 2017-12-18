window.onload = function() {

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/games/collision_test4.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/games/ground_1x1.png');
    game.load.image('walls_1x2', 'assets/games/walls_1x2.png');
    game.load.image('tiles2', 'assets/games/tiles2.png');
    game.load.image('spleen', 'assets/games/singleSpleen.png')
    game.load.spritesheet('dude', 'assets/games/dude189x35.png', 21, 34);

}

var facing = 'left';
var map;
var tileset;
var layer;
var p;
var cursors;
var jumpButton
var spleensc = 7

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    map.addTilesetImage('walls_1x2');
    map.addTilesetImage('tiles2'); 

    //  14 = ? block
    // map.setCollisionBetween(14, 15);
    map.setCollisionBetween(1, 12);
    // map.setCollisionBetween(15, 16);
    // map.setCollisionBetween(20, 25);
    // map.setCollisionBetween(27, 29);
    // map.setCollision(40);
    
    layer = map.createLayer('Tile Layer 1');

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();
    scoreText = game.add.text(16, 16, 'score: ' + spleensc, { fontSize: '32px', fill: '#000' });
    scoreText.fixedToCamera = true

    p = game.add.sprite(34, 21, 'dude');

    spleens = game.add.group();
    spleens.enableBody = true;


    game.physics.enable(p);

    game.physics.arcade.gravity.y = 300;

    p.body.bounce.y = 0.2;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;
    p.animations.add('left', [0, 1, 2, 3], 10, true);
    p.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();

    var slocations = [515, 100, 515, 300, 1445, 62, 1735, 400, 2075, 150, 2585, 29, 3400, 60]

    for (var i = 0; i < 13; i += 2) {
    var spleen = spleens.create(slocations[i], slocations[i + 1] , 'spleen')

    }
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
function collect(p, s) {
        spleensc -= 1
    scoreText.text = `score: ` + spleensc
    s.kill();


}

function update() {

    game.physics.arcade.collide(p, layer);

    p.body.velocity.x = 0;

      game.physics.arcade.collide(spleens, layer);
    game.physics.arcade.collide(p, spleens, collect)

  if (cursors.left.isDown)
    {
        p.body.velocity.x = -150;;

        if (facing != 'left')
        {
            p.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        p.body.velocity.x = 150;

        if (facing != 'right')
        {
            p.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        p.body.velocity.x = 0;

        if (facing != 'idle')
        {
            p.animations.stop();

            if (facing == 'left')
            {
                p.frame = 0;
            }
            else
            {
                p.frame = 5;
            }

            facing = 'idle';
        }
    }
    if (jumpButton.isDown)
    {
        if (p.body.onFloor())
        {
            p.body.velocity.y = -300;
        }
    }
}
//     if (cursors.up.isDown)
//     {
//         if (p.body.onFloor())
//         {
//             p.body.velocity.y = -200;
//         }
//     }

//     if (cursors.left.isDown)
//     {
//         p.body.velocity.x = -150;
//     }
//     else if (cursors.right.isDown)
//     {
//         p.body.velocity.x = 150;
//     }

// }

function render() {

    // game.debug.body(p);
    game.debug.bodyInfo(p, 32, 320);

}

    };
