'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import NeonLine from "./NeonLine";

// Define the Product type
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string | null;
}

const Shop = () => {
  const t = useTranslations("home_Page.shopSection");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/inventory/");
        const data = await response.json();
        console.log("Fetched data:", data); // Log the response
  
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data); // Set fetched products
        } else {
          console.error("Invalid data structure", data);
          throw new Error("Invalid data structure from API");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  

  return (
    <section
      className="bg-black text-white pt-40 py-16 px-4 sm:px-8 md:px-16 lg:px-[9rem] font-jost"
      id="shop"
    >
      <div className="container mx-auto">
        <h2 className="text-6xl font-bold mb-4 text-[#2596BE]">
          {t("title")}
        </h2>
        <p className="mb-12 text-gray-300 max-w-sm text-sm font-thin">
          {t("subtext")}
        </p>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative transition-transform transform hover:scale-105"
            >
              <Image
                src={product.imageUrl || "/placeholder.png"} // Use a placeholder image if imageUrl is null
                alt={product.name}
                width={400}
                height={300}
                className="rounded-lg"
              />
              <div className="absolute bottom-4 left-4 flex justify-between items-center w-[95%]">
                <div className="flex flex-col">
                  <p className="text-white text-lg font-bold">{product.name}</p>
                  <p className="text-gray-400">${product.price.toFixed(2)}</p>
                </div>
                <button className="button-custom text-sm text-[#2596BE] border border-solid border-[#2596BE] rounded-md px-3 py-1">
                  {t("ctaButton")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NeonLine />
    </section>
  );
};

export default Shop;
