let currentAudio = null;

    // Function to play an audio element and stop the current one
function playAudio(audioId, iconID, text) {
  const audio = document.getElementById(audioId);
  
  if (currentAudio === audio) {
    // If the clicked audio is the currently playing one, stop it
    currentAudio.pause();
    currentAudio.currentTime = 0; // Reset playback position
    currentAudio = null;
  } else {
    // If a different audio is clicked, stop the current and play the new one
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset playback position
    }

    audio.play();
    currentAudio = audio;
    }
}