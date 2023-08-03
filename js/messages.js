const messages = {
    motivational: [
        "You can do this!",
        "You've got this!",
        "You rock!",
        "You can do it!",
        "Go you!",
        "Keep going!",
        "Do it!"
    ],
    jokes: [
        "What kind of concert only costs 45 cents? A 50 Cent concert featuring Nickelback.",
        "What did the grape say when it got crushed? Nothing, it just let out a little wine.",
        "Why did Adele cross the road? To say hello from the other side.",
        "Time flies like an arrow. Fruit flies like a banana.",
        "To the guy who invented zero, thanks for nothing.",
        "I had a crazy dream last night! I was swimming in an ocean of orange soda. Turns out it was just a Fanta sea.",
        "A crazy wife says to her husband that moose are falling from the sky. The husband says, it's reindeer.",
        "Did you hear about the restaurant on the moon? I heard the food was good but it had no atmosphere.",
        "Can February March? No, but April May.",
        "Need an ark to save two of every animal? I noah guy.",
        "Why was Dumbo sad? He felt irrelephant.",
        "A man sued an airline company after it lost his luggage. Sadly, he lost his case.",
        "Yesterday, I accidentally swallowed some food coloring. The doctor says I'm okay, but I feel like I've dyed a little inside.",
        "So what if I don't know what apocalypse means? It's not the end of the world!",
        "My friend drove his expensive car into a tree and found out how his Mercedes bends.",
        "I was wondering why the ball was getting bigger. Then it hit me.",
        "Waking up this morning was an eye-opening experience.",
        "Two windmills are standing in a wind farm. One asks, \"What's your favorite kind of music?\" The other says, \"I'm a big metal fan.\"",
        "I can't believe I got fired from the calendar factory. All I did was take a day off!",
        "I wasn't originally going to get a brain transplant, but then I changed my mind.",
    ],
    none: [""]
}

function refreshMessage() {
    let messageOption = getOption("mg-option")?.value
    if (!messageOption) {
        document.getElementById("mg-option-none").checked = true
        refreshMessage()
    }
    if (messages[messageOption]) {
        el.message.innerText = messages[messageOption][Math.floor(Math.random() * messages[messageOption].length)]
        return
    }
    if (messageOption == "customMg" && get("customMessages")) {
        let customMessages = get("customMessages").trim().split("\n")
        if (customMessages.length > 0) {
            el.message.innerText = customMessages[Math.floor(Math.random() * customMessages.length)]
        } else {
            el.message.innerText = "Add some custom messages!"
        }
    }
}

refreshMessage()