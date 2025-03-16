
interface AudioControls {
  toggle: () => void;
  play: () => void;
  pause: () => void;
  isMuted: () => boolean;
}

export const setupBackgroundMusic = (audioPath: string): AudioControls => {
  const audio = new Audio(audioPath);
  audio.loop = true;
  audio.volume = 0.4;
  
  let isPlaying = false;
  
  // Set up for auto-play once user interacts with the page
  const enableAudio = () => {
    audio.play()
      .then(() => {
        isPlaying = true;
      })
      .catch(err => {
        console.error("Audio playback failed:", err);
      });
      
    // Remove the event listeners once the audio is enabled
    document.removeEventListener('click', enableAudio);
    document.removeEventListener('touchstart', enableAudio);
  };
  
  document.addEventListener('click', enableAudio, { once: true });
  document.addEventListener('touchstart', enableAudio, { once: true });
  
  return {
    toggle: () => {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play()
          .then(() => {
            isPlaying = true;
          })
          .catch(err => {
            console.error("Audio playback failed:", err);
          });
      }
    },
    play: () => {
      audio.play()
        .then(() => {
          isPlaying = true;
        })
        .catch(err => {
          console.error("Audio playback failed:", err);
        });
    },
    pause: () => {
      audio.pause();
      isPlaying = false;
    },
    isMuted: () => !isPlaying
  };
};
