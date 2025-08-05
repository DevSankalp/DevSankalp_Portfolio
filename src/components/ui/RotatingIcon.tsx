import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
} from "framer-motion";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextItem {
  text: string;
  icon?: React.ReactNode;
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps {
  texts: RotatingTextItem[];
  transition?: Transition;
  initial?: Target;
  animate?: Target;
  exit?: Target;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingIcon = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 20, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const currentItem = texts[currentTextIndex];
    const currentText: string = currentItem.text;
    const currentIcon: React.ReactNode = currentItem.icon;

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (s) => s.segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }, [currentText, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number): number => {
        const total = totalChars;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = (index: number) => {
      setCurrentTextIndex(index);
      onNext?.(index);
    };

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      handleIndexChange(nextIndex);
    }, [currentTextIndex, texts, loop]);

    useImperativeHandle(ref, () => ({
      next,
      previous: () =>
        handleIndexChange(
          currentTextIndex === 0
            ? loop
              ? texts.length - 1
              : 0
            : currentTextIndex - 1
        ),
      jumpTo: (index: number) =>
        handleIndexChange(Math.max(0, Math.min(index, texts.length - 1))),
      reset: () => handleIndexChange(0),
    }));

    useEffect(() => {
      if (!auto) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        className={cn("flex flex-col items-center gap-2", mainClassName)}
        layout
        transition={transition}
      >
        {currentIcon && (
          <motion.span
            key={`icon-${currentTextIndex}`}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            className="flex items-center"
          >
            {currentIcon}
          </motion.span>
        )}

        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.span
            key={`text-${currentTextIndex}`}
            className="flex flex-wrap"
            layout
            aria-hidden="true"
          >
            {elements.map((word, wordIndex, array) => {
              const prevChars = array
                .slice(0, wordIndex)
                .reduce((acc, w) => acc + w.characters.length, 0);
              return (
                <span key={wordIndex} className={splitLevelClassName}>
                  {word.characters.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          prevChars + i,
                          array.reduce((sum, w) => sum + w.characters.length, 0)
                        ),
                      }}
                      className={cn("inline-block", elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {word.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingIcon.displayName = "RotatingIcon";
export default RotatingIcon;
