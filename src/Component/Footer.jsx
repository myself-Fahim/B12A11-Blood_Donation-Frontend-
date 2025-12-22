import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer class="bg-red-950 text-red-50">
                <div class="mx-auto max-w-6xl px-4 py-12">
                    <div class="grid gap-10 md:grid-cols-4">
                      
                        <div class="md:col-span-1">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 font-bold">
                                    BD
                                </span>
                                <div>
                                    <p class="text-lg font-semibold leading-tight">Blood Donation</p>
                                    <p class="text-xs text-red-200">Give blood. Save lives.</p>
                                </div>
                            </div>
                            <p class="mt-4 text-sm text-red-200">
                                Find donors, book appointments, and learn how you can help your community.
                            </p>
                        </div>

                     
                        <div>
                            <h3 class="text-sm font-semibold text-white">Useful Links</h3>
                            <ul class="mt-4 space-y-2 text-sm">
                                <li><a class="text-red-200 hover:text-white" href="#donate">Donate Blood</a></li>
                                <li><a class="text-red-200 hover:text-white" href="#request">Request Blood</a></li>
                                <li><a class="text-red-200 hover:text-white" href="#find">Find Donors</a></li>
                                <li><a class="text-red-200 hover:text-white" href="#contact">Contact Us</a></li>
                            </ul>
                        </div>

                        
                        <div>
                            <h3 class="text-sm font-semibold text-white">Learn</h3>
                            <ul class="mt-4 space-y-2 text-sm">
                                <li><a class="text-red-200 hover:text-white" href="#eligibility">Eligibility & Requirements</a></li>
                                <li><a class="text-red-200 hover:text-white" href="#process">Donation Process</a></li>
                                <li><a class="text-red-200 hover:text-white" href="#faq">FAQ</a></li>
                                <li><a class="text-red-200 hover:text-white" href="#tips">Health & Safety Tips</a></li>
                            </ul>
                        </div>

                      
                        <div>
                            <h3 class="text-sm font-semibold text-white">Contact</h3>
                            <ul class="mt-4 space-y-3 text-sm text-red-200">
                                <li class="flex items-start gap-2">
                                    <span class="mt-0.5">📍</span>
                                    <span>Dhaka, Bangladesh</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="mt-0.5">📞</span>
                                    <a class="hover:text-white" href="tel:+8801000000000">+880 10-0000-0000</a>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="mt-0.5">✉️</span>
                                    <a class="hover:text-white" href="mailto:hello@blooddonation.com">hello@blooddonation.com</a>
                                </li>
                            </ul>

                         
                            <a
                                href="#donate"
                                class="mt-5 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                            >
                                Become a Donor
                            </a>
                        </div>
                    </div>

                    <div class="mt-10 border-t border-red-900/60 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <p class="text-xs text-red-200">
                            © <span id="year"></span> Blood Donation. All rights reserved.
                        </p>

                        <div class="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                            <a class="text-red-200 hover:text-white" href="#privacy">Privacy Policy</a>
                            <a class="text-red-200 hover:text-white" href="#terms">Terms of Service</a>
                            <a class="text-red-200 hover:text-white" href="#cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>

                <script>
                    document.getElementById("year").textContent = new Date().getFullYear();
                </script>
            </footer>


        </div>
    );
};

export default Footer;