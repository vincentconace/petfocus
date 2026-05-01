"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function Blog() {
  const { lang } = useLang();

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge>{t(T.blog.badge, lang)}</Badge>
          <h2 className="display-2 mt-5">
            {t(T.blog.headlinePart1, lang)}{" "}
            <span className="italic-accent">{t(T.blog.italicWord, lang)}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {T.blog.posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-3xl border border-line shadow-card overflow-hidden hover:-translate-y-1 hover:shadow-float-lg transition-all"
            >
              <BlogVisual idx={i} />
              <div className="p-7">
                <span className="inline-block text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full mb-3">
                  {t(post.tag, lang)}
                </span>
                <h3 className="font-display text-xl text-ink-primary mb-3 leading-tight group-hover:text-brand-primary transition-colors">
                  {t(post.title, lang)}
                </h3>
                <p className="text-ink-secondary text-sm leading-relaxed mb-4">
                  {t(post.excerpt, lang)}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all"
                >
                  {t(T.blog.readMore, lang)} <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogVisual({ idx }: { idx: number }) {
  const palettes = [
    { from: "#8B2332", to: "#C8A04A" },
    { from: "#2A8388", to: "#2D6E4E" },
    { from: "#C8A04A", to: "#8B2332" },
  ];
  const p = palettes[idx];
  return (
    <div
      className="aspect-[16/10] relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
    >
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {idx === 0 && (
          <g>
            {/* senior dog */}
            <ellipse cx="100" cy="100" rx="60" ry="6" fill="#000" opacity="0.15" />
            <ellipse cx="100" cy="80" rx="50" ry="25" fill="#fff" opacity="0.85" />
            <circle cx="135" cy="55" r="22" fill="#fff" opacity="0.85" />
            <path d="M125 38 L 119 25 L 132 32 Z" fill="#fff" opacity="0.6" />
            <path d="M150 38 L 156 25 L 143 32 Z" fill="#fff" opacity="0.6" />
            <circle cx="130" cy="55" r="2" fill="#1A1A1A" />
            <circle cx="142" cy="55" r="2" fill="#1A1A1A" />
            <ellipse cx="136" cy="62" rx="2.5" ry="1.5" fill="#1A1A1A" />
          </g>
        )}
        {idx === 1 && (
          <g>
            {/* heart + home */}
            <g transform="translate(70, 30)">
              <path
                d="M30 50 Q 0 30 10 10 Q 25 -5 30 15 Q 35 -5 50 10 Q 60 30 30 50 Z"
                fill="#fff"
                opacity="0.9"
              />
              <path d="M22 22 L 30 14 L 38 22 L 38 32 L 22 32 Z" fill="#8B2332" opacity="0.7" />
            </g>
            <g fill="#fff" opacity="0.6">
              <circle cx="40" cy="80" r="4" />
              <circle cx="46" cy="76" r="3" />
              <circle cx="160" cy="35" r="4" />
            </g>
          </g>
        )}
        {idx === 2 && (
          <g>
            {/* tooth */}
            <g transform="translate(80, 30)">
              <path
                d="M20 0 Q 5 0 5 20 Q 5 40 12 60 Q 18 70 20 50 Q 22 70 28 60 Q 35 40 35 20 Q 35 0 20 0 Z"
                fill="#fff"
                opacity="0.95"
              />
              <path
                d="M14 18 L 19 22 L 27 14"
                stroke="#2A8388"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
