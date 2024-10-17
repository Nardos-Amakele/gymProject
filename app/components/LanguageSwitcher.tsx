// components/LanguageSwitcher.tsx

'use client'; // Ensure this component runs on the client side

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';

const LanguageSwitcher: React.FC = () => {
    const { lang } = useTranslation(); // Get current language
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    

    const switchLanguage = (newLang: string) => {
        const queryParams = searchParams ? `?${searchParams.toString()}` : '';
        router.push(`/${newLang}${pathname}${queryParams}`);
    };

    return (
        <div className="fixed top-4 right-4 flex space-x-4 bg-white text-black p-2 rounded-lg shadow-lg border border-gray-400 z-50">
            <button
                className={`py-2 px-4 border rounded ${lang === 'en' ? 'font-bold text-blue-600 bg-gray-200' : 'text-gray-800 bg-white'}`}
                onClick={() => switchLanguage('en')}
            >
                English
            </button>
            <button
                className={`py-2 px-4 border rounded ${lang === 'am' ? 'font-bold text-blue-600 bg-gray-200' : 'text-gray-800 bg-white'}`}
                onClick={() => switchLanguage('am')}
            >
                አማርኛ
            </button>

        </div>
    );
};

export default LanguageSwitcher;
