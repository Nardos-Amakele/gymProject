"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import React from "react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locales = routing.locales;

  const currentLocale = pathname.split("/")[1] || routing.defaultLocale;

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    const pathnameWithoutLocale = segments.slice(2).join("/");

    const query = searchParams.toString();
    router.push(
      `/${newLocale}/${pathnameWithoutLocale}${query ? `?${query}` : ""}`
    );
  };

  return (
    <div className="flex items-center space-x-1 text-sm font-semibold mr-4">
      {locales?.map((availableLocale, index) => (
        <React.Fragment key={availableLocale}>
          <button
            onClick={() => changeLocale(availableLocale)}
            disabled={availableLocale === currentLocale}
            className={`relative px-2 transition-colors duration-300 ${
              availableLocale === currentLocale
                ? "text-customBlue after:scale-100"
                : "text-white hover:text-blue-400 after:scale-0"
            }`}
          >
            {availableLocale.toUpperCase()}
            <span
              className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-blue-600 origin-center scale-0 after:transition-transform duration-300 ease-in-out"
            ></span>
          </button>
          {/* Add a slash between buttons */}
          {index < locales.length - 1 && (
            <span
              className="text-gray-400 font-light animate-fade-in-out duration-700"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
