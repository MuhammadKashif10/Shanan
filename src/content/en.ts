import type { ServiceSlug } from "@/lib/site";

type Service = {
  title: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  includes: string[];
  fits: string[];
  faq: { q: string; a: string }[];
};

export const en = {
  meta: {
    siteName: "Shanan Cargo Transport",
    home: {
      title: "Light Truck Cargo Transport in Dubai | Shanan Cargo Transport",
      description:
        "Licensed light truck cargo transport in Dubai: furniture removal, raw materials, container loading and unloading, truck rental and construction waste removal. Get a quote online.",
    },
  },
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    faq: "FAQ",
    contact: "Contact",
    quote: "Get a quote",
    menu: "Menu",
    close: "Close",
    language: "العربية",
    languageLabel: "Switch to Arabic",
    skip: "Skip to content",
  },
  common: {
    getQuote: "Get a free quote",
    whatsapp: "WhatsApp us",
    call: "Call us",
    learnMore: "Learn more",
    viewServices: "View all services",
    readyTitle: "Ready to move your cargo?",
    readyText: "Tell us what you need moved and where. We will come back to you with a clear quote.",
    breadcrumbHome: "Home",
    licensed: "Licensed in Dubai",
    licenseNo: "License No.",
    registerNo: "Commercial Register No.",
    dcci: "Dubai Chamber of Commerce No.",
    issuer: "Issued by the Dubai Department of Economy and Tourism",
    address: "Address",
    phone: "Phone / WhatsApp",
    email: "Email",
    directions: "Get directions",
    legalForm: "Limited Liability Company (LLC)",
    ourServices: "Our services",
  },
  home: {
    eyebrow: "Dubai · Light trucks · Licensed",
    title: "Cargo moved across Dubai, handled with care.",
    text: "Shanan Cargo Transport is a Dubai licensed company moving cargo by light truck: furniture, raw materials, containers and construction waste, with loading and unloading included in our scope.",
    routeFrom: "Pickup",
    routeTo: "Drop-off",
    trustItems: [
      "Licensed by Dubai Economy and Tourism",
      "Six licensed business activities",
      "Arabic and English service",
      "Office in Deira, Dubai. We collect from anywhere",
    ],
    servicesTitle: "What we move",
    servicesText: "Six activities, all covered by our Dubai commercial license. Pick the one that fits, or ask us if you are unsure.",
    stepsTitle: "How it works",
    stepsText: "Four simple steps from request to delivery.",
    steps: [
      { title: "Send your request", text: "Use the step by step quote form, call us or message us on WhatsApp." },
      { title: "Get a clear quote", text: "We review the cargo, route and timing, then reply with a quote." },
      { title: "We collect", text: "A light truck arrives at your pickup point and the cargo is loaded." },
      { title: "We deliver", text: "Your cargo is transported and unloaded at the drop-off location." },
    ],
    whyTitle: "Why customers choose Shanan",
    whyText: "A simple promise: a properly licensed company, clear communication and careful handling.",
    why: [
      { title: "Properly licensed", text: "Operating under Dubai commercial license No. 1111866, issued by the Department of Economy and Tourism." },
      { title: "Clear quotes", text: "Tell us the route, the cargo and the date. We reply with a quote so you know what to expect." },
      { title: "Loading and unloading", text: "Our licensed scope includes container loading and unloading, so one company can cover the whole move." },
      { title: "Speak your language", text: "Our team works in Arabic and English, and this website is available in both." },
    ],
    whoTitle: "Who we work with",
    who: [
      "Families and individuals moving home",
      "Offices and small businesses relocating",
      "Contractors and construction sites",
      "Traders, importers and warehouses",
      "Shops and suppliers needing regular transport",
    ],
    faqTitle: "Frequently asked questions",
    faqLink: "See all questions",
  },
  about: {
    metaTitle: "About Shanan Cargo Transport | Licensed Dubai Transport Company",
    metaDescription:
      "Shanan for Cargo Transport by Light Trucks LLC is a Dubai licensed transport company based in Deira. See our license details and what we do.",
    title: "About Shanan Cargo Transport",
    lead: "We are a Dubai based light truck transport company, licensed and registered with the Department of Economy and Tourism.",
    storyTitle: "Who we are",
    story: [
      "Shanan for Cargo Transport by Light Trucks LLC is a limited liability company registered in Dubai. Our office is in Al Murar, Deira, and we move cargo for households, businesses and construction sites.",
      "Our work is deliberately focused. We run light trucks, we load and unload, and we handle the kind of moves where a heavy haulage firm is too much and a pickup is not enough: furniture, raw materials, containers and site waste.",
      "We believe good transport is mostly good communication. You tell us what needs to move, we confirm the details with you, and we do what we said we would do.",
    ],
    licenseTitle: "License and registration",
    licenseText: "Everything below is taken from our current Dubai commercial license and commercial register.",
    licenseRows: [
      ["Legal name", "SHANAN FOR CARGO TRANSPORT BY LIGHT TRUCKS LLC"],
      ["Legal form", "Limited Liability Company (LLC)"],
      ["License category", "Department of Economic Development"],
      ["License No.", "1111866"],
      ["Commercial Register No.", "1827913"],
      ["Dubai Chamber of Commerce No.", "426299"],
      ["Registered office", "Office 103, Al Murar, Deira, Dubai"],
    ],
    activitiesTitle: "Licensed activities",
    valuesTitle: "How we work",
    values: [
      { title: "Careful handling", text: "Your cargo is treated as if it were ours, from the first lift to the last." },
      { title: "Straight answers", text: "We tell you what we can and cannot do before we agree to do it." },
      { title: "Respect for your time", text: "We confirm pickup times and keep you informed on the day." },
    ],
  },
  services: {
    metaTitle: "Transport Services in Dubai | Shanan Cargo Transport",
    metaDescription:
      "Cargo transport by light trucks, raw materials transport, furniture removal, container loading and unloading, truck rental and construction waste removal in Dubai.",
    title: "Our transport services",
    lead: "Six licensed activities covering most light cargo moves in Dubai. Each one is covered by our commercial license.",
    includesTitle: "What is included",
    fitsTitle: "Good for",
    faqTitle: "Questions about this service",
    otherTitle: "Other services",
    quoteCta: "Request a quote for this service",
  },
  faq: {
    metaTitle: "Frequently Asked Questions | Shanan Cargo Transport",
    metaDescription: "Answers about quotes, furniture removal, raw materials transport, truck rental and construction waste removal in Dubai.",
    title: "Frequently asked questions",
    lead: "Quick answers to the things people ask us most. If yours is missing, just call or message us.",
    items: [
      {
        q: "Are you a licensed company?",
        a: "Yes. Shanan for Cargo Transport by Light Trucks LLC operates under Dubai commercial license No. 1111866, issued by the Department of Economy and Tourism. The license details are on our About page.",
      },
      {
        q: "What kinds of cargo do you move?",
        a: "Our license covers light truck cargo transport, raw materials transport by road, new and used furniture removal, shipping container loading and unloading, general truck rental, and collection and transport of construction and demolition waste.",
      },
      {
        q: "How do I get a quote?",
        a: "Fill in the step by step quote form on this website, call us, or message us on WhatsApp. Tell us what is being moved, the pickup and drop-off locations and your preferred date, and we will reply with a quote.",
      },
      {
        q: "Do you offer loading and unloading?",
        a: "Yes. Loading and unloading of shipping containers is one of our licensed services, and we can include loading help with your transport request. Mention it in the quote form so we can plan for it.",
      },
      {
        q: "Can you move furniture that is old or already used?",
        a: "Yes. Our license covers the removal of both new and used furniture. Let us know about large or fragile items when you request your quote.",
      },
      {
        q: "Do you remove construction and demolition waste?",
        a: "Yes. We collect and transport construction and demolition waste. Tell us the type and approximate amount of material and the site access so we can plan the right truck.",
      },
      {
        q: "Can I rent a truck from you?",
        a: "General truck rental is part of our licensed activities. Use the quote form to tell us what you need and for how long, and we will confirm availability and terms.",
      },
      {
        q: "Which languages do you speak?",
        a: "Arabic and English. This website is available in both, and you can switch language at any time from the top of the page.",
      },
      {
        q: "Where are you located?",
        a: "Our office is at Office 103, Sultan Mohammed Abdullah Karamastaji Building, Al Murar, Deira, Dubai.",
      },
    ],
  },
  contact: {
    metaTitle: "Contact Shanan Cargo Transport | Deira, Dubai",
    metaDescription: "Call, WhatsApp or visit Shanan Cargo Transport in Al Murar, Deira, Dubai. Request a transport quote online.",
    title: "Contact us",
    lead: "The fastest ways to reach us are a phone call or a WhatsApp message. For a detailed price, use the quote form.",
    cards: {
      call: "Call",
      whatsapp: "WhatsApp",
      email: "Email",
      visit: "Visit our office",
    },
    formCta: "Prefer to type it all out? Use the step by step quote form.",
  },
  quote: {
    metaTitle: "Request a Transport Quote | Shanan Cargo Transport",
    metaDescription: "Request a cargo transport, furniture removal, truck rental or waste removal quote in Dubai with our step by step form.",
    title: "Request a quote",
    lead: "Four short steps. It takes about two minutes and we reply with a quote.",
    steps: ["Service", "Route", "Cargo", "Contact"],
    stepOf: "Step {n} of {total}",
    back: "Back",
    next: "Continue",
    submit: "Send request",
    sending: "Sending…",
    review: "Review",
    s1: { title: "What do you need?", text: "Choose the service that best matches your request." },
    s2: { title: "Where and when?", text: "Tell us about the pickup and drop-off." },
    s3: { title: "Tell us about the cargo", text: "A few details help us choose the right truck." },
    s4: { title: "How can we reach you?", text: "We will use these details to send your quote." },
    fields: {
      pickupArea: "Pickup area in Dubai",
      areaPlaceholder: "Select an area",
      areaOther: "Other (type it)",
      areaOtherHint: "Type the area, building or address",
      dropoffArea: "Drop-off area in Dubai",
      date: "Preferred date",
      flexible: "My date is flexible",
      cargo: "What needs to be moved?",
      cargoHint: "For example: 3 bedroom apartment furniture, 20 bags of cement, one 20ft container",
      size: "Approximate size or weight",
      sizeHint: "Optional. For example: about 2 tons, or 15 boxes and 6 large items",
      loading: "Do you need loading and unloading help?",
      yes: "Yes",
      no: "No",
      notSure: "Not sure",
      notes: "Anything else we should know?",
      notesHint: "Optional. Floor numbers, lift access, parking, fragile items…",
      name: "Full name",
      phone: "Phone number",
      phoneHint: "With country code if outside the UAE",
      email: "Email",
      emailHint: "Optional, but helps us reply faster",
      contactVia: "Best way to reach you",
      viaPhone: "Phone call",
      viaWhatsapp: "WhatsApp",
      viaEmail: "Email",
      optional: "Optional",
    },
    errors: {
      service: "Please choose a service.",
      pickup: "Please enter the pickup area.",
      dropoff: "Please enter the drop-off area.",
      cargo: "Please describe what needs to be moved.",
      name: "Please enter your name.",
      phone: "Please enter a valid phone number.",
      email: "Please enter a valid email address.",
      contactVia: "Please choose how we should reach you.",
      generic: "Something went wrong while sending your request. Please call or WhatsApp us on +971 55 765 1866.",
      unavailable: "Our quote form is temporarily unavailable. Please call or WhatsApp us on +971 55 765 1866.",
    },
    successTitle: "Thank you, your request is in",
    successText: "We have received your quote request and will be in touch shortly using the details you gave us.",
    reference: "Your reference",
    whatsappFollow: "Want to speak sooner? Message us on WhatsApp.",
    another: "Send another request",
    summary: "Summary",
    privacyNote: "We only use your details to answer your request.",
  },
  legal: {
    privacy: {
      metaTitle: "Privacy Policy | Shanan Cargo Transport",
      metaDescription: "How Shanan Cargo Transport collects and uses the information you send through this website.",
      title: "Privacy policy",
      updated: "Last updated: 27 October 2026",
      sections: [
        {
          h: "Who we are",
          p: ["This website is operated by Shanan for Cargo Transport by Light Trucks LLC, Dubai, United Arab Emirates (license No. 1111866)."],
        },
        {
          h: "What we collect",
          p: [
            "When you submit the quote form we collect the details you enter: your name, phone number, optional email address, pickup and drop-off areas, preferred date and a description of the cargo.",
            "If you contact us by phone or WhatsApp, we receive the information you share in that conversation.",
          ],
        },
        {
          h: "How we use it",
          p: ["We use your details only to respond to your request, prepare a quote and carry out the transport you ask for. We do not sell your information and we do not use it for advertising."],
        },
        {
          h: "How requests are delivered",
          p: ["Quote requests are sent to us as an email through the Resend email delivery service. This website does not use advertising or tracking cookies."],
        },
        {
          h: "Keeping and deleting your data",
          p: ["We keep request emails for as long as needed to serve you and meet our business and legal obligations. You can ask us to delete your information at any time."],
        },
        {
          h: "Contact",
          p: ["For any privacy question, call +971 55 765 1866 or write to shanancargotransport@gmail.com."],
        },
      ],
    },
    terms: {
      metaTitle: "Terms of Use | Shanan Cargo Transport",
      metaDescription: "Terms for using the Shanan Cargo Transport website and requesting quotes.",
      title: "Terms of use",
      updated: "Last updated: 27 October 2026",
      sections: [
        {
          h: "About this website",
          p: ["This website provides information about the services of Shanan for Cargo Transport by Light Trucks LLC and lets you request a quote."],
        },
        {
          h: "Quotes",
          p: ["A quote request is not a booking. A booking is confirmed only when we agree the details of the job with you directly. Prices and availability depend on the cargo, route, date and access."],
        },
        {
          h: "Accuracy of your information",
          p: ["Please give us accurate details about the cargo and locations. Differences between what is described and what is actually moved can change the price or the vehicle needed."],
        },
        {
          h: "Content",
          p: ["The content, logo and design of this website belong to Shanan for Cargo Transport by Light Trucks LLC. Please do not copy them without our permission."],
        },
        {
          h: "Governing law",
          p: ["These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates."],
        },
      ],
    },
  },
  footer: {
    tagline: "Light truck cargo transport in Dubai.",
    explore: "Explore",
    services: "Services",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    rights: "All rights reserved.",
    licenseLine: "Licensed by the Dubai Department of Economy and Tourism · License No.",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    home: "Back to home",
  },
  servicesData: {
    "cargo-transport": {
      title: "Cargo Transport by Light Trucks",
      short: "Dependable point to point transport for goods and parcels that do not need a heavy truck.",
      metaTitle: "Cargo Transport by Light Trucks in Dubai | Shanan",
      metaDescription:
        "Licensed light truck cargo transport in Dubai for goods, stock and equipment. Request a quote online or call Shanan Cargo Transport.",
      intro:
        "Not every load needs a heavy truck. Our light trucks are the right size for stock, equipment, packaged goods and mixed cargo moving around Dubai, and they can reach places larger vehicles cannot. Tell us what you are moving and we will plan the right vehicle for it.",
      includes: [
        "Point to point transport of goods and packaged cargo",
        "One-off jobs or repeat deliveries for your business",
        "Help with loading when you request it",
        "Clear coordination of pickup and delivery times",
      ],
      fits: ["Shops and suppliers", "Warehouses and traders", "Offices and workshops", "Individuals with bulky items"],
      faq: [
        {
          q: "What size loads can a light truck carry?",
          a: "Light trucks suit small to medium loads. Describe your cargo in the quote form and we will confirm whether it fits or whether you need a different arrangement.",
        },
        {
          q: "Can you handle regular deliveries?",
          a: "Yes. If you need transport on a repeating basis, tell us the route and frequency in your request.",
        },
      ],
    },
    "raw-materials-transport": {
      title: "Raw Materials Transport by Road",
      short: "Road transport of raw and building materials to sites, factories and warehouses.",
      metaTitle: "Raw Materials Transport by Road in Dubai | Shanan",
      metaDescription:
        "Road transport of raw materials in Dubai to sites, workshops and warehouses. Licensed light truck operator. Get a quote from Shanan Cargo Transport.",
      intro:
        "Workshops, contractors and manufacturers depend on materials arriving when planned. We transport raw materials by road to your site, workshop or warehouse, and we plan the load around the material, the access and the delivery window.",
      includes: [
        "Transport of raw and construction related materials by road",
        "Delivery to sites, workshops, factories and warehouses",
        "Loading and unloading help on request",
        "Planning around site access and timing",
      ],
      fits: ["Contractors", "Workshops and small factories", "Material suppliers", "Project sites"],
      faq: [
        {
          q: "Which materials can you transport?",
          a: "Tell us the material, quantity and packaging in the quote form. We will confirm what we can carry safely and within our license.",
        },
        {
          q: "Can you deliver straight to a construction site?",
          a: "Yes, subject to site access. Let us know about gates, permits and unloading arrangements when you request a quote.",
        },
      ],
    },
    "furniture-removal": {
      title: "New and Used Furniture Removal",
      short: "Careful moving of home and office furniture, whether it is brand new or well used.",
      metaTitle: "Furniture Removal in Dubai | New & Used Furniture | Shanan",
      metaDescription:
        "Furniture removal in Dubai for homes and offices, new or used furniture. Licensed, careful handling. Request a free quote from Shanan Cargo Transport.",
      intro:
        "Moving home or office, or delivering a new sofa, should not be stressful. We move new and used furniture across Dubai, handling each piece with care and planning the load so everything arrives in the right order.",
      includes: [
        "Removal of new and used furniture",
        "Moving apartments, villas, offices and shops",
        "Loading and unloading of your items",
        "Delivery of furniture bought from stores",
      ],
      fits: ["Families moving home", "Offices relocating", "Furniture shoppers needing delivery", "Landlords and tenants"],
      faq: [
        {
          q: "Do you move furniture from or to upper floors?",
          a: "Yes. Tell us the floor numbers and whether there is a lift so we can plan the time and manpower.",
        },
        {
          q: "Can you move just a few items?",
          a: "Yes. A single sofa or a full apartment, describe it in the quote form and we will quote accordingly.",
        },
      ],
    },
    "container-loading-unloading": {
      title: "Shipping Containers Loading and Unloading",
      short: "Loading and unloading of shipping containers, handled efficiently and safely.",
      metaTitle: "Container Loading & Unloading Services in Dubai | Shanan",
      metaDescription:
        "Shipping container loading and unloading services in Dubai. Licensed transport company in Deira. Request a quote from Shanan Cargo Transport.",
      intro:
        "Containers arrive on a schedule and waiting costs money. We provide loading and unloading services for shipping containers, and we can move the cargo onward by light truck so the job is handled by one company from container to destination.",
      includes: [
        "Loading of cargo into shipping containers",
        "Unloading of containers and sorting of cargo",
        "Onward transport of unloaded cargo by light truck",
        "Coordination around your container schedule",
      ],
      fits: ["Importers and exporters", "Traders and wholesalers", "Warehouses", "Businesses receiving stock"],
      faq: [
        {
          q: "Can you also deliver the goods after unloading?",
          a: "Yes. We can unload the container and transport the cargo to its destination by light truck. Include both needs in your quote request.",
        },
        {
          q: "What should I tell you before booking?",
          a: "The container size, the type of cargo, the location and the date it arrives or needs loading.",
        },
      ],
    },
    "truck-rental": {
      title: "General Truck Rental",
      short: "Trucks available to rent for your own moving and transport needs.",
      metaTitle: "Truck Rental in Dubai | General Truck Rental | Shanan",
      metaDescription:
        "General truck rental in Dubai from a licensed transport company in Deira. Tell us what you need and request a quote from Shanan Cargo Transport.",
      intro:
        "Sometimes the best option is to have a truck on hand. We offer general truck rental under our Dubai license. Share what you need to carry and for how long, and we will confirm what is available and the terms.",
      includes: [
        "General truck rental for moving and transport needs",
        "Flexible requests, tell us your duration and purpose",
        "Confirmation of availability and terms before you commit",
      ],
      fits: ["Businesses with short term needs", "Contractors", "Event and retail suppliers", "Individuals moving items themselves"],
      faq: [
        {
          q: "How do I rent a truck?",
          a: "Send a request through the quote form with the dates and purpose, or call us. We will confirm availability and terms with you directly.",
        },
        {
          q: "Is a driver included?",
          a: "Availability and terms vary by request. Tell us whether you need a driver and we will confirm.",
        },
      ],
    },
    "construction-waste-removal": {
      title: "Construction and Demolition Waste Collection and Transportation",
      short: "Collection and transport of construction and demolition waste from your site.",
      metaTitle: "Construction & Demolition Waste Removal in Dubai | Shanan",
      metaDescription:
        "Construction and demolition waste collection and transport in Dubai from a licensed company. Request a quote from Shanan Cargo Transport.",
      intro:
        "Renovations and demolition leave behind a lot of material. We collect and transport construction and demolition waste from your site so it is cleared safely and quickly, leaving your project ready for the next stage.",
      includes: [
        "Collection of construction and demolition waste",
        "Loading from the site and transport away",
        "Support for renovation, fit-out and demolition projects",
        "Planning around site access and working hours",
      ],
      fits: ["Contractors and fit-out companies", "Villa and apartment renovations", "Demolition projects", "Property managers"],
      faq: [
        {
          q: "What should I tell you about the waste?",
          a: "The type of material, the approximate amount, where it is on the site and how our truck can access it.",
        },
        {
          q: "Can you do one-off clearances?",
          a: "Yes. One-off clearances and ongoing collections are both fine. Say which in your request.",
        },
      ],
    },
  } satisfies Record<ServiceSlug, Service>,
};

export type Dict = Omit<typeof en, "servicesData"> & {
  servicesData: Record<ServiceSlug, Service>;
};
