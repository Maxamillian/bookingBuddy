var colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'amber',
  'orange',
  'deep-orange'
];

var randomColor = colors[Math.floor(Math.random() * (colors.length - 1))] + '-text';

var weekendBuddies = ['Preston', 'Lou', 'Max', 'Jesse', 'Nate'];
var weekendMessages = [
  'Its been forever!!! I want to hang out with you guys!',
  'Seriously! Its been way too long...',
  'yall want to plan something together?',
  'I sent an invite, come help me plan a weekend of fun on Booking Buddy',
  'nice, thx.  I just shared my dates and a few ideas!',
  'Hey guys looks like we all are free to travel in a few weekends...',
  'Yeah that looks like the best time! Where do you guys want to go? Looks like we had a lot of overlap',
  'Personally, Cabo San Freude would be my top choice!',
  'That looks fun, but flights are bit out of my range...',
  'Id be in if Ryan let us all crash at his pad so we could save on hotel fees...',
  'That sounds like a great option!',
  'Hey what do you all think about the trip I just bookmarked?',
  'Looks great! I like the hotel you chose. Great ratings and not a bad price at all'
];
var getWeekendMessage = function(counter) {
  return weekendMessages[counter++] || '';
};

var familyBuddies = [
  'Alex',
  'Chris',
  'Darin',
  'Sean',
  'Ignacio',
  'Jason',
  'Nathan',
  'Samy',
  'Simon'
];
var familyMessages = [
  'Where do yall want to go this year!?!?!',
  'Whos going to plan it...? ????',
  '????????',
  'Beuller....?',
  'How about we all plan it together!?!',
  'What do you mean?',
  'I just sent you all an email, check it out!',
  'The booking buddies email?',
  'Yeah that one. This looks great!',
  'Whoa, so we can all throw in ideas and see each others ideas too',
  'Nice, I love seeing everyones ideas and this makes it so easy to coordinate',
  'Thanks again for sharing this booking buddies thing, Im really excited to see everyone!'
];
var getFamilyMessage = function(counter) {
  return familyMessages[counter++] || '';
};

var bachBuddies = ['Danya', 'Emilie', 'Emma', 'Joanna', 'Meg', 'Misaki', 'Rocky', 'Emma'];
var bachMessages = [
  "Hey ladies!!!! I just confirmed dates with the bride to be and now we're ready to roll with planning the bachelorette party in Jackson Hole.",
  'What are your thoughts on where to stay ... what to do ... what to bring?',
  "Yay to camping with cocktails by the fire!!!!! We'll need to figure out where the best campgrounds are",
  'Yes, and she mentioned she wanted to do rafting as well',
  'Which company should we go with for rafting?',
  'Check the safety ones, prices, and most importantly, make sure that we can reserve a male rafting guide to flirt with',
  'DEFINITELY',
  "Oooooh, check out Hunter's profile on Dave Hansen water trips",
  "I don't think I'm into the chops… what about the Josh dude?",
  "Why don't we just call the day before and worry about that then?? We'll need to also figure out local grocery stores and coordinate cars",
  "I'll be renting a car and will have space for 2 others + the hot rafting guide",
  'Thank goodness this great site exists to help us all plan together!! Its like the fun has already started!!!!'
];
var getBachMessage = function(counter) {
  return bachMessages[counter++] || '';
};

var summerBuddies = [
  'Ariel',
  'Bryce',
  'Dimitri',
  'Faiz',
  'Jordan',
  'Kyle',
  'Mohammad',
  'Ryan',
  'Vandeth'
];
var summerMessages = [
  'Schools almost out for the summer...',
  'yeah would love to get together',
  'should we bring the kids?',
  'where do you all want to go?',
  'so... hotels? right? budets? dates? ahh!!!!',
  'Hey yall, dont worry about all that!!!! Just use BOOKING BUDDY!',
  'Whats that?',
  'Check your email, I just sent you a link through the app',
  'This is great!! It makes it so easy to fine something that works for everyone!',
  'LOVE THIS! I cant waint to get see you all soon!',
  'PS. I love the last hotel you just bookmarked',
  'Yeah me too, that one looks perfect and it matches everyones schedules!'
];
var getSummerMessage = function(counter) {
  return summerMessages[counter] || '';
};

var getBuddyFromGroup = function(buddies) {
  return buddies[Math.floor(Math.random() * buddies.length)];
};

module.exports = {
  colors: colors,
  randomColor: randomColor,
  getBuddyFromGroup: getBuddyFromGroup,
  weekendBuddies: weekendBuddies,
  familyBuddies: familyBuddies,
  bachBuddies: bachBuddies,
  summerBuddies: summerBuddies,
  getWeekendMessage: getWeekendMessage,
  getFamilyMessage: getFamilyMessage,
  getBachMessage: getBachMessage,
  getSummerMessage: getSummerMessage
};
