import { useRef, useState, useEffect } from 'react';
import { PhaserGame } from './game/PhaserGame';
import { FaExpand, FaCompress, FaVolumeMute, FaVolumeUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function App() {
    const phaserRef = useRef();
    const [isMuted, setIsMuted] = useState(() => localStorage.getItem("isMuted") === "true");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("isMuted", String(isMuted));
        if (phaserRef.current && phaserRef.current.game) {
            const game = phaserRef.current.game;

            if (game.sound) {
                game.sound.mute = isMuted;
            }
        }

        if (window.Howler) {
            window.Howler.mute(isMuted);
        }
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            .then(() => setIsFullscreen(true))
            .catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
                setIsFullscreen(false);
            });
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }
    
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // ESC 또는 F11로 전체화면이 꺼지는 경우 감지
    useEffect(() => {
        const fullscreenChangeHandler = () => {
        setIsFullscreen(!!document.fullscreenElement);
        };

        const keydownHandler = (event) => {
        if (event.key === "F11") {
            event.preventDefault(); // 브라우저 기본 F11 기능 방지
            toggleFullscreen();
        }
        };

        document.addEventListener("fullscreenchange", fullscreenChangeHandler);
        document.addEventListener("keydown", keydownHandler);

        return () => {
        document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
        document.removeEventListener("keydown", keydownHandler);
        };
    }, []);

    return (
        <div id="app" className="relative">
            <button
                onClick={toggleMenu}
                className="absolute top-4 right-0 z-50 bg-gray-600 text-white h-7 px-1 rounded-l-lg
                           hover:bg-gray-500 transition duration-300"
            >
                {isMenuOpen ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
            </button>
            <div
                className={`absolute top-4 right-0 flex items-center transition-transform duration-300
                ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`} // 🔥 숨김/보임 애니메이션
            >
                <div className="flex flex-row gap-4">
                <button
                    className="rounded-full bg-gray-500 w-7 h-7 flex items-center justify-center
                    text-white hover:scale-120 transition-transform duration-200 ease-in-out"
                    onClick={toggleMute}
                >
                    {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                </button>
                <button
                    className="rounded-full bg-gray-500 w-7 h-7 flex items-center justify-center
                    text-white hover:scale-120 transition-transform duration-200 ease-in-out"
                    onClick={toggleFullscreen}
                >
                    {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
                </button>
                <div className='w-5'></div>
                </div>
            </div>
            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default App;
