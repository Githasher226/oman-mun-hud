export interface CountryFactSheet {
  name: string;
  category: "ally" | "opposition" | "complex";
  overview: string;
  keyStats: { label: string; value: string }[];
  legalFramework: string;
  refugeeAdmissions: string;
  enforcementPolicies: string;
  militaryDisplacement: string;
  economicImpact: string;
  hypocrisyIndex: { label: string; value: string }[];
  debatePoints: string[];
  sources: string[];
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface Treaty {
  name: string;
  status: string;
  details: string;
}

export const keyTerms: KeyTerm[] = [
  {
    term: "Kafala System",
    definition: "A sponsorship system for migrant workers in several Middle Eastern countries, including Oman, where a migrant's legal status is tied to a local sponsor (employer). Critics argue it can lead to exploitation, but proponents highlight its role in labor market control.",
  },
  {
    term: "Omanisation",
    definition: "Oman's national policy aimed at reducing reliance on expatriate labor by increasing the employment of Omani citizens in both the public and private sectors. This involves quotas, training programs, and preference for Omani nationals.",
  },
  {
    term: "Global Compact for Migration (GCM)",
    definition: "A non-binding intergovernmental agreement negotiated under the auspices of the United Nations, setting out 23 objectives for safe, orderly, and regular migration. Signed by Oman, it provides a framework for cooperative migration governance.",
  },
  {
    term: "Remittances",
    definition: "Money sent by migrant workers to their home countries. Remittances are a significant source of income for many developing nations and play a crucial role in poverty reduction and economic development.",
  },
  {
    term: "Sovereignty",
    definition: "The full right and power of a governing body over itself, without any interference from outside sources or bodies. In the context of MUN immigration debates, it refers to a nation's ultimate authority to control its borders and immigration policies.",
  },
  {
    term: "Non-Refoulement",
    definition: "A fundamental principle of international law that prohibits states from returning individuals to a country where they face a real risk of persecution, torture, or other serious harm. Considered a norm of customary international law (jus cogens).",
  },
  {
    term: "Temporary Protection Status",
    definition: "A form of provisional protection granted by states, often on a group basis, to individuals fleeing mass displacement from conflict or disaster, generally without full recognition under the 1951 Refugee Convention.",
  },
  {
    term: "Burden-Sharing",
    definition: "The principle that the responsibility for assisting and protecting refugees and displaced persons should be shared equitably among states, rather than falling disproportionately on a few host countries.",
  },
  {
    term: "Irregular Migration",
    definition: "Migration that occurs outside the laws, regulations, and international agreements governing the entry, exit, or residence of persons in the country of origin, transit, or destination. Often referred to as undocumented or unauthorized migration.",
  },
  {
    term: "1951 Refugee Convention",
    definition: "The key legal document that defines who is a refugee, their rights, and the legal obligations of states. It establishes the principle of non-refoulement. Oman is NOT a signatory.",
  },
  {
    term: "1967 Protocol",
    definition: "Removed the geographic and temporal limitations of the 1951 Convention, making it universally applicable to all refugees regardless of when or where they became displaced.",
  },
  {
    term: "Brain Drain",
    definition: "The emigration of highly trained or intelligent people from a particular country, reducing its human capital. Relevant to labor-sending countries that lose skilled workers to wealthier nations.",
  },
];

export const omanPosition = {
  corePosition: `Oman's core position on immigration is rooted in a pragmatic approach that balances national economic interests with humanitarian considerations, all while upholding its sovereignty. With expatriates constituting approximately 40% of its population, labor migration is fundamental to Oman's economic development, powering key sectors including construction, oil & gas, healthcare, and services.

Oman emphasizes the sovereign right of nations to control their borders and determine their immigration policies, seeing this as paramount to national security and cultural preservation. While committed to humane treatment of migrants, Oman's policies are primarily structured around temporary labor schemes rather than permanent settlement or large-scale refugee integration.

Oman operates with a nuanced understanding of its resource limitations and geopolitical context, often characterized by its "Switzerland of the Middle East" neutrality. This neutral diplomatic stance allows Oman to bridge divides between competing blocs — advocating for managed migration that benefits both sending and receiving countries without alienating either side.`,

  internationalPolicies: `Oman actively engages with international immigration frameworks, demonstrating its commitment to global cooperation while safeguarding national interests. A significant step was the signing of the Global Compact for Migration (GCM) in 2018, which Oman views as a non-binding cooperative framework to improve migration governance.

Oman is a member of the International Labour Organization (ILO) and participates in GCC-level discussions on labor mobility and worker protection. Its approach on the international stage is to advocate for policies that acknowledge the varying capacities and needs of both labor-sending and labor-receiving states, promoting bilateral agreements and cooperation over prescriptive international mandates.

Oman has consistently supported UN General Assembly resolutions that promote orderly migration while respecting state sovereignty, positioning itself as a constructive voice for developing nations that manage significant migrant populations.`,

  treaties: [
    {
      name: "Global Compact for Migration (GCM)",
      status: "Signed (2018)",
      details: "Oman signed the GCM, viewing it as a non-legally binding framework for international cooperation on migration. It supports the Compact's goals of safe, orderly, and regular migration, while emphasizing national sovereignty in implementation.",
    },
    {
      name: "1951 Refugee Convention & 1967 Protocol",
      status: "Not Signed",
      details: "Oman is not a signatory to these international instruments. Refugee protection is addressed through national laws and humanitarian assistance on a case-by-case basis, rather than a formal asylum system.",
    },
    {
      name: "ILO Core Conventions",
      status: "Selectively Ratified",
      details: "Oman is an ILO member state and has ratified several core conventions, including those on forced labor (C29, C105), minimum age (C138), worst forms of child labor (C182), and discrimination (C111).",
    },
    {
      name: "GCC Joint Labour Agreements",
      status: "Active Participant",
      details: "Oman participates in GCC agreements aimed at harmonizing labor laws, worker protection, and combating irregular migration among member states and with labor-sending countries.",
    },
    {
      name: "Int'l Convention on Migrant Workers' Rights (1990)",
      status: "Not Ratified",
      details: "Like most GCC and Western nations, Oman has not ratified this convention, though it has implemented domestic labor protections through its own legal framework.",
    },
  ] as Treaty[],

  localLaws: {
    allowed: [
      "Skilled and unskilled labor migrants with valid work permits tied to a sponsor",
      "Foreign investors and entrepreneurs under specific visa categories",
      "Family reunification for expatriates meeting income and sponsorship criteria",
      "Tourists and visitors for specified periods",
      "Students enrolled in Omani educational institutions",
      "Access to healthcare services for documented workers",
      "Legal recourse through Omani labor courts for wage disputes",
    ],
    notAllowed: [
      "Undocumented immigrants or those overstaying visas — subject to fines and deportation",
      "Changing employers without sponsor approval (Kafala restriction, though reforms in progress)",
      "Formal asylum or refugee status applications (no domestic asylum system exists)",
      "Certain professions reserved for Omanis under Omanisation quotas",
      "Political activity or organizing by foreign residents",
      "Permanent residency or citizenship through employment alone",
    ],
    details: `Oman's domestic immigration legal framework is primarily defined by the Foreigners Residence Law (Royal Decree No. 16/95) and the Labour Law (Royal Decree No. 35/2003, as amended). The cornerstone of this system is the Kafala (sponsorship) system, which ties a migrant worker's legal residency and employment to a specific Omani sponsor.

While the Kafala system has faced international criticism for potential abuses, Oman has implemented reforms including requirements for written employment contracts, provisions for changing employers under certain conditions, and strengthened labor inspection mechanisms. The Wage Protection System (WPS) ensures timely payment of salaries through bank transfers.

Omanisation policies are central to the framework, setting quotas and prioritizing Omani nationals for employment in various sectors to reduce reliance on foreign labor and create opportunities for citizens. The legal framework is designed to regulate temporary labor migration rather than facilitate permanent settlement, reflecting a sovereign approach to population management that prioritizes national development and security.`,
  },

  resolutionGoals: [
    "Promote international cooperation on migration while upholding national sovereignty in policy formulation — no one-size-fits-all mandates.",
    "Advocate for bilateral labor agreements that ensure fair recruitment, decent working conditions, and protection of migrant workers' rights between sending and receiving countries.",
    "Emphasize the economic contributions of labor migration to both sending and receiving countries, including the vital role of remittances in developing economies.",
    "Call for equitable burden-sharing mechanisms for states hosting large displaced populations, with financial and logistical support from the international community.",
    "Support technical assistance and capacity building for developing states to manage migration flows effectively and humanely.",
    "Address root causes of forced displacement — conflict, poverty, climate change — rather than solely focusing on border enforcement.",
  ],
};

export const countryFactSheets: CountryFactSheet[] = [
  {
    name: "United Arab Emirates",
    category: "ally",
    overview: "The UAE is Oman's closest regional ally on immigration issues, sharing a nearly identical economic model built on expatriate labor. With approximately 88% of its population being foreign nationals — the highest ratio in the world — the UAE's immigration policies directly mirror Oman's interests. Both nations operate under the Kafala system, both face similar international scrutiny, and both are pursuing gradual reforms while maintaining sovereign control over labor migration. The UAE's Golden Visa program and recent labor mobility reforms offer a template Oman can reference when advocating for modernized yet sovereign-controlled migration systems.",
    keyStats: [
      { label: "Expatriate Population", value: "~88% of total population (~9 million of 10.2 million)" },
      { label: "Total Population (2024)", value: "~10.2 million" },
      { label: "GDP per capita (PPP)", value: "$88,771 (IMF, 2023)" },
      { label: "Main Source Countries", value: "India, Pakistan, Bangladesh, Philippines, Egypt" },
      { label: "Golden Visas Issued", value: "150,000+ (as of 2023)" },
      { label: "Remittance Outflow", value: "$47 billion (2022, World Bank)" },
    ],
    legalFramework: "The UAE operates a comprehensive Kafala-based immigration system similar to Oman's. Recent reforms since 2020 have introduced significant flexibility: workers can now switch employers after contract expiry without sponsor consent, the Golden Visa program grants 10-year residency to investors and skilled professionals, and a new green visa allows self-sponsorship. However, the fundamental structure of employer-tied residency remains intact for most low-wage workers. The UAE is not a signatory to the 1951 Refugee Convention and has no formal asylum system.",
    refugeeAdmissions: "The UAE has no formal refugee admissions program and is not a signatory to the 1951 Refugee Convention. However, it has provided significant humanitarian aid globally — claiming to be one of the world's top per-capita aid donors. Individuals fleeing conflict may enter on standard visa categories, but their stay depends on meeting immigration requirements, not asylum claims. The UAE has hosted some Syrians and Yemenis informally through employment or family sponsorship channels.",
    enforcementPolicies: "Immigration enforcement in the UAE is highly digitized and efficient. Strict penalties exist for visa overstays (fines of ~$27/day), employing undocumented workers, and absconding from sponsors. The UAE periodically runs amnesty campaigns allowing undocumented workers to regularize status or leave without penalty. Deportation is swift for violations. Border control leverages advanced biometric systems and AI-assisted monitoring.",
    militaryDisplacement: "The UAE was part of the Saudi-led coalition in Yemen from 2015, participating in military operations that contributed to the displacement of over 4 million Yemenis. While the UAE has scaled back its direct military involvement since 2019, its participation in the conflict is a point of vulnerability in debate — though as an ally, Oman should handle this carefully.",
    economicImpact: "The UAE's economy is profoundly dependent on immigrant labor across all sectors — from construction mega-projects to healthcare, finance, and technology. Expatriates generate the vast majority of private sector GDP. The $47 billion in annual remittance outflows demonstrate the scale of economic activity generated by foreign workers. The UAE's diversification strategy under Vision 2031 explicitly relies on attracting global talent.",
    hypocrisyIndex: [
      { label: "Foreign population ratio", value: "~88% (highest in world)" },
      { label: "1951 Convention signatory", value: "NO" },
      { label: "GDP per capita", value: "$88,771" },
      { label: "Formal refugees hosted", value: "No formal system" },
      { label: "Humanitarian aid (% GNI)", value: "0.86% (2022)" },
    ],
    debatePoints: [
      "SHARED SOVEREIGNTY DEFENSE: 'The UAE and Oman demonstrate that nations can manage massive foreign populations responsibly while maintaining sovereign control. The Kafala system, with ongoing reforms, provides structure that chaotic open borders cannot.'",
      "ECONOMIC CONTRIBUTION ARGUMENT: 'The Gulf model proves that managed labor migration benefits everyone — workers earn multiples of home-country wages, sending nations receive billions in remittances, and host economies grow.'",
      "REFORM IN PROGRESS: 'The UAE's Golden Visa and labor mobility reforms show that GCC states are committed to improvement — but on their own timeline, not dictated by external mandates.'",
    ],
    sources: ["UAE Ministry of Human Resources and Emiratisation", "IMF Economic Outlooks", "World Bank Migration and Remittances Factbook", "ILO Reports on Gulf Labour Markets"],
  },
  {
    name: "Saudi Arabia",
    category: "ally",
    overview: "Saudi Arabia is Oman's most important regional partner on immigration policy within the GCC. As the largest economy in the region and host to over 13 million foreign workers, Saudi Arabia's Vision 2030 reforms — including significant changes to the Kafala system — set the tone for the entire Gulf. Saudi Arabia faces many of the same challenges as Oman: balancing economic dependence on foreign labor with nationalization goals (Saudization vs. Omanisation), managing massive remittance outflows, and defending sovereignty against international pressure for more liberal migration policies. However, Saudi Arabia's military intervention in Yemen creates a vulnerability in debate that Oman, with its neutral stance, does not share.",
    keyStats: [
      { label: "Expatriate Population", value: "~38% (~13.4 million of 36.4 million)" },
      { label: "Total Population (2024)", value: "~36.4 million" },
      { label: "GDP per capita (PPP)", value: "$64,838 (IMF, 2023)" },
      { label: "Main Source Countries", value: "India, Pakistan, Bangladesh, Egypt, Philippines" },
      { label: "Formally Recognized Refugees (2022)", value: "454" },
      { label: "Military Spend (2020)", value: "$57.5 billion (8.4% of GDP)" },
      { label: "Remittance Outflow", value: "$39.4 billion (2022)" },
    ],
    legalFramework: "Saudi Arabia has historically operated under a strict Kafala system but introduced significant reforms in 2021: workers can now switch employers without consent after contract expiry, and exit visas are no longer required. However, work permits remain employer-linked for most categories. Saudi Arabia is NOT a signatory to the 1951 Refugee Convention. Article 42 of the 1992 Basic Law technically allows political asylum 'if required by the public interest,' but no implementing legislation exists. UNHCR operates in Saudi Arabia but can only register refugees for temporary stays.",
    refugeeAdmissions: "Saudi Arabia formally recognized only 454 refugees as of 2022. While an estimated 500,000 Syrians reside in the country, they are classified as 'visitors' or 'workers' — not refugees — leaving them in legal limbo with no formal protections. The Kingdom provides substantial humanitarian aid to refugee-hosting countries, but its domestic refugee intake relative to its wealth is among the lowest in the world. This gap between aid-giving and actual refugee hosting is a significant debate point.",
    enforcementPolicies: "Saudi Arabia maintains some of the strictest immigration enforcement in the world. The 'Homeland Without Illegals' campaign detained over 1 million non-citizens in 2018 alone. From 2023 to mid-2024, another million migrants with irregular status were detained. Common reported practices include deportation without due process, detention in poor conditions, and forced returns of Ethiopian migrants in conditions described as 'abhorrent' by Amnesty International. The principle of non-refoulement is routinely not upheld.",
    militaryDisplacement: "Saudi Arabia has been directly and continuously involved in the Yemen conflict since March 2015, conducting over 24,000 air raids. This has displaced 4+ million Yemenis and created one of the world's worst humanitarian crises — 24.3 million Yemenis need humanitarian aid. Yemen's GDP has contracted ~50% since the war began, with GDP per capita at $465 vs. Saudi Arabia's ~$32,000. Despite this, Saudi Arabia has accepted a negligible number of Yemeni refugees. This is Saudi Arabia's most damaging vulnerability in debate — though as an ally, Oman should use this carefully.",
    economicImpact: "Saudi Arabia's economy is deeply reliant on immigrant labor, particularly in construction, domestic work, services, and Vision 2030 mega-projects. Over 30% of the population are foreign workers. Saudization policies aim to reduce this dependency but progress is slow. Remittance outflows of $39.4 billion annually represent significant capital leaving the country — a tension between economic dependency on foreign workers and national employment goals.",
    hypocrisyIndex: [
      { label: "GDP per capita", value: "~$32,000 (vs Oman's ~$23,000)" },
      { label: "Formally recognized refugees", value: "454 (2022)" },
      { label: "Military spend (2020)", value: "$57.5 billion" },
      { label: "Yemenis displaced by Saudi-led war", value: "4+ million" },
      { label: "Yemeni refugees accepted", value: "Negligible" },
      { label: "1951 Convention signatory", value: "NO" },
    ],
    debatePoints: [
      "GCC SOLIDARITY ON SOVEREIGNTY: 'Saudi Arabia and Oman share the position that labor migration governance must remain a national prerogative. Both nations manage vast foreign workforces responsibly under their own legal frameworks.'",
      "REFORM LEADERSHIP: 'Saudi Arabia's 2021 Kafala reforms demonstrate the GCC's commitment to progressive change — abolishing exit visas and enabling job mobility shows willingness to evolve.'",
      "HUMANITARIAN AID ALTERNATIVE: 'Saudi Arabia argues that financial aid to refugee-hosting countries is more effective than domestic resettlement. Oman can support this position while also calling for increased international burden-sharing.'",
    ],
    sources: ["Saudi General Authority for Statistics", "UNHCR", "Human Rights Watch", "Amnesty International", "Yemen Data Project", "IMF", "World Bank"],
  },
  {
    name: "United States of America",
    category: "opposition",
    overview: "The United States presents a fundamental contradiction for Oman's delegation to highlight: it is a full signatory to the 1951 Refugee Convention with vast wealth and resources, yet has slashed its refugee intake to historic lows. More critically, US-led military interventions in the Middle East — Iraq, Afghanistan, and involvement in the Syrian conflict — have displaced over 38 million people, many of whom ended up in the very Gulf and Middle Eastern states that the US then criticizes for labor migration practices. The US lectures developing nations about worker rights while its own immigration enforcement has become increasingly punitive. For Oman, the US represents the clearest example of powerful nations creating displacement crises they refuse to absorb.",
    keyStats: [
      { label: "Total Population (2024)", value: "~335 million" },
      { label: "Foreign-Born Population", value: "~47 million (14% of population)" },
      { label: "Unauthorized Immigrants", value: "~11.7 million (~27% of immigrant pop)" },
      { label: "FY2024 Refugee Admissions", value: "100,060 (highest since 1995)" },
      { label: "FY2026 Refugee Ceiling", value: "7,500 (lowest in 45-year history)" },
      { label: "Post-9/11 Wars Displaced", value: "38+ million people across 8 nations" },
      { label: "Military Spending on Post-9/11 Wars", value: "$3.6+ trillion" },
    ],
    legalFramework: "The US is a full signatory to the 1951 Refugee Convention with a comprehensive legal framework including the Immigration and Refugee Protection Act, the Refugee Act of 1980, and an independent asylum adjudication system. Despite this, enforcement has dramatically tightened since 2025: asylum applications have been effectively blocked, catch-and-release ended, refugee admissions nearly suspended, and law enforcement authorized to enter migrant homes without warrants. The contradiction between legal obligation and actual practice is stark.",
    refugeeAdmissions: "The US admitted 100,060 refugees in FY2024 — the highest since 1995 — but then slashed the ceiling to 7,500 for FY2026, a drop of over 92,000. This represents the lowest refugee ceiling in 45 years. Meanwhile, the US-led wars in Iraq, Afghanistan, and its involvement in Syria displaced 38+ million people. In 2006, the US admitted only 202 Iraqi refugees despite having caused the crisis through its 2003 invasion. The gap between displacement caused and refugees accepted is the most damning statistic in any immigration debate.",
    enforcementPolicies: "Since January 2025, the US has implemented the most sweeping immigration crackdown in modern history: national emergency declared at the border, asylum applications blocked, birthright citizenship restricted (challenged in courts), law enforcement entering migrant homes without warrants, lawfully admitted refugees subject to detention, and 2.6 million children with immigrant parents losing Child Tax Credits. Notably, the US is now detaining people who entered the country LEGALLY — a practice that Oman, despite lacking a formal refugee framework, has never adopted.",
    militaryDisplacement: "The United States is the single largest driver of displacement in the modern era. Post-9/11 wars displaced 38+ million people across 8 nations. The 2003 Iraq invasion alone displaced 4+ million people. The US spent $3.6+ trillion on these wars, then set its refugee intake at 7,500. Jordan, Oman's regional neighbor, absorbed 750,000 Iraqi refugees from a conflict it had no role in starting. The US counts military victories; countries in the region count displaced families.",
    economicImpact: "The US economy is structurally dependent on immigrants — 33 million immigrant workers comprise 19% of the total workforce. For the first time since 1850, immigration accounted for the entire US population growth between 2022-2023 due to falling birth rates. Without immigration, the US working-age population turns negative by ~2042. Nearly 946,000 employment-based visa petitions are awaiting slots. Yet the government treats immigrants as a burden rather than the economic necessity they demonstrably are.",
    hypocrisyIndex: [
      { label: "Military spending on post-9/11 wars", value: "$3.6+ trillion" },
      { label: "FY2026 refugee ceiling", value: "7,500 (lowest ever)" },
      { label: "People displaced by US wars", value: "38+ million" },
      { label: "GDP", value: "$29 trillion" },
      { label: "Legal obligation to refugees", value: "YES (1951 Convention signatory)" },
      { label: "Refugees per capita vs Gulf states", value: "Effectively zero" },
    ],
    debatePoints: [
      "DISPLACEMENT WITHOUT ACCOUNTABILITY: 'The United States spent $3.6 trillion on wars that displaced 38 million people, then set its refugee ceiling at 7,500 — the lowest in 45 years. This committee must ask: who bears the cost of wars started by the powerful?'",
      "LEGAL OBLIGATION IGNORED: 'The United States is a full signatory to the 1951 Refugee Convention. Oman is not. Yet Oman manages its foreign population of 40% with dignity and order. The US detains people who entered its borders legally. Legal obligation without moral practice is meaningless.'",
      "ECONOMIC HYPOCRISY: 'The US economy cannot sustain itself without immigrants — they are 19% of the workforce and the sole source of population growth. Yet the US cuts immigration while lecturing Gulf states about labor practices. We welcome your workers; you deport your own.'",
    ],
    sources: ["Pew Research Center", "UNHCR", "Brown University Costs of War Project", "US Census Bureau", "Migration Policy Institute", "Bloomberg Government"],
  },
  {
    name: "India",
    category: "complex",
    overview: "India is Oman's most important labor-sending partner, with the Indian expatriate community constituting the largest foreign national group in Oman. This relationship is deeply intertwined — India supplies essential labor across all sectors of Oman's economy, while Omani employment provides livelihoods and remittance income for millions of Indian families. India's position in immigration debates is complex: it advocates strongly for the protection of its nationals abroad, pushes for reforms to sponsorship systems, and champions workers' rights — positions that can sometimes conflict with Oman's sovereign approach to labor management. However, the mutual economic benefit of this relationship means both countries have strong incentives to cooperate rather than confront.",
    keyStats: [
      { label: "Indian Nationals in Oman", value: "~700,000 (largest expatriate community)" },
      { label: "Indian Diaspora Worldwide", value: "~32 million (largest in the world)" },
      { label: "Remittances to India (2023)", value: "$125 billion (largest recipient globally)" },
      { label: "India's Total Population", value: "~1.44 billion" },
      { label: "India's GDP per capita", value: "~$2,612 (2023)" },
      { label: "Internal Migrants in India", value: "~450 million" },
    ],
    legalFramework: "India has comprehensive legislation governing emigration, including the Emigration Act (1983, being reformed) and oversight by the Ministry of External Affairs and Protector General of Emigrants. India actively negotiates bilateral labor agreements with Gulf states to protect its workers. Domestically, India's own immigration and refugee framework is inconsistent — it is NOT a signatory to the 1951 Refugee Convention, has no domestic refugee legislation, and recently passed the Citizenship Amendment Act (CAA, 2019) which grants citizenship based on religion, drawing international criticism for excluding Muslim refugees.",
    refugeeAdmissions: "India hosts approximately 200,000 refugees (primarily from Tibet, Sri Lanka, Myanmar, and Afghanistan) but does so without a formal legal framework — relying on ad-hoc administrative discretion. UNHCR operates in India but has no formal agreement with the government. India's Citizenship Amendment Act (CAA) selectively grants citizenship to non-Muslim refugees from neighboring countries, drawing criticism for religious discrimination. India's own treatment of refugees undermines its moral authority to critique Gulf labor practices.",
    enforcementPolicies: "India manages emigration through a system of Emigration Clearance for workers heading to 18 countries (including Oman), aimed at preventing exploitation. However, enforcement of recruitment regulations domestically is uneven, with illegal recruitment agents (dalals) continuing to operate and charge exorbitant fees to workers. India's enforcement of its own immigration policies — particularly regarding unauthorized Bangladeshi and Rohingya immigrants — has been criticized for arbitrary detention and deportation.",
    militaryDisplacement: "India has not caused significant military displacement externally. However, internal displacement from conflict (Kashmir, Northeast states) and development projects (dam construction, urbanization) affects millions. India's partition in 1947 created one of the largest displacement events in history (~15 million people), the legacy of which continues to shape South Asian migration patterns.",
    economicImpact: "India is the world's largest recipient of remittances at $125 billion annually (2023), with a significant portion coming from Gulf states including Oman. Indian workers in Oman fill crucial roles in construction, healthcare, IT, retail, and domestic services. The economic relationship is deeply symbiotic — India provides labor Oman needs, and Oman provides employment and income India's workers need. Any disruption to this flow would harm both economies significantly.",
    hypocrisyIndex: [
      { label: "Remittances received from Gulf", value: "$125 billion total (Gulf is major source)" },
      { label: "1951 Convention signatory", value: "NO" },
      { label: "Domestic refugee law", value: "NONE" },
      { label: "CAA religious discrimination", value: "Excludes Muslim refugees" },
      { label: "Internal displaced persons", value: "Millions (conflict + development)" },
      { label: "GDP per capita", value: "$2,612 (vs Oman's ~$23,000)" },
    ],
    debatePoints: [
      "MUTUAL BENEFIT: 'Oman and India share a relationship built on mutual economic benefit. Indian workers contribute to Oman's development while earning incomes that support millions of families through remittances. This is managed migration working as intended.'",
      "BILATERAL OVER MULTILATERAL: 'Oman and India demonstrate that bilateral labor agreements — tailored to specific needs of both sending and receiving countries — are more effective than one-size-fits-all international mandates.'",
      "MIRROR ARGUMENT: 'India advocates for worker protections abroad while lacking a domestic refugee law, implementing religiously discriminatory citizenship policies, and managing its own vast internal migration with minimal protections. Reform must be universal, not selective.'",
    ],
    sources: ["World Bank Remittance Data", "Ministry of External Affairs (India)", "UNHCR India", "ILO Migration Reports", "Oman National Centre for Statistics and Information"],
  },
  {
    name: "Turkey",
    category: "complex",
    overview: "Turkey occupies a unique position in immigration debates — it is simultaneously the world's largest refugee host (having sheltered up to 3.76 million Syrians at peak) and a nation experiencing severe anti-refugee backlash. Turkey's experience is directly relevant to Oman's arguments about burden-sharing: Turkey demonstrates what happens when a single nation bears disproportionate refugee costs without adequate international support. However, Turkey's geographic limitation on the 1951 Convention (only recognizing European refugees) and its increasingly harsh enforcement policies create complexities. For Oman, Turkey is a powerful example in advocating for equitable international responsibility-sharing.",
    keyStats: [
      { label: "Syrian Refugees (2025)", value: "~2.49 million (under temporary protection)" },
      { label: "Peak Refugee Population", value: "3.76 million (2021, highest in world)" },
      { label: "Total Population", value: "~84 million" },
      { label: "EU Financial Assistance for Refugees", value: "~€10 billion (since 2011)" },
      { label: "Voluntary Syrian Returns (since Dec 2024)", value: "~474,000" },
      { label: "Deportations (2024)", value: "141,000 (record high)" },
      { label: "Syrians Granted Citizenship", value: "238,768 (since 2016)" },
    ],
    legalFramework: "Turkey is a signatory to the 1951 Refugee Convention but with a critical geographic limitation — it only formally recognizes refugees from Europe. Syrians, Afghans, and Iraqis are technically not 'refugees' under Turkish law, instead receiving 'Temporary Protection' status. Turkey's 2013 Law on Foreigners and International Protection was its first dedicated asylum law. In October 2024, Syrians under temporary protection were exempted from needing employer-sponsored work permits. However, enforcement has hardened significantly since 2022, with record deportations and border militarization.",
    refugeeAdmissions: "Turkey at peak hosted more registered refugees than any other country — 3.76 million in 2021. Since the fall of Assad in December 2024, approximately 474,000 Syrians have voluntarily returned. However, many 'voluntary' returns are contested — organizations report pressure on refugees to sign return forms. UNHCR resettlements from Turkey totaled 6,800 in 2024, and only 72,538 Syrians were resettled to third countries since 2016 (Germany received 19,500 of these). International protection applications received dropped 52% in 2024 as Turkey restricts new claims.",
    enforcementPolicies: "Turkey's enforcement has hardened dramatically since 2022, driven by domestic political pressure and rising anti-immigrant sentiment. Key measures include: 32 removal centres across 25 provinces with 18,780 total detention capacity; mobile migration checkpoints that checked over 1.18 million people in 2024; 126,000+ irregular migrants identified; border militarization with 104,000 prevented entries; and pushbacks of Afghan men at the Iranian border. Anti-Syrian riots broke out in Kayseri in July 2024, spreading violence against Syrian homes across provinces.",
    militaryDisplacement: "Turkey's displacement footprint is complex — it has both contributed to and absorbed displacement. Turkey's military operations in northern Syria displaced Kurdish and other Syrian populations. Its support for opposition groups against Assad prolonged the conflict. At the same time, Turkey absorbed 3+ million Syrian refugees from the same conflict. Turkey is therefore both a contributor and a victim of the Syrian displacement crisis — a nuanced position Oman can reference when discussing the complexity of migration causes.",
    economicImpact: "Turkey's economy has been significantly impacted by its refugee population. Work permits issued to foreigners in 2024 totaled 300,852, with over a third going to Syrians. The EU provided nearly €10 billion in financial assistance for refugees since 2011, effectively paying Turkey to manage European migration flows. Refugees contribute to construction, textiles, food service, and agriculture. However, the strain on public services, housing, and the labor market has fueled anti-refugee sentiment and political backlash.",
    hypocrisyIndex: [
      { label: "Refugees hosted (peak)", value: "3.76 million (world's highest)" },
      { label: "EU funding received", value: "~€10 billion" },
      { label: "1951 Convention", value: "YES — but with geographic limitation" },
      { label: "Deportations (2024)", value: "141,000 (record)" },
      { label: "Anti-refugee riots", value: "Kayseri, July 2024" },
      { label: "GDP per capita", value: "~$13,000" },
    ],
    debatePoints: [
      "BURDEN-SHARING FAILURE: 'Turkey proves Oman's core argument — even willing host nations collapse without international support. Turkey received €10 billion from the EU; most developing host nations receive far less. Equitable burden-sharing is not optional, it is essential.'",
      "THE EU-TURKEY DEAL EXPOSES WESTERN HYPOCRISY: 'Europe paid Turkey billions to keep refugees away from European borders. They would rather pay to keep displacement in the developing world than fulfill their own humanitarian obligations. This is not burden-sharing — it is burden-outsourcing.'",
      "SOCIAL COLLAPSE IS PREDICTABLE: 'The Kayseri anti-refugee riots and rising xenophobia in Turkey demonstrate that social strain is the inevitable result of one country carrying a disproportionate share of a global crisis. This is the argument FOR international cooperation, not against refugees.'",
    ],
    sources: ["UNHCR", "ECRE Asylum Information Database", "IOM DTM Turkey Reports", "Migration Policy Institute", "Prague Process"],
  },
];
