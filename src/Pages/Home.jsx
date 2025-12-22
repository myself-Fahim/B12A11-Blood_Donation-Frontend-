import React from 'react';
import { Link } from 'react-router';
import Footer from '../Component/Footer';

const Home = () => {
    return (
        <div>
            <div className='shadow-2xl rounded-[15px] flex items-center justify-center mt-15 mx-5 lg:mx-50 h-[400px] '>
                <div>
                    <h1 className='font-bold lg:text-3xl mb-10'>Your Blood Can Save a Life Today</h1>
                    <div className=' w-fit mx-auto'>
                        <Link to='/register' className='btn mr-5 bg-red-800 text-white font-bold'>Join As a Donor</Link>
                        <Link to='/search' className='btn bg-red-800 text-white font-bold'>Search Donor</Link>
                    </div>
                </div>
            </div>


            <div className='h-[400px] max-w-[1200px] mt-20 mx-auto mb-10'>
                <img className='h-full w-full ' src="https://media.istockphoto.com/id/1224861391/vector/abstract-giving-hand-low-poly-style-design.jpg?s=612x612&w=0&k=20&c=ZNvmPJ0VF06xa0XpBjqkIKlcblZDOXIBYrTRyzzPvAg=" />
            </div>


            <div className='mb-10'>
                <section id="contact" class="mx-auto max-w-5xl px-4 py-12">
                    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
                        <div class="mb-6">
                            <h2 class="text-2xl font-semibold text-gray-900">Contact Us</h2>
                            <p class="mt-2 text-sm text-gray-600">
                                Send us a message and we’ll get back to you soon.
                            </p>
                        </div>

                        <form class="grid gap-4 md:grid-cols-2" >
                            <div class="md:col-span-1">
                                <label class="mb-1 block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                                />
                            </div>

                            <div class="md:col-span-1">
                                <label class="mb-1 block text-sm font-medium text-gray-700">Number</label>
                                <input
                                    type="number"
                                    name="number"
                                    placeholder="Your Number"
                                    required
                                    class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                                />
                            </div>

        

                            <div class="md:col-span-2 flex items-center gap-3">
                                <button
                                    class="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                                >
                                    Send Message
                                </button>
                                <span class="text-xs text-gray-500">We typically reply within 24–48 hours.</span>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

            <Footer></Footer>


        </div>
    );
};

export default Home;