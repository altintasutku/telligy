"use client";

import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../ui/background-gradient";

const HomeComponent = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-20 lg:py-40 px-16">
      <TextGenerateEffect
        words="Easy, fast, modern e-book and course platform"
        className="text-6xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="flex flex-col items-center gap-10"
      >
        <h2 className="text-2xl">
          With <b>telligy</b>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <BackgroundGradient className="rounded-[22px] h-full flex flex-col items-center max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <h3 className="text-3xl font-semibold">Sell</h3>
            <small className="text-sm">
              Selling your book or course has never been easier. With our
              platform, you can create and sell your digital products in
              minutes.
            </small>
          </BackgroundGradient>
          <BackgroundGradient className="rounded-[22px] h-full col-span-2 flex flex-col items-center max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <h3 className="text-3xl font-semibold">Read</h3>
            <small className="text-sm">
              Read your favorite e-books and courses on any device. Our platform
              is designed to be responsive and easy to use
            </small>
          </BackgroundGradient>
        </div>
      </motion.div>

      <section className="h-screen">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        tempora, voluptas, laboriosam, quod quia doloremque quos nemo
        exercitationem cumque voluptates quae. Quisquam tempora, voluptas,
        laboriosam, quod quia doloremque quos nemo exercitationem cumque
      </section>
    </section>
  );
};

export default HomeComponent;