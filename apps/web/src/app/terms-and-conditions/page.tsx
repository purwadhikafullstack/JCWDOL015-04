"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TermsAndConditions = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the offset based on your navbar height
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-12 lg:pt-0 text-gray-800 relative">
      <div className="max-w-5xl mx-auto py-16 px-6 lg:flex">
        {/* Main Content */}
        <div className="lg:w-3/4">
          <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
          <div className="space-y-12">
            {/* Section 1 */}
            <section id="terms">
              <h2 className="text-2xl font-semibold mb-4">01. Terms of Service</h2>
              <p className="mb-4">
                Welcome to HireMe! By using our platform, you agree to the terms outlined below. These terms apply to all users, including candidates and employers.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate information during registration.</li>
                <li>Do not copy or misuse HireMe’s content.</li>
                <li>Ensure job postings meet legal standards.</li>
                <li>Keep your account information secure.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="limitations">
              <h2 className="text-2xl font-semibold mb-4">02. Limitations of Use</h2>
              <p className="mb-4">
                HireMe connects job seekers and employers but is not liable for any user-generated content. Use the platform responsibly.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>We are not responsible for hiring decisions.</li>
                <li>Avoid posting misleading or false information.</li>
                <li>Employers must comply with labor laws.</li>
                <li>Spamming or scraping data will lead to suspension.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="security">
              <h2 className="text-2xl font-semibold mb-4">03. Security and Privacy</h2>
              <p className="mb-4">
                We prioritize your data security but cannot guarantee complete protection. Please refer to our Privacy Policy for details.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>We use encryption to protect user data.</li>
                <li>Report any suspicious activity immediately.</li>
                <li>Third-party data breaches will be disclosed.</li>
                <li>Employers must handle candidate data respectfully.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="privacy-policy">
              <h2 className="text-2xl font-semibold mb-4">04. Privacy Policy</h2>
              <p className="mb-4">
                At HireMe, your privacy is important. We collect and manage your data to enhance your job search and hiring experience.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Data helps match candidates with jobs.</li>
                <li>Your data is never shared without consent, unless required by law.</li>
                <li>Candidates control profile visibility and data sharing.</li>
                <li>Employers agree to protect candidate data.</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Floating Table of Contents with Conditional Offset */}
        <div className="hidden lg:block lg:w-1/4 pl-8">
          <div className={`fixed w-1/4 transition-all duration-300 ${isScrolled ? 'top-24' : 'top-36'}`}>
            <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#terms" className="hover:text-gray-900">01. Terms of Service</a></li>
              <li><a href="#limitations" className="hover:text-gray-900">02. Limitations of Use</a></li>
              <li><a href="#security" className="hover:text-gray-900">03. Security and Privacy</a></li>
              <li><a href="#privacy-policy" className="hover:text-gray-900">04. Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
