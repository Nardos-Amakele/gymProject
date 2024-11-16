"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import { Link } from "../../../i18n/routing";
import WebcamCapture from "./PhotoUpload";
import PhotoUploadModal from "./PhotoUploadModal";


interface Service {
  id: string;
  name: string;
  price: string;
  benefits: string[];
  category: string;
  description?: string[]; 
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
    profileImage: null as string | File | null,
  });
  const [services, setServices] = useState<Record<string, Service[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

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
        setIsLoading(false); // Set loading to false when services are loaded
      })
      .catch((error) => {
        setError("Failed to fetch services.");
        setIsLoading(false); // Also stop loading if there's an error
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

  const handleOptionSelect = (option: "camera" | "gallery") => {
    if (option === "camera") {
      setIsUsingCamera(true);
    } else {
      document.getElementById('fileInput')?.click(); 
    }
    setIsModalOpen(false); 
    };

    const handleCapture = (capturedPhoto: string | null) => {
      setPhoto(capturedPhoto);
      setFormData((prev) => ({
        ...prev,
        profileImage: capturedPhoto,
      }));
      setIsModalOpen(false);
    };
  
    const closeModal = () => {
      setIsUsingCamera(false);
      setIsModalOpen(false);
    };
  
    const handleGallerySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const selectedFile = event.target.files[0];
        setFormData((prev) => ({
          ...prev,
          profileImage: selectedFile,
        }));
        setPhoto(URL.createObjectURL(selectedFile));
      }
    };
    if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col md:flex-row w-11/12 max-w-6xl shadow-lg rounded-lg overflow-hidden">
          {/* General Information Section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {t('heading')}
            </h2>
            <form className="space-y-4">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                type="text"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800 text-gray-400"
                placeholder={t('fields.full_name')}
              />
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                type="tel"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800 text-gray-400"
                placeholder={t('fields.phone_number')}
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                type="text"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800 text-gray-400"
                placeholder={t('fields.address')}
              />
              <input
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                type="date"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800 text-gray-400"
                placeholder={t('fields.birthdate')}
              />
              <input
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                type="tel"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800 text-gray-400"
                placeholder={t('fields.emergency_number')}
              />
              {/* Upload Photo Section */}
              <div className="">
                <button
                  onClick={(e) => {e.preventDefault(); setIsModalOpen(true)}}
                  className="p-3 bg-customBlue text-black rounded-lg"
                >
                  Upload Photo
                </button>

                {/* Modal for photo upload options */}
                <PhotoUploadModal
    isOpen={isModalOpen}
    onClose={closeModal}
    onOptionSelect={handleOptionSelect}
                />

                {/* Webcam capture or gallery selection */}
                {isUsingCamera ? (
                  <WebcamCapture onCapture={handleCapture}  onClose={closeModal} />
                ) : (
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleGallerySelect(e);
                    }}
                    className="hidden"
                  />
                )}

                {/* Display selected photo */}
                {photo && <img src={photo} alt="Uploaded" className="mt-4 w-40 h-auto" />}
              </div>
              <div className="space-y-2">
                <h3 className="text-gray-400">{t('fields.gender.label')}</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-gray-400">
                    <input
                      value="male"
                      onChange={handleInputChange}
                      type="radio"
                      name="gender"
                      className="mr-2"
                    />
                    {t('fields.gender.options.male')}
                  </label>
                  <label className="flex items-center text-gray-400">
                    <input
                      value="female"
                      onChange={handleInputChange}
                      type="radio"
                      name="gender"
                      className="mr-2"
                    />
                    {t('fields.gender.options.female')}
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="w-full p-2 font-semibold text-customBlue rounded-lg bg-gray-800 hover:bg-customBlue hover:text-black"
                  onClick={handleNextClick}
                >
                  {t('buttons.next')}
                </button>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
              </div>
            </form>
          </div>

          {/* Choose Package Section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-8 flex flex-col justify-between">
            <div className="">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Choose a Package
              </h2>
              <div className="flex flex-wrap md:flex-nowrap space-x-1 mb-4">
                {Object.keys(services).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`py-2 px-4 rounded-md ${selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-customBlue text-black'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services[selectedCategory] ? (
                  services[selectedCategory].map((service) => (
                    <label
                      key={service.id}
                      className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedPackage && selectedPackage.includes(service.name)
                          ? 'border-customBlue shadow-md'
                          : 'border-zinc-600'
                        } hover:border-customBlue`}
                      onClick={() => handlePackageSelect(service)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPackage && selectedPackage.includes(service.name) || false}
                        onChange={() => handlePackageSelect(service)}
                        className="hidden"
                      />
                      {selectedPackage && selectedPackage.includes(service.name) && (
                        <div className="absolute top-2 right-2 bg-customBlue rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="text-gray-400">{service.name}</h3>
                        <p className="text-blue-200">{service.price}</p>
                      </div>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500">Loading services...</p>
                )}
              </div>
            </div>
            <label className="text-gray-400">
              <input
                type="checkbox"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />{' '}
              I agree to the{' '}
              <Link href="/terms" className="underline hover:text-customBlue">
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
