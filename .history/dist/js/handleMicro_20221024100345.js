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
const products = [
  "Pumpkin - 1 Kg",
  "Carrot - 1 Kg",
  "Mushroom - 1 Kg",
  "Potato",
  "Potato - 1 kg",
];
function handleVoice(text) {
  const handleText = text.toLowerCase();
  const getProducts = products.filter((val) =>
    val.toLowerCase.includes(handleText)
  );
  console.log(getProducts);
}
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

recognition.onerror = () => {
  recognition.stop();
  btnSearch.removeClass("recording");
};

recognition.onresult = (e) => {
  const text = e.results[0][0].transcript;
  handleVoice(text);
};
