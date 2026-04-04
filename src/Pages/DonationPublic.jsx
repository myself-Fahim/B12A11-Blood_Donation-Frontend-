import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthContext from '../AuthProvider/AuthContext';
import Loader from '../Component/Loader';
import { FiMapPin, FiClock, FiUser, FiMail, FiPhone, FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';
import { MdBloodtype, MdLocationOn, MdSchedule } from 'react-icons/md';
import { BiDonateBlood } from 'react-icons/bi';
import { Link } from 'react-router';

const DonationPublic = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [allRequests, setAllRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
   

    console.log(user)
    
    // Filter states
    const [filters, setFilters] = useState({
        bloodGroup: '',
        district: '',
        urgency: ''
    });
    
    // Sort state
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        axiosSecure('/request')
            .then(res => {
                // Only show pending requests
                const pendingRequests = res.data.filter(request => request.status === 'pending');
                setAllRequests(pendingRequests);
                setFilteredRequests(pendingRequests);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [axiosSecure]);

    // Apply filters and sorting
    useEffect(() => {
        let filtered = [...allRequests];

        // Apply filters
        if (filters.bloodGroup) {
            filtered = filtered.filter(item => item.bloodGrp === filters.bloodGroup);
        }
        if (filters.district) {
            filtered = filtered.filter(item => 
                item.recipientDistrict.toLowerCase().includes(filters.district.toLowerCase())
            );
        }
        if (filters.urgency) {
            const today = new Date();
            const urgentDate = new Date();
            urgentDate.setDate(today.getDate() + 3); // Next 3 days considered urgent
            
            if (filters.urgency === 'urgent') {
                filtered = filtered.filter(item => {
                    const donationDate = new Date(item.donationDate);
                    return donationDate <= urgentDate;
                });
            }
        }

        // Apply sorting
        switch (sortBy) {
            case 'urgent':
                filtered.sort((a, b) => new Date(a.donationDate) - new Date(b.donationDate));
                break;
            case 'bloodType':
                filtered.sort((a, b) => a.bloodGrp.localeCompare(b.bloodGrp));
                break;
            default:
                break;
        }

        setFilteredRequests(filtered);
        setCurrentPage(1);
    }, [allRequests, filters, sortBy]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    console.log(filteredRequests)

    const clearFilters = () => {
        setFilters({
            bloodGroup: '',
            district: '',
            urgency: ''
        });
        setSortBy('newest');
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredRequests.slice(startIndex, endIndex);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

   
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="bg-red-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Blood Donation Requests</h1>
                    <p className="text-xl text-red-100 mb-6">
                        Help save lives by responding to urgent blood donation requests
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
                        >
                            <BiDonateBlood className="mr-2" />
                            Become a Donor
                        </Link>
                        <Link
                            to="/search"
                            className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200"
                        >
                            Search Donors
                        </Link>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="card-base p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                                <FiFilter className="mr-2" />
                                Filter Requests
                            </h2>
                            <button
                                onClick={clearFilters}
                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Blood Group Filter */}
                            <div>
                                <label className="form-label">Blood Group</label>
                                <select
                                    value={filters.bloodGroup}
                                    onChange={(e) => handleFilterChange('bloodGroup', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">All Blood Groups</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            {/* District Filter */}
                            <div>
                                <label className="form-label">District</label>
                                <input
                                    type="text"
                                    placeholder="Enter district name"
                                    value={filters.district}
                                    onChange={(e) => handleFilterChange('district', e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="form-label">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="form-input"
                                >
                                    <option >All Request</option>
                                    <option value="urgent">Newest First</option>
                                    <option value="bloodType">Blood Type</option>
                                  
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-gray-600 dark:text-gray-400">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredRequests.length)} of {filteredRequests.length} requests
                        </div>
                    </div>

                    {/* Requests Grid */}
                    {currentItems.length === 0 ? (
                        <div className="text-center py-16">
                            <BiDonateBlood className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No Requests Found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Try adjusting your filters to see more blood donation requests.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="btn-primary-custom"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid-responsive">
                            {currentItems.map(request => {
                              
                                return (
                                    <div key={request._id} className="card-base p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-14 h-14 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                                    <span className="text-red-600 dark:text-red-400 font-bold text-lg">
                                                        {request.bloodGrp}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                                        {request.recipient}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Patient in need
                                                    </p>
                                                </div>
                                            </div>
                                           
                                        </div>

                                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                            <div className="flex items-center">
                                                <MdLocationOn className="w-4 h-4 mr-3 flex-shrink-0 text-red-500" />
                                                <span>{request.recipientUpazila}, {request.recipientDistrict}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MdSchedule className="w-4 h-4 mr-3 flex-shrink-0 text-red-500" />
                                                <span>{request.donationDate} at {request.donationTime}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiUser className="w-4 h-4 mr-3 flex-shrink-0 text-red-500" />
                                                <span>Requested by: {request.requester}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiMail className="w-4 h-4 mr-3 flex-shrink-0 text-red-500" />
                                                <span className="truncate">{request.requesterEmail}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                            <div className="flex flex-col sm:flex-row gap-2">
                                             
                                                <Link
                                                    to={`/donation-details/${request._id}`}
                                                    className="btn-primary-custom flex-1 text-center"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-2 mt-12">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <FiChevronLeft className="w-5 h-5" />
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                const isCurrentPage = page === currentPage;
                                const showPage = page === 1 || page === totalPages || 
                                               (page >= currentPage - 1 && page <= currentPage + 1);
                                
                                if (!showPage) {
                                    if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <span key={page} className="px-2">...</span>;
                                    }
                                    return null;
                                }
                                
                                return (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`px-4 py-2 rounded-md border ${
                                            isCurrentPage
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <FiChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DonationPublic;