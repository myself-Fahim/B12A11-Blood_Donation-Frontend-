import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthContext from '../AuthProvider/AuthContext';
import Loader from '../Component/Loader';
import { FiSearch, FiFilter, FiMapPin, FiClock, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdBloodtype } from 'react-icons/md';

const Search = () => {
    const axiosSecure = useAxiosSecure();
    const { upazila, district } = useContext(AuthContext);
    const [allUserData, setAllUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    
    // Filter states
    const [filters, setFilters] = useState({
        bloodGroup: '',
        recipientUpazila: '',
        recipientDistrict: '',
        status: '',
        dateRange: ''
    });
    
    // Sort state
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        axiosSecure('/request')
            .then(res => {
                setAllUserData(res.data);
                setFilteredData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    // Apply filters and sorting
    useEffect(() => {
        let filtered = [...allUserData];

        // Apply filters
        if (filters.bloodGroup) {
            filtered = filtered.filter(item => item.bloodGrp === filters.bloodGroup);
        }
        if (filters.recipientUpazila) {
            filtered = filtered.filter(item => item.recipientUpazila === filters.recipientUpazila);
        }
        if (filters.recipientDistrict) {
            filtered = filtered.filter(item => item.recipientDistrict === filters.recipientDistrict);
        }
        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status);
        }
        if (filters.dateRange) {
            const today = new Date();
            const filterDate = new Date();
            
            switch (filters.dateRange) {
                case 'today':
                    filterDate.setDate(today.getDate());
                    break;
                case 'week':
                    filterDate.setDate(today.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(today.getMonth() - 1);
                    break;
                default:
                    break;
            }
            
            if (filters.dateRange !== '') {
                filtered = filtered.filter(item => {
                    const itemDate = new Date(item.donationDate);
                    return itemDate >= filterDate;
                });
            }
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.donationDate) - new Date(b.donationDate));
                break;
            case 'bloodType':
                filtered.sort((a, b) => a.bloodGrp.localeCompare(b.bloodGrp));
                break;
            case 'location':
                filtered.sort((a, b) => a.recipientDistrict.localeCompare(b.recipientDistrict));
                break;
            default:
                break;
        }

        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [allUserData, filters, sortBy]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            bloodGroup: '',
            recipientUpazila: '',
            recipientDistrict: '',
            status: '',
            dateRange: ''
        });
        setSortBy('newest');
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="bg-red-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Blood Donors</h1>
                    <p className="text-xl text-red-100">
                        Search for blood donors in your area and connect with life-savers
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="section-padding bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="card-base p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                                <FiFilter className="mr-2" />
                                Search Filters
                            </h2>
                            <button
                                onClick={clearFilters}
                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                            >
                                Clear All Filters
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                                <select
                                    value={filters.recipientDistrict}
                                    onChange={(e) => handleFilterChange('recipientDistrict', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">All Districts</option>
                                    {district.map(dist => (
                                        <option key={dist.id} value={`${dist.name} (${dist.bn_name})`}>
                                            {dist.name} ({dist.bn_name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Upazila Filter */}
                            <div>
                                <label className="form-label">Upazila</label>
                                <select
                                    value={filters.recipientUpazila}
                                    onChange={(e) => handleFilterChange('recipientUpazila', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">All Upazilas</option>
                                    {upazila.map(up => (
                                        <option key={up.id} value={`${up.name} (${up.bn_name})`}>
                                            {up.name} ({up.bn_name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label className="form-label">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* Date Range Filter */}
                            <div>
                                <label className="form-label">Date Range</label>
                                <select
                                    value={filters.dateRange}
                                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sort and Results Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="text-gray-600 dark:text-gray-400">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} results
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="form-input py-2 text-sm"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="bloodType">Blood Type</option>
                                <option value="location">Location</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Grid */}
                    {currentItems.length === 0 ? (
                        <div className="text-center py-16">
                            <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No Results Found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Try adjusting your search filters to find more results.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="btn-primary-custom"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentItems.map(request => (
                                <div key={request._id} className="card-base p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                                <span className="text-red-600 dark:text-red-400 font-bold text-sm">
                                                    {request.bloodGrp}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {request.recipient}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Patient
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                            {request.status || 'Pending'}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        <div className="flex items-center">
                                            <FiUser className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">Requester: {request.requester}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">{request.recipientUpazila}, {request.recipientDistrict}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FiClock className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>{request.donationDate} at {request.donationTime}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MdBloodtype className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>Blood Type: {request.bloodGrp}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Contact: {request.requesterEmail}
                                            </div>
                                            <button className="btn-primary-custom text-sm px-4 py-2">
                                                Contact Donor
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default Search;