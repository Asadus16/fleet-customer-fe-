import { AnnouncementBar, Header, Footer } from '@/components/layout';
import {
  HeroSection,
  FleetPreviewSection,
  FeaturesSection,
  AboutSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from '@/components/sections';

// Mock data - replace with actual data from API/CMS
const vehicles = [
  {
    id: '1',
    name: 'Hyundai Santa Fe',
    image: '/images/vehicles/santa-fe.jpg',
    location: 'Am Isfeld 19, 22981, NY, New York',
    seats: 7,
    transmission: 'Manual',
    fuelType: 'Manual',
    pricePerDay: 82.09,
  },
  {
    id: '2',
    name: 'BMW i8',
    image: '/images/vehicles/bmw-i8.jpg',
    location: 'Am Isfeld 19, 22981, NY, New York',
    seats: 7,
    transmission: 'Manual',
    fuelType: 'Manual',
    pricePerDay: 50.99,
  },
  {
    id: '3',
    name: 'Toyota Sienna Van',
    image: '/images/vehicles/sienna.jpg',
    location: 'Am Isfeld 19, 22981, NY, New York',
    seats: 7,
    transmission: 'Manual',
    fuelType: 'Manual',
    pricePerDay: 88.01,
  },
];

const features = [
  {
    title: 'Trusted by Our Community',
    description:
      'Family-owned and operated in Ketchikan for over 20 years. We know Alaska roads and treat you like neighbors, not numbers.',
  },
  {
    title: 'Budget-Friendly, Practical Fleet',
    description:
      "Reliable cars that won't break the bank. Perfect for work trips, extended stays, or exploring the Last Frontier on your terms.",
  },
  {
    title: 'Inter-Island Friendly Rentals',
    description:
      "Take our cars to neighboring islands via ferry. We're one of the few local rentals that support true Alaska exploration.",
  },
];

const aboutParagraphs = [
  'We have been married and lived in Ketchikan, Alaska for over 25 years. We loved raising our four children here, and as each one went on their way we found that our side hobby of renting cars, was something we wanted to get more involved in.',
  'We are a local business, supporting our community and those who are blessed to come visit here. Whether you are a local who temporarily needs a car, a traveler who is looking for a long term rental, or a tourist looking for the vacation of a lifetime we want to work with you.',
  'Please feel free to text with any concerns or questions you might have.',
];

const testimonials = [
  {
    rating: 5,
    quote: "Best rental experience I've had in Alaska!",
    content:
      'Dominique was so helpful and the car was perfect for our week-long adventure to Prince of Wales Island.',
    author: 'Sarah M.',
    location: 'Seattle, WA',
    date: 'August 2025',
  },
  {
    rating: 5,
    quote: "Best rental experience I've had in Alaska!",
    content:
      'Dominique was so helpful and the car was perfect for our week-long adventure to Prince of Wales Island.',
    author: 'Sarah M.',
    location: 'Seattle, WA',
    date: 'August 2025',
  },
  {
    rating: 5,
    quote: "Best rental experience I've had in Alaska!",
    content:
      'Dominique was so helpful and the car was perfect for our week-long adventure to Prince of Wales Island.',
    author: 'Sarah M.',
    location: 'Seattle, WA',
    date: 'August 2025',
  },
];

const faqs = [
  {
    question: 'Trusted by Our Community',
    answer:
      'Family-owned and operated in Ketchikan for over 20 years. We know Alaska roads and treat you like neighbors, not numbers.',
  },
  {
    question: 'Trusted by Our Community',
    answer:
      'Family-owned and operated in Ketchikan for over 20 years. We know Alaska roads and treat you like neighbors, not numbers.',
  },
  {
    question: 'Trusted by Our Community',
    answer:
      'Family-owned and operated in Ketchikan for over 20 years. We know Alaska roads and treat you like neighbors, not numbers.',
  },
  {
    question: 'Trusted by Our Community',
    answer:
      'Family-owned and operated in Ketchikan for over 20 years. We know Alaska roads and treat you like neighbors, not numbers.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Announcement Bar */}
      <AnnouncementBar
        message="Looking for Essential Oils? Head on"
        linkText="Here Now!"
        linkHref="#"
      />

      {/* Header */}
      <Header />

      {/* Hero Section with Booking Form */}
      <HeroSection backgroundImage="/images/home/hero/hero-ketchikan.jpg" />

      {/* Why Choose / Fleet Preview Section */}
      <FleetPreviewSection vehicles={vehicles} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* About Section */}
      <AboutSection
        paragraphs={aboutParagraphs}
        image="/images/home/about/founders.jpg"
      />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* CTA Section */}
      <CTASection backgroundImage="/images/home/CTA/cta-bg.jpg" />

      {/* Footer */}
      <Footer hasCTAOverlap />
    </div>
  );
}
