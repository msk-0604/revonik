"use client";

import { MotionConfig } from "motion/react";

/** OS の「視差効果を減らす」設定を尊重する */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
