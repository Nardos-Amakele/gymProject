import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="bg-black py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto bg-[#131313] shadow-lg rounded-lg p-8 ">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Terms and Conditions</h1>

          <div className="space-y-8 text-white leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p>
                Welcome to our website. These Terms and Conditions govern your use of our website, including all
                information, tools, and services available from this site. By accessing or using any part of the site, you
                agree to be bound by these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of our
                company or its content suppliers and is protected by intellectual property laws. Unauthorized use of any
                content is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
              <p>
                By using this site, you agree not to:
                <ul className="list-disc ml-6 mt-2">
                  <li>Use the website in any manner that could harm, disable, overburden, or impair it.</li>
                  <li>Interfere with the security or restrict access to the website.</li>
                  <li>Engage in any unlawful activity while using the site.</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <p>
                We do not guarantee that the website will be error-free or that access to the website will be uninterrupted.
                Under no circumstances shall we be liable for any damages arising from your use of, or inability to use, the
                site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to update or modify these Terms and Conditions at any time without prior notice. It is
                your responsibility to review this page periodically for changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of [Your Country or
                State]. Any disputes relating to these terms shall be subject to the jurisdiction of the courts of [Your
                Country or State].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at [Your Contact Email or
                Address].
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
