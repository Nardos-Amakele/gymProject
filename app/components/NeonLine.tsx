'use client';

import { motion } from 'framer-motion';
import React from 'react';

const NeonLine = () => {
  return (
    <motion.div
      className="mt-8 lg:px-10 mx-auto container"
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <hr className="border-t-8 border-customBlue" />
    </motion.div>
  );
};

export default NeonLine;
