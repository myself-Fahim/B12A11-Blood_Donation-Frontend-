import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import Footer from '../Component/Footer';
import AuthContext from '../AuthProvider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FiHeart, FiUsers, FiMapPin, FiClock, FiStar, FiArrowRight, FiPhone, FiMail, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BiDonateBlood } from 'react-icons/bi';
import { MdBloodtype, MdLocationOn, MdSchedule } from 'react-icons/md';
import EligibilityChecker from '../Component/Eligibility/Eligibility';


const Home = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ donors: 0, requests: 0, donations: 0 });
    const [recentDonations, setRecentDonations] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    // Hero slider images
    const heroSlides = [
        {
            image: "https://i.ibb.co.com/xKczJ6z7/slide-4.jpg",
            title: "Emergency Blood Requests",
            subtitle: "Get help when you need it most - 24/7 support",
            cta: "Become a Donor"
        },
        {
            image: 'https://i.ibb.co.com/LWrKYWn/slide-1.jpg',
            title: "Your Blood Can Save Lives",
            subtitle: "Join thousands of heroes making a difference every day",
            cta: "Become a Donor"
        },
        {
            image: "https://i.ibb.co.com/PSY8bJt/slide-6.png",
            title: "Emergency Blood Requests",
            subtitle: "Get help when you need it most - 24/7 support",
            cta: "Become a Donor"
        }
    ];

    useEffect(() => {
        // Fetch statistics
        const fetchStats = async () => {
            try {
                const [usersRes, requestsRes] = await Promise.all([
                    axiosSecure('/users'),
                    axiosSecure('/request')
                ]);
                setStats({
                    donors: usersRes.data.length,
                    requests: requestsRes.data.length,
                    donations: Math.floor(requestsRes.data.length * 0.7) // Assuming 70% completion rate
                });
                setRecentDonations(requestsRes.data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

        // Mock testimonials data
        setTestimonials([
            {
                id: 1,
                name: "Sarah Ahmed",
                location: "Dhaka",
                message: "BloodConnect helped me find a donor for my father within hours. The platform is amazing!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                id: 2,
                name: "Mohammad Rahman",
                location: "Chittagong",
                message: "As a regular donor, this platform makes it so easy to help people in need. Highly recommended!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                id: 3,
                name: "Fatima Khan",
                location: "Sylhet",
                message: "The emergency request feature saved my brother's life. Thank you BloodConnect!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            }
        ]);
    }, [axiosSecure]);

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide ? 'opacity-60' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover "
                            />
                            <div className="absolute inset-0  bg-opacity-50" />
                        </div>
                    ))}
                </div>
                
                <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
                    <div className="max-w-4xl mx-auto fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-amber-900">
                            {heroSlides[currentSlide].title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-semibold text-black">
                            {heroSlides[currentSlide].subtitle}
                        </p>
                        <div className="flex flex-col mx-15 md:mx-0 md:flex-row justify-center gap-4 ">
                            <Link
                                to={user ? "/dashboard/request" : "/register"}
                                className="btn-primary-custom flex items-center justify-center "
                            >
                                <BiDonateBlood className="mr-2 text-xl" />
                                {heroSlides[currentSlide].cta}
                            </Link>
                            <Link
                                to="/search"
                                className="btn-primary-custom text-lg px-8 py-4 inline-flex items-center justify-center font-bold bg-white border-white hover:bg-gray-100"
                            >
                                <FiUsers className="mr-2" />
                                Find Donors
                            </Link>
                        </div>
                    </div>
                </div>

                 <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                >
                    <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                >
                    <FiChevronRight className="w-6 h-6" />
                 </button> 

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Statistics Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiUsers className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {loading ? '...' : stats.donors.toLocaleString()}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">Registered Donors</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <BiDonateBlood className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {loading ? '...' : stats.donations.toLocaleString()}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">Lives Saved</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiHeart className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {loading ? '...' : stats.requests.toLocaleString()}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">Blood Requests</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose BloodConnect?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            We make blood donation simple, safe, and accessible for everyone
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card-base p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiMapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                Location-Based Search
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Find donors near you with our advanced location-based matching system
                            </p>
                        </div>
                        
                        <div className="card-base p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiClock className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                24/7 Emergency Support
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Round-the-clock support for emergency blood requests and urgent cases
                            </p>
                        </div>
                        
                        <div className="card-base p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <MdBloodtype className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                All Blood Types
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Support for all blood types including rare blood groups and special requirements
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eligibility Section */}

            <EligibilityChecker></EligibilityChecker>

            {/* Recent Donations Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent Blood Requests
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Help these people in need
                        </p>
                    </div>
                    
                    <div className="grid-responsive">
                        {recentDonations.map((donation) => (
                            <div key={donation._id} className="card-base p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-400 font-bold">
                                                {donation.bloodGrp}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {donation.recipient}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {donation.recipientDistrict}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        donation.status === 'pending' 
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}>
                                        {donation.status}
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                                    <div className="flex items-center">
                                        <MdLocationOn className="w-4 h-4 mr-2" />
                                        {donation.recipientUpazila}, {donation.recipientDistrict}
                                    </div>
                                    <div className="flex items-center">
                                        <MdSchedule className="w-4 h-4 mr-2" />
                                        {donation.donationDate} at {donation.donationTime}
                                    </div>
                                </div>
                                <Link
                                    to={`/donation-details/${donation._id}`}
                                    className="btn-primary-custom w-full text-center inline-flex items-center justify-center "
                                >
                                    View Details
                                    <FiArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link
                            to="/donation"
                            className="btn-secondary-custom inline-flex items-center"
                        >
                            View All Requests
                            <FiArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            What Our Community Says
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Real stories from real heroes
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="card-base p-6">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                                    "{testimonial.message}"
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Simple steps to save lives
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-6 text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Register as Donor
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Create your profile with basic information and blood type
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-6 text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Get Matched
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Our system matches you with nearby requests based on blood type and location
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-6 text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Save Lives
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Donate blood and make a real difference in someone's life
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Get answers to common questions about blood donation
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="card-base p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Who can donate blood?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Generally, healthy individuals aged 18-65 who weigh at least 50kg can donate blood. 
                                Specific eligibility criteria may vary based on medical history and current health status.
                            </p>
                        </div>
                        
                        <div className="card-base p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                How often can I donate blood?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                You can donate whole blood every 56 days (8 weeks). For other types of donations like 
                                platelets, the frequency may be different.
                            </p>
                        </div>
                        
                        <div className="card-base p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Is blood donation safe?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Yes, blood donation is completely safe. All equipment is sterile and used only once. 
                                The donation process is supervised by trained medical professionals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-5xl mx-auto">
                    <div className="card-base p-6 md:p-10">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact Us</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Send us a message and we'll get back to you soon.
                            </p>
                        </div>

                        <form className="grid gap-4 md:grid-cols-2">
                            <div className="md:col-span-1">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Your phone number"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email address"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="Your message"
                                    required
                                    className="form-input"
                                ></textarea>
                            </div>

                            <div className="md:col-span-2 flex items-center gap-3">
                                <button
                                    type="submit"
                                    className="btn-primary-custom inline-flex items-center"
                                >
                                    <FiMail className="mr-2 w-4 h-4" />
                                    Send Message
                                </button>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    We typically reply within 24–48 hours.
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

           
        </div>
    );
};

export default Home;