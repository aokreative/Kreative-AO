/**
 * The seven service lines, with the detail each one needs to stand on its own
 * page. Order matters: it runs from positioning through to the systems that
 * keep a growing business from falling over.
 */

export type ServiceItem = { name: string; detail: string };

export type Service = {
  slug: string;

  name: string;
  kicker: string;
  summary: string;
  pitch: string;
  cta: string;
  items: ServiceItem[];
};

export const SERVICES: Service[] = [
  {
    slug: "brand-strategy",

    name: "Brand Strategy",
    kicker: "Positioning & identity",
    summary:
      "Figure out what makes you different, then build a name, look and message that makes people choose you over the next option.",
    pitch:
      "If people can't tell why you're different, price becomes the only thing they compare. We fix that — finding your edge and building a brand that makes the choice obvious.",
    cta: "Talk about your brand",
    items: [
      { name: "Positioning", detail: "A clear, defensible reason to choose you over everyone else." },
      { name: "Brand identity", detail: "Logo, colours, type and a look that feels considered, not generic." },
      { name: "Customer research", detail: "Real insight into what your buyers actually care about." },
      { name: "Naming & messaging", detail: "Words that make your value impossible to misunderstand." },
      { name: "Brand guidelines", detail: "A simple playbook so everything stays consistent." },
      { name: "Launch plan", detail: "How to put the new brand into the world with impact." },
    ],
  },
  {
    slug: "web-design",

    name: "Website Design & Development",
    kicker: "Sites that sell",
    summary:
      "Fast, beautiful websites built to convert — designed around your brand and wired up to capture and qualify every lead that lands.",
    pitch:
      "Your website is where attention turns into customers — or quietly leaks away. We design and build fast, beautiful sites that look the part and are built to convert.",
    cta: "Talk about your website",
    items: [
      { name: "Web design", detail: "Clean, on-brand design that builds trust in seconds." },
      { name: "Development", detail: "Fast, responsive builds that work on every device." },
      { name: "E-commerce", detail: "Online stores set up to sell, not just to look pretty." },
      { name: "Landing pages", detail: "Focused pages built around a single conversion goal." },
      { name: "SEO foundations", detail: "Structured so Google can find and rank you from day one." },
      { name: "Care & hosting", detail: "We keep it fast, secure and up to date after launch." },
    ],
  },
  {
    slug: "content-social",

    name: "Content & Social",
    kicker: "The stuff that keeps you visible",
    summary:
      "A steady stream of posts, video and writing that actually sounds like you — and gives people a reason to follow, share and buy.",
    pitch:
      "Showing up consistently is half the battle — and the part most businesses can't keep up with. We run it for you, in a voice that sounds like you.",
    cta: "Talk about content",
    items: [
      { name: "Content plan", detail: "A monthly plan tied to real goals, not random posting." },
      { name: "Social management", detail: "We handle the calendar, captions, posting and replies." },
      { name: "Video & photo", detail: "Scroll-stopping creative shot for each platform." },
      { name: "Writing", detail: "Articles and copy that build trust and help you rank on Google." },
      { name: "Brand voice", detail: "One consistent tone your whole team can write in." },
      { name: "AI-assisted production", detail: "Smart workflows that get more done without losing quality." },
    ],
  },
  {
    slug: "campaigns",

    name: "Campaigns",
    kicker: "Launches & big moments",
    summary:
      "From product launches to seasonal pushes — creative people remember, planned around a clear goal and a number we're chasing.",
    pitch:
      "Launching something? A good campaign turns a moment into momentum. We handle the idea, the creative and the rollout — all pointed at one clear result.",
    cta: "Plan a campaign",
    items: [
      { name: "Big idea & creative", detail: "A concept people remember, built on a real insight." },
      { name: "Product launches", detail: "Rollouts that build anticipation and demand." },
      { name: "Social creative", detail: "Assets made for the feed, not squeezed into it." },
      { name: "Influencers & creators", detail: "Partnerships with voices your audience already trusts." },
      { name: "Events & activations", detail: "Moments that turn audiences into participants." },
      { name: "Reporting", detail: "An honest read on what the campaign actually delivered." },
    ],
  },
  {
    slug: "ads-growth",

    name: "Ads & Growth",
    kicker: "Paid media that pays back",
    summary:
      "Meta, Google and TikTok ads run by people who watch the spend like it's theirs — plus honest reporting on what's working.",
    pitch:
      "Paid ads only work when someone's watching the numbers closely. We run your spend like it's our own money — and tell you the truth about what's working.",
    cta: "Talk about ads",
    items: [
      { name: "Social ads", detail: "Targeted campaigns on Meta, TikTok and LinkedIn." },
      { name: "Google ads", detail: "Catch people the moment they're searching to buy." },
      { name: "SEO", detail: "Show up on Google for free — and keep showing up." },
      { name: "Analytics", detail: "Clear tracking of which channels actually drive sales." },
      { name: "Email & WhatsApp", detail: "Owned channels that nurture and convert your list." },
      { name: "Growth audit", detail: "We find where your funnel is leaking — and why." },
    ],
  },
  {
    slug: "ai-automation",

    name: "AI & Automation",
    kicker: "AI that does real work",
    summary:
      "Chatbots, agents and automations tuned to your business — answering enquiries, qualifying leads and cutting busywork around the clock.",
    pitch:
      "AI is a brilliant amplifier — but an amplifier has no sound of its own. We build systems that do real jobs, and we tell you where automation isn't worth it.",
    cta: "Talk about AI",
    items: [
      { name: "Custom AI agents", detail: "Multi-step jobs handled end to end, inside your own tools." },
      { name: "Smart chatbots", detail: "Web, WhatsApp and Slack, in language that sounds like your brand." },
      { name: "Workflow automation", detail: "The repetitive, expensive tasks eating your team's time." },
      { name: "Analytics & insights", detail: "Lead scoring, churn flags and answers in plain English." },
      { name: "Content systems", detail: "Pipelines that multiply output without losing your voice." },
      { name: "Honest scoping", detail: "Including the processes not worth automating yet." },
    ],
  },
  {
    slug: "pos-erp",

    name: "POS & ERP Systems",
    kicker: "Run the back office",
    summary:
      "Point-of-sale and ERP systems set up and connected — so sales, stock, finance and operations finally run from one place.",
    pitch:
      "The systems behind the scenes decide whether growth feels smooth or chaotic. We set up point-of-sale and ERP tools that keep sales, stock, finance and operations talking to each other.",
    cta: "Talk about systems",
    items: [
      { name: "POS setup", detail: "Point-of-sale that's fast at the counter and accurate in the books." },
      { name: "ERP implementation", detail: "One connected system for sales, stock, finance and HR." },
      { name: "Inventory & stock", detail: "Real-time visibility so you never over- or under-order." },
      { name: "Integrations", detail: "We connect your tills, website, payments and accounting." },
      { name: "Dashboards", detail: "Live numbers on sales and margins, not month-old reports." },
      { name: "Training & support", detail: "We get your team comfortable and stay on call after launch." },
    ],
  },
];

export function serviceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const PROCESS = [
  { step: "01", title: "We listen", body: "A proper conversation about your business, your customers and what's actually getting in the way. No pitch deck yet." },
  { step: "02", title: "We plan", body: "A clear plan with a goal, a timeline and a price — written so anyone can understand it. You approve before we start." },
  { step: "03", title: "We build", body: "We make the work — brand, content, campaigns, the lot — and keep you in the loop the whole way through." },
  { step: "04", title: "We measure", body: "We track what happened, show you the real numbers, and keep improving. We stay in it with you." },
];

export const TESTIMONIALS = [
  {
    quote:
      "A&O rebuilt how we show up online and the difference was immediate — our drops sell through faster and the brand finally looks as premium as the product. They understand culture, not just marketing.",
    name: "Mitchelle",
    role: "Marketer · Brandykicks",
  },
  {
    quote:
      "They launched our venture brand from a blank page and made us look credible from day one. Sharp strategy, no fluff, and they move fast — easily the best creative partner we've worked with.",
    name: "Hilum",
    role: "CEO · Hego Ventures",
  },
  {
    quote:
      "The team understood our vision and turned it into a brand and content system that actually pulls clients in. Professional, responsive and genuinely invested in our growth.",
    name: "Africaptions",
    role: "CEO · Africaptions",
  },
];

export const FAQS = [
  {
    q: "How much does it cost?",
    a: "It depends on what you need — a one-off brand project is very different from an ongoing monthly retainer. Tell us your budget and goal and we'll be upfront about what's realistic. We'll never push you into something you don't need.",
  },
  {
    q: "How soon will I see results?",
    a: "Paid ads can bring leads in the first week. Brand and content work compound over months. We're honest about timelines from day one, and most clients see clear movement within the first 90 days.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. We work with everyone from solo founders to established companies. What matters is that you're serious about growing — we'll scope the work to fit your stage and budget.",
  },
  {
    q: "Where are you based?",
    a: "We're in The Piano, Westlands — Nairobi. We work with clients across Kenya and the wider East African region, in person and remotely.",
  },
  {
    q: "Can you do just one thing, like ads?",
    a: "Absolutely. Plenty of clients come to us for a single service. We'll do that one thing well — and if other gaps are costing you customers, we'll point them out without the hard sell.",
  },
];
