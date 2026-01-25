import React from 'react';
import { Link } from 'react-router';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { BiDonateBlood } from 'react-icons/bi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
                                <BiDonateBlood className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">BloodConnect</h3>
                                <p className="text-xs text-gray-400">Save Lives Together</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-6">
                            Connecting blood donors with those in need. Every donation saves lives and strengthens our community.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                                <FiFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                                <FiLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/donation" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Find Blood Requests
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Search Donors
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Become a Donor
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Blog & Resources
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#help" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Contact Info</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <FiMapPin className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                                <span>123 Medical Center Road<br />Dhaka 1000, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiPhone className="w-4 h-4 text-red-400 flex-shrink-0" />
                                <a href="tel:+8801700000000" className="hover:text-white transition-colors duration-200">
                                    +880 1700-000000
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiMail className="w-4 h-4 text-red-400 flex-shrink-0" />
                                <a href="mailto:info@bloodconnect.com" className="hover:text-white transition-colors duration-200">
                                    info@bloodconnect.com
                                </a>
                            </li>
                        </ul>

                        {/* Emergency Contact */}
                        <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                            <h4 className="text-sm font-semibold text-red-400 mb-2">Emergency Hotline</h4>
                            <a 
                                href="tel:+8801800000000" 
                                className="text-red-300 hover:text-red-200 font-medium transition-colors duration-200"
                            >
                                +880 1800-000000
                            </a>
                            <p className="text-xs text-gray-400 mt-1">Available 24/7</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {currentYear} BloodConnect. All rights reserved.
                        </p>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                                Terms of Service
                            </a>
                            <a href="#cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                                Cookie Policy
                            </a>
                            <a href="#accessibility" className="text-gray-400 hover:text-white transition-colors duration-200">
                                Accessibility
                            </a>
                        </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            Made with ❤️ for saving lives. Every drop counts.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;