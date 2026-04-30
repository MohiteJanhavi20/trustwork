"use client";

import { useState } from "react";

export default function VerifyPage() {

  const [value, setValue] = useState("");
  const [type, setType] = useState("url");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleVerify = async () => {

    if (!value.trim() && !selectedFile) return;

    try {

      setLoading(true);
      setVerified(false);
      setResult(null);

      let response;

      // IMAGE FORENSICS FLOW
      if (selectedFile) {

        const formData = new FormData();

        formData.append("file", selectedFile);

        response = await fetch(
          "http://127.0.0.1:8000/api/check-image",
          {
            method: "POST",
            body: formData,
          }
        );

      } else {

        // NORMAL VERIFY FLOW
        response = await fetch(
          "http://localhost:5000/api/verify",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              input: value,
            }),
          }
        );
      }

      const data = await response.json();

      setResult(data.verification || data);

      setLoading(false);
      setVerified(true);

    } catch (error) {

      console.error(error);

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
            "radial-gradient(circle, rgba(43,191,179,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="max-w-[900px]">

          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-teal
            "
          >
            Fraud Verification Console
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
            Analyze suspicious
            <span className="font-serif-display italic text-teal">
              {" "}
              recruiters,
            </span>
            <br />
            domains & hiring workflows.
          </h1>

          <p
            className="
              mt-8
              max-w-[60ch]
              text-lg
              leading-[1.9]
              text-white/55
            "
          >
            Verify suspicious recruiter emails, fake onboarding portals,
            Telegram hiring scams, cloned company domains, and phishing-based
            job fraud campaigns.
          </p>
        </div>

        {/* Verification Grid */}
        <div className="mt-24 grid gap-10 lg:grid-cols-12">

          {/* Console */}
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

              {/* Console Header */}
              <div className="flex items-center justify-between">

                <span
                  className="
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/35
                  "
                >
                  Threat Analysis Engine
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

              {/* Verification Type */}
              <div className="mt-10 flex flex-wrap gap-3">

                {[
                  ["url", "URL"],
                  ["message threat analysis", "Message Threat Analysis"],
                  ["phone", "Phone Number"],
                ].map(([id, label]) => (

                  <button
                    key={id}
                    onClick={() => setType(id)}
                    className={`
                      rounded-full
                      border
                      px-5 py-2
                      text-sm
                      transition-all duration-300

                      ${
                        type === id
                          ? "border-[var(--teal)] bg-[var(--teal)]/10 text-teal"
                          : "border-white/10 text-white/45 hover:border-white/20"
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="mt-10">

                <label className="text-sm text-white/40">

                  {
                    type === "url"
                      ? "Enter suspicious domain or hiring portal"
                      : type === "message threat analysis"
                        ? "Paste suspicious WhatsApp, Telegram, email, or recruiter message"
                        : "Enter suspicious phone number"
                  }

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
                    placeholder={
                      type === "url"
                        ? "careers-tcs-onboarding.net"
                        : type === "message threat analysis"
                          ? "Paste suspicious WhatsApp, Telegram, email, or recruiter message..."
                          : "+91 98765 43210"
                    }
                    className="
                      w-full
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
                  mt-6
                  rounded-2xl
                  border border-dashed border-white/10
                  bg-white/[0.02]
                  p-6
                  text-center
                "
              >

                <p className="text-sm text-white/45">
                  Upload suspicious screenshots or offer letters
                </p>

                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />

                <label
                  htmlFor="fileUpload"
                  className="
                    mt-4
                    inline-block
                    cursor-pointer
                    rounded-full
                    border border-white/10
                    px-5 py-2
                    text-sm
                    transition-all duration-300
                    hover:border-[var(--teal)]/30
                  "
                >
                  {selectedFile ? selectedFile.name : "Choose File"}
                </label>
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
                {
                  loading
                    ? "Scanning Threat Infrastructure..."
                    : "Start Verification"
                }
              </button>

              {/* Loading */}
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
                    Analyzing phishing infrastructure...
                  </p>
                </div>
              )}

              {/* Result */}
              {verified && result && (

                <div
                  className={`
                    mt-8
                    rounded-2xl
                    border
                    p-6

                    ${
                      result.severity === "HIGH"
                        ? "border-red-500/20 bg-red-500/5"
                        : result.severity === "MEDIUM"
                          ? "border-yellow-500/20 bg-yellow-500/5"
                          : "border-green-500/20 bg-green-500/5"
                    }
                  `}
                >

                  <div className="flex items-center justify-between">

                    <span
                      className={`
                        text-sm

                        ${
                          result.severity === "HIGH"
                            ? "text-red-300"
                            : result.severity === "MEDIUM"
                              ? "text-yellow-200"
                              : "text-green-300"
                        }
                      `}
                    >
                      Threat Analysis Complete
                    </span>

                    <span
                      className={`
                        rounded-full
                        px-3 py-1
                        text-xs

                        ${
                          result.severity === "HIGH"
                            ? "bg-red-500/10 text-red-300"
                            : result.severity === "MEDIUM"
                              ? "bg-yellow-500/10 text-yellow-200"
                              : "bg-green-500/10 text-green-300"
                        }
                      `}
                    >
                      {result.severity} RISK
                    </span>
                  </div>

                  {/* Score */}
                  <div className="mt-6">

                    <span className="text-white/40">
                      Threat Score
                    </span>

                    <h2 className="mt-2 text-5xl text-teal">
                      {result.riskScore}
                    </h2>
                  </div>

                  {/* Issues */}
                  <div className="mt-8 flex flex-wrap gap-3">

                    {result.issues?.map((issue: string) => (

                      <span
                        key={issue}
                        className="
                          rounded-full
                          border border-white/10
                          bg-white/[0.03]

                          px-3 py-1

                          text-xs
                          text-white/70
                        "
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6 lg:col-span-5">

            {/* Recent Detection */}
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
                Recent Detection
              </span>

              <h3 className="mt-6 text-2xl leading-tight">
                Recent cybercrime reports identified scammers impersonating
              </h3>

              <p className="mt-5 leading-[1.9] text-white/55">
                trusted companies through lookalike domains, fake onboarding
                portals, WhatsApp interviews, and verification fee scams
                targeting students and job seekers across India.
              </p>
            </div>

            {/* Threat Stats */}
            <div
              className="
                rounded-[32px]
                border border-red-500/15
                bg-red-500/5
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
                Threat Intelligence
              </span>

              <div className="mt-8 space-y-6">

                {[
                  ["Domains Flagged", "14,392"],
                  ["Community Reports", "8,201"],
                  ["Fake Recruiters", "2,941"],
                ].map(([label, value]) => (

                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >

                    <span className="text-white/45">
                      {label}
                    </span>

                    <span className="text-xl font-medium text-teal">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}