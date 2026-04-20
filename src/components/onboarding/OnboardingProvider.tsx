"use client";

import { useEffect, useCallback } from "react";
import { useOnboardingStore, shouldShowOnboarding } from "@/store/useOnboardingStore";
import { ONBOARDING_STEPS } from "./steps";
import OnboardingSpotlight from "./OnboardingSpotlight";
import OnboardingTooltip from "./OnboardingTooltip";

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isActive, currentStep, start, setTargetElement } = useOnboardingStore();

  useEffect(() => {
    if (shouldShowOnboarding()) {
      const timer = setTimeout(() => start(), 800);
      return () => clearTimeout(timer);
    }
  }, [start]);

  const findTarget = useCallback(() => {
    if (!isActive) return;
    const step = ONBOARDING_STEPS[currentStep];
    if (!step) return;

    const el = document.querySelector<HTMLElement>(step.targetSelector);
    setTargetElement(el);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isActive, currentStep, setTargetElement]);

  useEffect(() => {
    findTarget();
    const timer = setTimeout(findTarget, 300);
    return () => clearTimeout(timer);
  }, [findTarget]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.shiftKey && e.key === "?") {
        e.preventDefault();
        start();
      }
      if (e.key === "Escape" && isActive) {
        useOnboardingStore.getState().skip();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, start]);

  return (
    <>
      {children}
      <OnboardingSpotlight />
      <OnboardingTooltip />
    </>
  );
}
