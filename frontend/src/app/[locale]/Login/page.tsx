'use client'
import Image from 'next/image';
import loginImage from './home image.png';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from "../../../i18n/routing";  // This import is incorrect


const Login = () => {
  const t = useTranslations("login_page");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // For navigation after login

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !password) {
      setError('Phone number and password are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      console.log("Response from backend:", data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (data.role === 'admin') {
          router.push('/en/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-4/5 h-full md:relative">
        <Image
          src={loginImage}
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          className="rounded-none"
        />
      </div>
      <div className="lg:w-3/5 w-full flex justify-center items-center bg-black">
        <div className="text-white bg-black bg-opacity-75 p-8 rounded-md">
          <h2 className="text-3xl mb-8 text-center">{t("heading")}</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}  {/* Display error message */}

          <form className="flex flex-col items-center w-[110%]" onSubmit={handleLogin}>
            <div className="mb-4 w-full">
              <input
                type="number"
                id="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                placeholder={t("fields.phone_number")}
              />
            </div>
            <div className="mb-6 w-full">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                placeholder={t("fields.password")}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-login w-full p-2 font-semibold text-customBlue rounded-lg bg-zinc-800 hover:bg-customBlue hover:text-black">
              {loading ? 'Logging in...' : t("buttons.login")}
            </button>

            <button type="button" className="w-full p-2 font-semibold text-white rounded-lg border-white border-1 hover:border-none hover:text-black hover:bg-customBlue mt-4">
              <Link href="/Register">{t("buttons.signup")}</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
