"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  price: string;
  benefits: string[];
  category: string;
  description?: string[]; // Add this field to the Service type
}

const Register = () => {
  const t = useTranslations("registration_page");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] =
    useState<string>("Body Building");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
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
  const [services, setServices] = useState<Record<string, Service[]>>({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((response) => {
        const fetchedServices = response.data.data;
        const categorizedServices: Record<string, Service[]> = {};

        fetchedServices.forEach((service: Service) => {
          const serviceWithBenefits = {
            ...service,
            benefits: service.description || [],
          };

          if (!categorizedServices[service.category]) {
            categorizedServices[service.category] = [];
          }
          categorizedServices[service.category].push(serviceWithBenefits);
        });

        setServices(categorizedServices);
      })
      .catch((error) => {
        setError("Failed to fetch services.");
      });

    const categoryFromUrl = searchParams.get("category") || "Body Building";
    const packageFromUrl = searchParams.get("package");

    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
    if (packageFromUrl) setSelectedPackage(packageFromUrl);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : value,
    }));
  };

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  const handlePackageSelect = (service: Service) => {
    setSelectedPackage(service.name);
    setSelectedServiceId(service.id);
  };

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedPackage) {
      setError("Please choose a package.");
      return;
    }

    if (!isTermsChecked) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    const totalPrice = parseFloat(
      services[selectedCategory].find(
        (service) => service.id === selectedServiceId
      )?.price || "0"
    );

    const newUser = {
      ...formData,
      selectedPackage,
      totalPrice,
      serviceId: selectedServiceId || "",
    };

    const formDataToSend = new FormData();
    Object.entries(newUser).forEach(([key, value]) => {
      if (key === "profileImage" && value) {
        formDataToSend.append(key, value as File);
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/members",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status !== 200) {
        setError(response.data.message);
      } else {
        setError(null);
        router.push("admin");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || null);
      }
    }
  };

  return (
    <div className="bg-black pl-20 ">
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col md:flex-row w-11/12 max-w-6xl shadow-lg rounded-lg overflow-hidden ">
          {/* General Information Section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-8 ">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {t("heading")}
            </h2>
            <form className="space-y-4" encType="multipart/form-data">
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
                <label className="cursor-pointer text-gray-400">
                  Upload photo
                </label>
                <input
                  name="profileImage"
                  type="file"
                  onChange={handleInputChange}
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
        </div>

        {/* Choose Package Section */}
        <div className="w-full md:w-1/2 bg-gray-800 p-8 flex flex-col justify-between ">
          <div className="">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Choose a package
            </h2>

            {Object.keys(services).map((category) => (
              <div key={category}>
                <h3 className="text-xl text-customBlue mb-3">{category}</h3>
                <ul className="space-y-2">
                  {services[category].map((service) => (
                    <li
                      key={service.id}
                      className="flex items-center text-white"
                    >
                      <input
                        type="radio"
                        value={service.name}
                        checked={selectedPackage === service.name}
                        onChange={() => handlePackageSelect(service)}
                        className="mr-2"
                      />

                      <span>{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2 mt-7">
            <input
              type="checkbox"
              checked={isTermsChecked}
              onChange={() => setIsTermsChecked(!isTermsChecked)}
              className="cursor-pointer"
            />
            <span className="text-white">
              I agree to the{" "}
              <Link href="/terms" className="text-customBlue hover:underline">
                terms and conditions{" "}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
