import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { images, type ImageKey } from "@/content/images";

type CtaBannerProps = {
  title: string;
  description: string;
  button: { href: string; label: string };
  /** Optional second action, e.g. a WhatsApp link. */
  secondary?: { href: string; label: string; icon?: ReactNode };
  image: ImageKey;
};

/** Closing call to action: a rounded photo card whose image settles as it scrolls in. */
export function CtaBanner({ title, description, button, secondary, image }: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-page py-16 sm:py-24">
      <Container>
        <div className="reveal-fade relative isolate overflow-clip rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl shadow-primary/20 sm:px-12 sm:py-24">
          <div className="scroll-zoom absolute inset-0 -z-20">
            <Image src={images[image]} alt="" fill placeholder="blur" sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/65" />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-32 -z-10 size-96 rounded-full border-[3rem] border-white/5"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 -z-10 size-72 rounded-full border-[2.5rem] border-secondary/30"
          />

          <h2
            id="cta-title"
            className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-balance text-white sm:text-5xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-white/85">{description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href={button.href} variant="inverse" className="px-6 py-3 text-base">
              {button.label}
              <ArrowRightIcon className="size-5" />
            </ButtonLink>
            {secondary && (
              <ButtonLink
                href={secondary.href}
                variant="ghostInverse"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-base"
              >
                {secondary.icon}
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
