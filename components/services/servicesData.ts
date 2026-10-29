export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceMediaItem {
  id: string;
  title: string;
  category?: string;
  url: string;
  type: "image" | "video";
  aspect?: "16:9" | "4:3" | "1:1" | "9:16" | "21:9";
  badge?: string;
  description?: string;
}

export interface ServiceDetailItem {
  id: string;
  slug: string;
  number: string;
  discipline: "INTERACTIVE SOLUTION" | "DESIGN";
  disciplineSlug: "interactive-solution" | "design";
  disciplineTag: string;
  title: string;
  heroHeadline: string;
  subtitle: string;
  manifesto: string;
  accentColor: string;
  badge: string;
  status: "active" | "coming-soon";
  coverImage?: string;
  coverVideo?: string;
  mediaCountLabel: string;
  gallery: ServiceMediaItem[];
  deliverables: {
    title: string;
    description: string;
    metric?: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  process: ServiceProcessStep[];
  clientBenefits: string[];
  tags: string[];
  ctaHeading: string;
  ctaSubtext: string;
  nextSlug: string;
  prevSlug: string;
}

export const ALL_SERVICES: ServiceDetailItem[] = [
  // =========================================================================
  // 1. IMAQUETTE (Interactive Solution)
  // =========================================================================
  {
    id: "imaquette",
    slug: "imaquette",
    number: "01",
    discipline: "INTERACTIVE SOLUTION",
    disciplineSlug: "interactive-solution",
    disciplineTag: "DIGITAL EXPERIENCES & 3D SYSTEMS",
    title: "IMAQUETTE",
    heroHeadline: "THE DIGITAL SCALE MODEL FOR VISIONARY DEVELOPMENTS",
    subtitle: "Real-time interactive architectural maquette with touch-table controls, dynamic sun simulation, and unit selectors.",
    manifesto:
      "Traditional physical models are static, expensive to update, and limited in perspective. The iMaquette combines photorealistic real-time 3D graphics with large-format multi-touch tables, empowering sales teams and developers to showcase master developments with kinetic precision.",
    accentColor: "#00c8ff",
    badge: "SALES GALLERY TECH",
    status: "active",
    coverVideo: "https://res.cloudinary.com/hxytmocg/video/upload/v1793204898/Diva.mp4",
    mediaCountLabel: "10 INTERACTIVE REELS",
    gallery: [
      {
        id: "m-vid-1",
        title: "Diva Interactive Sales Gallery Scale Model",
        category: "Full Scale Model",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793204898/Diva.mp4",
        type: "video",
        aspect: "16:9",
        badge: "FLAGSHIP MAQUETTE",
        description: "Full production capture of the Diva touch-table scale model with real-time unit filtering and daylight simulation.",
      },
      {
        id: "m-vid-2",
        title: "Maghamis Masterplan 3D Maquette",
        category: "Full Scale Model",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793208052/MAGHAMIS_2026.10.28_-_13.58.56.05.mp4",
        type: "video",
        aspect: "16:9",
        badge: "REAL-TIME 3D",
        description: "Live demonstration of the Maghamis real-time 3D maquette featuring full masterplan orbit and compound navigation.",
      },
      {
        id: "m-vid-3",
        title: "Interactive Exploded Architectural Diagram",
        category: "Feature Module",
        url: "/interactive_solution/imaquette/Explode Diagram.mp4",
        type: "video",
        aspect: "16:9",
        badge: "EXPLODED VIEW",
        description: "Real-time layer-by-layer explosion of building floors, structural slabs, and interior layouts with touchscreen controls.",
      },
      {
        id: "m-vid-4",
        title: "Cinematic Drone Aerial Orbit Mode",
        category: "Feature Module",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793206972/DroneMode.mp4",
        type: "video",
        aspect: "16:9",
        badge: "DRONE ORBIT",
        description: "Virtual drone navigation allowing prospective buyers to inspect any angle and elevation across the master community.",
      },
      {
        id: "m-vid-5",
        title: "Real-time Material & Facade Customizer",
        category: "Feature Module",
        url: "/interactive_solution/imaquette/change material .mp4",
        type: "video",
        aspect: "16:9",
        badge: "MATERIAL ATELIER",
        description: "Dynamic material swapping enabling instant visualization of stone, glass, aluminum, and cladding variations.",
      },
      {
        id: "m-vid-6",
        title: "Dynamic Day to Night Lighting Simulation",
        category: "Feature Module",
        url: "/interactive_solution/imaquette/night mode.mp4",
        type: "video",
        aspect: "16:9",
        badge: "LIGHTING STUDY",
        description: "Astronomically calibrated daylight and twilight cycle with architectural interior and exterior landscape illumination.",
      },
      {
        id: "m-vid-7",
        title: "Atmospheric Weather & Seasonal Simulator",
        category: "Feature Module",
        url: "/interactive_solution/imaquette/weather change .mp4",
        type: "video",
        aspect: "16:9",
        badge: "WEATHER ENGINE",
        description: "Real-time rain, overcast sky, fog, and clear sunset atmospheric presets powered by dynamic volumetric rendering.",
      },
      {
        id: "m-vid-8",
        title: "Interactive Vehicle Compound Drive-Through",
        category: "Feature Module",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793207922/Car_gameplay.mp4",
        type: "video",
        aspect: "16:9",
        badge: "DRIVE SIMULATION",
        description: "Real-time vehicle physics allowing visitors to drive through compound streets, check parking entries, and inspect avenues.",
      },
      {
        id: "m-vid-9",
        title: "Pedestrian First/Third Person Compound Walkthrough",
        category: "Feature Module",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793206916/ThirdPerson_gameplay.mp4",
        type: "video",
        aspect: "16:9",
        badge: "PEDESTRIAN WALK",
        description: "Immersive avatar walkthrough to experience spatial scale, landscaped walkways, and amenities at human eye level.",
      },
      {
        id: "m-vid-10",
        title: "Geographical Context & Landmark Wayfinding",
        category: "Feature Module",
        url: "/interactive_solution/imaquette/surroundings.mp4",
        type: "video",
        aspect: "16:9",
        badge: "CONTEXT & MAP",
        description: "Macro-regional spatial map displaying surrounding highways, airport proximity, adjacent landmarks, and access arteries.",
      },
    ],
    deliverables: [
      {
        title: "Multi-touch Interactive Kiosk Software",
        description: "Custom Unreal Engine & WebGL standalone kiosk application configured for 4K/8K touch tables and wall displays.",
        metric: "60 FPS 4K Real-time",
      },
      {
        title: "Real-time Solar & Day/Night Studies",
        description: "Accurate physical sun path calculations showing shadow casting and natural illumination across any hour of the year.",
        metric: "365-Day Solar Accuracy",
      },
      {
        title: "Unit Inventory & Floorplan Explorer",
        description: "Interactive unit filtering by square meters, bedroom count, price, availability status, and balcony views.",
        metric: "Live CRM Sync",
      },
      {
        title: "Multi-Screen Showroom Synchronization",
        description: "Touch-table actions mirror instantly to curved panoramic LED walls for high-impact VIP buyer presentations.",
        metric: "< 10ms Latency",
      },
    ],
    specifications: [
      { label: "Engine", value: "Unreal Engine 5.4 / WebGL" },
      { label: "Display Compatibility", value: "4K / 8K Capacitive Touch Displays" },
      { label: "Control Surface", value: "Custom Architectural UI / iPad Remote" },
      { label: "Integration", value: "Salesforce / HubSpot Real Estate CRM" },
      { label: "Deployment", value: "Sales Galleries, Pop-up Pavilions, Web Stream" },
    ],
    process: [
      { number: "01", title: "CAD & BIM Ingestion", description: "Optimization of architectural Revit, Rhino, and 3ds Max geometries for real-time shaders." },
      { number: "02", title: "Atmospheric & Lighting Setup", description: "Bespoke physically-based materials, surrounding context photogrammetry, and dynamic lighting." },
      { number: "03", title: "UI & Logic Programming", description: "Custom UI development for touchscreens, filters, floor-by-floor slicing, and database binding." },
      { number: "04", title: "On-Site Hardware Commissioning", description: "Calibration of touchscreen tables, multi-display matrix controllers, and staff training." },
    ],
    clientBenefits: [
      "Accelerate off-plan sales cycles by giving buyers absolute confidence in their unbuilt unit views.",
      "Instant real-time updates to unit availability, pricing, and phase rollouts without remaking physical models.",
      "Premium tactile presence in commercial sales galleries that sets projects apart from competing developments.",
    ],
    tags: ["Touchscreen Kiosk", "Real-Time 3D", "Unreal Engine", "Digital Scale Model", "Sales Centers", "CRM Sync"],
    ctaHeading: "COMMISSION AN IMAQUETTE FOR YOUR NEXT DEVELOPMENT",
    ctaSubtext: "Transform your sales gallery with a bespoke interactive scale model tailored to your master plan.",
    nextSlug: "webdevelopment",
    prevSlug: "interior",
  },

  // =========================================================================
  // 2. WEBDEVELOPMENT (Interactive Solution)
  // =========================================================================
  {
    id: "webdevelopment",
    slug: "webdevelopment",
    number: "02",
    discipline: "INTERACTIVE SOLUTION",
    disciplineSlug: "interactive-solution",
    disciplineTag: "DIGITAL EXPERIENCES & 3D SYSTEMS",
    title: "WEBDEVELOPMENT",
    heroHeadline: "ARCHITECTURAL DIGITAL SPACES ENGINEERED FOR THE WEB",
    subtitle: "Ultra-fast bespoke digital platforms, WebGL 3D web applications, and choreographed kinetic experiences.",
    manifesto:
      "We design and code digital flagships for architectural studios, property conglomerates, and luxury brands. Combining Next.js 16, React 19, choreographed GSAP kinetic motion, and WebGL shaders, we build digital spaces as meticulously crafted as high-end architecture.",
    accentColor: "#b85d38",
    badge: "CREATIVE ENGINEERING",
    status: "coming-soon",
    mediaCountLabel: "COMING SOON",
    gallery: [],
    deliverables: [
      {
        title: "Custom Architectural Web Platforms",
        description: "Bespoke web architectures tailored specifically for luxury studios, development portfolios, and design agencies.",
        metric: "100/100 Lighthouse Performance",
      },
      {
        title: "Kinetic GSAP & WebGL 3D Motion",
        description: "Fluid micro-animations, choreographed scroll-driven transitions, and interactive WebGL canvas shaders.",
        metric: "Sub-second Page Transitions",
      },
      {
        title: "Headless Content Management",
        description: "Structured architectural project management with high-speed Sanity or Strapi backends.",
        metric: "Instant Asset Updates",
      },
      {
        title: "Global Edge Infrastructure & SEO",
        description: "Multi-region CDN deployment, programmatic OpenGraph generation, and structured schema architecture.",
        metric: "Global Sub-50ms TTFB",
      },
    ],
    specifications: [
      { label: "Core Stack", value: "Next.js 16 (App Router), React 19, TypeScript" },
      { label: "Motion Engine", value: "GSAP 3, ScrollTrigger, Framer Motion" },
      { label: "Styling & UI", value: "Tailwind CSS v4, Vanilla CSS Custom Tokens" },
      { label: "3D Rendering", value: "Three.js, WebGL, Shader Toy Shaders" },
      { label: "Deployment", value: "Vercel Enterprise / Cloudflare Edge" },
    ],
    process: [
      { number: "01", title: "Information Architecture", description: "Mapping user journeys, editorial typography hierarchy, and conversion funnels." },
      { number: "02", title: "Kinetic Motion Prototyping", description: "Choreographing page transitions, letter-by-letter kinetic headlines, and parallax tracks." },
      { number: "03", title: "Full-Stack Software Engineering", description: "Writing modular, strongly-typed TypeScript components with sub-second performance budgets." },
      { number: "04", title: "Telemetry & Global Launch", description: "Audit against Core Web Vitals, accessibility standards, and multi-region deployment." },
    ],
    clientBenefits: [
      "Sub-second page speeds that command attention and drastically reduce drop-off rates.",
      "Editorial brutalist typography and fluid kinetic motion that establish immediate market authority.",
      "Future-proof architecture built on Next.js 16, ensuring long-term scalability and security.",
    ],
    tags: ["Next.js 16", "React 19", "GSAP 3", "TypeScript", "Tailwind CSS", "Three.js / WebGL", "Headless CMS"],
    ctaHeading: "ARCHITECT YOUR NEXT DIGITAL FLAGSHIP",
    ctaSubtext: "Partner with our creative engineers to build a web experience that reflects the caliber of your architecture.",
    nextSlug: "animation",
    prevSlug: "imaquette",
  },

  // =========================================================================
  // 3. ANIMATION (Interactive Solution)
  // =========================================================================
  {
    id: "animation",
    slug: "animation",
    number: "03",
    discipline: "INTERACTIVE SOLUTION",
    disciplineSlug: "interactive-solution",
    disciplineTag: "DIGITAL EXPERIENCES & 3D SYSTEMS",
    title: "ANIMATION",
    heroHeadline: "CINEMATIC 8K ARCHITECTURAL VISUAL SEQUENCES",
    subtitle: "Ray-traced photorealism, kinetic camera choreography, and evocative narrative architectural cinema.",
    manifesto:
      "Architecture is experienced through light, shadow, movement, and time. Our CGI animation team crafts evocative 3D motion pictures that tell compelling stories about the life of spaces before a single brick is laid on site.",
    accentColor: "#00c8ff",
    badge: "CINEMATIC CGI",
    status: "active",
    coverVideo: "/interactive_solution/animation/ajna/CAM 01 GATE.mp4",
    mediaCountLabel: "20 CINEMA REELS",
    gallery: [
      {
        id: "a1",
        title: "Ajna Compound Grand Entrance Gate",
        category: "Ajna Masterplan",
        url: "/interactive_solution/animation/ajna/CAM 01 GATE.mp4",
        type: "video",
        aspect: "16:9",
        badge: "4K MASTER",
        description: "Kinetic architectural reveal sequence showcasing facade illumination, perimeter landscaping, and scale.",
      },
      {
        id: "a2",
        title: "Central Spine Daytime Flythrough",
        category: "Ajna Masterplan",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793208993/CAM_03_SPINE.mp4",
        type: "video",
        aspect: "16:9",
        badge: "CAMERA TRACK",
        description: "Sweeping camera traverse through the lush botanical central spine and modern residential facades.",
      },
      {
        id: "a3",
        title: "Central Spine Orbital Panoramic Pass",
        category: "Ajna Masterplan",
        url: "/interactive_solution/animation/ajna/CAM 03 SPINE_1_nyx3 (2).mp4",
        type: "video",
        aspect: "16:9",
        badge: "ORBITAL CAM",
        description: "Smooth 360-degree orbital elevation illustrating spatial integration between green fingers and villas.",
      },
      {
        id: "a4",
        title: "Sports Padel Club & Interactive LightMix",
        category: "Amenities & Sports",
        url: "/interactive_solution/animation/ajna/CAM-PADEL_Interactive LightMix_FINALmp4.mp4",
        type: "video",
        aspect: "16:9",
        badge: "LIGHTMIX 3D",
        description: "Interactive lighting study capturing illuminated glass court enclosures and twilight reflections.",
      },
      {
        id: "a5",
        title: "Private Rooftop Sky Lounge & Pool",
        category: "Amenities & Sports",
        url: "/interactive_solution/animation/ajna/CAM-ROOf_1- (1).mp4",
        type: "video",
        aspect: "16:9",
        badge: "SKYLINE POOL",
        description: "Evocative rooftop leisure zone featuring infinity pool water caustics and panoramic sunset views.",
      },
      {
        id: "a6",
        title: "Waterfront Promenade & Landscape Bridge",
        category: "Ajna Masterplan",
        url: "/interactive_solution/animation/ajna/CAM01-SPINE_02_1_nyx3 (1).mp4",
        type: "video",
        aspect: "16:9",
        badge: "WATER REFLECTIONS",
        description: "Ground-level pedestrian tracking shot along reflective water features and shaded leisure pergolas.",
      },
      {
        id: "a7",
        title: "Commercial Retail Boulevard Cinema",
        category: "Commercial & Retail",
        url: "/interactive_solution/animation/ajna/CAM01-STREET COMMERCIAL.mp4",
        type: "video",
        aspect: "16:9",
        badge: "RAY TRACED",
        description: "Pedestrian-level perspective demonstrating retail double-height shopfronts and dynamic human presence.",
      },
      {
        id: "a8",
        title: "Secondary Perimeter Gate Reveal",
        category: "Ajna Masterplan",
        url: "/interactive_solution/animation/ajna/CAM02-Gate.mp4",
        type: "video",
        aspect: "16:9",
        badge: "PERIMETER ARCH",
        description: "Security checkpoint architecture with cantilevered canopies and architectural concrete surfaces.",
      },
      {
        id: "a9",
        title: "Central Civic Gathering Square",
        category: "Ajna Masterplan",
        url: "/interactive_solution/animation/ajna/CAM04-SQUARE_1_nyx3 (2).mp4",
        type: "video",
        aspect: "16:9",
        badge: "URBAN SCALE",
        description: "Dynamic plaza flyover revealing stone pavement patterns, interactive fountains, and community life.",
      },
      {
        id: "a10",
        title: "Standalone Luxury Villa Prototype",
        category: "Residential Architecture",
        url: "/interactive_solution/animation/ajna/CAM06-PROTOTYPE.mp4",
        type: "video",
        aspect: "16:9",
        badge: "VILLA FACADE",
        description: "Exterior volumetric study detailing limestone cladding, recessed balconies, and integrated planter boxes.",
      },
      {
        id: "a11",
        title: "Twin Villa Elevation & Landscaping",
        category: "Residential Architecture",
        url: "/interactive_solution/animation/ajna/CAM13-Prototype.mp4",
        type: "video",
        aspect: "16:9",
        badge: "FACADE STUDY",
        description: "Contemporary twin residential architecture framed by mature date palms and minimal boundary walls.",
      },
      {
        id: "a12",
        title: "Pedestrian Garden & Shaded Walkways",
        category: "Landscape & Public Realm",
        url: "/interactive_solution/animation/ajna/CAMERA05_nyx3 (2).mp4",
        type: "video",
        aspect: "16:9",
        badge: "BOTANICAL CGI",
        description: "Meandering green pedestrian trail with natural dappled sunlight and ambient morning breeze.",
      },
      {
        id: "a13",
        title: "Eastville Master Aerial Drone Integration",
        category: "Urban & Masterplan",
        url: "/interactive_solution/animation/ajna/Copy of eastville ajna.mp4",
        type: "video",
        aspect: "16:9",
        badge: "DRONE MATCH",
        description: "Seamless sub-pixel 3D matchmoving marrying aerial drone plates with photoreal CGI architecture.",
      },
      {
        id: "a14",
        title: "Kasakoun Commercial Pavilion Animation",
        category: "Commercial & Retail",
        url: "/interactive_solution/animation/ajna/Copy of KASAKOUN_ANIMATION.mp4",
        type: "video",
        aspect: "16:9",
        badge: "COMMERCIAL CGI",
        description: "Bold geometric commercial pavilion with kinetic parametric facade perforations and evening neon.",
      },
      {
        id: "a15",
        title: "Luxury Chef Kitchen & Formal Dining Suite",
        category: "Hospitality & Interior",
        url: "/interactive_solution/animation/ajna/KITCHEN_DINNING.mp4",
        type: "video",
        aspect: "16:9",
        badge: "INTERIOR CINEMA",
        description: "Close-up textural tracking across fluted marble countertops, brushed brass faucets, and warm ambient light.",
      },
      {
        id: "a16",
        title: "Grand Triple-Height Reception Lobby",
        category: "Hospitality & Interior",
        url: "/interactive_solution/animation/ajna/LOBBY.mp4",
        type: "video",
        aspect: "16:9",
        badge: "INTERIOR 3D",
        description: "Fluid camera glide through sculptural fluted columns and textured bookmatched marble reception desks.",
      },
      {
        id: "a17",
        title: "VIP Executive Lounge & Fireplace Mood",
        category: "Hospitality & Interior",
        url: "/interactive_solution/animation/ajna/LOUNGE.mp4",
        type: "video",
        aspect: "16:9",
        badge: "ACEScg COLOR",
        description: "Intimate dusk mood study with tactile materiality, linear fireplace flames, and acoustic wall treatments.",
      },
      {
        id: "a18",
        title: "Central Spine Nighttime Illumination",
        category: "Ajna Masterplan",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793216262/NIGHT_SPINE.mp4",
        type: "video",
        aspect: "16:9",
        badge: "NIGHT LIGHTING",
        description: "Physically-based volumetric atmosphere tracking ambient dusk lights and reflective waterways.",
      },
      {
        id: "a19",
        title: "Concierge Welcome Reception Experience",
        category: "Hospitality & Interior",
        url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793214871/reception.mp4",
        type: "video",
        aspect: "16:9",
        badge: "CINEMATIC 8K",
        description: "Warm welcome narrative sequence demonstrating hospitality service points and soft architectural lighting.",
      },
      {
        id: "a20",
        title: "Orin Luxury Shopping Mall Walkthrough",
        category: "Commercial & Retail",
        url: "/interactive_solution/animation/orin/Orin mall.mp4",
        type: "video",
        aspect: "16:9",
        badge: "RETAIL WALKTHROUGH",
        description: "Atrium spatial fluidity, skylight diffusion, and high-end boutique storefront integration.",
      },
    ],
    deliverables: [
      {
        title: "4K / 8K Architectural Master Films",
        description: "Full-length cinematic films exploring interior moods, exterior facades, surrounding landscapes, and twilight transitions.",
        metric: "8K UHD Master Render",
      },
      {
        title: "Drone Photogrammetry Matching",
        description: "Seamless integration of 3D computer-generated architecture with real-world drone footage and live camera tracking.",
        metric: "Sub-pixel 3D Matchmove",
      },
      {
        title: "Atmospheric Day-to-Night Transitions",
        description: "Cinematic time-lapse sequences showing sunlight traversing interior spaces and cityscapes igniting at twilight.",
        metric: "Physically-based Sky Engines",
      },
      {
        title: "Sound Design & Foley Scoring",
        description: "Custom atmospheric soundscapes, binaural audio design, and cinematic orchestral mastering.",
        metric: "Lossless 24-Bit Spatial Audio",
      },
    ],
    specifications: [
      { label: "Render Engines", value: "Corona Renderer, Chaos V-Ray, Unreal Engine 5.4" },
      { label: "Aspect Ratios", value: "2.39:1 Anamorphic, 16:9 Cinema, 9:16 Social" },
      { label: "Resolution", value: "Up to 8192 × 4320 (8K DCI)" },
      { label: "Color Grading", value: "DaVinci Resolve ACES Color Managed" },
      { label: "Deliverables", value: "ProRes 4444 XQ, MP4 H.265, WebM" },
    ],
    process: [
      { number: "01", title: "Storyboard & Camera Direction", description: "Choreographing camera focal lengths, emotional arcs, and architectural focal points." },
      { number: "02", title: "Lighting & Tactile Shading", description: "Bespoke micro-surface textures, ray-traced caustics, and atmospheric volumetric fog." },
      { number: "03", title: "Render Farm Computation", description: "High-density cloud computation ensuring zero flickering and grain-free motion." },
      { number: "04", title: "Editorial Grade & Foley", description: "Color grading in DaVinci Resolve, spatial sound design, and master delivery." },
    ],
    clientBenefits: [
      "Evoke visceral emotional reactions that win high-stakes design competitions and investor approvals.",
      "High-impact marketing assets ready for international advertising, social campaigns, and cinema screens.",
      "Absolute control over weather, seasons, and lighting to show spaces at their most breathtaking hour.",
    ],
    tags: ["4K Cinematic CGI", "Ray-Tracing", "Photorealism", "Camera Choreography", "Visual Direction", "Drone Matching"],
    ctaHeading: "COMMISSION A CINEMATIC 3D FILM",
    ctaSubtext: "Bring your architecture to life with cinematic visual direction and photorealistic CGI animation.",
    nextSlug: "vr",
    prevSlug: "webdevelopment",
  },

  // =========================================================================
  // 4. VR (Interactive Solution)
  // =========================================================================
  {
    id: "vr",
    slug: "vr",
    number: "04",
    discipline: "INTERACTIVE SOLUTION",
    disciplineSlug: "interactive-solution",
    disciplineTag: "DIGITAL EXPERIENCES & 3D SYSTEMS",
    title: "VR",
    heroHeadline: "6DOF ROOM-SCALE VIRTUAL REALITY WALKTHROUGHS",
    subtitle: "Spatial computing, uncompromised 1:1 scale immersion, and interactive material customization.",
    manifesto:
      "Renderings allow clients to look at architecture; Virtual Reality places them inside it. By harnessing cutting-edge spatial computing, we allow developers, investors, and homeowners to walk through spaces, test materials, and experience ceiling heights before construction.",
    accentColor: "#b85d38",
    badge: "SPATIAL COMPUTING",
    status: "coming-soon",
    mediaCountLabel: "COMING SOON",
    gallery: [],
    deliverables: [
      {
        title: "6DoF Room-scale VR Environments",
        description: "Full six-degrees-of-freedom navigation allowing users to physically walk, lean, and inspect architectural details.",
        metric: "90+ FPS Ultra-low Motion Sickness",
      },
      {
        title: "Interactive Finishes & Lighting Configurator",
        description: "Live real-time material swatches allowing buyers to toggle between marble, wood, and concrete textures instantly.",
        metric: "Instant Real-time Swapping",
      },
      {
        title: "Multi-User VIP Guided Tours",
        description: "Synchronized multi-headset walkthroughs where architects guide clients through the space from anywhere in the world.",
        metric: "Cross-continental Remote Tours",
      },
      {
        title: "WebVR Browser-Based Access",
        description: "Lightweight WebXR experiences accessible directly from modern browsers without requiring dedicated software.",
        metric: "Universal WebXR Compatibility",
      },
    ],
    specifications: [
      { label: "Hardware Support", value: "Apple Vision Pro, Meta Quest 3, HTC Vive Pro" },
      { label: "Engine", value: "Unreal Engine 5.4 Lumen & Nanite VR" },
      { label: "Frame Rate", value: "Native 90 Hz / 120 Hz Stereoscopic" },
      { label: "Tracking", value: "Inside-out Spatial Tracking & Hand Gestures" },
      { label: "Distribution", value: "Dedicated Executable, Cloud Pixel Streaming, WebXR" },
    ],
    process: [
      { number: "01", title: "Spatial Optimization", description: "Converting architectural CAD models into ultra-high framerate polygon topologies." },
      { number: "02", title: "Scale & Ergonomics Check", description: "Verifying exact 1:1 architectural dimensions, door openings, and sightlines." },
      { number: "03", title: "Interactivity Integration", description: "Coding physical grab interactions, lighting switches, and spatial sound nodes." },
      { number: "04", title: "Hardware Testing & Deployment", description: "Comprehensive testing on target headsets and delivery to sales centers." },
    ],
    clientBenefits: [
      "Eliminate spatial misunderstandings by letting clients physically feel room proportions and sightlines.",
      "Conduct VIP sales presentations for international ultra-high-net-worth buyers without geographical limits.",
      "Accelerate interior finish decisions by previewing multiple material options in real time.",
    ],
    tags: ["Virtual Reality", "Apple Vision Pro", "Meta Quest", "6DoF Immersion", "Spatial Computing", "WebXR"],
    ctaHeading: "STEP INTO THE FUTURE OF SPATIAL IMMERSION",
    ctaSubtext: "Experience your projects in true 1:1 scale virtual reality before breaking ground.",
    nextSlug: "community-app",
    prevSlug: "animation",
  },

  // =========================================================================
  // 5. COMMUNITY APP (Interactive Solution)
  // =========================================================================
  {
    id: "community-app",
    slug: "community-app",
    number: "05",
    discipline: "INTERACTIVE SOLUTION",
    disciplineSlug: "interactive-solution",
    disciplineTag: "DIGITAL EXPERIENCES & 3D SYSTEMS",
    title: "COMMUNITY APP",
    heroHeadline: "SMART PROPTECH PLATFORMS FOR LUXURY COMPOUNDS",
    subtitle: "Mobile and web ecosystem connecting residents, building facilities, access controls, and concierge services.",
    manifesto:
      "Modern luxury developments are not just concrete and glass; they are living, breathing ecosystems. We engineer bespoke branded community applications that provide residents with seamless digital access, concierge bookings, smart home IoT automation, and direct facility management.",
    accentColor: "#00c8ff",
    badge: "PROPTECH & SMART LIVING",
    status: "coming-soon",
    mediaCountLabel: "COMING SOON",
    gallery: [],
    deliverables: [
      {
        title: "Digital Access Control & Guest QR Passes",
        description: "Frictionless vehicle gate access, smart elevator calling, and temporary encrypted QR codes for invited guests.",
        metric: "Instant Gate Clearance",
      },
      {
        title: "Amenity & Clubhouse Reservation Engine",
        description: "Real-time calendar booking for sports facilities, private dining suites, spa appointments, and pool cabanas.",
        metric: "Automated Calendar Sync",
      },
      {
        title: "IoT Smart Home & Facility Telemetry",
        description: "Resident controls for HVAC temperatures, ambient lighting scenes, and consumption analytics.",
        metric: "Zigbee / Matter Standard",
      },
      {
        title: "Bilingual Resident Concierge & Billing",
        description: "In-app maintenance ticket reporting with photo attachments, live status tracking, and digital maintenance fee payments.",
        metric: "99.9% Operational Uptime",
      },
    ],
    specifications: [
      { label: "Platforms", value: "iOS (Native Swift), Android (Kotlin), Next.js Admin" },
      { label: "Backend Architecture", value: "Cloud-native Node.js / PostgreSQL / Redis" },
      { label: "Hardware Integration", value: "HID Access Control, Dahua / Hikvision Gateways" },
      { label: "Security & Encryption", value: "AES-256 Bit Data Encryption, Biometric FaceID" },
      { label: "Payment Gateways", value: "Stripe, Apple Pay, Local Direct Debit Gateways" },
    ],
    process: [
      { number: "01", title: "Community Workflow Mapping", description: "Auditing compound security protocols, tenant personas, and facility access rules." },
      { number: "02", title: "Luxury UI/UX Design", description: "Crafting a bespoke editorial interface branded specifically to the real estate development." },
      { number: "03", title: "Hardware & IoT Integration", description: "Connecting APIs with on-site gates, smart meters, elevators, and security servers." },
      { number: "04", title: "Onboarding & Management Handover", description: "App Store deployment, staff dashboard training, and tenant onboarding support." },
    ],
    clientBenefits: [
      "Elevate real estate asset valuation by offering a world-class smart living digital amenity to buyers.",
      "Reduce property management operational overhead through automated billing and ticket triage.",
      "Strengthen community security with encrypted, trackable digital access records.",
    ],
    tags: ["PropTech", "iOS & Android", "Smart Community", "IoT Integration", "Tenant Experience", "Access Control"],
    ctaHeading: "ELEVATE YOUR COMPOUND WITH A BESPOKE COMMUNITY APP",
    ctaSubtext: "Connect your residents to a luxury smart living ecosystem with an app branded to your property.",
    nextSlug: "bim",
    prevSlug: "vr",
  },

  // =========================================================================
  // 6. BIM (Design)
  // =========================================================================
  {
    id: "bim",
    slug: "bim",
    number: "06",
    discipline: "DESIGN",
    disciplineSlug: "design",
    disciplineTag: "ARCHITECTURAL & ENGINEERING SYSTEMS",
    title: "BIM",
    heroHeadline: "BUILDING INFORMATION MODELING & DIGITAL TWINS",
    subtitle: "LOD 300-500 digital twin authoring, automated clash detection, and construction coordination.",
    manifesto:
      "BIM is the single source of truth that turns ambitious architectural designs into error-free construction realities. We author, audit, and coordinate multi-disciplinary models up to LOD 500, resolving costly clashes in the computer rather than on the job site.",
    accentColor: "#b85d38",
    badge: "DIGITAL TWIN & COORDINATION",
    status: "coming-soon",
    mediaCountLabel: "COMING SOON",
    gallery: [],
    deliverables: [
      {
        title: "LOD 300 to LOD 500 Multi-Discipline Modeling",
        description: "Detailed intelligent digital modeling for architectural, structural, and civil components with exact manufacturer specs.",
        metric: "LOD 500 As-Built Fidelity",
      },
      {
        title: "Automated Clash Detection & Coordination",
        description: "Rigorous clash analysis across architectural elements, concrete framing, and MEP routing prior to procurement.",
        metric: "Zero Unresolved Site Clashes",
      },
      {
        title: "Parametric Quantity Take-Off (QTO)",
        description: "Automated schedules of quantities for concrete volumes, steel tonnage, facade glass, and interior finishes.",
        metric: "± 1.5% Material Accuracy",
      },
      {
        title: "COBie & Facility Management Handover",
        description: "Clean metadata embedding for smooth handover into building operational systems and digital twin platforms.",
        metric: "ISO 19650 Compliant",
      },
    ],
    specifications: [
      { label: "Authoring Software", value: "Autodesk Revit 2025, Civil 3D, Rhino Inside Revit" },
      { label: "Coordination Platform", value: "Autodesk Construction Cloud (ACC) / Navisworks" },
      { label: "Standards", value: "ISO 19650 Part 1 & 2, AIA BIM Protocol" },
      { label: "Level of Development", value: "LOD 300, 350, 400, 500" },
      { label: "Data Formats", value: "RVT, NWC, IFC 4x3, COBie, BCF" },
    ],
    process: [
      { number: "01", title: "BIM Execution Plan (BEP)", description: "Establishing modeling protocols, coordinate systems, and Level of Development milestones." },
      { number: "02", title: "Parametric Modeling", description: "Authoring high-precision families, wall assemblies, structural grids, and parametric schedules." },
      { number: "03", title: "Clash Matrix & Resolution", description: "Executing automated Navisworks clash batches and weekly multi-disciplinary coordination meetings." },
      { number: "04", title: "Shop Drawing & As-Built Handover", description: "Extracting construction documentation and packaging final digital twin data." },
    ],
    clientBenefits: [
      "Prevent expensive on-site rework and project delays through proactive clash resolution.",
      "Accurate material quantity forecasting that prevents contractor overbilling and procurement waste.",
      "Comprehensive digital twin handover ensuring effortless building maintenance for decades.",
    ],
    tags: ["Revit", "Navisworks", "LOD 500", "Clash Detection", "Digital Twins", "BIM 360", "ISO 19650"],
    ctaHeading: "COORDINATE YOUR PROJECT WITH BIM PRECISION",
    ctaSubtext: "Ensure flawless constructability and budget adherence with our BIM management specialists.",
    nextSlug: "mep",
    prevSlug: "community-app",
  },

  // =========================================================================
  // 7. MEP (Design)
  // =========================================================================
  {
    id: "mep",
    slug: "mep",
    number: "07",
    discipline: "DESIGN",
    disciplineSlug: "design",
    disciplineTag: "ARCHITECTURAL & ENGINEERING SYSTEMS",
    title: "MEP",
    heroHeadline: "MECHANICAL, ELECTRICAL & PLUMBING ENGINEERING",
    subtitle: "High-performance building services engineered to disappear invisibly into architectural spaces.",
    manifesto:
      "Great engineering is felt, not seen. Our MEP engineering specialists design high-efficiency HVAC networks, sustainable electrical systems, and optimized plumbing layouts that operate at peak performance without compromising architectural ceiling heights or visual purity.",
    accentColor: "#00c8ff",
    badge: "ENGINEERING SYSTEMS",
    status: "coming-soon",
    mediaCountLabel: "COMING SOON",
    gallery: [],
    deliverables: [
      {
        title: "HVAC Spatial Routing & Energy Simulation",
        description: "Thermal comfort calculations, VRF and chilled water design, and acoustic duct attenuation for whisper-quiet environments.",
        metric: "35% Energy Reduction vs Standard",
      },
      {
        title: "Architectural Lighting & Power Distribution",
        description: "High-voltage distribution, emergency backup power, and architectural lighting circuit engineering.",
        metric: "100% Redundant Power Reserves",
      },
      {
        title: "Sustainable Water & Drainage Networks",
        description: "Greywater recycling, rainwater collection engineering, and acoustic low-noise drainage piping systems.",
        metric: "LEED Water Conservation Certified",
      },
      {
        title: "Fire Protection & Life Safety Integration",
        description: "Clean-agent suppression, smoke evacuation CFD modeling, and fully code-compliant sprinkler distribution.",
        metric: "NFPA Code Compliant",
      },
    ],
    specifications: [
      { label: "Engineering Disciplines", value: "Mechanical (HVAC), Electrical, Plumbing, Fire Life Safety" },
      { label: "Calculations & Simulation", value: "Carrier HAP, DIALux Evo, Trace 700, CFD Airflow" },
      { label: "BIM Integration", value: "Revit MEP, Fabrication CADmep, Navisworks" },
      { label: "Compliance Standards", value: "ASHRAE 90.1, NFPA 13/72, CIBSE Guides, LEED" },
      { label: "Deliverables", value: "Engineering Calculations, Schematics, Riser Diagrams, Specs" },
    ],
    process: [
      { number: "01", title: "Load Calculations & System Selection", description: "Simulating peak cooling/heating demands and determining central plant configurations." },
      { number: "02", title: "Spatial Routing & BIM Integration", description: "Routing conduits, risers, and ductwork within ceiling voids in direct coordination with architecture." },
      { number: "03", title: "Energy & LEED Optimization", description: "Refining equipment efficiencies to qualify for international green building certifications." },
      { number: "04", title: "Tender Documentation & Review", description: "Issuing complete engineering drawing packages, schedules of equipment, and specification books." },
    ],
    clientBenefits: [
      "Maximum ceiling heights and aesthetic clean lines through ultra-compact MEP spatial routing.",
      "Significantly reduced lifetime operational energy costs through high-efficiency system design.",
      "Peace of mind with fully compliant life safety systems meeting all regulatory authority codes.",
    ],
    tags: ["HVAC Engineering", "Electrical Systems", "Plumbing Design", "Energy Simulation", "LEED Protocols", "Fire Safety"],
    ctaHeading: "ENGINEER YOUR BUILDING SERVICES WITH EXPERT CARE",
    ctaSubtext: "Integrate high-efficiency MEP engineering seamlessly into your architectural vision.",
    nextSlug: "interior",
    prevSlug: "bim",
  },

  // =========================================================================
  // 8. INTERIOR (Design)
  // =========================================================================
  {
    id: "interior",
    slug: "interior",
    number: "08",
    discipline: "DESIGN",
    disciplineSlug: "design",
    disciplineTag: "ARCHITECTURAL & ENGINEERING SYSTEMS",
    title: "INTERIOR",
    heroHeadline: "BESPOKE SPATIAL INTERIOR ARCHITECTURE & CURATION",
    subtitle: "Custom millwork, tactile material palettes, spatial zoning, and intimate lighting atmospheres.",
    manifesto:
      "Interior architecture is where the human touch meets built space. We design bespoke interiors that evoke warmth, prestige, and quiet luxury. From custom architectural millwork and rare stone selection to tailored acoustic environments, every detail is considered.",
    accentColor: "#b85d38",
    badge: "SPATIAL ATELIER",
    status: "active",
    coverImage: "/design/INTERIOR/apartment/apartment/2_View02.jpg",
    mediaCountLabel: "146 8K RENDERS",
    gallery: [],
    deliverables: [
      {
        title: "Luxury Spatial Planning & Flow Curation",
        description: "Harmonious floor plan layouts, volumetric zoning, and sightline optimization for luxury residential and commercial flagships.",
        metric: "Flawless Spatial Ergonomics",
      },
      {
        title: "Bespoke Millwork & Joinery Detailing",
        description: "1:1 fabrication-ready drawings for custom cabinetry, architectural paneling, feature staircases, and integrated furniture.",
        metric: "Sub-millimeter Joinery Tolerances",
      },
      {
        title: "Tactile Material & Finish Palette",
        description: "Curated combinations of natural stones, smoked hardwoods, patinated metals, and acoustic fabric textures.",
        metric: "Sustainably Sourced Rare Materials",
      },
      {
        title: "Architectural Lighting Atmosphere",
        description: "Kelvin temperature zoning, concealed linear grazing, and programmable circadian lighting scenes.",
        metric: "2200K to 4000K Circadian Balance",
      },
    ],
    specifications: [
      { label: "Typologies", value: "Luxury Residential, Commercial Flagships, Boutique Hospitality" },
      { label: "Documentation", value: "Full Construction Drawing Sets, Joinery Details, Finishes Schedules" },
      { label: "Materiality", value: "Rare Italian Marbles, Rift-Cut Oak, Patinated Bronze, Belgian Linen" },
      { label: "Lighting Integration", value: "DALI / Lutron HomeWorks Programmable Scenes" },
      { label: "Procurement Support", value: "FF&E Specification Books, Millwork Contractor Tendering" },
    ],
    process: [
      { number: "01", title: "Spatial Narrative & Mood Curation", description: "Defining the sensory personality, material textures, and spatial flow of the project." },
      { number: "02", title: "Space Planning & Joinery Design", description: "Drafting detailed millwork packages, reflected ceiling plans, and finish elevations." },
      { number: "03", title: "Material Prototyping & Sampling", description: "Reviewing physical stone slabs, wood stains, and fabric swatches under controlled lighting." },
      { number: "04", title: "Fabrication Oversight & Styling", description: "On-site quality supervision during joinery installation and final interior styling." },
    ],
    clientBenefits: [
      "Timeless luxury environments tailored to your identity without generic off-the-shelf compromises.",
      "Flawless contractor execution enabled by ultra-precise architectural detail drawings.",
      "Cohesive harmony between exterior architecture, interior volumes, and tactile human touchpoints.",
    ],
    tags: ["Interior Architecture", "Bespoke Millwork", "Material Specification", "Lighting Design", "Spatial Curation", "FF&E"],
    ctaHeading: "CRAFT A BESPOKE INTERIOR IDENTITY",
    ctaSubtext: "Collaborate with our interior architects to shape timeless spaces of tactile luxury.",
    nextSlug: "imaquette",
    prevSlug: "mep",
  },
];

export function getServiceBySlug(slug: string): ServiceDetailItem | undefined {
  return ALL_SERVICES.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllServices(): ServiceDetailItem[] {
  return ALL_SERVICES;
}
