window.onload = function() {

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', './assets/collision_test4.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', './assets/ground_1x1.png');
    game.load.image('walls_1x2', './assets/walls_1x2.png');
    game.load.image('tiles2', './assets/tiles2.png');
    game.load.image('spleen', './assets/Kidney.png')
    game.load.spritesheet('dude', './assets/dude189x35.png', 21, 34);

}

var facing = 'left';
var map;
var tileset;
var layer;
var p;
var cursors;
var jumpButton
var spleensc = 10
var t = 0
var score = false
var ft = 0

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
    scoreText = game.add.text(16, 16, 'Kidneys: ' + spleensc, { fontSize: '32px', fill: '#000' });
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

    var slocations = [515, 100, 515, 300, 1445, 62, 1735, 400, 2075, 150, 2585, 29, 3400, 60, 3959, 215, 4285, 0, 5885, 254]

    for (var i = 0; i < 19; i += 2) {
    var spleen = spleens.create(slocations[i], slocations[i + 1] , 'spleen')

    }
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 endText = game.add.text(300, 230, "" ,{ fontSize: '64px', fill: '#000' });
}
endText.fixedToCamera = true
function collect(p, s) {
        spleensc -= 1
    scoreText.text = `Kidneys: ` + spleensc
    s.kill();


}

function postScore() {
    console.log('posted')
    fetch('/high_score/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         score:  ft,

      })
    }).then(() => {
      console.log("Posted")
  })
}

function update() {
        if (spleensc === 0 && score === false ) {
            score = true
         ft = t
        endText.text = ft
        endText.fixedToCamera = true
    }


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
            p.body.velocity.y = -284;
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
    t = game.math.roundTo(this.game.time.totalElapsedSeconds()/1, -2)

    // game.debug.body(p);
    if (score === false) {
            game.debug.text('Elapsed seconds: ' + t, 32, 530);

    }

}

    };
