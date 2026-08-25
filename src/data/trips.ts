import egypt from "@/assets/dest-egypt.jpg";
import morocco from "@/assets/dest-morocco.jpg";
import safari from "@/assets/dest-safari.jpg";
import srilanka from "@/assets/dest-srilanka.jpg";
import sailing from "@/assets/dest-sailing.jpg";
import hero from "@/assets/hero.jpg";
import kenya from "@/assets/dest-kenya.jpg";

export type Trip = {
  slug: string;
  title: string;
  place: string;
  days: string;
  price: string;
  was: string;
  rating: number;
  image: string;
  style: "Group tour" | "Safari" | "Sail & cruise" | "Private tour";
  summary: string;
  highlights: string[];
  itinerary: { day: string; title: string; text: string }[];
  included: string[];
  notIncluded: string[];
};

export const TRIPS: Trip[] = [
  {
    slug: "pharaohs-and-felucca",
    title: "Pharaohs & Felucca",
    place: "Egypt",
    days: "9 days",
    price: "$1,395",
    was: "$1,690",
    rating: 4.8,
    image: egypt,
    style: "Group tour",
    summary:
      "From the Pyramids of Giza to the temples of Luxor and a night sailing the Nile by felucca - the classic Egypt journey with an expert Egyptologist guide.",
    highlights: [
      "Sunrise at the Pyramids of Giza and the Sphinx",
      "Egyptian Museum with a private Egyptologist",
      "Overnight felucca sail on the Nile",
      "Valley of the Kings and Karnak Temple",
      "Abu Simbel day excursion from Aswan",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive in Cairo", text: "Airport transfer, welcome dinner and trip briefing with your guide." },
      { day: "Day 2", title: "Pyramids & Sphinx", text: "Early start at Giza, then the Egyptian Museum and Khan el-Khalili bazaar." },
      { day: "Day 3", title: "Cairo to Aswan", text: "Short flight south, afternoon visit to the Philae Temple by motorboat." },
      { day: "Day 4", title: "Abu Simbel", text: "Excursion to Ramses II's rock-cut temples, back to Aswan for the evening." },
      { day: "Day 5", title: "Felucca on the Nile", text: "Sail between Nubian villages and sleep on deck under the stars." },
      { day: "Day 6", title: "Kom Ombo & Edfu", text: "Riverside temples en route to Luxor with a local lunch stop." },
      { day: "Day 7", title: "Luxor West Bank", text: "Valley of the Kings, Hatshepsut's temple and the Colossi of Memnon." },
      { day: "Day 8", title: "Karnak & Luxor Temple", text: "Morning at Karnak, free afternoon, farewell dinner beside the Nile." },
      { day: "Day 9", title: "Departure", text: "Transfer to Luxor airport for your onward flight." },
    ],
    included: ["8 nights accommodation", "All transfers & internal flight", "Expert Egyptologist guide", "Daily breakfast, 4 dinners", "All listed entrance fees"],
    notIncluded: ["International flights", "Egypt visa", "Travel insurance", "Tips & personal spending"],
  },
  {
    slug: "serengeti-big-five",
    title: "Serengeti Big Five",
    place: "Tanzania",
    days: "8 days",
    price: "$2,450",
    was: "$2,890",
    rating: 4.9,
    image: safari,
    style: "Safari",
    summary:
      "Game drives across the Serengeti and Ngorongoro Crater in search of the Big Five, finishing on the white sand of Zanzibar.",
    highlights: [
      "Big Five game drives in the Serengeti",
      "Ngorongoro Crater floor safari",
      "Great Migration river crossings (seasonal)",
      "Maasai village visit near Karatu",
      "Two nights on Zanzibar's north coast",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive Arusha", text: "Meet your safari guide, gear check and overnight at a garden lodge." },
      { day: "Day 2", title: "Tarangire", text: "Full-day game drive among baobabs and huge elephant herds." },
      { day: "Day 3", title: "Central Serengeti", text: "Drive north into the Serengeti with afternoon big-cat tracking." },
      { day: "Day 4", title: "Serengeti", text: "Dawn and dusk game drives, optional hot-air balloon at sunrise." },
      { day: "Day 5", title: "Ngorongoro", text: "Descend into the crater for rhino, lion and flamingo sightings." },
      { day: "Day 6", title: "Fly to Zanzibar", text: "Scenic flight to the coast, evening at leisure in Nungwi." },
      { day: "Day 7", title: "Zanzibar", text: "Free day for snorkelling, dhow sailing or Stone Town spice tours." },
      { day: "Day 8", title: "Departure", text: "Transfer to Zanzibar airport." },
    ],
    included: ["7 nights lodges & beach hotel", "4x4 safari vehicle with pop-top roof", "All park fees", "Full board on safari", "Zanzibar flight"],
    notIncluded: ["International flights", "Balloon safari", "Travel insurance", "Drinks & tips"],
  },
  {
    slug: "kasbahs-and-sahara-nights",
    title: "Kasbahs & Sahara Nights",
    place: "Morocco",
    days: "10 days",
    price: "$1,180",
    was: "$1,420",
    rating: 4.7,
    image: morocco,
    style: "Group tour",
    summary:
      "Medinas, mountain passes and a desert camp under the stars - Morocco from Marrakech to Fes with riads all the way.",
    highlights: [
      "Marrakech souks and Jemaa el-Fnaa by night",
      "Camel trek into the Erg Chebbi dunes",
      "Camp overnight in the Sahara",
      "Todra Gorge and the Dades Valley",
      "Blue lanes of Chefchaouen",
    ],
    itinerary: [
      { day: "Day 1", title: "Marrakech", text: "Arrival, riad check-in and a guided evening food walk." },
      { day: "Day 2", title: "Medina & gardens", text: "Bahia Palace, Saadian Tombs and the Majorelle Garden." },
      { day: "Day 3", title: "High Atlas", text: "Tizi n'Tichka pass to Ait Benhaddou's fortified kasbah." },
      { day: "Day 4", title: "Dades Valley", text: "Rose valley, gorges and a night in a valley guesthouse." },
      { day: "Day 5", title: "Sahara", text: "Camel trek at golden hour, desert camp with drums and tagine." },
      { day: "Day 6", title: "Todra Gorge", text: "Walk the canyon floor then continue to Midelt." },
      { day: "Day 7", title: "Fes", text: "Cedar forests and Barbary macaques en route to Fes." },
      { day: "Day 8", title: "Fes medina", text: "Tanneries, madrasas and artisan workshops with a local guide." },
      { day: "Day 9", title: "Chefchaouen", text: "Free time in the blue city, sunset at the Spanish Mosque." },
      { day: "Day 10", title: "Departure", text: "Transfer to Fes or Tangier for your flight home." },
    ],
    included: ["9 nights riads & desert camp", "Private minibus & driver", "Local guides in each city", "Daily breakfast, 3 dinners", "Camel trek"],
    notIncluded: ["International flights", "Most lunches & dinners", "Travel insurance", "Tips"],
  },
  {
    slug: "turquoise-coast-sail",
    title: "Turquoise Coast Sail",
    place: "Turkey",
    days: "7 days",
    price: "$990",
    was: "$1,240",
    rating: 4.8,
    image: sailing,
    style: "Sail & cruise",
    summary:
      "A week aboard a traditional gulet along Turkey's Lycian coast - swim stops, sunken ruins and harbour towns.",
    highlights: [
      "Sleep aboard a traditional wooden gulet",
      "Swim over the sunken city of Kekova",
      "Butterfly Valley and Ölüdeniz lagoon",
      "Sunset in Kaş harbour",
      "Daily swim stops in hidden coves",
    ],
    itinerary: [
      { day: "Day 1", title: "Board in Fethiye", text: "Cabin allocation, safety briefing and first swim stop." },
      { day: "Day 2", title: "Ölüdeniz", text: "Blue Lagoon morning, afternoon sail to Butterfly Valley." },
      { day: "Day 3", title: "Kalkan", text: "Coastal sail with lunch on deck, evening ashore for meze." },
      { day: "Day 4", title: "Kekova", text: "Snorkel above Lycian ruins, anchor at Üçağız village." },
      { day: "Day 5", title: "Kaş", text: "Free afternoon in town - dive, kayak or wander the old streets." },
      { day: "Day 6", title: "Gökkaya Bay", text: "Sea caves, paddleboards and a farewell dinner on board." },
      { day: "Day 7", title: "Disembark", text: "Breakfast on deck, transfer to Dalaman airport." },
    ],
    included: ["6 nights aboard a gulet", "Full board with all meals", "Crew & skipper", "Snorkel gear & paddleboards", "Airport transfer"],
    notIncluded: ["International flights", "Drinks on board", "Travel insurance", "Diving & optional activities"],
  },
  {
    slug: "sri-lanka-hills-and-coast",
    title: "Hills, Tea & Leopards",
    place: "Sri Lanka",
    days: "11 days",
    price: "$1,540",
    was: "$1,850",
    rating: 4.8,
    image: srilanka,
    style: "Group tour",
    summary:
      "Rock fortresses, hill-country trains, tea estates and leopard tracking in Yala, finishing on the southern beaches.",
    highlights: [
      "Climb Sigiriya Rock at sunrise",
      "Hill-country train to Ella",
      "Tea estate tour and tasting",
      "Leopard safari in Yala National Park",
      "Galle Fort at golden hour",
    ],
    itinerary: [
      { day: "Day 1", title: "Negombo", text: "Arrival and a relaxed beachside welcome dinner." },
      { day: "Day 2", title: "Anuradhapura", text: "Ancient capital ruins and sacred bodhi tree by bicycle." },
      { day: "Day 3", title: "Sigiriya", text: "Sunrise climb of the Lion Rock, afternoon village walk." },
      { day: "Day 4", title: "Kandy", text: "Temple of the Tooth and a Kandyan dance performance." },
      { day: "Day 5", title: "Nuwara Eliya", text: "Tea factory tour and colonial-era hill station stroll." },
      { day: "Day 6", title: "Train to Ella", text: "One of the world's great rail journeys through tea country." },
      { day: "Day 7", title: "Ella", text: "Little Adam's Peak hike and Nine Arch Bridge." },
      { day: "Day 8", title: "Yala", text: "Afternoon jeep safari in search of leopards and elephants." },
      { day: "Day 9", title: "Mirissa", text: "South-coast beach day, optional whale watching in season." },
      { day: "Day 10", title: "Galle", text: "Walk the Dutch ramparts and browse the fort's boutiques." },
      { day: "Day 11", title: "Departure", text: "Transfer to Colombo airport." },
    ],
    included: ["10 nights hotels & guesthouses", "Private vehicle & driver-guide", "Hill-country train ticket", "Daily breakfast", "Yala jeep safari"],
    notIncluded: ["International flights", "Sri Lanka e-visa", "Travel insurance", "Most lunches & dinners"],
  },
  {
    slug: "vietnam-north-to-south",
    title: "Vietnam North to South",
    place: "Vietnam",
    days: "12 days",
    price: "$1,690",
    was: "$1,990",
    rating: 4.7,
    image: hero,
    style: "Group tour",
    summary:
      "Hanoi street food, a night on Ha Long Bay, imperial Hue, lantern-lit Hoi An and the Mekong Delta by boat.",
    highlights: [
      "Street-food tour of Hanoi's Old Quarter",
      "Overnight cruise on Ha Long Bay",
      "Cycle the rice fields around Hoi An",
      "Cooking class with a local family",
      "Mekong Delta sampan ride",
    ],
    itinerary: [
      { day: "Day 1", title: "Hanoi", text: "Arrival, evening street-food walk with your guide." },
      { day: "Day 2", title: "Hanoi", text: "Old Quarter, Temple of Literature and a water-puppet show." },
      { day: "Day 3", title: "Ha Long Bay", text: "Board your cruise, kayak among the limestone karsts." },
      { day: "Day 4", title: "Back to Hanoi", text: "Sunrise tai chi on deck, cave visit, overnight train south." },
      { day: "Day 5", title: "Hue", text: "Imperial Citadel and a dragon-boat trip on the Perfume River." },
      { day: "Day 6", title: "Hai Van Pass", text: "Scenic drive to Hoi An with coastal photo stops." },
      { day: "Day 7", title: "Hoi An", text: "Cooking class and free time among the tailors and lanterns." },
      { day: "Day 8", title: "Hoi An", text: "Cycle to My Son sanctuary or relax on An Bang beach." },
      { day: "Day 9", title: "Ho Chi Minh City", text: "Flight south, war remnants museum and Ben Thanh market." },
      { day: "Day 10", title: "Mekong Delta", text: "Floating markets, sampan channels and a homestay lunch." },
      { day: "Day 11", title: "Free day", text: "Optional Cu Chi tunnels or rooftop city sightseeing." },
      { day: "Day 12", title: "Departure", text: "Transfer to Ho Chi Minh City airport." },
    ],
    included: ["11 nights hotels, cruise & train", "Internal flight & transfers", "Local guides throughout", "Daily breakfast, 5 meals", "Cooking class"],
    notIncluded: ["International flights", "Vietnam visa", "Travel insurance", "Optional excursions"],
  },
  {
    slug: "masai-mara-migration",
    title: "Masai Mara Migration",
    place: "Kenya",
    days: "7 days",
    price: "$2,190",
    was: "$2,650",
    rating: 4.9,
    image: kenya,
    style: "Safari",
    summary:
      "Big cats, endless plains and the thunder of hooves across the Masai Mara - Kenya's greatest safari with hot-air balloon option and Maasai village visits.",
    highlights: [
      "Daily game drives in the Masai Mara Reserve",
      "Great Migration river crossings (Jul-Oct)",
      "Optional sunrise hot-air balloon safari",
      "Visit a Maasai village and learn beadwork",
      "Stay in a tented camp on the Mara rim",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive Nairobi", text: "Meet your guide, transfer to a boutique hotel and safari briefing over dinner." },
      { day: "Day 2", title: "Nairobi to Masai Mara", text: "Scenic drive through the Rift Valley to your tented camp on the Mara." },
      { day: "Day 3", title: "Mara game drives", text: "Morning and afternoon drives searching for the Big Five and cheetah." },
      { day: "Day 4", title: "Migration plains", text: "Full day on the plains with a picnic lunch, focused on the herds and predators." },
      { day: "Day 5", title: "Balloon & village", text: "Optional balloon flight, then visit a Maasai village for songs and traditions." },
      { day: "Day 6", title: "Lake Naivasha", text: "Boat ride among hippos and birdlife, optional walk on Crescent Island." },
      { day: "Day 7", title: "Departure", text: "Return to Nairobi for your onward flight." },
    ],
    included: ["6 nights lodges & tented camp", "4x4 safari vehicle with pop-top roof", "All park & reserve fees", "Full board on safari", "Maasai village visit"],
    notIncluded: ["International flights", "Hot-air balloon safari", "Travel insurance", "Drinks & tips"],
  },
  {
    slug: "kenya-safari-and-beach",
    title: "Kenya Safari & Beach",
    place: "Kenya",
    days: "10 days",
    price: "$2,680",
    was: "$3,190",
    rating: 4.8,
    image: kenya,
    style: "Group tour",
    summary:
      "The classic Kenya combo: the Masai Mara's wildlife, Rift Valley lakes and the palm-fringed beaches of Diani for the ultimate bush-to-beach escape.",
    highlights: [
      "Big Five game drives in the Masai Mara",
      "Boat safari on Lake Naivasha",
      "Amboseli elephants with Kilimanjaro views",
      "Relax on Diani's white-sand beach",
      "Swahili cooking class in Mombasa",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive Nairobi", text: "Airport transfer, welcome dinner and introduction to your group." },
      { day: "Day 2", title: "Amboseli", text: "Drive south to Amboseli for elephants and Kilimanjaro sunsets." },
      { day: "Day 3", title: "Amboseli game drives", text: "Morning and afternoon drives, visit an observation hill for panoramas." },
      { day: "Day 4", title: "Lake Naivasha", text: "Cross the Rift Valley, afternoon boat ride among hippos and pelicans." },
      { day: "Day 5", title: "Masai Mara", text: "Drive to the Mara, evening game drive and camp dinner." },
      { day: "Day 6", title: "Mara plains", text: "Full day exploring the reserve, tracking lions and the migrating herds." },
      { day: "Day 7", title: "Fly to Diani", text: "Short flight to the coast and transfer to a beach resort." },
      { day: "Day 8", title: "Diani beach", text: "Free day for snorkelling, dhow sailing or simply relaxing by the sea." },
      { day: "Day 9", title: "Mombasa", text: "Day trip to historic Mombasa old town and a Swahili cooking class." },
      { day: "Day 10", title: "Departure", text: "Transfer to Mombasa or Nairobi airport for your flight home." },
    ],
    included: ["9 nights lodges, camp & beach hotel", "Internal flight to Diani", "4x4 safari vehicle & boat trip", "All park fees", "Swahili cooking class"],
    notIncluded: ["International flights", "Drinks & meals where stated", "Travel insurance", "Tips"],
  },
];

export function getTrip(slug: string): Trip | undefined {
  return TRIPS.find((t) => t.slug === slug);
}
