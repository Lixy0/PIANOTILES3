class Tableau1 extends Phaser.Scene {

    //mes variables false
    EasterEggs(){
        this.startup=false;
    }

    //preload images/sons que je vais utiliser
    preload() {
        //preload du fond
        this.load.image('fond', 'assets/fond.jpg');

        //preload des variables
        this.load.image('mont', 'assets/mont1.png');
        this.load.image('forest', 'assets/forest1.png');
        this.load.image('cerf', 'assets/cerf.png');

        //preload des sons
        //this.load.audio('', 'assets/.mp3')

    }

    //création visuels
    create() {

        //mon fond
        this.fond = this.add.image(0, 0, 'fond').setOrigin(0, 0);

        //les touches prisent en compte
        this.lettres = "azertyuiopqsdfghjklmwxcvbn".split("")
        //vérif pour moi dans console
        console.log("liste des touches prises en charge...");
        console.log(this.lettres);

        //création de la fonction clavier
        this.initKeyboard();
        //fonction visuel clavier
        this.creerClavier();

        //fonction interactions
        this.creerInteract();
        //fonction Sons
        this.creerSons();
        //fonction EasterEggs
        this.EasterEggs();
    }

    //créations des sons
    creerSons(){
        //this. = this.sound.add('', {loop: false});
        //this..volume = 1
    }

    //les images qui pop up quand touche du clavier down/up
    creerInteract() {
        this.mont = this.add.image(0, 0, 'mont').setOrigin(0, 0);
        this.mont.visible=false
        this.mont.alpha=0
        this.forest = this.add.image(0, 0, 'forest').setOrigin(0, 0);
        this.forest.visible=false
        this.forest.alpha=0
        this.cerf = this.add.image(0, 0, 'cerf').setOrigin(0, 0);
        this.cerf.visible=false
        this.cerf.alpha=0

    }

    //creer le visuel du clavier pour vérif
    creerClavier() {
        //pression des touches
        let espacement = (this.game.config.width - 2) / this.lettres.length; // -2 c'est pour avoir une petite marge d'un pixel
        let x = 1;
        for (let lettre of this.lettres) {
            let objetGraphique = this.add.text(x, 1, lettre, {
                color: "#FFFFFF", //blanc
                align: "center",
                backgroundColor: "#345EE3", //bleu
                fixedWidth: espacement - 1  // -1 c'est pour avoir une petite marge d'un pixel entre les lettres
            });
            x += espacement;
            objetGraphique.name = lettre;
        }
    }


    //keyup & keydown
    initKeyboard() {
        /**
         *
         * @type {Tableau1}
         */
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            console.log("keydown", kevent.key, kevent)
            for (let lettre of me.lettres) {
                if (kevent.key === lettre) {
                    /**
                     *
                     * @type {Phaser.GameObjects.Text}
                     */
                    let objetGraphique = me.children.getByName(lettre);
                    objetGraphique.toucheEnfoncee = true;

                }
            }

        });
        this.input.keyboard.on('keyup', function (kevent) {
            console.log("keyup", kevent.key, kevent)
            for (let lettre of me.lettres) {
                if (kevent.key === lettre) {
                    /**
                     * Obtenir la touche à partir de la lettre
                     * @type {Phaser.GameObjects.Text}
                     */
                    let touche = me.children.getByName(lettre);
                    touche.toucheEnfoncee = false;
                    touche.actif = !touche.actif;
                    me.quandToucheRelachee(kevent.key, touche)
                }
            }

        });
    }

    //toucheRelachee -> compositions A/Z/E//R/T/Y etc...
    quandToucheRelachee(lettre, objetGraphique) {

        //------------Variables---------------


        if (lettre === "a") {
            if (this.mont.visible===true){
            }
            this.mont.visible= !this.mont.visible;
            this.CompositionA()
        }
        if (lettre === "z") {
            if (this.forest.visible===false){
            }
            this.forest.visible= !this.forest.visible;
            this.CompositionZ()
        }
        if (lettre === "e") {
            if (this.cerf.visible===false){
            }
            this.cerf.visible= !this.cerf.visible;
            this.CompositionE()
        }

        /**
         *
        if (lettre === "r") {
            if (this.msn.visible==false){
                this.msnsou.play()
            }
            this.msn.visible= !this.msn.visible;
            this.CompositionR()
        }
        if (lettre === "t") {
            this.cc.visible= !this.cc.visible;
            this.CompositionT()
        }
        if (lettre === "y") {
            this.bar.visible= !this.bar.visible;
            this.CompositionY()
        }*/
    }

    //update verif interactions des touches (clavier/couleurs)
    update(){
        //pour chacune des lettres on va tester si il faut faire des choses ou non
        for (let lettre of this.lettres) {

            //--- interaction sur le clavier ---

            /**
             * La touche qui correspond à la lettre
             * @type {Phaser.GameObjects.Text}
             */
            let touche = this.children.getByName(lettre);
            if (touche.toucheEnfoncee) {
                touche.setBackgroundColor("rgba(75,179,255,0.38)")
            } else {
                touche.setBackgroundColor("rgba(255,255,255,0.08)")
            }
            if (touche.actif) {
                touche.setColor("#009dff")
            } else {
                touche.setColor("#000000")
            }
        }
    }

    //les compositions (Quoi afficher si A/Z/E/R/T/T etc... appuyer

    CompositionA(){
        this.tweens.add({
            targets: this.mont,
            duration: 20,
            alpha: 1,
            repeat: 0,
            yoyo: false,
        });
        this.mont.alpha=0
    }
    CompositionZ() {
        this.tweens.add({
            targets: this.forest,
            duration: 20,
            alpha: 1,
            repeat: 0,
            yoyo: false,
        });
        this.forest.alpha = 0
    }

    CompositionE() {
        this.tweens.add({
            targets: this.cerf,
            duration: 20,
            alpha: 1,
            repeat: 0,
            yoyo: false,
        });
        this.cerf.alpha = 0
    }
    /**
     *
    CompositionR() {
        this.tweens.add({
            targets: this.msn,
            duration: 20,
            alpha: 1,
            repeat: 0,
            yoyo: false,
        });
        this.msn.alpha = 0
    }
    CompositionT() {
        this.tweens.add({
            targets: this.cc,
            duration: 20,
            alpha: 1,
            repeat: 0,
            yoyo: false,
        });
        this.cc.alpha = 0
    }
    CompositionY() {
        this.tweens.add({
            targets: this.bar,
            duration: 20,
            alpha: 1,
            repeat: 0,
            yoyo: false,
        });
        this.bar.alpha = 0
    }
    */
}
