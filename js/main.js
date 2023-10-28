
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
         },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var player_is_live = true
    var player;
    var obstac;
    var cursors;
    var player_posy = 465

    var game = new Phaser.Game(config);

    var posy1 = 435
    var posy2 = 485
    var posx = 800

    function preload ()
    {

        this.load.image('predios', 'assets/fundo.png')
        this.load.image('sky', 'assets/sky.png')
        this.load.image('clounds', 'assets/clounds.png')
        this.load.image('obs1', 'assets/obs1.png')
        this.load.image('obs2', 'assets/obs2.png')
        this.load.image('obs3', 'assets/obs3.png')
        this.load.spritesheet('dog', 'assets/player.png', { frameWidth: 146, frameHeight: 124 });
   
    }

    function create ()
    {

        //640 e 360 é codenada x e y para que fique centralizado ao tamanho do canva
        // this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'sky');
        this.add.image(400, 130, 'clounds');
        this.add.image(400, 380, 'predios');
    
        obstac = this.physics.add.staticGroup();  

        obstac.create(posx, posy1, 'obs3');
        // obstac.create(posx, posy2, 'obs2');
        // obstac.create(posx, posy2, 'obs1');

        player = obstac.create(400, player_posy, 'dog');

        //isso faz o player cair com gravidade
        // player = this.physics.add.sprite(100, 50, 'dog');
        // player = this.physics.add.sprite(400, posy1, 'dog');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 11 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [ { key: 'dude', frame: 4 } ],
        //     frameRate: 20
        // });

        this.anims.create({
            key: 'start_anim',
            frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player, obstac);

        this.physics.add.overlap(player, obstac, collectStar, null, this);

        //add physics on the plataform
        // platforms = this.physics.add.staticGroup();   
        // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // platforms.create(600, 400, 'ground');
        // platforms.create(50, 250, 'ground');
        // platforms.create(750, 220, 'ground');
    }

    function update ()
    {
        
        //nem é necessário este IF eu acho
        if (player_is_live) {
            player.anims.play('start_anim', true);
            // obstac.setPosition(400, player_posy)
        }
        
        if (cursors.up.isDown){
            console.log ("up")
            player_posy = 415
            player.setPosition(400, player_posy);
        }
        if (cursors.down.isDown){
            console.log ("down")
            player_posy = 465
            player.setPosition(400,player_posy);
        }



    }

    // function collectStar (player, obstac)
    // {
    //     player.disableBody(true, true);
    // }
