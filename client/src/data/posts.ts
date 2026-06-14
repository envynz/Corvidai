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
,
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
