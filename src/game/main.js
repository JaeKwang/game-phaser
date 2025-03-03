import Boot from './scenes/Boot';
import Login from './scenes/Login';
import Loading from './scenes/Loading';
import Main from './scenes/Main';
import Mydeck from './scenes/Mydeck';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [
        Boot,
        Login,
        Loading,
        Main,
        Mydeck
    ],
    scale: {
        mode: Phaser.Scale.FIT,  // 창 크기에 맞게 자동 조정
        autoCenter: Phaser.Scale.CENTER_BOTH // 화면 중앙 정렬
    }
};

const StartGame = (parent) => {
    const game = new Phaser.Game({ ...config, parent });
    game.sound.pauseOnBlur = false;
    return game;

}

export default StartGame;
