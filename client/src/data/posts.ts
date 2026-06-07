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
