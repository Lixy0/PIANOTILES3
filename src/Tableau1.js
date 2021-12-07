/**
 * ALGO: ceci est une classe...
 * Vous verrez ça plus tard en détail avec Rémi, pour l'instant on n'a pas trop besoin de savoir à quoi ça sert.
 */
class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload(){
        this.load.image("fond","assets/fond.jpg");
        this.load.image("carre","assets/carre.png");
        this.load.image("triangle","assets/triangle.png");
        this.load.image("croix","assets/croix.png");
    }

    /**
     * Crée la scène
     */
    create(){

        //met en place les éléments
        this.creerFormes();

        /**
         * Liste des lettres
         * @type {string[]}
         */
        this.lettres="azertyuiopqsdfghjklmwxcvbn".split("")
        console.log("liste des touches prises en charge...");
        console.log(this.lettres);

        // pour chaque lettre on va créer un élément graphique
        this.creerClavier();


        //initialise les écoutes de touches pressées et relâchées
        this.initKeyboard();

        /**
         * influera sur la vitesse de rotation
         * modifié par les touches J K L M
         * @type {number}
         */
        this.vitesse=1;
    }

    /**
     * Affiche les lettres du clavier
     * histoire de voir ce qui se passe
     */
    creerClavier(){
        //espacement entre les lettres = largeur de la scène / nombre de lettres
        let espacement = (this.game.config.width-2) / this.lettres.length; // -2 c'est pour avour une petite marge d'un pixel
        let x=1;
        for(let lettre of this.lettres){
            let objetGraphique=this.add.text(x,1,lettre,{
                color:"#FFFFFF", //blanc
                align:"center",
                backgroundColor:"#000000", //noir
                fixedWidth:espacement-1  // -1 c'est pour avoir une petite marge d'un pixel entre les lettres
            });
            //position X de la rouche suivante
            x+=espacement;
            //donne un nom à l'élément graphique
            objetGraphique.name=lettre;
        }
    }
    /**
     * Crée le décor
     */
    creerFormes(){
        this.fond=this.add.image(0,0,"fond");
        this.carre=this.add.image(100,300,"carre");
        this.croix=this.add.image(300,300,"croix");
        this.triangle=this.add.image(500,300,"triangle");
        this.carre.blendMode=Phaser.BlendModes.ADD;
        this.croix.blendMode=Phaser.BlendModes.ADD;
        this.triangle.blendMode=Phaser.BlendModes.ADD;
    }



    /**
     * Définit ce qui se passe quand on appuie ou relache une touche du clavier
     * ALGO : ceci est une fonction ou méthode
     */
    initKeyboard(){
        /**
         *
         * @type {Tableau1}
         */
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            console.log("keydown",kevent.key,kevent)
            for(let lettre of me.lettres){
                if(kevent.key === lettre){
                    /**
                     *
                     * @type {Phaser.GameObjects.Text}
                     */
                    let objetGraphique=me.children.getByName(lettre);
                    objetGraphique.toucheEnfoncee=true;

                }
            }

        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            console.log("keyup",kevent.key,kevent)
            for(let lettre of me.lettres){
                if(kevent.key === lettre){
                    /**
                     * Obtenir la touche à partir de la lettre
                     * @type {Phaser.GameObjects.Text}
                     */
                    let touche=me.children.getByName(lettre);
                    touche.toucheEnfoncee=false;
                    touche.actif=!touche.actif; //alterne un fois ce sera actif, une fois ça le sera plus.
                    //appelle une fonction
                    me.quandToucheRelachee(kevent.key,touche)
                }
            }

        });
    }

    /**
     * Faire une action quand une touche est relachée
     * @param {string} lettre Une lettre (a,b,c,etc...)
     * @param objetGraphique Un objet qui représente une touche
     */
    quandToucheRelachee(lettre,objetGraphique){

        //------------couleurs---------------

        //carré
        if(lettre==="a"){
            this.bounce(this.carre);
            this.carre.clearTint();
        }
        if(lettre==="z"){
            this.bounce(this.carre);
            this.carre.setTintFill(0xFF0000);
        }
        if(lettre==="e"){
            this.bounce(this.carre);
            this.carre.setTintFill(0x00FF00);
        }
        if(lettre==="r"){
            this.bounce(this.carre);
            this.carre.setTintFill(0x0000FF);
        }

        // croix
        if(lettre==="q"){
            this.bounce(this.croix);
            this.croix.clearTint();
        }
        if(lettre==="s"){
            this.bounce(this.croix);
            this.croix.setTintFill(0x996600);
        }
        if(lettre==="d"){
            this.bounce(this.croix);
            this.croix.setTintFill(0x669900);
        }
        if(lettre==="f"){
            this.bounce(this.croix);
            this.croix.setTintFill(0x006699);
        }

        // triangle
        if(lettre==="w"){
            this.bounce(this.triangle);
            this.triangle.clearTint();
        }
        if(lettre==="x"){
            this.bounce(this.triangle);
            this.triangle.setTintFill(0x990066);
        }
        if(lettre==="c"){
            this.bounce(this.triangle);
            this.triangle.setTintFill(0x009966);
        }
        if(lettre==="v"){
            this.bounce(this.triangle);
            this.triangle.setTintFill(0x660099);
        }

        //simple feedback & changement de sens géré par active
        if(lettre==="t"){
            this.bounce(this.carre);
        }
        if(lettre==="g"){
            this.bounce(this.croix);
        }
        if(lettre==="b"){
            this.bounce(this.triangle);
        }
        //simple feedback & clignottement géré par active
        if(lettre==="y"){
            this.bounce(this.carre);
        }
        if(lettre==="h"){
            this.bounce(this.croix);
        }
        if(lettre==="n"){
            this.bounce(this.triangle);
        }


        //changements de composition
        if(lettre==="u"){
            this.bounceAll();
            this.compositionU();
        }
        if(lettre==="i"){
            this.bounceAll();
            this.compositionI();
        }
        if(lettre==="o"){
            this.bounceAll();
            this.compositionO();
        }
        if(lettre==="p"){
            this.bounceAll();
            this.compositionP();
        }

        //changement de vitesse
        if(lettre==="j"){
            this.bounceAll();
            this.vitesse=9;
        }
        if(lettre==="k"){
            this.bounceAll();
            this.vitesse=6;
        }
        if(lettre==="l"){
            this.bounceAll();
            this.vitesse=3;
        }
        if(lettre==="m"){
            this.bounceAll();
            this.vitesse=1;
        }
    }

    /**
     * Cette fonction s'exécute en boucle (à peu près 60 fois par secondes)
     */
    update(){

        //pour chacune des lettres on va tester si il faut faire des choses ou non
        for(let lettre of this.lettres){

            //--- interaction sur le clavier ---

            /**
             * La touche qui correspond à la lettre
             * @type {Phaser.GameObjects.Text}
             */
            let touche=this.children.getByName(lettre);
            //si enfoncée le fond de touche est gris
            if(touche.toucheEnfoncee){
                touche.setBackgroundColor("#888888")
            }else{
                touche.setBackgroundColor("#000000")
            }
            //si actif le texte est vert sinon blanc
            if(touche.actif){
                touche.setColor("#00FF00")
            }else{
                touche.setColor("#FFFFFF")
            }

            //--- interaction sur les formes ---

            //faire clignotter ou pas
            if(touche.actif) {
                if(lettre === "y"){
                    this.carre.alpha = Phaser.Math.Between(0, 100) / 100;
                }
                if(lettre === "h"){
                    this.croix.alpha = Phaser.Math.Between(0, 100) / 100;
                }
                if(lettre === "n"){
                    this.triangle.alpha = Phaser.Math.Between(0, 100) / 100;
                }
            }else{
                if(lettre === "y"){
                    this.carre.alpha = 1;
                }
                if(lettre === "h"){
                    this.croix.alpha = 1;
                }
                if(lettre === "n"){
                    this.triangle.alpha = 1;
                }
            }

            //faire tourner dans quel sens et à quelle vitesse ?
            let sens=1;
            if(touche.actif) {
                sens=-1;
            }
            if(lettre==="t") {
                this.carre.rotation += 0.01 * this.vitesse * sens;
            }
            if(lettre==="g") {
                this.croix.rotation += 0.02 * this.vitesse * sens;
            }
            if(lettre==="b") {
                this.triangle.rotation += 0.03 * this.vitesse * sens;
            }

        }
    }


    /**
     * Fait rebondir un élément
     * @param {Phaser.GameObjects.Image} element
     */
    bounce(element){
        let actualScale=element.scale;
        element.setScale(actualScale+0.5)
        this.tweens.add({
            targets:[element],
            duration:100,
            ease:Phaser.Math.Easing.Bounce.Out,
            scale:actualScale
        })
    }
    /**
     * Fait rebondir les 3 formes
     */
    bounceAll(){
        this.bounce(this.carre);
        this.bounce(this.croix);
        this.bounce(this.triangle);
    }

    /**
     * Applique une composition
     * O--
     * -X-
     * --A
     */
    compositionU(){
        this.tweens.add({
            targets:this.carre,
            duration:500,
            x:300,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.croix,
            duration:500,
            x:300,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.triangle,
            duration:500,
            x:300,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
    }
    /**
     * Applique une composition
     * --A
     * -X-
     * O--
     */
    compositionI(){
        this.tweens.add({
            targets:this.carre,
            duration:500,
            x:300,
            y:300,
            scale:0.5,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.croix,
            duration:500,
            x:300,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.triangle,
            duration:500,
            x:300,
            y:300,
            scale:2,
            ease:Phaser.Math.Easing.Bounce.Out
        });
    }
    /**
     * Applique une composition
     * -O-
     * -X-
     * -A-
     */
    compositionO(){
        this.tweens.add({
            targets:this.carre,
            duration:500,
            x:300,
            y:300,
            scale:2,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.croix,
            duration:500,
            x:300,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.triangle,
            duration:500,
            x:300,
            y:300,
            scale:0.5,
            ease:Phaser.Math.Easing.Bounce.Out
        });
    }

    /**
     * Applique une composition
     * ---
     * OXA
     * ---
     */
    compositionP(){
        this.tweens.add({
            targets:this.carre,
            duration:500,
            x:100,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.croix,
            duration:500,
            x:300,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
        this.tweens.add({
            targets:this.triangle,
            duration:500,
            x:500,
            y:300,
            scale:1,
            ease:Phaser.Math.Easing.Bounce.Out
        });
    }


}
