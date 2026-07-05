// Blog posts for corvidai.io — native content owned by Corvid AI for SEO.
// To add a new post, append an object to this array. Newest first.

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;        // ISO date
  readTime: string;
  author: string;
  // Body is an array of blocks rendered by the post page.
  body: BlogBlock[];
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export const posts: BlogPost[] = [
  {
    slug: "what-its-like-running-corvid-ai-for-30-days",
    title: "Set It and Forget It: What It's Actually Like Running Corvid AI for 30 Days",
    metaTitle: "What It's Actually Like Running an AI Digital Receptionist for 30 Days | Corvid AI",
    metaDescription:
      "Wondering what it's actually like to use an AI Digital Receptionist day-to-day? Here's an honest founder's account of what happens when a missed call hits Corvid AI — and what 30 days of real use looks like.",
    excerpt:
      "Most software promises to be 'set and forget.' Here's what that actually looks like in practice — from the setup call to the first real lead coming through by text.",
    date: "2026-07-07",
    readTime: "5 min read",
    author: "Ali Alsaffaf",
    body: [
      { type: "p", text: "There's a version of this post I could write that's basically a sales brochure. Every feature highlighted, every outcome polished, everything presented in the best possible light." },
      { type: "p", text: "This isn't that version." },
      { type: "p", text: "What follows is an honest account of what it's actually like to run Corvid AI's Digital Receptionist — the setup, the day-to-day reality, and what it looks and feels like when it works. Because the best way to know if something is right for your business is to understand what it's genuinely like to use it, not just what it promises." },

      { type: "h2", text: "The setup" },
      { type: "p", text: "The first thing most people expect is a big technical lift. Setting up an AI anything usually sounds like it involves logins, integrations, configuration panels, and a few hours you weren't planning to spend." },
      { type: "p", text: "The Corvid AI setup is deliberately not that. There are two moving parts: a carrier divert on your existing phone number, and a brief intake form that tells the AI about your business — your name, your trade, your usual hours, how you'd like the AI to greet callers, what services you offer." },
      { type: "p", text: "The carrier divert is the key bit. When you can't pick up, your phone quietly routes missed calls to the Digital Receptionist rather than voicemail. Your number stays the same. Nothing changes for your customers. The only difference is what happens when the call doesn't get answered." },
      { type: "p", text: "The intake form takes about ten minutes to fill in. Once it's done, the AI knows who it's representing — and it represents you by name, in your business name, from the first message it sends." },
      { type: "p", text: "That's the setup. Most people are surprised by how little there is to it." },

      { type: "h2", text: "The first missed call" },
      { type: "p", text: "The moment that makes it real is the first time a missed call comes through and you watch it work." },
      { type: "p", text: "The call hits, you can't get to it, and within 60 seconds your phone buzzes — not with the caller's details, but with a notification that the AI has already reached out to them. A minute or two later, if the customer replies, another buzz: the conversation in progress. And when it wraps up, a clean summary: their name, their number, what they need, when they're available." },
      { type: "p", text: "The whole thing takes less time to read than it took to ring you." },
      { type: "quote", text: "For a lot of business owners, this is the moment the penny drops. Not during the demo, not during the sales conversation — when it happens for real, on their actual phone, with a customer who came in off their actual number." },
      { type: "p", text: "That's when it stops being a product and starts being part of how the business runs." },

      { type: "h2", text: "What the day-to-day actually looks like" },
      { type: "p", text: "After the first week, it stops being something you notice. That's the point." },
      { type: "p", text: "You're on a job. Your phone rings, you can't get to it. Somewhere in the background, a customer gets a text, has a quick conversation, and gets added to your lead queue. You finish the job, check your phone, and there's a summary waiting." },
      { type: "p", text: "There's no extra app to open. No dashboard to check. No system to manage. The summaries come through as SMS messages to whatever number you specified during setup — the same way any other text would arrive." },
      { type: "p", text: "What changes, gradually, is that you stop losing leads without knowing it. Jobs that would've just quietly disappeared — the call you missed at 7pm on a Tuesday, the one that came in while you were on the roof — start showing up in your queue instead. The invisible leak starts to close." },

      { type: "h2", text: "What it doesn't do" },
      { type: "p", text: "Honesty requires this section." },
      { type: "p", text: "The Digital Receptionist is very good at one thing: catching a missed call, having a natural conversation by text, and getting you a qualified lead. That's the job it does, and it does it well." },
      { type: "p", text: "It doesn't manage your diary. It doesn't book jobs into a calendar. It doesn't chase up quotes you've sent or follow up on invoices. It doesn't answer complex technical questions about your specific services or give pricing estimates. Those things still need you, or a person you've employed to help run the business." },
      { type: "p", text: "The way to think about it is this: it handles the front door, so nothing falls through the cracks before it reaches you. Everything behind the front door still runs the way it always has." },

      { type: "h2", text: "What 30 days looks like" },
      { type: "p", text: "By the end of the first month, most business owners have a cleaner sense of what they were actually missing before. Not because the AI tells them — but because they can see it. The leads that came in after hours. The enquiries on weekends. The customer who rang on a public holiday and actually got a response." },
      { type: "p", text: "Some of those leads will have converted. Some won't. That's true of every enquiry, with or without AI. The difference is that they had the chance to convert at all, instead of disappearing into a missed call list nobody ever worked through." },
      { type: "p", text: "Thirty days in, the question most people stop asking is 'is this working?' The question they start asking is 'how did I manage without it?'" },
    ],
  },

  {
    slug: "human-receptionist-or-safety-net",
    title: "Do You Need a Human Receptionist or a Safety Net? (Probably Both, Eventually)",
    metaTitle: "AI Receptionist vs Human Receptionist NZ: Safety Net, Not Replacement | Corvid AI",
    metaDescription:
      "AI receptionists aren't here to replace your receptionist. Here's how Corvid AI's Digital Receptionist works as a safety net for solo tradies and growing businesses alike.",
    excerpt:
      "This isn't AI vs human. It's about what happens to the calls nobody catches — whether you have a receptionist or not.",
    date: "2026-06-29",
    readTime: "6 min read",
    author: "Ali Alsaffaf",
    body: [
      { type: "p", text: "Here's a question worth asking before any AI vs human comparison: what happens to the calls that get missed even when someone IS answering the phone?" },
      { type: "p", text: "Because someone always misses calls. The receptionist on lunch. The one already on another line. The one who's out sick, or on leave, or it's 9pm on a Sunday and nobody's rostered on at all. Even the best receptionist in the country is still one person, and one person can't be everywhere." },
      { type: "p", text: "That's the real problem worth solving — and it's bigger than the \"should I hire someone or get AI\" question most people start with." },

      { type: "h2", text: "If you're a solo tradie right now" },
      { type: "p", text: "For a lot of trade businesses, there's no receptionist yet. It's just you — answering calls between jobs, on the tools, under a house, up a ladder. Every missed call is a customer who might've moved on to the next name on Google." },
      { type: "p", text: "Hiring a part-time receptionist to cover this properly is a real cost. Wages alone run $25–30 an hour in New Zealand, and once you add holiday pay, KiwiSaver, ACC levies and the time spent training someone, a part-time hire covering 20 hours a week typically lands around $2,800–$3,200 a month, all in." },
      { type: "p", text: "That's a serious commitment for a business that might only need a few extra hours of phone coverage a week. It's not that the receptionist isn't worth it eventually — it's that for a solo operator, it's often too much, too soon." },
      { type: "p", text: "This is where a Digital Receptionist earns its place. At $179 a month, it catches every missed call, texts the customer back within 60 seconds, and sends you a qualified lead summary — without asking you to make a $3,000-a-month commitment before you're ready for it." },
      { type: "p", text: "It's not pretending to be a receptionist. It's the safety net underneath the gap where one would eventually go." },

      { type: "h2", text: "If you already have a receptionist" },
      { type: "p", text: "This is the part that often gets missed in these comparisons: businesses that already have a great receptionist still lose calls." },
      { type: "p", text: "They're on the phone with someone else when a new enquiry comes in. They've stepped away for lunch. They're out sick for two days and nobody's covering. It's after hours, or a public holiday, and the office is closed — but customers don't know that, and they call anyway." },
      { type: "p", text: "None of that is the receptionist's fault. It's just the reality of being one person in one place. And every one of those missed windows is a potential job slipping through, exactly the same way it would for a solo tradie without anyone answering at all." },
      { type: "p", text: "This is where Corvid AI works alongside a human receptionist rather than instead of one. When a call comes through and nobody's available — whatever the reason — the Digital Receptionist catches it, gets the details by text, and logs a clean lead summary. When your receptionist is back, the lead is sitting there ready to follow up and book in. Nothing forgotten, nothing chasing a voicemail nobody left." },
      { type: "p", text: "The receptionist still does what they do best — building the relationship, managing the diary, handling the judgement calls that genuinely need a person. The AI just makes sure nothing falls through the cracks in between." },

      { type: "h2", text: "Why this matters more than the cost comparison" },
      { type: "p", text: "It would be easy to write this post as \"$179 vs $2,800 — AI wins.\" But that's not really the point, and it's not what Corvid AI is about." },
      { type: "p", text: "AI should make the people around it more capable, not replace them. A receptionist with a safety net underneath them can take their lunch break without worrying about what they'll miss. A solo tradie can grow toward hiring someone, instead of either drowning in missed calls or rushing into a hire before the business can support it." },
      { type: "p", text: "The $179 a month isn't really \"an AI instead of a person.\" It's the thing that makes sure no lead disappears, no matter who is or isn't available to answer the phone that day." },

      { type: "h2", text: "The bottom line" },
      { type: "p", text: "Whether you're a solo operator weighing up your first hire, or a growing business with a receptionist who's brilliant but human, the question is the same: what happens to the calls that get missed?" },
      { type: "p", text: "For most NZ trade businesses, the honest answer right now is \"nothing — they're just gone.\" Corvid AI exists to change that answer, for $179 a month, without asking anyone to be replaced." },
    ],
  },

  {
    slug: "voice-ai-vs-sms-which-works-for-nz-tradies",
    title: "Voice AI vs SMS: Which One Actually Works for NZ Tradies?",
    metaTitle: "Voice AI vs SMS: Which AI Receptionist Works for NZ Tradies? | Corvid AI",
    metaDescription:
      "There are two types of AI receptionist out there — voice AI and SMS. Here's an honest breakdown of both, and why the difference matters for your trade business.",
    excerpt:
      "AI receptionists are having a moment. But not all of them work the same way — and the difference matters more than most people realise.",
    date: "2026-06-22",
    readTime: "6 min read",
    author: "Ali Alsaffaf",
    body: [
      { type: "p", text: "AI receptionists are having a moment in New Zealand. If you've been looking into ways to stop losing leads to missed calls, you've probably come across a few options — and noticed they don't all work the same way." },
      { type: "p", text: "The big split is this: some AI receptionists answer your calls with a voice. Others respond to missed calls with a text. Both solve the same surface-level problem — making sure customers get some kind of response when you can't pick up. But the experience they deliver, and the results they get, are pretty different." },
      { type: "p", text: "Here's an honest breakdown of both." },

      { type: "h2", text: "How voice AI works" },
      { type: "p", text: "Voice AI answers your phone when you can't. The caller hears a voice — usually fairly natural-sounding these days — that greets them in your business name, asks what they need, and tries to collect their details through a spoken conversation." },
      { type: "p", text: "At its best, it's a bit like a virtual receptionist who's always available. At its worst, it's a phone tree with a better accent." },
      { type: "p", text: "The technology has come a long way. Modern voice AI can handle simple questions, recognise names, and transfer calls in some setups. For businesses that get a lot of structured, predictable enquiries — think booking confirmations or simple FAQ-type calls — it can work well." },

      { type: "h2", text: "How SMS text-back works" },
      { type: "p", text: "SMS text-back takes a different approach. Instead of answering the call, it lets the call divert and immediately sends the caller a text — usually within 60 seconds — greeting them in your business name and asking how it can help." },
      { type: "p", text: "The conversation happens over SMS. The AI collects the caller's name, what they need, and any other relevant details through a back-and-forth text exchange. Once the conversation wraps up, the business owner gets a qualified lead summary sent straight to their phone." },
      { type: "p", text: "No call answered. No voice involved. Just a fast, friendly text that makes the customer feel looked after — and a neat summary waiting for you when you're free." },

      { type: "h2", text: "Where voice AI struggles" },
      { type: "p", text: "Voice AI works in controlled environments. But trade businesses aren't controlled environments — your customers are stressed homeowners with a burst pipe, or landlords dealing with a tenant emergency, or people who've just noticed something wrong and picked up the phone on impulse." },
      { type: "p", text: "When those people hear a robot voice, one of a few things happens. Some will play along. Some will hang up immediately. And some — especially older customers or people who are already frustrated — will feel like they're being fobbed off." },
      { type: "p", text: "There's also the comprehension problem. Voice AI still struggles with strong accents, background noise, people who talk over each other, or callers who don't quite know how to describe what they need. A missed word in a voice conversation can mean a missed detail in your lead summary." },
      { type: "p", text: "And then there's this: most people can tell within about three seconds that they're not talking to a real person. That moment of realisation changes how they engage. Some people shut down. Some give shorter answers. Some don't bother at all." },

      { type: "h3", text: "The feedback is already coming in" },
      { type: "p", text: "This isn't just theory. Look at how trade business owners talk about voice AI online, and a pattern shows up fast. Some report it working well for capturing missed calls. But just as many say the same thing: customers can tell within seconds they're talking to a robot — and some hang up the moment they realise it." },
      { type: "p", text: "The technology has genuinely improved over the past year. But the core issue isn't the quality of the voice. It's the format. A spoken conversation with an AI puts the customer in an unfamiliar, slightly awkward position. A text message doesn't." },
      { type: "p", text: "That's not a knock on voice AI — it's just a structural reality of how people respond to different formats. And it's exactly why SMS-first works as well as it does: there's no moment of \"wait, is this a robot?\" because nobody expects a text to come from a human typing it live anyway." },

      { type: "h2", text: "Where SMS wins" },
      { type: "p", text: "Text is the native language of modern customer service. Most people send dozens of texts a day — it's low pressure, familiar, and fits around whatever else they're doing. A customer who gets a text after a missed call doesn't feel like they've hit a wall. They feel like the business got back to them." },
      { type: "p", text: "The response rates back this up. SMS open rates sit around 98%, and most texts are read within three minutes. Compare that to voicemail, where fewer than 20% of callers even leave a message — and of those, many never hear back." },
      { type: "p", text: "There's also no comprehension problem with text. What someone types is what you get. No background noise, no accent issues, no half-heard details. The lead summary you receive is clean, accurate, and complete." },
      { type: "p", text: "And crucially — nobody feels like they're talking to a robot. A friendly text from \"Spark Electrical\" asking what they need feels like a real business reaching out. The AI is invisible. The experience is human." },

      { type: "h2", text: "The honest truth about both" },
      { type: "p", text: "Voice AI has its place. For high-volume businesses with predictable call types — medical practices, large service centres, businesses with multiple staff — it can handle real load and save real time." },
      { type: "p", text: "But for a trade business run by one person or a small team? Where every customer call is a potential job, every job is worth hundreds of dollars, and your reputation is built on showing up and being easy to deal with? SMS wins. Every time." },
      { type: "p", text: "It meets customers where they already are. It works around their schedule, not yours. It doesn't ask them to talk to a robot. And it gives you everything you need to follow up properly — without interrupting your day." },

      { type: "h2", text: "What this means for your business" },
      { type: "p", text: "If you're weighing up AI receptionist options, the question to ask isn't just \"does it answer my calls?\" It's \"does it make my customers feel looked after?\" Because that's what turns an enquiry into a job." },
      { type: "p", text: "A customer who gets a fast, friendly text after a missed call stays warm. They've had contact, they feel acknowledged, and they're more likely to still be available when you ring them back." },
      { type: "p", text: "A customer who gets a voice robot — or worse, voicemail — is already dialling the next tradie." },
      { type: "p", text: "That's the difference. And in a market as competitive as New Zealand's trades sector, it matters." },
    ],
  },

  {
    slug: "how-much-is-a-missed-call-costing-your-trade-business",
    title: "How Much Is a Missed Call Actually Costing Your Trade Business?",
    metaTitle: "How Much Is a Missed Call Costing Your Trade Business? | Corvid AI",
    metaDescription:
      "Most NZ tradies have no idea how much missed calls are costing them. Here's how to work out the real number — and why it's probably bigger than you think.",
    excerpt:
      "Most tradies think missed calls are just part of the job. Run the numbers and you'll think differently. Here's how to work out exactly what they're costing you.",
    date: "2026-06-15",
    readTime: "5 min read",
    author: "Ali Alsaffaf",
    body: [
      { type: "p", text: "Here's a question most tradies have never actually sat down and answered: how much money did you lose last week to missed calls?" },
      { type: "p", text: "Not a rough guess. The actual number. Because most people, when they think about it properly, find it's a lot bigger than they expected — and once you see it, you can't unsee it." },
      { type: "p", text: "So let's work through it together. Get a pen if you want, or just follow along. This'll take about two minutes and it might be the most useful two minutes you spend on your business this week." },

      { type: "h2", text: "Step one: what's your average job worth?" },
      { type: "p", text: "Think about the jobs you did last month. Not your biggest one, not your smallest — the typical one. A standard callout, a regular booking, a bread-and-butter job." },
      { type: "p", text: "For a lot of NZ tradies, this number sits somewhere between $300 and $800. Electricians doing switchboard work or fault-finding, maybe $400–600. Plumbers on a standard callout, similar. Builders doing smaller renovation work, often higher. Hair stylists and barbers, maybe $60–100 per client but with higher repeat value." },
      { type: "p", text: "Pick your number. Let's call it your Average Job Value, or AJV. Write it down." },

      { type: "h2", text: "Step two: how many calls do you miss in a week?" },
      { type: "p", text: "Be honest here. Think about a typical Tuesday. You're on-site, hands full, phone goes off. You let it ring. That's one." },
      { type: "p", text: "Then there's the call that comes in at 7:15am before you've started. The one at lunchtime when you're talking to a customer. The one at 5:30pm on a Friday when you're loading the ute." },
      { type: "p", text: "Most tradies, when they actually think about it, miss somewhere between 3 and 8 calls a week. Some miss more. If you've got missed calls sitting in your phone right now that you haven't returned, you already know your number." },
      { type: "p", text: "Let's be conservative and say 5 missed calls a week. That's your Weekly Missed Calls, or WMC." },

      { type: "h2", text: "Step three: how many of those were real leads?" },
      { type: "p", text: "Not every missed call is a new customer — some are suppliers, some are existing clients, some are wrong numbers. A fair estimate is that about half of your missed calls are genuine new enquiries. Maybe a bit more if you're advertising or have good Google visibility." },
      { type: "p", text: "So of your 5 missed calls per week, let's say 3 were potential new customers." },
      { type: "quote", text: "Of those 3, how many do you think actually left a voicemail and waited for you to call back? Research suggests fewer than 20% of callers leave a voicemail when they don't get through. The rest just move on." },
      { type: "p", text: "That means 2 or 3 of those potential customers rang off, found another tradie, and you never knew they existed." },

      { type: "h2", text: "The maths" },
      { type: "p", text: "Let's run the numbers with conservative estimates:" },
      { type: "ul", items: [
        "Average job value: $400",
        "Missed calls per week: 5",
        "Genuine new enquiries missed: 3",
        "Enquiries lost (didn't leave voicemail, moved on): 2",
        "Conversion rate (how many you'd have won if you'd answered): 60%",
        "Jobs lost per week: 1.2",
        "Revenue lost per week: $480",
        "Revenue lost per month: $1,920",
        "Revenue lost per year: $23,040"
      ]},
      { type: "p", text: "Twenty-three thousand dollars. Gone. Not because you did bad work. Not because your prices are wrong. Because the phone rang and you couldn't get to it." },
      { type: "p", text: "And that's with conservative numbers. If your average job is worth $600, or you miss more calls, or you're in a competitive area where customers don't wait around — the number gets bigger fast." },

      { type: "h2", text: "The hidden cost nobody talks about" },
      { type: "p", text: "The revenue number is the obvious one. But there's a cost that doesn't show up in any calculation: the lifetime value of a customer you never got." },
      { type: "p", text: "A tradie who does good work gets repeat business. A happy customer calls you back when the next job comes up. They refer their neighbours. They leave a Google review that brings in three more customers." },
      { type: "p", text: "When you miss the first call, you don't just lose that one job. You potentially lose a relationship worth ten times the original job value over the next few years. That's the number that should really make you sit up." },

      { type: "h2", text: "Why this is hard to see" },
      { type: "p", text: "The cruel thing about missed calls is that they're invisible. A job you didn't get doesn't show up anywhere. There's no invoice, no reminder, no record. It just quietly doesn't happen." },
      { type: "p", text: "Compare that to a tool that breaks down, or a supplier invoice that's wrong — those are obvious problems that demand to be fixed. A missed call just disappears. Which is exactly why most tradies underestimate how often it happens and what it costs." },
      { type: "p", text: "The businesses that grow fastest are the ones that find and fix the invisible leaks. And for most trade businesses in New Zealand, the missed call is the biggest leak of all." },

      { type: "h2", text: "What fixing it actually costs" },
      { type: "p", text: "Here's the part that usually surprises people. Fixing the missed call problem doesn't require hiring a receptionist. It doesn't require being glued to your phone. And it doesn't require changing your number or your setup." },
      { type: "p", text: "Corvid AI's Digital Receptionist costs $179 a month. Based on the numbers above — losing one job a week at $400 — you'd be spending $179 to recover $1,920. That's a return of more than ten to one, every single month." },
      { type: "p", text: "Even if you're sceptical and cut that estimate in half, it's still a five-to-one return. There aren't many investments in a trade business that stack up like that." },

      { type: "h2", text: "Run your own numbers" },
      { type: "p", text: "You know your business better than anyone. Take five minutes and run the calculation with your own AJV and your own honest estimate of weekly missed calls. The formula is simple:" },
      { type: "ul", items: [
        "Weekly missed calls × 60% (genuine enquiries) × 80% (didn't leave voicemail) × your conversion rate × your AJV = weekly revenue lost",
        "Multiply by 52 for the annual number"
      ]},
      { type: "p", text: "If the number you get is bigger than $2,148 a year (what Corvid AI costs annually), the maths already works in your favour." },
      { type: "p", text: "Most tradies who run this calculation find the number is a lot bigger than $2,148. Which is usually the moment things click." },
    ],
  },
  {
    slug: "why-nz-tradies-are-switching-from-voicemail-to-ai-text-back",
    title: "Why NZ Tradies Are Ditching Voicemail for AI Text-Back",
    metaTitle: "Why NZ Tradies Are Switching from Voicemail to AI Text-Back | Corvid AI",
    metaDescription:
      "Voicemail is costing New Zealand tradies thousands in lost jobs. Here's why more sparkies, plumbers and builders are switching to AI text-back to catch every missed call.",
    excerpt:
      "Every missed call is a job that might've gone to the next bloke on the list. Here's why Kiwi tradies are quietly ditching voicemail for something that actually works.",
    date: "2026-06-08",
    readTime: "6 min read",
    author: "Ali Alsaffaf",
    body: [
      { type: "p", text: "Let's be honest about voicemail for a second. When was the last time you left one and actually expected a call back? And when someone leaves you one, how often do you listen to the whole thing before you've already decided to deal with it later?" },
      { type: "p", text: "Now think about that from your customer's side. They've got a leaking pipe, a dead hot water cylinder, or a power point that's started sparking. They ring you. It goes to voicemail. What do they do next? They don't leave a message and wait patiently. They hang up and ring the next tradie on Google. That's it. That's the whole story. You never even knew they called." },
      { type: "p", text: "For most Kiwi tradies, the missed call isn't a small problem. It's the single biggest leak in the business — and it's invisible, because you can't miss what you never saw." },

      { type: "h2", text: "The real cost of a missed call" },
      { type: "p", text: "Let's put some rough numbers on it, because that's where it really hits home. Say you're a sparky and the average job through your door is worth $400. If you miss three calls a week — which is conservative for anyone who spends the day up a ladder or under a house — that's twelve potential jobs a month walking straight to your competition." },
      { type: "p", text: "Even if only half of those would've turned into actual work, that's six jobs. At $400 a pop, you're looking at $2,400 a month. Nearly thirty grand a year. Gone. Not because you did anything wrong, but because you were doing your job and couldn't get to the phone." },
      { type: "quote", text: "You can't miss what you never saw. That's exactly why missed calls are the most expensive problem most tradies don't know they have." },

      { type: "h2", text: "Why voicemail stopped working" },
      { type: "p", text: "Voicemail made sense in 1995. Back then, if you couldn't reach someone, leaving a message was the only option. There was no texting, no instant anything. People expected to wait." },
      { type: "p", text: "That world is gone. We now live in a world where people expect a response in minutes, not days. Research on customer behaviour consistently shows that the business that responds first wins the job the overwhelming majority of the time. Speed beats reputation. Speed beats price. The first tradie to get back to a customer usually gets the work, full stop." },
      { type: "p", text: "Voicemail is the opposite of speed. It puts the work back on the customer — listen to the beep, leave your details, hope for a call back. Most people won't bother. They'll just move on." },

      { type: "h2", text: "Enter AI text-back" },
      { type: "p", text: "Here's where things have changed. Instead of sending a missed call to voicemail, you can now send it to an AI that texts the customer back within seconds. Not a robotic voice. Not a phone tree. A simple, friendly text message — the way most people actually prefer to communicate now." },
      { type: "p", text: "The conversation goes something like this. Customer rings, you can't pick up. Within about a minute they get a text: 'Hey, it's Spark Electrical here — sorry we missed your call! What can we help you with?' The customer replies. The AI keeps the conversation going naturally, collects their name, their number, what they need, and where they are. Then it texts you a tidy summary of the whole thing so you can ring back when you're off the tools — already knowing exactly what the job is." },
      { type: "p", text: "The customer feels looked after. You haven't lost the lead. And you didn't have to stop what you were doing to make it happen." },

      { type: "h3", text: "Why text beats voice AI" },
      { type: "p", text: "You might've heard about AI that answers your phone with a voice. It's clever tech, but most people don't love talking to a robot — and plenty of customers can tell within a few seconds that they're not speaking to a real person. It can feel cold, or worse, like the business is trying to fob them off." },
      { type: "p", text: "Texting sidesteps all of that. Nobody minds getting a text. There's no awkward pause, no 'sorry, I didn't catch that', no hold music. The customer can reply whenever suits them — at the lights, on a break, after they've put the kids down. And because it's in writing, you've got a clear record of exactly what they asked for. No he-said-she-said about what the job was." },

      { type: "h2", text: "What this looks like for a real business" },
      { type: "p", text: "Picture a plumber who's flat out all day. Phone's ringing while he's wrist-deep in someone's bathroom. Normally those calls vanish into voicemail and he gets to them — maybe — at 7pm when he's knackered, by which point the customer's already booked someone else." },
      { type: "p", text: "With AI text-back, every one of those missed calls gets an instant reply. By the time he's washed up and back in the van, his phone's got three neat summaries waiting: name, number, what they need, where they are. He rings them back over a coffee, all three are still waiting because they got looked after, and he's booked out the rest of the week. Same number of calls. Completely different outcome." },

      { type: "h2", text: "Is it hard to set up?" },
      { type: "p", text: "This is the part most tradies assume is going to be a nightmare, and it's the part that's actually easiest. You don't change your number. You don't buy new gear. You don't have to learn anything. Your existing number just gets set up so that when you can't answer, the call quietly diverts to your AI text-back instead of voicemail. Everything else stays exactly as it is." },
      { type: "p", text: "The whole point is that it works in the background. You carry on doing what you do best, and the missed calls — the ones that used to vanish — start turning into actual jobs." },

      { type: "h2", text: "The bottom line" },
      { type: "p", text: "Voicemail isn't neutral. It's not a safe default. Every call that hits it is a customer you're quietly handing to the next tradie on the list. In a world where people expect a reply in minutes, a beep and a 'leave a message' is costing you real money every single week." },
      { type: "p", text: "AI text-back flips that. Every missed call becomes a fast, friendly text, a qualified lead, and a summary in your pocket. It's not about replacing you — it's about making sure the customers who already want to hire you can actually reach you." },
      { type: "p", text: "If you've ever wondered how many jobs you've lost to voicemail without ever knowing, that's exactly the problem worth fixing. And these days, fixing it is the easy part." },
    ],
  },
];

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);
