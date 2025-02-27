import { Scene } from 'phaser';

export default class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.audio("login_bgm", "/assets/audio/login_bgm.mp3");
        this.load.image("login_bg", "/assets/login_bg.png");
        this.load.image("metamask", "/assets/metamask.png");
        this.load.image("coinbase", "/assets/coinbase.png");
        this.load.image("margex", "/assets/margex.png");
        this.load.image("bestwallet", "/assets/bestwallet.png");
        this.load.image("blofin", "/assets/blofin.png");
        this.load.image("gestlogin", "/assets/gestlogin.png");
    }

    create ()
    {
        this.scene.start('Login');
    }
}
