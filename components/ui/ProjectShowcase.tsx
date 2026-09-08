"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/icons";
import { IconButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type ShowcaseLabels = {
  /** Accessible name for the buttons that open a screenshot. */
  view: string;
  gallery: string;
  close: string;
  previous: string;
  next: string;
};

type ProjectShowcaseProps = {
  images: string[];
  /** Base alt text; each screenshot gets its position appended. */
  alt: string;
  labels: ShowcaseLabels;
  priority?: boolean;
};

/**
 * The three-up perspective stack from the reference design: two screenshots
 * tilted behind, the primary one centred on top. Falls back gracefully when a
 * project supplies fewer than three images.
 *
 * Every screenshot is a button that opens the full-size viewer below, so the
 * two tilted ones are real content now rather than decoration — they carry
 * their own alt text instead of `aria-hidden`.
 */
export function ProjectShowcase({ images, alt, labels, priority = false }: ProjectShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [primary, left, right] = images;

  /*
   * The screenshot that opened the viewer, so focus can go back to it. It is
   * tracked by hand because removing an open `<dialog>` from the DOM strands
   * focus on `<body>` -- see `close` below.
   */
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback((event: MouseEvent<HTMLButtonElement>, index: number) => {
    openerRef.current = event.currentTarget;
    setOpenIndex(index);
  }, []);

  /* Stable so the viewer can keep its `cancel` listener across renders. */
  const close = useCallback(() => {
    setOpenIndex(null);
    const opener = openerRef.current;
    /* Deferred: the trigger is only focusable once the modal is really gone. */
    window.setTimeout(() => opener?.focus(), 0);
  }, []);

  const label = (index: number) =>
    images.length > 1 ? `${alt} ${index + 1}/${images.length}` : alt;

  /*
   * Horizontal padding sizes the primary screenshot to ~64% of the frame while
   * it stays *in flow*, so the wrapper is exactly as tall as the artwork. An
   * `aspect-*` box would leave dead space under shorter screenshots.
   */
  return (
    <>
      <div className="relative mx-auto w-full max-w-5xl px-[18%]">
        {left && (
          <button
            type="button"
            onClick={(event) => open(event, 1)}
            aria-haspopup="dialog"
            className={cn(
              "absolute left-0 top-[10%] w-[52%] cursor-zoom-in rounded-xl",
              "-rotate-6 opacity-45 blur-[1px] transition-all duration-700",
              "group-hover:-translate-x-3 group-hover:opacity-70 group-hover:blur-0",
              "hover:!opacity-100 hover:!blur-0 focus-visible:!opacity-100 focus-visible:!blur-0",
              "motion-reduce:transition-none",
            )}
          >
            <Image
              src={left}
              alt={label(1)}
              width={800}
              height={500}
              sizes="(min-width: 1024px) 40vw, 50vw"
              className="w-full rounded-xl border border-white/10 shadow-2xl shadow-black/60"
            />
          </button>
        )}

        {right && (
          <button
            type="button"
            onClick={(event) => open(event, 2)}
            aria-haspopup="dialog"
            className={cn(
              "absolute right-0 top-[10%] w-[52%] cursor-zoom-in rounded-xl",
              "rotate-6 opacity-45 blur-[1px] transition-all duration-700",
              "group-hover:translate-x-3 group-hover:opacity-70 group-hover:blur-0",
              "hover:!opacity-100 hover:!blur-0 focus-visible:!opacity-100 focus-visible:!blur-0",
              "motion-reduce:transition-none",
            )}
          >
            <Image
              src={right}
              alt={label(2)}
              width={800}
              height={500}
              sizes="(min-width: 1024px) 40vw, 50vw"
              className="w-full rounded-xl border border-white/10 shadow-2xl shadow-black/60"
            />
          </button>
        )}

        <button
          type="button"
          onClick={(event) => open(event, 0)}
          aria-haspopup="dialog"
          className={cn(
            "relative z-10 block w-full cursor-zoom-in rounded-xl",
            "transition-transform duration-700 group-hover:-translate-y-2",
            "motion-reduce:transition-none",
          )}
        >
          <Image
            src={primary}
            alt={label(0)}
            width={800}
            height={500}
            priority={priority}
            sizes="(min-width: 1024px) 45vw, 70vw"
            className="w-full rounded-xl border border-white/15 shadow-2xl shadow-black/80"
          />
        </button>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={close}
          label={label}
          labels={labels}
        />
      )}
    </>
  );
}

/**
 * Full-size viewer built on a native `<dialog>`: the browser gives us the top
 * layer, the focus trap, the backdrop and Escape-to-close for free, which is a
 * lot of behaviour not to write by hand.
 *
 * It is portalled to `<body>` so no ancestor transform (the reveal animation,
 * the tilted stack) can become its containing block.
 */
function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
  label,
  labels,
}: {
  images: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  label: (index: number) => string;
  labels: ShowcaseLabels;
}) {
  const many = images.length > 1;

  /* Opens the dialog the moment the node attaches -- no effect, no flash. */
  const attach = useCallback(
    (node: HTMLDialogElement | null) => {
      if (!node) return;
      if (!node.open) node.showModal();

      /*
       * The `<dialog>` is used for what it does well -- top layer, focus trap,
       * backdrop, Escape -- but React state stays the source of truth for
       * whether the viewer exists, because its close events are not dependable:
       * measured in Chrome, `close` never arrives (not even for an explicit
       * `.close()`), while Escape does deliver `cancel`. So `cancel` is the one
       * event worth listening to, and every other exit calls `onClose` itself.
       *
       * `cancel` also does not bubble, which would put it out of React's reach
       * from inside a portal even if it were dependable.
       */
      node.addEventListener("cancel", onClose);
      return () => node.removeEventListener("cancel", onClose);
    },
    [onClose],
  );

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  /* The page behind stays put while the viewer is open. */
  useEffect(() => {
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, []);

  return createPortal(
    <dialog
      ref={attach}
      aria-label={labels.gallery}
      onClick={(event) => {
        /* Only the backdrop — clicks on the content stop at their own node. */
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (!many) return;
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      className={cn(
        /*
         * `open:flex` rather than a bare `flex`: a closed `<dialog>` is
         * `display: none` by UA default, and overriding that unconditionally
         * would leave a dead overlay on screen if it ever closed natively.
         */
        "fixed inset-0 m-0 hidden h-full max-h-full w-full max-w-full open:flex flex-col",
        "items-center justify-center gap-5 bg-transparent p-4 text-fg sm:gap-6 sm:p-8",
        "backdrop:bg-ink/90 backdrop:backdrop-blur-sm",
      )}
    >
      <IconButton
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-4 top-4 sm:right-6 sm:top-6"
      >
        <CloseIcon />
      </IconButton>

      <div className="flex w-full min-h-0 max-w-6xl items-center justify-center gap-3 sm:gap-6">
        {many && (
          <IconButton type="button" onClick={() => go(-1)} aria-label={labels.previous}>
            <ArrowLeftIcon />
          </IconButton>
        )}

        {/*
         * The image sits in a `min-w-0 flex-1` cell so it scales down to the
         * space the arrows leave instead of pushing them off-screen: a replaced
         * element is a flex item with `min-width: auto`, and would otherwise
         * refuse to shrink below its intrinsic width.
         */}
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <Image
            key={images[index]}
            src={images[index]}
            alt={label(index)}
            width={1600}
            height={1000}
            priority
            sizes="(min-width: 640px) 85vw, 95vw"
            className="h-auto max-h-[60vh] w-auto max-w-full rounded-xl border border-white/15 bg-surface object-contain shadow-2xl shadow-black/80"
          />
        </div>

        {many && (
          <IconButton type="button" onClick={() => go(1)} aria-label={labels.next}>
            <ArrowRightIcon />
          </IconButton>
        )}
      </div>

      {many && (
        <div className="flex flex-col items-center gap-4">
          <ul className="flex items-center gap-3">
            {images.map((src, position) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => onIndexChange(position)}
                  aria-label={`${labels.view} ${position + 1}`}
                  aria-current={position === index}
                  className={cn(
                    "block w-16 overflow-hidden rounded-md border transition-opacity duration-200 sm:w-24",
                    position === index
                      ? "border-fg opacity-100"
                      : "border-white/15 opacity-45 hover:opacity-80",
                  )}
                >
                  <Image src={src} alt="" width={200} height={125} className="w-full" />
                </button>
              </li>
            ))}
          </ul>

          <p aria-live="polite" className="font-mono text-xs tracking-[0.2em] text-fg-subtle">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </dialog>,
    document.body,
  );
}
