"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Prime Asset Amazing
            </h3>
            <p className="text-slate-400 leading-relaxed">
              System makes Money.
              <br />
              감정을 배제한 완벽한 영업 지원 시스템.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                Email:{" "}
                <a
                  href="mailto:induo@naver.com"
                  className="hover:text-white transition-colors"
                >
                  induo@naver.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:01056040424"
                  className="hover:text-white transition-colors"
                >
                  010 5604 0424
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-slate-800 pt-8 text-center text-slate-500"
        >
          <p>&copy; 2024 Prime Asset Amazing Division. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

