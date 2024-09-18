import Image from 'next/image';
import aboutUsHero from '../../assets/images/aboutus_hero.jpg';

const AboutUsPage: React.FC = () => {
    return (
        <div className="bg-black text-white space-y-6">
            {/* Hero Section with Parallax */}
            <div className="relative w-full h-[80vh] bg-fixed bg-center bg-cover"
                style={{ backgroundImage: `url(${aboutUsHero.src})`, backgroundAttachment: 'fixed' }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-6xl font-bold text-white">About Us</h1>
                </div>
            </div>

            {/* Section 1 - About Robi Fitness */}
            <section className="px-[9rem] py-20">
                <section className="flex flex-col md:flex-row items-center py-12 gap-10">
                    <div className="md:w-1/2 px-6">
                    <div className="relative">
                        <h2 className="text-[10rem] font-bold text-gray-800 tracking-tight">01</h2>
                        <h2 className="absolute top-1/2 left-0 text-3xl font-semibold mb-6 text-[#2596BE] transform -translate-y-1/2">
                             About Robi Fitness
                        </h2>
                    </div>

                        <p className="text-lg leading-relaxed text-gray-400">
                            Robi Fitness is dedicated to fostering a supportive environment where individuals of all fitness levels can thrive.
                            Our gym offers state-of-the-art equipment and expert trainers who are passionate about helping you achieve your fitness goals.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 text-gray-400">
                            From personal training to group classes, we are here to motivate, inspire, and guide you on your fitness journey.
                        </p>
                    </div>

                    {/* Neon Line */}
                    <div className="h-60 w-1 bg-[#2596BE] neon-glow mx-10"></div>

                    <div className="md:w-1/2 relative h-60">
                        <Image
                            src={aboutUsHero}
                            alt="About Robi Fitness"
                            objectFit="cover"
                            className="rounded-lg"
                            layout="fill"
                        />
                    </div>
                </section>

                {/* Section 2 - Our Philosophy */}
                <section className="flex flex-col md:flex-row items-center gap-10 pt-40">
                    <div className="md:w-1/2 relative h-60">
                        <Image
                            src={aboutUsHero}
                            alt="Our Philosophy"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>

                    {/* Neon Line */}
                    <div className="h-60 w-1 bg-[#2596BE] neon-glow mx-10"></div>

                    <div className="md:w-1/2 px-6">
                        <div className='relative'>
                        <h2 className="text-[10rem] font-bold text-gray-800 tracking-tight">02</h2>
                        <h2 className="text-3xl font-semibold mb-6 text-[#2596BE] absolute top-1/2 left-0 transform -translate-y-1/2 ">Our Philosophy</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-400">
                            At Robi Fitness, we believe in a holistic approach to health and wellness.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 text-gray-400">
                            Fitness isn't just about physical strength — it's about building mental resilience, confidence, and overall well-being.
                        </p>
                    </div>
                </section>

                {/* Section 3 - Our Facilities & Trainers */}
                <section className="flex flex-col md:flex-row items-center py-40 gap-10">
                    <div className="md:w-1/2 px-6">
                        <div className='relative'>
                        <h2 className="text-[10rem] font-bold text-gray-800 tracking-tight">03</h2>
                        <h2 className="text-3xl font-semibold mb-6 text-[#2596BE] absolute top-1/2 left-0 transform -translate-y-1/2 ">Our Facilities & Trainers</h2>
                        </div> 
                        <p className="text-lg leading-relaxed text-gray-400">
                            Robi Fitness is equipped with the latest fitness technology and an inspiring space designed for every fitness level.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 text-gray-400">
                            Our experienced trainers are here to support your growth, offering personalized guidance to help you maximize your potential.
                        </p>
                    </div>

                    {/* Neon Line */}
                    <div className="h-60 w-1 bg-[#2596BE] neon-glow mx-10"></div>

                    <div className="md:w-1/2 relative h-60">
                        <Image
                            src={aboutUsHero}
                            alt="Our Facilities"
                            objectFit="cover"
                            className="rounded-lg"
                            layout="fill"
                        />
                    </div>
                </section>

                {/* Join Us Section */}
                <section className="py-16 text-center">
                    <h2 className="text-3xl font-semibold mb-6 text-[#2596BE]">Ready to Transform Your Life?</h2>
                    <p className="text-lg mb-8 text-gray-400">
                        Step into Robi Fitness today and discover a new way to work out. Together, we’ll achieve your fitness goals and empower you to live your best life.
                    </p>
                    <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300">
                        Join Robi Fitness Now
                    </button>
                </section>
            </section>
        </div>
    );
}

export default AboutUsPage;
