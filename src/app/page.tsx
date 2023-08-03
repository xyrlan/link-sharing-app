"use client"
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
export default function Home() {


  return (
    <>
      <div className="bg-white ">
        <div className="mx-auto max-w-7xl py-10 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-32 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <img
                className="h-16 mb-10"
                src="/images/logo-devlinks-large.svg"
                alt="Your Company"
              />
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create your customized card with your customized links!
                <br />
                Start using our app now.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                In this project, I builded a fully-functional link-sharing app for developers!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  href="/register"
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register to get started
                </Link>
                <Link href="/login" className="text-sm font-semibold leading-6 text-black">
                  Already have an account <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="relative mt-16 flex justify-center pb-10 lg:mt-8">
              <img src="/images/previewexemple.svg" alt="preview exemple"/>
              
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
