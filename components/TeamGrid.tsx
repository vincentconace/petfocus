"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, UserRound } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { TEAM, type TeamMember } from "@/lib/team";

/**
 * Team cards, following the reference site (fphmapleton.com/our-veterinarians):
 * portrait photo → name → alias line → credential → bio → "Read more" expander.
 */
export default function TeamGrid() {
  const { lang } = useLang();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {TEAM.map((member, i) => (
        <MemberCard key={member.id} member={member} index={i} lang={lang} />
      ))}
    </div>
  );
}

function MemberCard({
  member,
  index,
  lang,
}: {
  member: TeamMember;
  index: number;
  lang: "en" | "es";
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = Boolean(member.bioMore);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="flex flex-col bg-bg-surface rounded-3xl border border-line shadow-card overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.photo}
        alt={member.name}
        width={900}
        height={1125}
        loading={index === 0 ? "eager" : "lazy"}
        className="w-full aspect-[4/5] object-cover"
      />

      <div className="p-6 lg:p-7 flex-1 flex flex-col">
        <h3 className="display-3">{member.name}</h3>

        {member.alias && (
          <p className="mt-1 text-ink-secondary">({member.alias})</p>
        )}

        <p className="label-text mt-2.5 text-brand-support-text">
          {[member.credential, member.role && t(member.role, lang)]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {member.bio ? (
          <>
            <p className="mt-4 text-ink-secondary leading-relaxed">
              {t(member.bio, lang)}
            </p>

            {hasMore && (
              <>
                {expanded && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-ink-secondary leading-relaxed overflow-hidden"
                  >
                    {t(member.bioMore!, lang)}
                  </motion.p>
                )}
                <button
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-primary hover:gap-2.5 transition-all cursor-pointer"
                >
                  {t(expanded ? T.team.readLess : T.team.readMore, lang)}
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
              </>
            )}
          </>
        ) : (
          /* No bio was sent for this person. A labelled placeholder keeps the
             gap visible in review instead of shipping a half-empty card. */
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-dashed border-line px-4 py-3 text-ink-subtle">
            <UserRound size={16} className="shrink-0" />
            <span className="label-text text-[0.7rem]">
              {t(T.team.bioPending, lang)}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
