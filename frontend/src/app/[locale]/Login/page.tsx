import Image from 'next/image'
import loginImage from './home image.png';
import React from 'react'
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const login = () => {
  const t = useTranslations("login_page");

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
          <form className="flex flex-col items-center w-[110%]"> 
            <div className="mb-4 w-full">
              <input
                type="number"
                id="number"
                className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                placeholder={t("fields.phone_number")}
              />
            </div>
            <div className="mb-6 w-full">
              <input
                type="password"
                id="password"
                className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                placeholder={t("fields.password")}
              />
            </div>
            <button type="submit" className="w-full p-2 font-semibold text-customBlue rounded-lg bg-zinc-800 hover:bg-customBlue hover:text-black">
            {t("buttons.login")}
            </button>
            <button type="submit" className="w-full p-2 font-semibold text-white rounded-lg border-white border-1 hover:border-none hover:text-black hover:bg-customBlue mt-4">
            <Link href="/Register">{t("buttons.signup")}</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login