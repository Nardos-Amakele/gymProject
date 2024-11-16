"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { services } from "../../../../assets/data/servicesData";
import Link from "next/link";
import bgImage from "../../assets/images/home_image.png";
import { useTranslations } from "next-intl";
import axios from 'axios';

interface Service {
  title: string;
  price: string;
  benefits: string[];
}

type ServiceCategory = string;

const Register = () => {
  const t = useTranslations("registration_page");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [services, setServices] = useState<Record<ServiceCategory, Service[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    dob: "",
    emergencyContact: "",
    gender: "",
    profileImage: null as File | null,
  });

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services/");
        const groupedServices = response.data.data.reduce((acc: any, service: any) => {
          if (!acc[service.category]) {
            acc[service.category] = [];
          }
          acc[service.category].push({
            title: service.name,
            price: service.price.toString(),
            benefits: JSON.parse(service.description), // Assuming `description` is a JSON string
          });
          return acc;
        }, {});
        setServices(groupedServices);

        // Set default category
        if (Object.keys(groupedServices).length > 0) {
          setSelectedCategory(Object.keys(groupedServices)[0]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") as ServiceCategory;
    const packageFromUrl = searchParams.get("package");

    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
    if (packageFromUrl) setSelectedPackages([packageFromUrl]);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackages((prevSelected) =>
      prevSelected.includes(packageName)
        ? prevSelected.filter((name) => name !== packageName)
        : [...prevSelected, packageName]
    );
  };

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (selectedPackages.length === 0) {
      setError("Please choose at least one package.");
      return;
    }

    if (!isTermsChecked) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    const totalPrice = selectedPackages.reduce(
      (total, packageName) =>
        total +
        parseFloat(
          services[selectedCategory]?.find((service) => service.title === packageName)?.price || "0"
        ),
      0
    );

    const newUser = {
      ...formData,
      selectedPackages,
      totalPrice,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/members", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setError(null);
        router.push("/admin");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || null);
      }
    }
  };
  return (
    <div className="bg-black ">
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col md:flex-row w-11/12 max-w-6xl shadow-lg rounded-lg overflow-hidden">
          {/* General Information Section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {t("heading")}
            </h2>
            <form className="space-y-4">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                type="text"
                className="text-gray-400 w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder={t("fields.full_name")}
              />
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}

                type="tel"
                className="text-gray-400 w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder={t("fields.phone_number")}
              />
              {/* <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
                type="email"
                className="text-gray-400 w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder={t("fields.email")}
              /> */}
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                type="text"
                className="text-gray-400 w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder={t("fields.address")}
              />
              <input
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
                type="date"
                className="text-gray-400 w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder={t("fields.birthdate")}
              />
              <input
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
                type="tel"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 text-white focus:ring-customBlue bg-gray-800"
                placeholder={t("fields.emergency_number")}
              />

              {/* Upload Photo Section */}
              <div className="space-y-2 ">
                <label className="cursor-pointer text-gray-400">Upload photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer w-full p-3 text-gray-400 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800 file:bg-customBlue file:text-black file:rounded-lg file:p-2 file:mr-3"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-400">{t("fields.gender.label")}</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-gray-400">
                    <input
                    value="male"
                    onChange={handleInputChange}
                      type="radio"
                      name="gender"
                      className="mr-2"
                    />
                    {t("fields.gender.options.male")}
                  </label>
                  <label className="flex items-center text-gray-400">
                    <input
                    value="female"
                    onChange={handleInputChange}
                      type="radio"
                      name="gender"
                      className="mr-2 "
                    />
                    {t("fields.gender.options.female")}
                  </label>
                </div>
              </div>
              {/* Submit Button */}
              <div className="mt-4">
                <button
                  className="w-full p-2 font-semibold text-customBlue rounded-lg bg-gray-800 hover:bg-customBlue hover:text-black"
                  onClick={handleNextClick}
                >
                  {t("buttons.next")}
                </button>
                {error && (
                  <div className="mb-4 text-red-500 text-sm">{error}</div>
                )}
              </div>
            </form>
          </div>

          {/* Choose Package Section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Choose a Package</h2>
              <div className="flex flex-wrap md:flex-nowrap space-x-1 mb-4">
                {Object.keys(services).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`py-2 px-4 rounded-md ${
                      selectedCategory === category
                        ? "bg-white text-black"
                        : "bg-customBlue text-black"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services[selectedCategory]?.map((service: Service, index: number) => (
                  <label
                    key={index}
                    className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPackages.includes(service.title)
                        ? "border-customBlue shadow-md"
                        : "border-zinc-600"
                    } hover:border-customBlue`}
                    onClick={() => handlePackageSelect(service.title)}
                  >
                    <div>
                      <h3 className="text-gray-400">{service.title}</h3>
                      <p className="text-blue-200">{service.price}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <label className="text-gray-400">
              <input
                type="checkbox"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />{" "}
              I agree to the{" "}
              <Link href={"/terms"} className="underline hover:text-customBlue">
                terms and conditions
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;