"use client";

import { useState } from "react";

const reports = [
  {
    company: "Fake TCS Recruitment Portal",
    type: "Phishing Infrastructure",
    risk: "HIGH RISK",
    description:
      "Victims reported fake onboarding workflows requesting Aadhaar verification and laptop activation payments through Telegram.",
  },
  {
    company: "Infosys HR WhatsApp Scam",
    type: "Recruiter Impersonation",
    risk: "MEDIUM RISK",
    description:
      "Scammers impersonated Infosys recruiters using WhatsApp interview scheduling and document verification requests.",
  },
  {
    company: "Cloned Wipro Careers Domain",
    type: "Fake Hiring Portal",
    risk: "HIGH RISK",
    description:
      "Recently registered domain imitated official Wipro hiring pages and redirected applicants to credential harvesting forms.",
  },
];

export default function ReportPage() {

  const [report, setReport] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [trackToken, setTrackToken] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);

  // ----------------------------------------
  // SUBMIT REPORT
  // ----------------------------------------

  const submitReport = async () => {

    if (!report.trim()) return;

    try {

      setLoading(true);

      // Fake processing delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      // Generate tracking token
      const token =
        "TW-" +
        Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase();

      // Fake response
      const fakeResponse = {

        tracking_token: token,

        security_note:
          "Your report has been securely submitted to the TrustWork threat intelligence system. Our moderation and verification engine will review the reported activity."

      };

      setResult(fakeResponse);

      setReport("");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // ----------------------------------------
  // TRACK REPORT
  // ----------------------------------------

  const trackReport = async () => {

    if (!trackToken.trim()) return;

    // Fake tracking statuses
    const statuses = [
      {
        status: "UNDER REVIEW",
        note:
          "Your report is currently being reviewed by the TrustWork moderation engine.",
      },
      {
        status: "INVESTIGATING",
        note:
          "Threat intelligence indicators are being verified against reported scam infrastructure.",
      },
      {
        status: "FLAGGED",
        note:
          "The reported recruiter/domain has been flagged as suspicious in the TrustWork system.",
      },
    ];

    const randomStatus =
      statuses[Math.floor(Math.random() * statuses.length)];

    setTrackResult(randomStatus);
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
            "radial-gradient(circle, rgba(43,191,179,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="max-w-[950px]">

          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-teal
            "
          >
            Track Fraud Reports
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
            Track fraud
            <span className="font-serif-display italic text-teal">
              {" "}
              intelligence
            </span>{" "}
            from real victims.
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
            TrustWork collects scam reports submitted by students,
            job seekers, and professionals to identify recurring
            fraud tactics, fake recruiters, phishing workflows,
            and suspicious hiring infrastructure.
          </p>
        </div>

       
        {result && (

          <div
            className="
              mt-10
              rounded-[36px]
              border border-white/10
              bg-white/[0.03]
              p-8
            "
          >

            <h2 className="text-3xl font-semibold text-white">
              Report Submitted Successfully
            </h2>

            <p className="mt-6 max-w-[70ch] leading-[1.9] text-white/60">
              {result.security_note}
            </p>

            <div
              className="
                mt-8
                rounded-2xl
                border border-white/10
                bg-black/20
                p-6
              "
            >

              <p className="text-sm text-white/35">
                Anonymous Report ID
              </p>

              <h3 className="mt-3 break-all text-xl text-teal">
                {result.tracking_token}
              </h3>

            </div>

          </div>
        )}

        {/* Track Report */}
        <div
          className="
            mt-14
            rounded-[36px]
            border border-white/10
            bg-white/[0.03]
            p-8
          "
        >

          <h2 className="text-3xl font-semibold">
            Track Anonymous Report
          </h2>

          <p className="mt-4 max-w-[65ch] text-white/55 leading-[1.8]">
            Enter your anonymous tracking token to
            monitor report verification status.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row">

            <input
              type="text"
              value={trackToken}
              onChange={(e) => setTrackToken(e.target.value)}
              placeholder="Enter tracking token"
              className="
                flex-1
                rounded-2xl
                border border-white/10
                bg-black/20

                px-5 py-4

                outline-none
                placeholder:text-white/20
              "
            />

            <button
              onClick={trackReport}
              className="
                rounded-2xl
                bg-[var(--teal)]

                px-8 py-4

                text-sm
                font-medium
                text-black

                transition-all duration-300
                hover:bg-[var(--teal-light)]
              "
            >
              Track Report
            </button>

          </div>

          {trackResult && (

            <div
              className="
                mt-8
                rounded-2xl
                border border-white/10
                bg-black/20
                p-6
              "
            >

              <h3 className="text-2xl font-semibold text-teal">
                {trackResult.status}
              </h3>

              <p className="mt-4 text-white/55">
                {trackResult.note}
              </p>

            </div>
          )}
        </div>

        {/* Existing Reports */}
        <div className="mt-20 space-y-8">

          {reports.map((report, index) => (

            <div
              key={index}
              className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                p-8

                shadow-[0_0_40px_rgba(0,0,0,0.15)]

                transition-all duration-500

                hover:border-[var(--teal)]/20
                hover:bg-white/[0.04]
              "
            >

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <span
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.25em]
                      text-white/35
                    "
                  >
                    {report.type}
                  </span>

                  <h3 className="mt-3 text-3xl leading-tight">
                    {report.company}
                  </h3>

                </div>

                <div
                  className={`
                    rounded-full
                    px-4 py-2
                    text-xs
                    uppercase
                    tracking-[0.2em]

                    ${
                      report.risk === "HIGH RISK"
                        ? "bg-red-500/10 text-red-300"
                        : "bg-yellow-500/10 text-yellow-200"
                    }
                  `}
                >
                  {report.risk}
                </div>

              </div>

              <p
                className="
                  mt-8
                  max-w-[75ch]
                  leading-[1.9]
                  text-white/55
                "
              >
                {report.description}
              </p>

              <div
                className="
                  mt-10
                  flex flex-wrap items-center gap-6
                  border-t border-white/5
                  pt-6
                "
              >

                <div className="flex items-center gap-3">

                  <button
                    className="
                      rounded-full
                      border border-white/10
                      px-4 py-2
                      text-sm

                      transition-all duration-300

                      hover:border-[var(--teal)]/30
                    "
                  >
                    ↑ Useful
                  </button>

                  <button
                    className="
                      rounded-full
                      border border-white/10
                      px-4 py-2
                      text-sm

                      transition-all duration-300

                      hover:border-red-500/30
                    "
                  >
                    ↓ False
                  </button>

                </div>

                <div className="text-sm text-white/35">
                  Reported 3 hours ago · Verified by 28 users
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}