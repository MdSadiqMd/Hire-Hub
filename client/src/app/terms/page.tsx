import React from 'react';
import Link from 'next/link';

const TermsAndConditions: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen px-8 py-8 rounded-2xl">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-4 dark:text-white">Terms and Conditions</h1>

                <p className="mb-4 dark:text-gray-300">
                    These terms and conditions outline the rules and regulations for the use of Hire Hub's Website.
                </p>

                <h2 className="text-2xl font-bold mb-2 dark:text-white">Introduction</h2>

                <p className="mb-4 dark:text-gray-300">
                    By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Hire Hub's website if you do not accept all of the terms and conditions stated on this page.
                </p>

                <h2 className="text-2xl font-bold mb-2 dark:text-white">License</h2>

                <p className="mb-4 dark:text-gray-300">
                    Unless otherwise stated, Hire Hub and/or its licensors own the intellectual property rights for all material on Hire Hub. All intellectual property rights are reserved. You may view and/or print pages from https://www.hirehub.com for your own personal use subject to restrictions set in these terms and conditions.
                </p>

                <ul className="list-disc list-inside mb-4 dark:text-gray-300">
                    <li>Republish material from https://hire-hub-lemon.vercel.app</li>
                    <li>Sell, rent or sub-license material from https://hire-hub-lemon.vercel.app</li>
                    <li>Reproduce, duplicate or copy material from https://hire-hub-lemon.vercel.app</li>
                    <li>Redistribute content from Hire Hub (unless content is specifically made for redistribution).</li>
                </ul>

                <h2 className="text-2xl font-bold mb-2 dark:text-white">User Comments</h2>

                <p className="mb-4 dark:text-gray-300">
                    Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data ('Comments') in areas of the website. Hire Hub does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of Hire Hub, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws Hire Hub shall not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                </p>

                <h2 className="text-2xl font-bold mb-2 dark:text-white">Hyperlinking to our Content</h2>

                <p className="mb-4 dark:text-gray-300">
                    The following organizations may link to our Web site without prior written approval:
                </p>

                <ul className="list-disc list-inside mb-4 dark:text-gray-300">
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>Online directory distributors when they list us in the directory may link to our Web site in the same manner as they hyperlink to the Web sites of other listed businesses; and</li>
                    <li>Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-2 dark:text-white">Iframes</h2>

                <p className="mb-4 dark:text-gray-300">
                    Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site.
                </p>

                <h2 className="text-2xl font-bold mb-2 dark:text-white">Content Liability</h2>

                <p className="mb-4 dark:text-gray-300">
                    We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                </p>

                <p className="mb-4 dark:text-gray-300">
                    These terms and conditions are subject to change without notice.
                </p>
                <div className="flex justify-end">
                    <Link
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900"
                        href="/signup"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
