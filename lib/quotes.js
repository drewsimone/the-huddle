// Add as many as you want here — the picker below cycles through them
// in order by day of year, so the list won't repeat until it's exhausted.
const quotes = [
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
  { text: "The only way to prove you're a good sport is to lose.", author: "Ernie Banks" },
  { text: "Set your goals high, and don't stop until you get there.", author: "Bo Jackson" },
  { text: "I've missed more than 9,000 shots in my career and that's why I succeed.", author: "Michael Jordan" },
  { text: "Excellence is not a singular act but a habit.", author: "Shaquille O'Neal" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "A champion is someone who gets up when they can't.", author: "Jack Dempsey" },
  { text: "Play every game like it's your last.", author: "Pete Rose" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" }
];

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getTodaysQuote() {
  const index = dayOfYear(new Date()) % quotes.length;
  return quotes[index];
}

module.exports = { quotes, getTodaysQuote };
