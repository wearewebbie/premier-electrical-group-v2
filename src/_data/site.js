export default {
  title: "Premier Electrical Group",
  description: "One of Northern Ireland's leading solar and electrical specialists, offering solar panel installations, EV chargers, heat pumps, and electrical maintenance services for domestic, commercial, and agricultural properties.",
  schemaType: "LocalBusiness",
  url: process.env.CF_PAGES_BRANCH === 'main'
    ? "https://www.premierelectricalgroup.co.uk"
    : process.env.CF_PAGES_URL || "http://localhost:8080",
  logo: "",
  image: "SEO Preview Image Card (1200 x 675 pixels)",
  phone: "+44 28 9756 4046",
  email: "solar@premierelectricalgroup.co.uk",
  social: {
    instagram: "https://instagram.com/premierelectricalgrouplimited",
    facebook: "https://facebook.com/premierelectricalgrouplimited",
    tiktok: "",
    linkedin: "https://linkedin.com/company/premier-electrical-group-limited"
  }
};