"use client";

import { useState } from "react";

export default function WhistleblowerPage() {
const [submitted, setSubmitted] = useState(false);

const secretToken = "TWX-91A7-KQ42";

return ( <main className="relative min-h-screen overflow-hidden pt-36 text-white">
{/* Ambient Background */}
<div
className="
pointer-events-none
absolute left-1/2 top-0
h-[500px] w-[1000px]
-translate-x-1/2
opacity-20 blur-[120px]
"
style={{
background:
"radial-gradient(circle, rgba(43,191,179,0.16) 0%, transparent 70%)",
}}
/>
  <div className="relative z-10 mx-auto max-w-7xl px-6">
    {/* Hero */}
    <div className="max-w-[950px]">
      <span
        className="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-teal
        "
      >
        Anonymous Whistleblower Vault
      </span>

      <h1
        className="
          mt-6
          text-[52px]
          leading-[0.95]
          tracking-[-0.04em]

          md:text-[96px]
        "
      >
        Securely report
        <span className="font-serif-display italic text-teal">
          {" "}
          fraudulent
        </span>{" "}
        hiring operations.
      </h1>

      <p
        className="
          mt-8
          max-w-[65ch]
          text-lg
          leading-[1.9]
          text-white/55
        "
      >
        TrustWork enables anonymous reporting for students,
        recruiters, employees, and whistleblowers exposing
        fake hiring campaigns, recruiter impersonation,
        phishing systems, and fraudulent onboarding
        infrastructure.
      </p>
    </div>

    {/* Main Grid */}
    <div className="mt-24 grid gap-10 lg:grid-cols-12">
      {/* Left Side */}
      <div className="lg:col-span-7">
        <div
          className="
            rounded-[36px]
            border border-white/10
            bg-white/[0.03]
            p-8
            shadow-[0_0_40px_rgba(0,0,0,0.15)]
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
              Secure Submission Channel
            </span>

            <div
              className="
                rounded-full
                border border-[var(--teal)]/20
                bg-[var(--teal)]/10
                px-4 py-1
                text-xs
                uppercase
                tracking-[0.2em]
                text-teal
              "
            >
              Encrypted
            </div>
          </div>

          {!submitted ? (
            <>
              {/* Form */}
              <div className="mt-10 space-y-6">
                {/* Type */}
                <div>
                  <label className="text-sm text-white/40">
                    Incident Type
                  </label>

                  <div
                    className="
                      mt-3
                      rounded-2xl
                      border border-white/10
                      bg-black/20
                      p-4
                    "
                  >
                    <select
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-white
                      "
                    >
                      <option className="bg-[#050816]">
                        Recruiter Impersonation
                      </option>

                      <option className="bg-[#050816]">
                        Fake Hiring Portal
                      </option>

                      <option className="bg-[#050816]">
                        Internal Fraud Activity
                      </option>

                      <option className="bg-[#050816]">
                        Payment Scam
                      </option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-white/40">
                    Confidential Description
                  </label>

                  <div
                    className="
                      mt-3
                      rounded-2xl
                      border border-white/10
                      bg-black/20
                      p-4
                    "
                  >
                    <textarea
                      rows={6}
                      placeholder="Describe suspicious recruiter activity, internal fraud systems, phishing workflows, or onboarding scams..."
                      className="
                        w-full
                        resize-none
                        bg-transparent
                        outline-none
                        placeholder:text-white/20
                      "
                    />
                  </div>
                </div>

                {/* Upload */}
                <div
                  className="
                    rounded-2xl
                    border border-dashed border-white/10
                    bg-white/[0.02]
                    p-8
                    text-center
                  "
                >
                  <p className="text-sm text-white/45">
                    Upload screenshots, offer letters,
                    recruiter chats, or evidence files
                  </p>

                  <button
                    className="
                      mt-5
                      rounded-full
                      border border-white/10
                      px-5 py-2
                      text-sm
                      transition-all duration-300
                      hover:border-[var(--teal)]/30
                    "
                  >
                    Upload Evidence
                  </button>
                </div>

                {/* Submit */}
                <button
                  onClick={() => setSubmitted(true)}
                  className="
                    w-full
                    rounded-2xl
                    bg-[var(--teal)]
                    px-6 py-4

                    text-sm
                    font-medium
                    text-black

                    transition-all duration-300
                    hover:bg-[var(--teal-light)]
                  "
                >
                  Submit Anonymous Report
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success */}
              <div
                className="
                  mt-10
                  rounded-[28px]
                  border border-[var(--teal)]/20
                  bg-[var(--teal)]/5
                  p-8
                "
              >
                <span
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.25em]
                    text-teal
                  "
                >
                  Submission Secured
                </span>

                <h2 className="mt-5 text-3xl leading-tight">
                  Your report has been encrypted and isolated.
                </h2>

                <p
                  className="
                    mt-6
                    leading-[1.9]
                    text-white/60
                  "
                >
                  Store this recovery token securely.
                  TrustWork administrators cannot identify
                  your identity without this token.
                </p>

                {/* Token */}
                <div
                  className="
                    mt-8
                    rounded-2xl
                    border border-white/10
                    bg-black/20
                    p-5
                    text-center
                  "
                >
                  <span
                    className="
                      text-2xl
                      tracking-[0.2em]
                      text-teal
                    "
                  >
                    {secretToken}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-6 lg:col-span-5">
        {/* Protection */}
        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            p-8
            shadow-[0_0_40px_rgba(0,0,0,0.15)]
          "
        >
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-white/35
            "
          >
            Identity Protection
          </span>

          <div className="mt-8 space-y-5">
            {[
              "Identity hidden from administrators",
              "Encrypted evidence storage",
              "Private recovery token system",
              "Anonymous report isolation",
              "Secure infrastructure monitoring",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div
                  className="
                    h-2 w-2
                    rounded-full
                    bg-[var(--teal)]
                  "
                />

                <span className="text-white/55">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Encryption */}
        <div
          className="
            rounded-[32px]
            border border-[var(--teal)]/15
            bg-[var(--teal)]/5
            p-8
          "
        >
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-teal
            "
          >
            Encryption Layer
          </span>

          <p
            className="
              mt-6
              leading-[1.9]
              text-white/65
            "
          >
            Reports are protected using isolated submission
            workflows and simulated PGP-inspired encryption
            architecture to prevent unauthorized identity
            exposure.
          </p>
        </div>

        {/* Notice */}
        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            p-8
          "
        >
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-white/35
            "
          >
            Confidentiality Notice
          </span>

          <p
            className="
              mt-6
              leading-[1.9]
              text-white/55
            "
          >
            TrustWork never requests personal identity
            disclosure for whistleblower submissions.
            Reports are monitored only for fraud analysis
            and threat intelligence purposes.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
);
}
