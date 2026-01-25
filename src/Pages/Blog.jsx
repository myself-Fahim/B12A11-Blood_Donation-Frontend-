import React, { useState } from 'react';
import { FiCalendar, FiUser, FiClock, FiArrowRight, FiSearch } from 'react-icons/fi';
import { BiDonateBlood } from 'react-icons/bi';
import Footer from '../Component/Footer';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const blogPosts = [
        {
            id: 1,
            title: "The Ultimate Guide to Blood Donation: Everything You Need to Know",
            excerpt: "Learn about the blood donation process, eligibility requirements, and how your donation can save up to three lives.",
            content: "Blood donation is one of the most selfless acts a person can perform. Every donation has the potential to save up to three lives...",
            author: "Dr. Sarah Ahmed",
            date: "2024-01-15",
            readTime: "8 min read",
            category: "education",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            featured: true
        },
        {
            id: 2,
            title: "Blood Types Explained: Understanding Compatibility and Rarity",
            excerpt: "Discover the different blood types, their compatibility, and why some blood types are more in demand than others.",
            content: "Understanding blood types is crucial for safe blood transfusions. The ABO system and Rh factor determine compatibility...",
            author: "Dr. Mohammad Rahman",
            date: "2024-01-10",
            readTime: "6 min read",
            category: "education",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "Success Story: How BloodConnect Saved Maria's Life",
            excerpt: "Read about Maria's emergency situation and how our platform connected her with a life-saving donor in just 2 hours.",
            content: "Maria was rushed to the hospital after a severe accident. Her rare blood type made finding a donor challenging...",
            author: "Fatima Khan",
            date: "2024-01-08",
            readTime: "4 min read",
            category: "stories",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "Preparing for Your First Blood Donation: Tips and Guidelines",
            excerpt: "First-time donor? Here's everything you need to know to prepare for a safe and comfortable donation experience.",
            content: "Donating blood for the first time can be nerve-wracking. Here are essential tips to ensure a smooth experience...",
            author: "Dr. Sarah Ahmed",
            date: "2024-01-05",
            readTime: "5 min read",
            category: "tips",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            title: "The Science Behind Blood: Components and Their Uses",
            excerpt: "Explore the different components of blood and how each part serves specific medical purposes in treatments.",
            content: "Blood is more complex than it appears. It consists of red blood cells, white blood cells, platelets, and plasma...",
            author: "Dr. Mohammad Rahman",
            date: "2024-01-03",
            readTime: "7 min read",
            category: "education",
            image: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 6,
            title: "Community Heroes: Meet Our Top Donors of 2023",
            excerpt: "Celebrating the incredible individuals who have made multiple donations and saved countless lives this year.",
            content: "Every year, we recognize the outstanding donors who have gone above and beyond to help their community...",
            author: "Fatima Khan",
            date: "2023-12-28",
            readTime: "6 min read",
            category: "stories",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    const categories = [
        { id: 'all', name: 'All Posts', count: blogPosts.length },
        { id: 'education', name: 'Education', count: blogPosts.filter(post => post.category === 'education').length },
        { id: 'stories', name: 'Success Stories', count: blogPosts.filter(post => post.category === 'stories').length },
        { id: 'tips', name: 'Tips & Guidelines', count: blogPosts.filter(post => post.category === 'tips').length }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-red-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Blood Donation Blog</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Stories, tips, and insights from the world of blood donation
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-input pl-10"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                        selectedCategory === category.id
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900'
                                    }`}
                                >
                                    {category.name} ({category.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Post */}
                    {featuredPost && selectedCategory === 'all' && !searchTerm && (
                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Article</h2>
                            <div className="card-base overflow-hidden">
                                <div className="lg:flex">
                                    <div className="lg:w-1/2">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-64 lg:h-full object-cover"
                                        />
                                    </div>
                                    <div className="lg:w-1/2 p-8">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="flex items-center">
                                                <FiUser className="w-4 h-4 mr-1" />
                                                {featuredPost.author}
                                            </div>
                                            <div className="flex items-center">
                                                <FiCalendar className="w-4 h-4 mr-1" />
                                                {new Date(featuredPost.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                <FiClock className="w-4 h-4 mr-1" />
                                                {featuredPost.readTime}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            {featuredPost.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                                            {featuredPost.excerpt}
                                        </p>
                                        <button className="btn-primary-custom inline-flex items-center">
                                            Read Full Article
                                            <FiArrowRight className="ml-2 w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Posts Grid */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            {searchTerm ? `Search Results (${filteredPosts.length})` : 'Latest Articles'}
                        </h2>
                        
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    No articles found matching your criteria.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regularPosts.map(post => (
                                    <article key={post.id} className="card-base overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                <div className="flex items-center">
                                                    <FiUser className="w-4 h-4 mr-1" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center">
                                                    <FiCalendar className="w-4 h-4 mr-1" />
                                                    {new Date(post.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {post.readTime}
                                                </span>
                                                <button className="text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300 inline-flex items-center">
                                                    Read More
                                                    <FiArrowRight className="ml-1 w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="section-padding bg-red-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Stay Updated
                    </h2>
                    <p className="text-xl text-red-100 mb-8">
                        Subscribe to our newsletter for the latest articles and blood donation updates
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
                        />
                        <button className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center">
                            <BiDonateBlood className="mr-2" />
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;