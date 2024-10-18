"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { routing } from "@/src/i18n/routing";

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
    <div>
      {locales?.map((availableLocale) => (
        <button
          key={availableLocale}
          onClick={() => changeLocale(availableLocale)}
          disabled={availableLocale === currentLocale}
          style={{
            marginRight: "8px",
            fontWeight: availableLocale === currentLocale ? "bold" : "normal",
          }}
        >
          {availableLocale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
