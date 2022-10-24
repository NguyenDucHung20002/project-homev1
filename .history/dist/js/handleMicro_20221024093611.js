var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const synth = window.speechSynthesis;

recognition.lang = "en-US";
recognition.continuous = false;

const speak = (text) => {
  if (synth.speaking) {
    console.error("Busy. Speaking...");
    return;
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.onend = () => {
    console.log("SpeechSynthesisUtterance.onend");
  };
  utter.onerror = (err) => {
    console.error("SpeechSynthesisUtterance.onerror", err);
  };
  synth.speak(text);
};
function handleMicro(data) {}
const btnSearch = $(".btn-search");
$(".btn-search").click(function (e) {
  e.preventDefault();
  recognition.start();
  $(this).addClass("recording");
});

recognition.onspeechend = () => {
  recognition.stop();
  btnSearch.removeClass("recording");
};
