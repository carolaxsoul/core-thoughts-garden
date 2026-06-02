// Seed content shown when the database is empty, so the feed never feels lifeless.

export type SeedThought = {
  id: string;
  author: string;
  handle: string;
  content: string;
  tags: string[];
  created_at: string;
  likes_count: number;
};

export const seedThoughts: SeedThought[] = [
  {
    id: "s1",
    author: "Cora",
    handle: "cora",
    content:
      "Reading Calvino again. He said cities are made of relationships, not of stones. I keep thinking that's also true of a personal archive — what you save, why you save it, who you imagine reading it later.",
    tags: ["books", "cities", "writing"],
    created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    likes_count: 24,
  },
  {
    id: "s2",
    author: "Cora",
    handle: "cora",
    content:
      "A small theory: the best personal websites feel like a well-kept apartment. You can tell someone lives there. Plants. Half-read books on the coffee table. Light coming in at the right angle.",
    tags: ["digital-garden", "design"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes_count: 71,
  },
  {
    id: "s3",
    author: "Cora",
    handle: "cora",
    content:
      "Today's small obsessions: Brutalist plant nurseries, Tarkovsky's notebooks, the colour of late-afternoon teal on a bathroom tile, the word 'palimpsest'.",
    tags: ["notes", "aesthetic"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    likes_count: 38,
  },
  {
    id: "s4",
    author: "Cora",
    handle: "cora",
    content:
      "On psychoanalysis: a session isn't where you find answers. It's where you finally hear the question you've been avoiding asking yourself.",
    tags: ["psychoanalysis"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    likes_count: 112,
  },
];

export const seedNews = [
  {
    id: "n1",
    headline: "Architects rethink the courtyard for warming cities",
    summary: "Across São Paulo and Lisbon, studios are reviving the inner patio — not as ornament, but as thermal infrastructure for the next decade of heat.",
    category: "Architecture",
    source: "ArchDaily",
    url: "https://archdaily.com",
    published_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "n2",
    headline: "A quiet shift inside the AI labs: smaller, slower, more honest",
    summary: "After a year of scale-or-die, several major labs are signalling that the next leap is in evaluation and grounding rather than raw parameters.",
    category: "Technology",
    source: "The Verge",
    url: "https://theverge.com",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "n3",
    headline: "Brazil's new urban mobility plan leans into the 15-minute neighborhood",
    summary: "Federal funding tied to walkability indices is reshaping how mid-size cities plan their next decade of investment.",
    category: "Brazil",
    source: "Folha",
    url: "https://folha.uol.com.br",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "n4",
    headline: "A new biography of Clarice Lispector reopens the family archive",
    summary: "Letters never before published reveal an interior life as restless and luminous as her prose.",
    category: "Culture",
    source: "n+1",
    url: "https://nplusonemag.com",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
  },
  {
    id: "n5",
    headline: "Quantum error correction crosses a long-sought threshold",
    summary: "A paper from a Google–Caltech team reports a logical qubit that improves as more physical qubits are added — a structural milestone, not a product.",
    category: "Science",
    source: "Nature",
    url: "https://nature.com",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
  },
  {
    id: "n6",
    headline: "Independent publishing has its quietly best year in a decade",
    summary: "Subscription-first models and small presses are reporting healthier margins than the legacy houses, for the first time since 2014.",
    category: "Business",
    source: "Publishers Weekly",
    url: "https://publishersweekly.com",
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
  },
];

export const trendingTags = [
  "AI", "Architecture", "Cinema", "Urbanism", "Tarot",
  "Books", "Psychoanalysis", "Wellness", "Brazil", "Notebooks",
];

export const nowSections = {
  reading: [
    { title: "Invisible Cities", by: "Italo Calvino" },
    { title: "The Argonauts", by: "Maggie Nelson" },
    { title: "A Field Guide to Getting Lost", by: "Rebecca Solnit" },
  ],
  watching: [
    { title: "The Bear (S3)", by: "FX" },
    { title: "Perfect Days", by: "Wim Wenders" },
  ],
  learning: [
    { title: "Italian, slowly", by: "Pimsleur + a friend in Bologna" },
    { title: "Color theory in interiors", by: "self-study" },
  ],
  building: [
    { title: "CORA", by: "this site, a digital garden" },
    { title: "A small zine about courtyards", by: "in progress" },
  ],
  thinking: [
    { title: "What does a 'second brain' cost in attention?" },
    { title: "Cities that smell like rain" },
    { title: "Why algorithmic feeds feel haunted at 1am" },
  ],
};

export const libraryItems = [
  { id: "l1", title: "Invisible Cities", type: "book", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", notes: "Re-read every year.", rating: 5 },
  { id: "l2", title: "Perfect Days", type: "movie", cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", notes: "On attention as a spiritual practice.", rating: 5 },
  { id: "l3", title: "The Bear", type: "tv", cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", notes: "Kitchen as cathedral.", rating: 4 },
  { id: "l4", title: "On Being", type: "podcast", cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400", notes: "Krista Tippett is unmatched.", rating: 5 },
  { id: "l5", title: "Are.na", type: "tool", cover: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400", notes: "A slow internet.", rating: 5 },
  { id: "l6", title: "The Crying of Lot 49", type: "book", cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400", notes: "Paranoid pleasure.", rating: 4 },
  { id: "l7", title: "Lost in Translation", type: "movie", cover: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400", notes: "Loneliness, perfectly lit.", rating: 5 },
  { id: "l8", title: "Linear", type: "tool", cover: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400", notes: "How software should feel.", rating: 5 },
];
