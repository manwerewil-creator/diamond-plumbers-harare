'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { team } from '@/lib/content';
import { teamImages } from '@/lib/images';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

export function Team() {
  return (
    <section id="team" className="section bg-mist">
      <div className="container-px">
        <SectionHeading
          eyebrow="Meet the team"
          title={<>Real names. Real faces. <span className="grad-text">The people who’ll turn up.</span></>}
          intro="Faceless plumbing companies lose to faces. When we knock, you’ll already know who’s at the gate — uniformed, qualified, and named."
        />

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((m, i) => (
            <motion.li key={m.name} variants={staggerItem} className="card-surface overflow-hidden p-0">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={teamImages[i % teamImages.length].src}
                  alt={teamImages[i % teamImages.length].alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/35 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{m.name}</h3>
                <p className="text-sm text-accent-600">{m.role}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted">
                  <Icon name="badge" width={16} height={16} className="text-navy" />
                  <span className="tnum">{m.years} yrs</span> · {m.specialty}
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-muted">“{m.personal}”</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
