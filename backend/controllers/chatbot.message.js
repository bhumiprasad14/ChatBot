import User from "../models/user.model.js";
import Bot from "../models/bot.model.js";
export const Message=async(req,res)=>{
    try{
        const text=req.body.text;
        if(!text?.trim()){
            return res.status(400).json({error:"Text cannot be empty"})
        }
        const user=await User.create({
            sender:"user",
            text
        })
        //Data

        const botResponses={
            // Greetings
            "hi": "Hello! How can I help you today?",
            "hello": "Hi there! What would you like to know?",
            "hey": "Hey! How can I assist you?",
            "good morning": "Good morning! Hope you're having a great day. How can I help?",
            "good afternoon": "Good afternoon! What can I do for you?",
            "good evening": "Good evening! How may I assist you?",
            "howdy": "Howdy! What brings you here today?",
            "greetings": "Greetings! How can I be of service?",
            
            // Personal Questions
            "what is your name": "I'm Nova, your virtual assistant. Nice to meet you!",
            "what is your name?": "I'm Nova, your virtual assistant. Nice to meet you!",
            "who are you": "I'm Nova, an AI chatbot designed to help answer your questions and assist with various topics.",
            "who made you": "I was created by developers to help answer your questions and provide assistance.",
            "who created you": "I was built by a team of developers to be your helpful virtual assistant.",
            "can we become friend": "Of course! I'd be happy to be your friendly assistant.",
            "can we be friends": "Absolutely! I'm here to help and chat whenever you need.",
            "are you real": "I'm a chatbot, so I'm not human, but I'm real in the sense that I'm here to help you!",
            "are you human": "No, I'm an AI chatbot, but I'm designed to have helpful conversations!",
            
            // Status Questions
            "how are you": "I'm just a bot, but I'm doing great! How about you?",
            "how are you doing": "I'm functioning perfectly, thanks for asking! How can I help you?",
            "how's it going": "It's going well! What can I do for you today?",
            "what's up": "Not much, just here to help you! What's on your mind?",
            "whats up": "Just waiting to assist you! What do you need?",
            
            // Capabilities
            "what can you do": "I can chat with you, answer questions about programming, provide interview tips, discuss current events, and keep you company. Try asking me about Python, Java, leadership, or famous personalities!",
            "help": "I can help with:\n• Programming questions (Python, Java, recursion)\n• Interview preparation\n• General knowledge (G20, India PM, sports)\n• Casual conversation\nJust ask me anything!",
            "what do you know": "I know about programming, interview tips, current affairs, sports, and much more. Ask me about Python, Java, leadership, Virat Kohli, IPL, or interview questions!",
            
            // Location & Origin
            "where are you from": "I live in the cloud — no rent, no bills!",
            "where do you live": "I exist in the digital realm, accessible from anywhere!",
            
            // Emotions & Expressions
            "i love you": "That's sweet! I'm here to help you anytime.",
            "love you": "Aww, that's kind! I'm always here when you need assistance.",
            "you're awesome": "Thank you! You're pretty awesome too!",
            "you are great": "Thanks! I try my best to help you.",
            "you're amazing": "That's so nice of you! Happy to help!",
            "i hate you": "I'm sorry to hear that. Is there something I can help you with?",
            
            // Gratitude
            "thank you": "You're welcome! Happy to help!",
            "thanks": "My pleasure! Let me know if you need anything else.",
            "thank you so much": "You're very welcome! Anytime!",
            "appreciate it": "I appreciate you too! Glad I could help.",
            
            // Farewells
            "bye": "Goodbye! Have a great day!",
            "goodbye": "Take care! Come back anytime.",
            "see you": "See you later! Feel free to return anytime.",
            "see you later": "Catch you later! Have a wonderful day!",
            "gotta go": "Alright! Best wishes to you!",
            "talk to you later": "Sure thing! Looking forward to our next chat!",
            
            // Time & Date
            "what is the time": "I can't see a clock, but your device should know the current time.",
            "what time is it": "Check your device's clock for the current time!",
            "what is today's date": "I don't have access to real-time data, but your device knows the date!",
            "what day is it": "Your device calendar will show you today's day!",
            
            // Jokes & Fun
            "tell me a joke": "Why don't skeletons fight each other? They don't have the guts!",
            "another joke": "Why did the programmer quit his job? Because he didn't get arrays! (a raise)",
            "make me laugh": "What do you call a bear with no teeth? A gummy bear!",
            "funny joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
            "joke please": "What's a computer's favorite snack? Microchips!",
            
            // Programming - Python
            "what is python": "Python is a high-level, interpreted programming language known for simplicity and versatility.\n• Easy to read/write due to clean syntax (similar to English)\n• Dynamically typed and supports multiple paradigms (OOP, functional, procedural)\n• Extensive libraries for AI, data science, web, automation\n• Example: Used in Google, YouTube, Instagram, and machine learning applications",
            "what is python?": "Python is a high-level, interpreted programming language known for simplicity and versatility.\n• Easy to read/write due to clean syntax (similar to English)\n• Dynamically typed and supports multiple paradigms (OOP, functional, procedural)\n• Extensive libraries for AI, data science, web, automation\n• Example: Used in Google, YouTube, Instagram, and machine learning applications",
            "tell me about python": "Python is a versatile programming language created by Guido van Rossum in 1991. It's known for its simplicity and readability, making it perfect for beginners and professionals alike. Used in web development, data science, AI, automation, and more!",
            "python uses": "Python is used for:\n• Web development (Django, Flask)\n• Data science & AI (NumPy, Pandas, TensorFlow)\n• Automation & scripting\n• Game development\n• Desktop applications",
            
            // Programming - Java
            "what is java": "Java is a platform-independent, object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere' due to JVM (Java Virtual Machine)\n• Used in enterprise systems, Android development, cloud apps\n• Provides features like garbage collection, strong memory management\n• Example: Banking systems, Android apps, large-scale enterprise applications",
            "what is java?": "Java is a platform-independent, object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere' due to JVM (Java Virtual Machine)\n• Used in enterprise systems, Android development, cloud apps\n• Provides features like garbage collection, strong memory management\n• Example: Banking systems, Android apps, large-scale enterprise applications",
            "tell me about java": "Java is a robust, object-oriented programming language created by James Gosling at Sun Microsystems in 1995. It's known for its 'Write Once, Run Anywhere' capability, making it platform-independent. Widely used in Android apps, enterprise systems, and web applications!",
            "java vs python": "Java: Compiled, statically typed, faster execution, verbose syntax. Best for large-scale enterprise apps.\nPython: Interpreted, dynamically typed, easier syntax, slower execution. Best for rapid development, data science, AI.",
            
            // Programming - Recursion
            "what is recursion": "Recursion is when a function calls itself to solve smaller parts of a problem.\n• Useful for problems that can be divided into subproblems (divide-and-conquer)\n• Requires a *base condition* to stop infinite looping\n• Commonly used in: factorial calculation, Fibonacci sequence, tree/graph traversal\n• Example in coding interview: 'Write a recursive function to reverse a linked list'",
            "what is recursion?": "Recursion is when a function calls itself to solve smaller parts of a problem.\n• Useful for problems that can be divided into subproblems (divide-and-conquer)\n• Requires a *base condition* to stop infinite looping\n• Commonly used in: factorial calculation, Fibonacci sequence, tree/graph traversal\n• Example in coding interview: 'Write a recursive function to reverse a linked list'",
            "explain recursion": "Recursion is a programming technique where a function calls itself. Think of it like Russian nesting dolls - each level solves a smaller version of the same problem until reaching the simplest case (base case).",
            "recursion example": "Classic example: Factorial\nfactorial(5) = 5 × factorial(4)\nfactorial(4) = 4 × factorial(3)\n...\nfactorial(1) = 1 (base case)\nResult: 5! = 120",
            
            // Interview Questions
            "tell me about yourself": "This is usually the first interview question.\nStructure:\n• Start with a brief intro (name, background, education/work)\n• Highlight your skills (technical + soft skills)\n• Share achievements (projects, internships, leadership roles)\n• Conclude with why you're excited about this role\nExample: 'I am a Computer Science graduate skilled in Python and SQL. I completed an internship at XYZ where I optimized a database query, improving performance by 30%. I'm passionate about problem-solving and eager to contribute to your team's success.'",
            "why should we hire you": "HR wants to see your value-add.\n• Emphasize skills that match job requirements\n• Show enthusiasm and cultural fit\n• Example: 'I bring strong coding skills in Python and SQL, along with problem-solving ability proven through hackathons. I am also a quick learner and adapt well to team environments. I believe I can contribute to both technical delivery and innovative ideas.'",
            "interview tips": "Key interview tips:\n• Research the company beforehand\n• Prepare STAR method examples (Situation, Task, Action, Result)\n• Practice common questions\n• Dress professionally\n• Ask thoughtful questions\n• Send a thank-you email after",
            "how to prepare for interview": "1. Research the company & role\n2. Review job description - match your skills\n3. Prepare answers for common questions\n4. Practice coding problems (if technical)\n5. Prepare questions to ask interviewer\n6. Mock interviews with friends\n7. Plan your outfit & route\n8. Get good sleep!",
            
            // Leadership
            "what is leadership": "Leadership is the ability to inspire and guide others toward achieving goals.\n• Key traits: vision, communication, accountability, decision-making\n• Example in interview: 'I led a college project team of 4, where I divided tasks, coordinated communication, and ensured deadlines. We successfully delivered a working prototype before schedule.'",
            "what is leadership?": "Leadership is the ability to inspire and guide others toward achieving goals.\n• Key traits: vision, communication, accountability, decision-making\n• Example in interview: 'I led a college project team of 4, where I divided tasks, coordinated communication, and ensured deadlines. We successfully delivered a working prototype before schedule.'",
            "leadership qualities": "Key leadership qualities:\n• Vision & strategic thinking\n• Communication skills\n• Empathy & emotional intelligence\n• Decision-making ability\n• Accountability\n• Adaptability\n• Integrity",
            
            // Current Affairs - India
            "who is prime minister of india": "Narendra Modi is the Prime Minister of India since May 2014.\n• Belongs to Bharatiya Janata Party (BJP)\n• Represents Varanasi constituency\n• Key initiatives: Digital India, Startup India, Swachh Bharat, Make in India\n• Interview Tip: Link to governance or technology (e.g., Digital India impact on IT industry)",
            "who is prime minister of india?": "Narendra Modi is the Prime Minister of India since May 2014.\n• Belongs to Bharatiya Janata Party (BJP)\n• Represents Varanasi constituency\n• Key initiatives: Digital India, Startup India, Swachh Bharat, Make in India\n• Interview Tip: Link to governance or technology (e.g., Digital India impact on IT industry)",
            "who is pm of india": "Narendra Modi is the current Prime Minister of India, serving since May 2014. He's from BJP and has launched major initiatives like Digital India and Make in India.",
            "narendra modi": "Narendra Modi is India's Prime Minister since 2014. He previously served as Chief Minister of Gujarat. Known for initiatives like Digital India, Swachh Bharat, and economic reforms.",
            
            // G20
            "what is g20": "The G20 (Group of Twenty) is an intergovernmental forum of 19 countries + the European Union.\n• Founded in 1999 to address global financial stability\n• Members include India, USA, China, Japan, EU, etc.\n• Discusses economic growth, climate change, sustainable development\n• Recent: India hosted G20 summit in 2023",
            "what is g20?": "The G20 (Group of Twenty) is an intergovernmental forum of 19 countries + the European Union.\n• Founded in 1999 to address global financial stability\n• Members include India, USA, China, Japan, EU, etc.\n• Discusses economic growth, climate change, sustainable development\n• Recent: India hosted G20 summit in 2023",
            "g20 members": "G20 members include: Argentina, Australia, Brazil, Canada, China, France, Germany, India, Indonesia, Italy, Japan, Mexico, Russia, Saudi Arabia, South Africa, South Korea, Turkey, UK, USA, and the European Union.",
            
            // Sports - Cricket
            "who is virat kohli": "Virat Kohli is one of India's greatest batsmen and former captain.\n• Known for consistency, fitness, and aggressive play\n• Holds record for fastest century in ODIs for India\n• Nicknamed 'Chase Master' for his performance in run-chases\n• Interview Tip: If asked about sports management, relate his discipline & fitness to leadership skills",
            "who is virat kohli?": "Virat Kohli is one of India's greatest batsmen and former captain.\n• Known for consistency, fitness, and aggressive play\n• Holds record for fastest century in ODIs for India\n• Nicknamed 'Chase Master' for his performance in run-chases\n• Interview Tip: If asked about sports management, relate his discipline & fitness to leadership skills",
            "virat kohli": "Virat Kohli is a legendary Indian cricketer and former captain. Known for his aggressive batting style, exceptional fitness, and record-breaking performances. One of the best batsmen in modern cricket!",
            
            // IPL
            "what is ipl": "The Indian Premier League (IPL) is a professional T20 cricket league started in 2008.\n• Played annually in India, franchise-based teams\n• Combines cricket + entertainment (biggest sports league in India)\n• Significant for sports business, sponsorships, brand endorsements\n• Example: Chennai Super Kings (CSK) & Mumbai Indians (MI) are top teams",
            "what is ipl?": "The Indian Premier League (IPL) is a professional T20 cricket league started in 2008.\n• Played annually in India, franchise-based teams\n• Combines cricket + entertainment (biggest sports league in India)\n• Significant for sports business, sponsorships, brand endorsements\n• Example: Chennai Super Kings (CSK) & Mumbai Indians (MI) are top teams",
            "ipl teams": "Current IPL teams:\n• Chennai Super Kings (CSK)\n• Mumbai Indians (MI)\n• Royal Challengers Bangalore (RCB)\n• Kolkata Knight Riders (KKR)\n• Delhi Capitals (DC)\n• Punjab Kings\n• Rajasthan Royals (RR)\n• Sunrisers Hyderabad (SRH)\n• Gujarat Titans (GT)\n• Lucknow Super Giants (LSG)",
            
            // Weather & Small Talk
            "how's the weather": "I can't check the weather, but I hope it's pleasant wherever you are!",
            "nice weather": "Glad to hear it's nice! Perfect day for something productive or relaxing.",
            
            // Miscellaneous
            "yes": "Great! How can I help you further?",
            "no": "Alright! Let me know if you need anything else.",
            "ok": "Okay! Is there anything else I can assist you with?",
            "okay": "Got it! What else would you like to know?",
            "sure": "Awesome! What can I help you with?",
            "maybe": "No problem! Take your time, and let me know when you're ready.",
            "i don't know": "That's okay! What would you like to learn about?",
            "hmm": "Thinking about something? I'm here if you have questions!",
            "cool": "Glad you think so! Anything else?",
            "nice": "Thanks! What else can I do for you?",
            "wow": "Happy to impress! What would you like to explore?",
            
            
            // Fallback
            "default": "I'm not sure I understand that. Could you rephrase or ask about:\n• Programming (Python, Java, recursion)\n• Interview questions\n• Current affairs (G20, India PM)\n• Sports (Virat Kohli, IPL)\n• Or just chat with me!"
        };
        
        const normalizedText=text.toLowerCase().trim();
        
        // Function to find keyword-based responses
        const findKeywordResponse = (normalized) => {
            const keywords = {
                "python": botResponses["what is python"],
                "java": botResponses["what is java"],
                "recursion": botResponses["what is recursion"],
                "leadership": botResponses["what is leadership"],
                "interview": botResponses["interview tips"],
                "g20": botResponses["what is g20"],
                "modi": botResponses["who is prime minister of india"],
                "kohli": botResponses["who is virat kohli"],
                "ipl": botResponses["what is ipl"],
                "joke": botResponses["tell me a joke"],
                "name":botResponses["what is your name"],
                "prime minister": botResponses["who is prime minister of india"],
                "bye": botResponses["bye"] ,
                "hi": botResponses["hi"],

            };
            
            for (const [keyword, response] of Object.entries(keywords)) {
                if (normalized.includes(keyword)) {
                    return response;
                }
            }
            
            return botResponses["default"];
        }
        
        // Try exact match first, then keyword matching
        const botResponse = botResponses[normalizedText] || findKeywordResponse(normalizedText);
        
        const bot=await Bot.create({
            text:botResponse
        })
        
        return res.status(200).json({
            userMessage:user.text,
            botMessage:bot.text,})
    }
     catch(error){
        console.log("Error in message controller",error)
        return res.status(500).json({error:"Internal Server Error"})
     }
}
