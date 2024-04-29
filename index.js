document.addEventListener("DOMContentLoaded", function () {
  const transcriptionText = document.getElementById("transcriptionText");
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const saveButton = document.getElementById("saveButton");

  let recognition = new webkitSpeechRecognition(); // Create a new SpeechRecognition object

  // Configure recognition settings
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  let transcription = ""; // Variable to store the transcribed text

  // Event listeners for start and stop buttons
  startButton.addEventListener("click", function () {
    recognition.start(); // Start speech recognition
    startButton.disabled = true;
    stopButton.disabled = false;
    saveButton.disabled = true;
  });

  stopButton.addEventListener("click", function () {
    recognition.stop(); // Stop speech recognition
    startButton.disabled = true;
    stopButton.disabled = true;
    saveButton.disabled = false;
  });

  // Event listener for when speech recognition results are available
  recognition.onresult = function (event) {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcription += event.results[i][0].transcript;
      }
    }
    transcriptionText.value = transcription;
  };

  // Event listener for when speech recognition encounters an error
  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
    alert("Speech recognition encountered an error. Please try again.");
  };

  // Event listener for saving transcription to Excel
  saveButton.addEventListener("click", function () {
    // Send transcription data to backend for saving to Excel
    startButton.disabled = false;
    stopButton.disabled = true;
    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcription: transcription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else {
          alert("Error saving transcription to Excel.");
        }
      })
      .catch((error) => {
        console.error("Error saving transcription:", error);
        alert("An error occurred while saving transcription to Excel.");
      });
  });
});
