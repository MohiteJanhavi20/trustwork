"use client";

import { useState } from "react";

export default function WhistleblowerPage() {

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [incidentType, setIncidentType] =
    useState("Recruiter Impersonation");

  const [description, setDescription] =
    useState("");

  const [secretToken, setSecretToken] =
    useState("");

  const submitReport = async () => {

    if (!description.trim()) return;

    try {

      setLoading(true);

      const token =
        "TW-" +
        Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase();

      const response = await fetch(
        "http://localhost:5000/api/reports",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

         body: JSON.stringify({

  company: "Unknown Company",

  recruiter: "Anonymous Recruiter",

  scamType: incidentType,

  description,

}),
        }
      );

      await response.json();

      setSecretToken(token);

      setSubmitted(true);

      setDescription("");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden pt-36 text-white">

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

          {/* Left */}
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
                        value={incidentType}

                        onChange={(e) =>
                          setIncidentType(
                            e.target.value
                          )
                        }

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

                        value={description}

                        onChange={(e) =>
                          setDescription(
                            e.target.value
                          )
                        }

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

                  {/* Upload UI */}
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
                      "
                    >
                      Upload Evidence
                    </button>

                  </div>

                  {/* Submit */}
                  <button
                    onClick={submitReport}

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
                    {loading
                      ? "Encrypting..."
                      : "Submit Anonymous Report"}
                  </button>

                </div>

              ) : (

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
                  </p>

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

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}