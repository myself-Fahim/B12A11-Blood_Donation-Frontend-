import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import Footer from '../Component/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 2000);
    };

    const contactInfo = [
        {
            icon: FiPhone,
            title: "Phone",
            details: ["+880 1700-000000", "+880 1800-000000"],
            description: "Available 24/7 for emergency blood requests"
        },
        {
            icon: FiMail,
            title: "Email",
            details: ["info@bloodconnect.com", "emergency@bloodconnect.com"],
            description: "We respond within 2-4 hours"
        },
        {
            icon: FiMapPin,
            title: "Address",
            details: ["123 Medical Center Road", "Dhaka 1000, Bangladesh"],
            description: "Visit our main office"
        },
        {
            icon: FiClock,
            title: "Office Hours",
            details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
            description: "Emergency support available 24/7"
        }
    ];

    const officeLocations = [
        {
            city: "Dhaka",
            address: "123 Medical Center Road, Dhaka 1000",
            phone: "+880 1700-000000",
            email: "dhaka@bloodconnect.com"
        },
        {
            city: "Chittagong",
            address: "456 Hospital Street, Chittagong 4000",
            phone: "+880 1700-000001",
            email: "chittagong@bloodconnect.com"
        },
        {
            city: "Sylhet",
            address: "789 Health Avenue, Sylhet 3100",
            phone: "+880 1700-000002",
            email: "sylhet@bloodconnect.com"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-red-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Get in touch with us for any questions, support, or emergency blood requests
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            We're here to help you save lives
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <div key={index} className="card-base p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                                        <IconComponent className="w-8 h-8 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {info.title}
                                    </h3>
                                    <div className="space-y-1 mb-3">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-900 dark:text-white font-medium">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {info.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section-padding bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="card-base p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Send Us a Message
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Fill out the form below and we'll get back to you as soon as possible
                            </p>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-green-800 dark:text-green-200 font-medium">
                                    Thank you for your message! We'll get back to you within 24-48 hours.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your full name"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your.email@example.com"
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+880 1700-000000"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Subject *</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="emergency">Emergency Blood Request</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="6"
                                    placeholder="Please describe your inquiry in detail..."
                                    required
                                    className="form-input"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    * Required fields
                                </p>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary-custom inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="spinner w-4 h-4 mr-2"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="mr-2 w-4 h-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Office Locations */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Offices
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Visit us at any of our locations across Bangladesh
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {officeLocations.map((office, index) => (
                            <div key={index} className="card-base p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {office.city} Office
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <FiMapPin className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {office.address}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <FiPhone className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {office.phone}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <FiMail className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {office.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="section-padding bg-red-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Emergency Blood Request?
                    </h2>
                    <p className="text-xl text-red-100 mb-8">
                        For urgent blood requirements, contact our 24/7 emergency hotline
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+8801700000000"
                            className="bg-white text-red-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
                        >
                            <FiPhone className="mr-2" />
                            Call Emergency Hotline
                        </a>
                        <a
                            href="mailto:emergency@bloodconnect.com"
                            className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200 inline-flex items-center justify-center"
                        >
                            <FiMail className="mr-2" />
                            Email Emergency Team
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;