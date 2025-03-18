
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin as LocationPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TravelCard from "@/components/TravelCard";
import Testimonial from "@/components/Testimonial";
import { useToast } from "@/hooks/use-toast";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Form validation schemas
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const searchSchema = z.object({
  location: z.string().min(2, "Please enter a destination"),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Please enter a subject"),
  message: z.string().min(10, "Please enter a message (min 10 characters)"),
});

const Index = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const { toast } = useToast();
  
  // Search form state
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  
  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  
  // GSAP refs instead of auto-animate
  const searchFormRef = useRef<HTMLFormElement>(null);
  const popularDestinationsRef = useRef<HTMLDivElement>(null);
  const specialOffersRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  
  // Search destinations functionality
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setSearchLoading(true);
    
    try {
      // Validate form
      searchSchema.parse({
        location: searchLocation,
        checkIn,
        checkOut,
      });
      
      // In a real app, you would make an API call here
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Search successful!",
        description: `Searching for ${activeTab} in ${searchLocation}`,
      });
      
      // Additional logic for handling search results would go here
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Search error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Search error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setSearchLoading(false);
    }
  };
  
  // Newsletter subscription functionality
  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterError("");
    
    try {
      // Validate email
      newsletterSchema.parse({ email: newsletterEmail });
      
      // In a real app, you would make an API call to your newsletter service
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setNewsletterEmail("");
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        setNewsletterError(error.errors[0].message);
      } else {
        setNewsletterError("Failed to subscribe. Please try again.");
      }
    } finally {
      setNewsletterLoading(false);
    }
  };
  
  // Contact form functionality
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    
    try {
      // Validate form
      contactSchema.parse({
        name: contactName,
        email: contactEmail,
        subject: contactSubject,
        message: contactMessage,
      });
      
      // In a real app, you would make an API call to your email service
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Form error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Form error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setContactLoading(false);
    }
  };

  // Initialize GSAP animations
  useEffect(() => {
    // Hero section animations
    gsap.fromTo(
      heroContentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Airplane floating animation
    gsap.to(airplaneRef.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Search box animation
    gsap.fromTo(
      searchFormRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
    );

    // ScrollTrigger animations for sections
    const animateSections = [
      { ref: popularDestinationsRef.current, delay: 0 },
      { ref: specialOffersRef.current, delay: 0.1 },
      { ref: testimonialsRef.current, delay: 0.2 },
      { ref: newsletterRef.current, delay: 0 },
      { ref: contactRef.current, delay: 0.1 }
    ];

    animateSections.forEach(({ ref, delay }) => {
      if (ref) {
        ScrollTrigger.create({
          trigger: ref,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              ref,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, delay, ease: "power2.out" }
            );
          }
        });
      }
    });

    // Animate cards inside sections
    const sections = [popularDestinationsRef.current, specialOffersRef.current, testimonialsRef.current];
    
    sections.forEach(section => {
      if (section) {
        const cards = section.querySelectorAll('.card-item');
        gsap.set(cards, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out"
            });
          }
        });
      }
    });

    // Clean up on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/">
              <span className="text-primary font-bold text-2xl">Travelo</span>
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-medium" asChild>
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium">
                  Discover
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[200px]">
                    <div className="font-medium py-2 cursor-pointer hover:text-primary transition-colors">Places</div>
                    <div className="font-medium py-2 cursor-pointer hover:text-primary transition-colors">Experiences</div>
                    <div className="font-medium py-2 cursor-pointer hover:text-primary transition-colors">Adventures</div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-medium" asChild>
                  <Link to="/">Special Deals</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-medium" asChild>
                  <Link to="/">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <SignedIn>
              <Button variant="outline" className="hidden md:inline-flex" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Button variant="outline" className="hidden md:inline-flex" asChild>
                <Link to="/sign-in">Login</Link>
              </Button>
              <Button className="hidden md:inline-flex" asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <img
          src="/1 Hero Image.png"
          alt="Hero Image"
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Airplane Image with GSAP animation */}
        <img
          ref={airplaneRef}
          src="/2 Plane Image.png"
          alt="Airplane"
          className="absolute bottom-[10px] right-10 w-[500px] md:w-[600px] lg:w-[800px] h-auto"
        />
        <div className="container mx-auto px-4 lg:px-0 relative z-10 flex justify-start items-end h-full pb-10 lg:pb-16">
          <div ref={heroContentRef} className="max-w-2xl mb-12 lg:mb-14">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Explore the Beauty of the World
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover new places and experiences. Find the best deals on
              hotels, flights, and vacation packages.
            </p>
            <div className="flex gap-4">
              <Button size="lg">Explore Now</Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-white text-white hover:bg-white/30"
              >
                Watch Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Box */}
      <section className="container mx-auto px-4 lg:px-0 -mt-16 relative z-20">
        <Card className="shadow-lg rounded-xl p-2">
          <div className="flex gap-2 mb-4 overflow-x-auto md:overflow-visible">
            <Button
              variant={activeTab === "flights" ? "default" : "ghost"}
              onClick={() => setActiveTab("flights")}
              className="transition-all duration-300"
            >
              Flights
            </Button>
            <Button
              variant={activeTab === "hotels" ? "default" : "ghost"}
              onClick={() => setActiveTab("hotels")}
              className="transition-all duration-300"
            >
              Hotels
            </Button>
            <Button
              variant={activeTab === "tours" ? "default" : "ghost"}
              onClick={() => setActiveTab("tours")}
              className="transition-all duration-300"
            >
              Tours
            </Button>
            <Button
              variant={activeTab === "cars" ? "default" : "ghost"}
              onClick={() => setActiveTab("cars")}
              className="transition-all duration-300"
            >
              Car Rentals
            </Button>
          </div>

          <CardContent>
            <form ref={searchFormRef} onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-10" 
                      placeholder="Where are you going?" 
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Check In
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-10" 
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Check Out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-10" 
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">&nbsp;</label>
                  <Button 
                    className="w-full"
                    type="submit"
                    disabled={searchLoading}
                  >
                    {searchLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto px-4 lg:px-0 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Popular Destinations
          </h2>
          <Button variant="link" className="hidden md:flex items-center">
            View all destinations <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div ref={popularDestinationsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TravelCard
            className="card-item"
            image="/3 Image.png"
            title="Bali, Indonesia"
            description="A beautiful tropical paradise with stunning beaches and vibrant culture."
            price={1200}
            rating={4.8}
          />
          <TravelCard
            className="card-item"
            image="/4 Image.png"
            title="Paris, France"
            description="Explore the city of love with its iconic landmarks and charming streets."
            price={1500}
            rating={4.9}
          />
          <TravelCard
            className="card-item"
            image="/5 Image.png"
            title="Santorini, Greece"
            description="Enjoy breathtaking views of the Aegean Sea from white-washed buildings."
            price={1800}
            rating={4.7}
          />
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Special Offers</h2>
            <Button variant="link" className="hidden md:flex items-center">
              View all offers <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div ref={specialOffersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TravelCard
              className="card-item"
              image="/6 Image.png"
              title="Summer Sale"
              description="Up to 30% off on summer vacation packages to tropical destinations."
              price={899}
              originalPrice={1299}
              rating={4.6}
            />
            <TravelCard
              className="card-item"
              image="/7 Image.png"
              title="Weekend Getaway"
              description="Perfect short trips to recharge and explore new places."
              price={499}
              originalPrice={699}
              rating={4.5}
            />
            <TravelCard
              className="card-item"
              image="/8 Image.png"
              title="Luxury Retreat"
              description="Experience luxury accommodations with exclusive amenities."
              price={2499}
              originalPrice={2999}
              rating={4.9}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 lg:px-0 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We pride ourselves on providing exceptional travel experiences.
            Here's what some of our satisfied customers have to say.
          </p>
        </div>

        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            className="card-item"
            name="Sarah Johnson"
            location="New York, USA"
            image="/lady1.jpg"
            rating={5}
            text="My trip to Bali was absolutely perfect! Travelo took care of everything and the service was exceptional."
          />
          <Testimonial
            className="card-item"
            name="David Chen"
            location="Toronto, Canada"
            image="/male.jpg"
            rating={5}
            text="The tour packages are well-planned and offer great value. I've used Travelo for three trips now and have never been disappointed."
          />
          <Testimonial
            className="card-item"
            name="Maria Rodriguez"
            location="Madrid, Spain"
            image="/lady2.jpg"
            rating={4}
            text="Professional service with a personal touch. The customer support team was incredibly helpful when we needed to make changes to our itinerary."
          />
        </div>
      </section>

      {/* Newsletter */}
      <section ref={newsletterRef} className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-8">
              Stay updated with our latest offers, travel tips, and exclusive
              deals by subscribing to our newsletter.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  type="email"
                  disabled={newsletterLoading}
                />
                <Button 
                  className="bg-white text-primary hover:bg-white/90"
                  type="submit"
                  disabled={newsletterLoading}
                >
                  {newsletterLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              {newsletterError && (
                <p className="text-white/90 bg-white/10 p-2 rounded text-sm">
                  {newsletterError}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our travel packages or need custom
              arrangements? Our travel experts are here to help you plan your
              perfect journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-3">Mon-Fri from 8am to 5pm</p>
              <p className="font-medium">+1 (555) 123-4567</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-3">
                We'll respond within 24 hours
              </p>
              <p className="font-medium">info@travelo.com</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <LocationPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-3">Our main office location</p>
              <p className="font-medium">123 Travel Street, Adventure City</p>
            </Card>
          </div>

          <div ref={contactRef} className="flex justify-center items-center mt-12">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
                  <p className="text-gray-600 mb-6">
                    Fill out the form and our team will get back to you within
                    24 hours.
                  </p>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input 
                        placeholder="John Doe" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        disabled={contactLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <Input 
                        placeholder="john@example.com" 
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        disabled={contactLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input 
                        placeholder="How can we help you?" 
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        disabled={contactLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us more about your travel plans..."
                        className="min-h-[120px]"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        disabled={contactLoading}
                      />
                    </div>
                    <Button 
                      className="w-full mt-2"
                      type="submit"
                      disabled={contactLoading}
                    >
                      {contactLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
                <div className="hidden md:block">
                  <div className="h-full bg-[url('/lovable-uploads/72d13167-60a9-46de-93f7-a861c71d2bd5.png')] bg-cover bg-center rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Travelo</h3>
              <p className="text-gray-400 mb-4">
                Making the world a better place through exceptional travel
                experiences.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Gift Cards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Magazine
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Trust & Safety
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <LocationPin className="w-5 h-5 mr-2 mt-0.5 text-gray-500" />
                  <span>
                    123 Travel Street
                    <br />
                    Adventure City, AC 12345
                  </span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-gray-500" />
                  <span>info@travelo.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-gray-500" />
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2023 Travelo. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
