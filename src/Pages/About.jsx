import React from 'react';
import { FiHeart, FiUsers, FiTarget, FiAward } from 'react-icons/fi';
import { BiDonateBlood } from 'react-icons/bi';
import Footer from '../Component/Footer';

const About = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Dr. Sarah Ahmed",
            role: "Medical Director",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Leading hematologist with 15+ years of experience in blood banking and transfusion medicine."
        },
        {
            id: 2,
            name: "Mohammad Rahman",
            role: "Operations Manager",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Expert in healthcare operations and community outreach programs for blood donation drives."
        },
        {
            id: 3,
            name: "Fatima Khan",
            role: "Community Coordinator",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Passionate advocate for blood donation awareness and volunteer coordination."
        }
    ];

    const milestones = [
        { year: "2020", event: "BloodConnect Founded", description: "Started with a vision to connect blood donors and recipients" },
        { year: "2021", event: "1,000 Donors Registered", description: "Reached our first major milestone of registered donors" },
        { year: "2022", event: "10,000 Lives Saved", description: "Facilitated blood donations that saved thousands of lives" },
        { year: "2023", event: "National Expansion", description: "Expanded operations to cover all major cities in Bangladesh" },
        { year: "2024", event: "Mobile App Launch", description: "Launched mobile application for easier access and notifications" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-red-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About BloodConnect</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Connecting hearts, saving lives - one donation at a time
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                To create a seamless, accessible platform that connects blood donors with those in need, 
                                ensuring that no life is lost due to blood shortage. We believe that every drop of blood 
                                donated is a gift of life.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full">
                                    <FiHeart className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Compassionate Care</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Every interaction is driven by empathy and care</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                alt="Blood donation"
                                className="rounded-lg shadow-lg w-full h-80 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            The principles that guide everything we do
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card-base p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiHeart className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Compassion</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                We approach every situation with empathy and understanding
                            </p>
                        </div>
                        
                        <div className="card-base p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiUsers className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Community</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Building strong connections between donors and recipients
                            </p>
                        </div>
                        
                        <div className="card-base p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiTarget className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Excellence</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Striving for the highest standards in everything we do
                            </p>
                        </div>
                        
                        <div className="card-base p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                <FiAward className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Integrity</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Maintaining transparency and trust in all our operations
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Dedicated professionals working to save lives
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="card-base p-6 text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-red-600 dark:text-red-400 font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Journey
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Key milestones in our mission to save lives
                        </p>
                    </div>
                    
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full font-bold">
                                        {milestone.year}
                                    </div>
                                </div>
                                <div className="card-base p-6 flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {milestone.event}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="section-padding bg-red-600 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-xl text-red-100">
                            Making a difference, one donation at a time
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">25,000+</div>
                            <div className="text-red-100">Registered Donors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">50,000+</div>
                            <div className="text-red-100">Lives Saved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">100+</div>
                            <div className="text-red-100">Partner Hospitals</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-red-100">Emergency Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Join Our Mission
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Be part of a community that saves lives every day
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary-custom inline-flex items-center justify-center">
                            <BiDonateBlood className="mr-2 text-xl" />
                            Become a Donor
                        </button>
                        <button className="btn-secondary-custom inline-flex items-center justify-center">
                            <FiUsers className="mr-2" />
                            Volunteer With Us
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;