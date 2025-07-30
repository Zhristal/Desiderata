// Poem data: lines, background images, and audio files
const poemData = [
    {
        line: "Go placidly amid the noise and haste,",
        background: "img/1.jpeg",
        audio: "audio/01.mp3"
    },
    {
        line: "and remember what peace there may be in silence.",
        background: "img/2.jpeg",
        audio: "audio/02.mp3"
    },
    {
        line: "As far as possible without surrender be on good terms with all persons.",
        background: "img/3.jpeg",
        audio: "audio/03.mp3"
    },
    {
        line: "Speak your truth quietly and clearly; and listen to others,",
        background: "img/4.jpeg",
        audio: "audio/04.mp3"
    },
    {
        line: "even the dull and the ignorant; they too have their story.",
        background: "img/5.jpeg",
        audio: "audio/05.mp3"
    },
    {
        line: "Avoid loud and aggressive persons, they are vexations to the spirit.",
        background: "img/6.jpeg",
        audio: "audio/06.mp3"
    },
    {
        line: "If you compare yourself with others, you may become vain or bitter;",
        background: "img/7.jpeg",
        audio: "audio/07.mp3"
    },
    {
        line: "for always there will be greater and lesser persons than yourself.",
        background: "img/8.jpeg",
        audio: "audio/08.mp3"
    },
    {
        line: "Enjoy your achievements as well as your plans.",
        background: "img/9.jpeg",
        audio: "audio/09.mp3"
    },
    {
        line: "Keep interested in your own career, however humble; it is a real possession in the changing fortunes of time.",
        background: "img/10.jpeg",
        audio: "audio/10.mp3"
    },
    {
        line: "Exercise caution in your business affairs; for the world is full of trickery.",
        background: "img/11.jpeg",
        audio: "audio/11.mp3"
    },
    {
        line: "But let this not blind you to what virtue there is; many persons strive for high ideals;",
        background: "img/12.jpeg",
        audio: "audio/12.mp3"
    },
    {
        line: "and everywhere life is full of heroism.",
        background: "img/13.jpeg",
        audio: "audio/13.mp3"
    },
    {
        line: "Be yourself.",
        background: "img/14.jpeg",
        audio: "audio/14.mp3"
    },
    {
        line: "Especially do not feign affection.",
        background: "img/15.jpeg",
        audio: "audio/15.mp3"
    },
    {
        line: "Neither be cynical about love; for in the face of all aridity and disenchantment it is as perennial as the grass.",
        background: "img/16.jpeg",
        audio: "audio/16.mp3"
    },
    {
        line: "Take kindly the counsel of the years, gracefully surrendering the things of youth.",
        background: "img/17.jpeg",
        audio: "audio/17.mp3"
    },
    {
        line: "Nurture strength of spirit to shield you in sudden misfortune.",
        background: "img/18.jpeg",
        audio: "audio/18.mp3"
    },
    {
        line: "But do not distress yourself with dark imaginings. Many fears are born of fatigue and loneliness.",
        background: "img/19.jpeg",
        audio: "audio/19.mp3"
    },
    {
        line: "Beyond a wholesome discipline, be gentle with yourself.",
        background: "img/20.jpeg",
        audio: "audio/20.mp3"
    },
    {
        line: "You are a child of the universe, no less than the trees and the stars; you have a right to be here.",
        background: "img/21.jpeg",
        audio: "audio/21.mp3"
    },
    {
        line: "And whether or not it is clear to you, no doubt the universe is unfolding as it should.",
        background: "img/22.jpeg",
        audio: "audio/22.mp3"
    },
    {
        line: "Therefore be at peace with God, whatever you conceive Him to be,",
        background: "img/23.jpeg",
        audio: "audio/23.mp3"
    },
    {
        line: "and whatever your labors and aspirations, in the noisy confusion of life keep peace with your soul.",
        background: "img/24.jpeg",
        audio: "audio/24.mp3"
    },
    {
        line: "With all its sham, drudgery, and broken dreams, it is still a beautiful world.",
        background: "img/25.jpeg",
        audio: "audio/25.mp3"
    },
    {
        line: "Be cheerful. Strive to be happy.",
        background: "img/26.jpeg",
        audio: "audio/26.mp3"
    }
];

// DOM element references
const poemLineElement = document.getElementById('poem-line');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const lineCounter = document.getElementById('line-counter');
const audioPlayer = document.getElementById('line-audio');
const totalLines = poemData.length;

// New elements for splash screen
const startBtn = document.getElementById('start-btn');
const splashScreen = document.getElementById('splash-screen');
const contentContainer = document.querySelector('.content-container');

let currentLineIndex = 0;

// Function to update the content
function updateContent() {
    const currentLineData = poemData[currentLineIndex];

    poemLineElement.style.animation = 'none';
    void poemLineElement.offsetWidth;
    poemLineElement.textContent = currentLineData.line;
    poemLineElement.style.animation = 'fadeIn 1.5s ease-in-out';
    
    document.body.style.backgroundImage = `url('${currentLineData.background}')`;
    document.body.style.transition = 'background-image 1.5s ease-in-out';

    if (currentLineData.audio) {
        audioPlayer.src = currentLineData.audio;
        audioPlayer.play();
    } else {
        const synth = window.speechSynthesis;
        if (synth) {
            const utterance = new SpeechSynthesisUtterance(currentLineData.line);
            utterance.voice = synth.getVoices()[0];
            synth.speak(utterance);
        }
    }

    lineCounter.textContent = `Line ${currentLineIndex + 1} of ${totalLines}`;

    prevBtn.disabled = currentLineIndex === 0;
    nextBtn.disabled = currentLineIndex === totalLines - 1;
}

// === NEW CODE FOR AUTOPLAY ===
audioPlayer.addEventListener('ended', () => {
    // Check if we are not on the last line
    if (currentLineIndex < totalLines - 1) {
        currentLineIndex++;
        updateContent();
    }
});
// =============================

// Event listeners for splash screen
startBtn.addEventListener('click', () => {
    splashScreen.classList.add('fade-out');

    setTimeout(() => {
        splashScreen.style.display = 'none';
        contentContainer.style.display = 'flex';
        updateContent();
    }, 1000);
});

// Event listeners for navigation buttons
nextBtn.addEventListener('click', () => {
    if (currentLineIndex < totalLines - 1) {
        currentLineIndex++;
        updateContent();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentLineIndex > 0) {
        currentLineIndex--;
        updateContent();
    }
});