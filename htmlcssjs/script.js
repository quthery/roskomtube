const switchInput = document.querySelector(".switch input");
const slider = document.querySelector(".slider");
const body = document.body;
const videoItems = document.querySelectorAll(".video-item");

function toggleTheme() {
  if (switchInput.checked) {
    body.style.backgroundColor = "#333"; // Темный фон
    body.style.color = "#fff";
    body.style.transition = "background-color 0.3s ease";
    slider.style.backgroundColor = "#2196f3"; // Цвет слайдера при активной теме
    slider.querySelector("before").style.backgroundImage = "url('sunny.png')"; // Иконка для светлой темы
  } else {
    body.style.backgroundColor = "#f4f4f4"; // Светлый фон
    body.style.color = "#000"; // Черный текст
    slider.style.backgroundColor = "#ccc"; // Цвет слайдера в неактивном состоянии
    slider.style.querySelector("before").backgroundImage = "url('night.png')"; // Иконка для ночной темы
  }
}

async function mergeStreams() {
  const sourceVideo = document.getElementById("sourceVideo");
  const sourceAudio = document.getElementById("sourceAudio");
  const outputVideo = document.getElementById("outputVideo");
  const videoStream = sourceVideo.captureStream();
  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaElementSource(sourceAudio);
  const audioDestination = audioContext.createMediaStreamDestination();

  audioSource.connect(audioDestination);
  audioSource.connect(audioContext.destination); // Для воспроизведения

  const combinedStream = new MediaStream([
    ...videoStream.getVideoTracks(),
    ...audioDestination.stream.getAudioTracks(),
  ]);

  outputVideo.srcObject = combinedStream;
}

sourceVideo.addEventListener("play", () => {
  sourceAudio.play();
  mergeStreams();
});

sourceVideo.addEventListener("pause", () => {
  sourceAudio.pause();
});

switchInput.addEventListener("change", toggleTheme);

toggleTheme();
