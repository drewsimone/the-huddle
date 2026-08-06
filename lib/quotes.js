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
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "A life is not important except in the impact it has on other lives.", author: "Jackie Robinson" },
  { text: "Somewhere behind the athlete you've become is a little girl who loves the game.", author: "Mia Hamm" },
  { text: "Every strike brings me closer to the next home run.", author: "Babe Ruth" },
  { text: "A winner works hard to develop the talents he's been given.", author: "Larry Bird" },
  { text: "There's no excuse for anyone to work harder than you do.", author: "Derek Jeter" },
  { text: "A champion is defined not by their wins but by how they recover when they fall.", author: "Serena Williams" },
  { text: "The most important thing is to try and inspire people to be great.", author: "Kobe Bryant" },
  { text: "Ask not what your teammates can do for you. Ask what you can do for your teammates.", author: "Magic Johnson" },
  { text: "Tomorrow's another day, and it's not given to you. You have to make it yours.", author: "Walter Payton" },
  { text: "The battles that count aren't for gold medals. The struggles within yourself count.", author: "Jesse Owens" },
  { text: "Don't give up. Don't ever give up.", author: "Jim Valvano" },
  { text: "Great moments are born from great opportunity.", author: "Herb Brooks" },
  { text: "The separation is in the preparation.", author: "Tom Brady" },
  { text: "Pressure is something you feel when you don't know what you're doing.", author: "Peyton Manning" },
  { text: "You never really know how you'll react to a challenge until you face it.", author: "Cal Ripken Jr." },
  { text: "Being a professional is doing the things you love on the days you don't feel like doing them.", author: "Julius Erving" },
  { text: "It ain't over till it's over.", author: "Yogi Berra" },
  { text: "It's what you learn after you know it all that counts.", author: "John Wooden" },
  { text: "The most important measure of a great game is how much better you made your teammates.", author: "Bill Russell" },
  { text: "The reason I am able to do what I do is because I believe in myself.", author: "Nadia Comaneci" },
  { text: "I don't think limits.", author: "Usain Bolt" },
  { text: "I'd rather regret the risks that didn't work out than the chances I didn't take.", author: "Simone Biles" },
  { text: "You have to be able to accept failure to get better.", author: "LeBron James" },
  { text: "I don't focus on what I'm up against. I focus on my goals.", author: "Venus Williams" },
  { text: "I've never taken the easy road, and I'm not gonna start now.", author: "David Beckham" },
  { text: "The man who can drive himself once the effort gets painful is the man who will win.", author: "Roger Bannister" },
  { text: "Success is no accident. It is hard work, perseverance, and sacrifice.", author: "Pelé" },
  { text: "You can't win unless you learn how to lose.", author: "Kareem Abdul-Jabbar" },
  { text: "When you win, nothing hurts.", author: "Joe Namath" },
  { text: "You can't put a limit on anything. The more you dream, the farther you get.", author: "Michael Phelps" },
  { text: "I never quit. Failure is not in my vocabulary.", author: "Tiger Woods" },
  { text: "Success is not an accident, success is actually a choice.", author: "Steph Curry" },
  { text: "Just because you fail once doesn't mean you're gonna fail at everything.", author: "Allen Iverson" },
  { text: "Gold medals aren't really made of gold. They're made of sweat and determination.", author: "Dan Gable" },
  { text: "I fear not the man who has practiced one kick 10,000 times.", author: "Bruce Lee" },
  { text: "There's a moment when you know you can win.", author: "Mary Lou Retton" },
  { text: "Mental toughness is even more important than physical skills.", author: "Chris Evert" },
  { text: "Fear is just something you carry with you, like a passport.", author: "Florence Griffith-Joyner" }
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
