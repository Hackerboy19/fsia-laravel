/* Site-wide content taken from the live fsia.in pages (header, footer, contact, about).
   `live` links still go to the current site until those pages are rebuilt here. */

export const LIVE = 'https://www.fsia.in';

export type NavLink = { label: string; to: string; live?: boolean; note?: string };

export const contact = {
  phone: '+91-99832-86999',
  phoneHref: 'tel:+919983286999',
  whatsapp: 'https://wa.me/919983286999',
  email: 'care@fsia.in',
  hours: 'Mon–Sat, 10am–7pm IST',
  address: 'Forever Star India Pvt. Ltd., Beauty Pageants & Award Shows, Nirman Nagar, Jaipur',
  map: 'https://maps.google.com/?q=Nirman+Nagar+Jaipur',
};

export const pageants: NavLink[] = [
  { label: 'Forever Miss India', to: '/forever-miss-india-new.php', live: true, note: 'Unmarried women, national crown' },
  { label: 'Forever Mrs India', to: '/forever-mrs-india-new.php', live: true, note: 'Married women, two age groups' },
  { label: 'Forever Miss Teen India', to: '/forever-miss-teen-india-new.php', live: true, note: 'Girls aged 13 to 18' },
  { label: 'Miss Universe', to: '/miss-universe-beauty-pageant.php', live: true, note: 'International title' },
  { label: 'Mrs Universe', to: '/mrs-universe-beauty-pageant.php', live: true, note: 'International title' },
  { label: 'Miss World', to: '/miss-world-beauty-pageant.php', live: true, note: 'International title' },
  { label: 'Mrs World', to: '/mrs-world-beauty-pageant.php', live: true, note: 'International title' },
  { label: 'Miss FSIA International', to: '/miss-fsia-international-2024.php', live: true },
  { label: 'Mrs FSIA International', to: '/mrs-fsia-international-2024.php', live: true },
];

export const awards: NavLink[] = [
  { label: 'Super Hero Award', to: '/super-hero-award.php', live: true, note: 'Men who achieved excellence' },
  { label: 'Super Woman Award', to: '/super-woman-award.php', live: true, note: 'Women who lead and inspire' },
  { label: 'Business Awards', to: '/business-awards.php', live: true, note: 'Founders and brands' },
  { label: 'Bharat National Awards', to: '/bharat-national-awards.php', live: true },
  { label: 'International Award', to: '/international-award.php', live: true },
  { label: 'Infinity Achievers', to: '/infinity-achievers', live: true },
  { label: 'Forever Achievers', to: '/forever-achievers', live: true },
  { label: 'Nominate Yourself', to: '/nominate-yourself', live: true },
];

export const more: NavLink[] = [
  { label: 'Forever Star Kids', to: '/star-india-kids-contest.php', live: true },
  { label: 'Fashion Designers', to: '/fashion-designer.php', live: true },
  { label: 'Makeup Artists', to: '/makeup-artist.php', live: true },
  { label: 'Bharat Couture Week', to: '/bharat-couture-week-fashion-week.php', live: true },
  { label: 'Channel Partner', to: '/channel-partner', live: true },
  { label: 'Franchise', to: '/online-franchise-application', live: true },
];

export const galleries: NavLink[] = [
  { label: 'Winners', to: '/pageant-winner', live: true },
  { label: 'Contestants', to: '/all-india-pageant-contestant', live: true },
  { label: 'Awardees', to: '/top-awardee-in-india', live: true },
  { label: 'Achievers', to: '/best-achievers-in-india', live: true },
  { label: 'Model Gallery', to: '/model-gallery', live: true },
  { label: 'Fashion Gallery', to: '/fashion-gallery', live: true },
  { label: 'National Award', to: '/national-award', live: true },
  { label: 'International Award Gallery', to: '/international-award-gallery', live: true },
];

export const mainNav: { label: string; to?: string; items?: NavLink[]; groups?: { title: string; items: NavLink[] }[] }[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about.php' },
  { label: 'Pageants', items: pageants },
  { label: 'Awards', items: awards },
  { label: 'Explore', groups: [{ title: 'Galleries', items: galleries }, { title: 'More from FSIA', items: more }] },
  { label: 'Our Team', to: '/our-teams.php' },
  { label: 'FAQ', to: '/FAQ.php' },
  { label: 'Contact', to: '/contact.php' },
];

export const footerColumns: { title: string; items: NavLink[] }[] = [
  { title: 'Pageants', items: pageants.slice(0, 7) },
  { title: 'Awards', items: awards.slice(0, 5).concat(more.slice(0, 1)) },
  {
    title: 'Company',
    items: [
      { label: 'About FSIA', to: '/about.php' },
      { label: 'Our Team', to: '/our-teams.php' },
      { label: 'FAQ', to: '/FAQ.php' },
      { label: 'Contact Us', to: '/contact.php' },
      { label: 'News Coverage', to: '/news.php', live: true },
      { label: 'Apply for Franchise', to: '/online-franchise-application', live: true },
    ],
  },
];

export const legal: NavLink[] = [
  { label: 'Terms & Conditions', to: '/termscondition.php', live: true },
  { label: 'Privacy Policy', to: '/privacy-policy.php', live: true },
  { label: 'Refund Policy', to: '/refund-policy', live: true },
  { label: 'Sitemap', to: '/sitemap.php', live: true },
];

export const about = {
  intro:
    'Forever Star India (FSIA) is a national platform for beauty pageants and award shows. It was built so that talent receives an opportunity before it is judged — for women, men, teens and kids from every city of India.',
  mission: [
    'To identify and recognise talent through transparent and merit-based platforms.',
    'To encourage people to participate with confidence and determination.',
    "To promote talent across beauty pageants, sports, education, awards, kids' competitions and other recognition initiatives.",
    'To uphold values of merit, discipline, integrity and equal opportunity.',
  ],
  goals: [
    'To reach talented individuals from every state, district and community of India.',
    'To increase awareness about the importance of talent recognition.',
    'To expand opportunities through national and international initiatives.',
    'To encourage participation without barriers of age, profession or background.',
    "To contribute towards strengthening India's culture of talent, achievement and recognition.",
  ],
  vision: [
    'To build a future where every deserving individual has access to an opportunity.',
    'To create a culture where talent is recognised with fairness and respect.',
    "To strengthen India's identity by promoting talent across diverse fields.",
    'To encourage future generations to believe in their abilities and pursue excellence.',
    'To continue building platforms that inspire participation, recognition and responsible growth.',
  ],
};
