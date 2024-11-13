import Image from "next/image";
import Link from "next/link";
import shopItem1 from "@/assets/images/shop_item2.png";
import shopItem2 from "@/assets/images/shop_item1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NeonLine from "./NeonLine";
import { useTranslations } from "next-intl"; 

const Shop = () => {
  const t = useTranslations("home_Page.shopSection"); 

  return (
    <section
      className="bg-black text-white pt-40 py-16 px-4 sm:px-8 md:px-16 lg:px-[9rem] font-jost"
      id="shop"
    >
      <div className="flex flex-col md:flex-row md:space-x-16">
        {/* First column */}
        <div className="flex flex-col justify-between mb-8 md:mb-0">
          <div className="container mx-auto">
            {/* Link the Shop header */}
            <Link href="/shop">
              <h2 className="text-6xl font-bold mb-4 text-[#2596BE]">
                {t("title")} {/* Use translated title */}
              </h2>
            </Link>
            <p className="mb-12 text-gray-300 max-w-sm text-sm font-thin">
              {t("subtext")} {/* Use translated subtext */}
            </p>
          </div>

          {/* Shop Item 1 */}
          <Link
            href="/shop"
            className="relative mt-6 transition-transform transform hover:scale-105 hover:border-2 hover:border-none"
          >
            <div>
              <Image
                src={shopItem1}
                alt={t("products.0.name")} 
                className="rounded-lg w-full md:w-[35rem] h-auto md:h-[245.59px]"
              />
              <div className="absolute bottom-4 left-4 flex justify-between items-center w-[95%]">
                <div className="flex items-baseline space-x-1">
                  <p className="text-white text-lg font-bold">
                    {t("products.0.price")}
                  </p>
                  <p className="font-thin text-sm text-white">{t("products.0.ctaButton")}</p> {/* Use translated CTA button */}
                </div>
                <span className="button-custom text-sm text-[#2596BE] border border-solid border-[#2596BE] rounded-md px-3 py-1">
                  {t("products.0.ctaButton")}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Second column */}
        <div className="flex flex-col justify-between">
          {/* Shop Item 2 */}
          <Link href="/shop">
            <div className="relative transition-transform transform hover:scale-105 hover:border-2 hover:border-none">
              <Image
                src={shopItem2}
                alt={t("products.1.name")} 
                className="rounded-tl-[6px] rounded-tr-[111px] rounded-br-[6px] rounded-bl-[6px] w-full md:w-[22rem]"
              />
              <div className="absolute bottom-4 left-4 flex space-x-4">
                <p className="text-red-500 line-through text-lg font-bold">
                  {t("products.1.originalPrice")} 
                </p>
                <p className="text-white text-lg font-bold">
                  {t("products.1.discountedPrice")} 
                </p>
              </div>
            </div>
          </Link>

          {/* New Arrival and Discount */}
          <div className="flex justify-between mt-4">
            <p className="text-2xl text-white">{t("products.1.badge")}</p> {/* Use translated badge */}
            <p className="text-sm text-gray-400 font-thin">
              {t("products.1.discountText")} {/* Use translated discount text */}
            </p>
          </div>
        </div>
      </div>

      <NeonLine />
    </section>
  );
};

export default Shop;
