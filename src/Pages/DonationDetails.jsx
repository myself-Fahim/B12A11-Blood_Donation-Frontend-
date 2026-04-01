import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loader from '../Component/Loader';
import { FiMapPin, FiClock, FiUser, FiMail, FiPhone, FiArrowLeft, FiHeart } from 'react-icons/fi';
import { MdBloodtype, MdLocationOn, MdSchedule } from 'react-icons/md';
import { BiDonateBlood } from 'react-icons/bi';

const DonationDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonationDetails = async () => {
            try {
                const response = await axiosSecure.get(`/request/id/${id}`);
                setDonation(response.data);
            } catch (err) {
                console.error('Error fetching donation details:', err);
                setError('Failed to load donation details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDonationDetails();
        }
    }, [id, axiosSecure]);

    const getUrgencyLevel = (donationDate) => {
        const today = new Date();
        const donation = new Date(donationDate);
        const diffTime = donation - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) return { level: 'critical', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', text: 'Critical' };
        if (diffDays <= 3) return { level: 'urgent', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', text: 'Urgent' };
        if (diffDays <= 7) return { level: 'moderate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', text: 'Moderate' };
        return { level: 'normal', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', text: 'Normal' };
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error || !donation) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {error || 'Donation request not found'}
                    </h2>
                    <Link
                        to="/donation"
                        className="btn-primary-custom inline-flex items-center"
                    >
                        <FiArrowLeft className="mr-2 w-4 h-4" />
                        Back to Donations
                    </Link>
                </div>
            </div>
        );
    }

    const urgency = getUrgencyLevel(donation.donationDate);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/donation"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    >
                        <FiArrowLeft className="mr-2 w-4 h-4" />
                        Back to All Requests
                    </Link>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header Card */}
                        <div className="card-base p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                        <span className="text-red-600 dark:text-red-400 font-bold text-xl">
                                            {donation.bloodGrp}
                                        </span>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Blood Needed for {donation.recipient}
                                        </h1>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Requested by {donation.requester}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgency.color}`}>
                                        {urgency.text}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                                        {donation.status || 'Pending'}
                                    </span>
                                </div>
                            </div>

                            {/* Key Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <MdBloodtype className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Blood Type Needed</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{donation.bloodGrp}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MdLocationOn className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {donation.recipientUpazila}, {donation.recipientDistrict}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <MdSchedule className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {donation.donationDate} at {donation.donationTime}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <FiUser className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{donation.recipient}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {donation.message && (
                            <div className="card-base p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Additional Information
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {donation.message}
                                </p>
                            </div>
                        )}

                        {/* Hospital Information */}
                        {donation.hospital && (
                            <div className="card-base p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Hospital Information
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <FiMapPin className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Hospital Name</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{donation.hospital}</p>
                                        </div>
                                    </div>
                                    {donation.hospitalAddress && (
                                        <div className="flex items-start space-x-3">
                                            <FiMapPin className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                                <p className="font-semibold text-gray-900 dark:text-white">{donation.hospitalAddress}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <div className="card-base p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <FiUser className="w-5 h-5 text-red-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Requester</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{donation.requester}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FiMail className="w-5 h-5 text-red-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <a
                                            href={`mailto:${donation.requesterEmail}`}
                                            className="font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                        >
                                            {donation.requesterEmail}
                                        </a>
                                    </div>
                                </div>
                                {donation.phone && (
                                    <div className="flex items-center space-x-3">
                                        <FiPhone className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                            <a
                                                href={`tel:${donation.phone}`}
                                                className="font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                            >
                                                {donation.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="card-base p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Take Action
                            </h2>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${donation.requesterEmail}?subject=Blood Donation - ${donation.bloodGrp} for ${donation.recipient}&body=Hi ${donation.requester},%0D%0A%0D%0AI am interested in donating blood for ${donation.recipient}. Please let me know the next steps.%0D%0A%0D%0AThank you.`}
                                    className="btn-primary-custom w-full text-center inline-flex items-center justify-center"
                                >
                                    <FiMail className="mr-2 w-4 h-4" />
                                    Contact via Email
                                </a>
                                {donation.phone && (
                                    <a
                                        href={`tel:${donation.phone}`}
                                        className="btn-secondary-custom w-full text-center inline-flex items-center justify-center"
                                    >
                                        <FiPhone className="mr-2 w-4 h-4" />
                                        Call Now
                                    </a>
                                )}
                                <Link
                                    to="/register"
                                    className="w-full text-center inline-flex items-center justify-center px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                                >
                                    <BiDonateBlood className="mr-2 w-4 h-4" />
                                    Become a Donor
                                </Link>
                            </div>
                        </div>

                        {/* Emergency Notice */}
                        {urgency.level === 'critical' && (
                            <div className="card-base p-6 border-l-4 border-red-500">
                                <div className="flex items-center space-x-2 mb-2">
                                    <FiHeart className="w-5 h-5 text-red-500" />
                                    <h3 className="font-semibold text-red-700 dark:text-red-300">
                                        Critical Emergency
                                    </h3>
                                </div>
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    This is an urgent blood request. Immediate action is needed to save a life.
                                </p>
                            </div>
                        )}

                        {/* Share */}
                        <div className="card-base p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Share This Request
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Help spread the word to find more donors
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: `Blood Donation Request - ${donation.bloodGrp}`,
                                                text: `${donation.recipient} needs ${donation.bloodGrp} blood. Please help save a life!`,
                                                url: window.location.href
                                            });
                                        }
                                    }}
                                    className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Share
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                    className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationDetails;