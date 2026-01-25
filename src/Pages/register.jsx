import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';
import { Link, useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiMapPin, FiUpload } from 'react-icons/fi';
import { MdBloodtype } from 'react-icons/md';
import { BiDonateBlood } from 'react-icons/bi';
import axios from 'axios';
import AuthContext from '../AuthProvider/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const { user, setUser, district, upazila } = useContext(AuthContext);
    const navigator = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bloodGroup: '',
        district: '',
        upazila: '',
        photo: null
    });

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase and lowercase letters with minimum 6 characters';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        if (!formData.bloodGroup) {
            newErrors.bloodGroup = 'Blood group is required';
        }
        
        if (!formData.district) {
            newErrors.district = 'District is required';
        }
        
        if (!formData.upazila) {
            newErrors.upazila = 'Upazila is required';
        }
        
        if (!formData.photo) {
            newErrors.photo = 'Profile photo is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'photo') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            // Upload image to imgbb
            const imageFormData = new FormData();
            imageFormData.append('image', formData.photo);
            
            const imageRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=38b4eb287c57a9b82557d99bf3afdf9d`,
                imageFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (!imageRes.data.success) {
                throw new Error('Failed to upload image');
            }

            const photoUrl = imageRes.data.data.url;
            
            // Create user with Firebase
            const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            
            // Update profile
            await updateProfile(result.user, {
                displayName: formData.name,
                photoURL: photoUrl
            });

            setUser(result.user);

            // Save user data to database
            const userData = {
                name: formData.name,
                email: formData.email,
                photoUrl,
                upazila: formData.upazila,
                district: formData.district,
                status: "active",
                group: formData.bloodGroup,
                role: "donor"
            };

            await axios.post('https://blood-donation-rho-one.vercel.app/users', userData);
            
            toast.success('Registration successful! Welcome to BloodConnect!');
            navigator('/');
            
        } catch (error) {
            console.error('Registration error:', error);
            if (error.code === 'auth/email-already-in-use') {
                setErrors({ email: 'This email is already registered' });
            } else {
                toast.error(error.message || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-full">
                            <BiDonateBlood className="text-white text-2xl" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Join as a Blood Donor
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Create your account and start saving lives
                    </p>
                </div>

                {/* Form */}
                <div className="card-base p-8">
                    <form onSubmit={handleCreateUser} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="form-label">Full Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={`form-input pl-10 ${errors.name ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {errors.name && <p className="form-error">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="form-label">Email Address</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {errors.email && <p className="form-error">{errors.email}</p>}
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="form-label">Profile Photo</label>
                            <div className="relative">
                                <FiUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className={`form-input pl-10 ${errors.photo ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {errors.photo && <p className="form-error">{errors.photo}</p>}
                        </div>

                        {/* Blood Group and Location Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Blood Group */}
                            <div>
                                <label className="form-label">Blood Group</label>
                                <div className="relative">
                                    <MdBloodtype className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleInputChange}
                                        className={`form-input pl-10 ${errors.bloodGroup ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">Select Blood Group</option>
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
                                {errors.bloodGroup && <p className="form-error">{errors.bloodGroup}</p>}
                            </div>

                            {/* District */}
                            <div>
                                <label className="form-label">District</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className={`form-input pl-10 ${errors.district ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">Select District</option>
                                        {district.map(dist => (
                                            <option key={dist.id} value={`${dist.name} (${dist.bn_name})`}>
                                                {dist.name} ({dist.bn_name})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.district && <p className="form-error">{errors.district}</p>}
                            </div>

                            {/* Upazila */}
                            <div>
                                <label className="form-label">Upazila</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        name="upazila"
                                        value={formData.upazila}
                                        onChange={handleInputChange}
                                        className={`form-input pl-10 ${errors.upazila ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">Select Upazila</option>
                                        {upazila.map(up => (
                                            <option key={up.id} value={`${up.name} (${up.bn_name})`}>
                                                {up.name} ({up.bn_name})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.upazila && <p className="form-error">{errors.upazila}</p>}
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div>
                                <label className="form-label">Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Create password"
                                        className={`form-input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowPass}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPass ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="form-error">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="form-label">Confirm Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm password"
                                        className={`form-input pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowPass}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPass ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary-custom w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="spinner w-5 h-5 mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        By creating an account, you agree to our{' '}
                        <Link to="/terms" className="text-red-600 dark:text-red-400 hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-red-600 dark:text-red-400 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;