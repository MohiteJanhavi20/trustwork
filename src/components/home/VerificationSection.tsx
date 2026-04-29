"use client";

import { useState } from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/reveal/Reveal";

export default function VerificationSection() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (!value.trim()) return;

    setLoading(true);
    setVerified(false);

    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 2200);
  };

  return (
    <Section className="section-fade">
      {" "}
      <Container>
        {" "}
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Side */}{" "}
          <div>
            {" "}
            <Reveal>
              {" "}
              <span
                className="
               text-[11px]
               uppercase
               tracking-[0.3em]
               text-teal
             "
              >
                AI Verification Engine{" "}
              </span>{" "}
            </Reveal>
            <Reveal delay={120}>
              <h2
                className="
              mt-6
              text-[42px]
              leading-[1]
              tracking-[-0.04em]

              md:text-[72px]
            "
              >
                Detect suspicious
                <span className="font-serif-display italic text-teal">
                  {" "}
                  recruiters
                </span>{" "}
                instantly.
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p
                className="
              mt-8
              max-w-xl
              text-lg
              leading-[1.9]
              text-white/55
            "
              >
                Paste a recruiter message, suspicious URL, or company email and
                let TrustWork analyze fraud signals, phishing indicators, cloned
                domains, and scam behaviour patterns.
              </p>
            </Reveal>
          </div>
          {/* Right Side */}
          <Reveal delay={320}>
            <div
              className="
            rounded-[28px] sm:rounded-[36px]
            border border-white/10
            bg-white/[0.03]
            p-6 sm:p-8
            backdrop-blur-md
          "
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span
                  className="
                text-sm
                uppercase
                tracking-[0.25em]
                text-white/35
              "
                >
                  Verification Console
                </span>

                <div
                  className="
                rounded-full
                border border-[var(--teal)]/20
                bg-[var(--teal)]/10
                px-4 py-1
                text-xs
                text-teal
              "
                >
                  ACTIVE
                </div>
              </div>

              {/* Input */}
              <div className="mt-10">
                <label className="text-sm text-white/40">
                  Paste suspicious URL or recruiter email
                </label>

                <div
                  className="
                mt-3
                rounded-2xl
                border border-white/10
                bg-black/20
                p-4
                transition-all duration-300
                focus-within:border-[var(--teal)]/30
              "
                >
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="example@fake-recruitment-careers.net"
                    className="
                  w-full
                  bg-transparent
                  outline-none
                  placeholder:text-white/20
                "
                  />
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleVerify}
                disabled={loading}
                className="
              mt-8
              w-full
              rounded-2xl
              bg-[var(--teal)]
              px-6 py-4
              text-sm
              font-medium
              text-black
              transition-all duration-300
              hover:bg-[var(--teal-light)]
              disabled:opacity-60
            "
              >
                {loading
                  ? "Analyzing Threat Signals..."
                  : "Start AI Verification"}
              </button>

              {/* Loading State */}
              {loading && (
                <div className="mt-8">
                  <div
                    className="
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-white/5
                "
                  >
                    <div className="scan-bar h-full w-full" />
                  </div>

                  <p className="mt-4 text-sm text-white/40">
                    Scanning recruiter infrastructure...
                  </p>
                </div>
              )}

              {/* Result */}
              {verified && (
                <div
                  className="
                mt-8
                rounded-2xl
                border border-red-500/20
                bg-red-500/5
                p-5
              "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-300">
                      Suspicious Domain Detected
                    </span>

                    <span
                      className="
                    rounded-full
                    bg-red-500/10
                    px-3 py-1
                    text-xs
                    text-red-300
                  "
                    >
                      HIGH RISK
                    </span>
                  </div>

                  <p
                    className="
                  mt-4
                  text-sm
                  leading-[1.8]
                  text-white/50
                "
                  >
                    Recruitment domain was registered 4 days ago and uses
                    infrastructure linked to previously reported job scams
                    targeting fresh graduates through fake onboarding and
                    document verification requests.
                  </p>

                  {/* Threat Indicators */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["Fake Recruiter", "Cloned Domain", "Phishing Risk"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="
                      rounded-full
                      border border-red-500/15
                      bg-red-500/5
                      px-3 py-1
                      text-xs
                      text-red-300
                    "
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
