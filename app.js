const languageMap = {
  Français: "fr",
  English: "en",
};

let quotes = [];
let authors = [];
let currentLang = "fr";

async function loadData() {
  const [quotesRes, authorsRes] = await Promise.all([
    fetch(`data/${currentLang}.json`),
    fetch("data/authors.json"),
  ]);
  quotes = await quotesRes.json();
  authors = await authorsRes.json();
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showRandomQuote() {
  if (!quotes.length || !authors.length) return;
  document.getElementById("quote").textContent = randomItem(quotes);
  document.getElementById("author").textContent = "— " + randomItem(authors);
}

function updateButtonText() {
  const btn = document.getElementById("refresh");
  if (currentLang === "fr") {
    btn.textContent = "Nouveau !";
  } else if (currentLang === "en") {
    btn.textContent = "New!";
  } else {
    btn.textContent = "New!";
  }
}

document.getElementById("refresh").addEventListener("click", showRandomQuote);

document.addEventListener("DOMContentLoaded", async () => {
  const langSelect = document.getElementById("lang-select");
  langSelect.value = currentLang;
  langSelect.addEventListener("change", async (e) => {
    currentLang = e.target.value;
    await loadData();
    showRandomQuote();
    updateButtonText();
  });
  await loadData();
  showRandomQuote();
  updateButtonText();
});
