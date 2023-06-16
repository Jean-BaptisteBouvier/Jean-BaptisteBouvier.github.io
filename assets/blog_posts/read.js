/* Calculates the reading time of an article by counting the number of words
and divinding by a usual number of words per minute (200). */



function readingTime() {
  const text = document.getElementById("article").innerText;
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  document.getElementById("time").innerText = time;
}
readingTime();
