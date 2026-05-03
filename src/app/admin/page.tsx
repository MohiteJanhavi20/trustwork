"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {

  const [reports, setReports] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] =
  useState("ALL");
  const [searchTerm, setSearchTerm] =
  useState("");
  const [selectedReport, setSelectedReport] =
  useState<any>(null);

  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    approvedCompanies: 0,
    totalThreats: 0,
  });

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, []);

  const fetchReports = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/dashboard/reports",
        {
          headers: {
            authorization: token || "",
          },
        }
      );

      const data = await response.json();

      setReports(data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            authorization: token || "",
          },
        }
      );

      const data = await response.json();

      setStats(data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {

      const token =
        localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/dashboard/reports/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            authorization:
              token || "",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      fetchReports();
      fetchStats();

    } catch (error) {

      console.log(error);
    }
  };

 const filteredReports =
  reports.filter((report) => {

    const matchesStatus =
      selectedStatus === "ALL"
        ? true
        : report.status === selectedStatus;

    const matchesSearch =
      (report.scamType || "")
  .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    return (
      matchesStatus &&
      matchesSearch
    );
  });

  return (
    <main className="relative min-h-screen overflow-hidden pt-36 text-white">

      {/* Ambient Glow */}
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
            Administrative Intelligence Layer
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
            Operational oversight for
            <span className="font-serif-display italic text-teal">
              {" "}
              fraud intelligence
            </span>{" "}
            systems.
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
            TrustWork administrators monitor threat campaigns,
            moderate community reports, verify employers,
            escalate phishing activity, and manage platform
            intelligence infrastructure.
          </p>

        </div>

        {/* Metrics */}
        <div className="mt-24 grid gap-6 md:grid-cols-4">

          <div className="rounded-[32px] border border-white/10 bg-[#071018] p-8">
            <span className="text-sm text-white/40">
              Pending Reports
            </span>

            <h2 className="mt-5 text-5xl text-teal">
              {stats.pendingReports}
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#071018] p-8">
            <span className="text-sm text-white/40">
              Verified Companies
            </span>

            <h2 className="mt-5 text-5xl text-teal">
              {stats.approvedCompanies}
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#071018] p-8">
            <span className="text-sm text-white/40">
              Threat Campaigns
            </span>

            <h2 className="mt-5 text-5xl text-teal">
              {stats.totalThreats}
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#071018] p-8">
            <span className="text-sm text-white/40">
              Total Reports
            </span>

            <h2 className="mt-5 text-5xl text-teal">
              {stats.totalReports}
            </h2>
          </div>

        </div>

        {/* Main Grid */}
        <div className="mt-24 grid gap-8 lg:grid-cols-12">

          {/* Threat Queue */}
          <div className="lg:col-span-8">

            <div
              className="
                rounded-[36px]
                border border-white/10
                bg-[#071018]
                p-8
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <span
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.25em]
                      text-teal
                    "
                  >
                    Moderation Queue
                  </span>

                  <h2 className="mt-4 text-4xl">
                    Active threat investigations
                  </h2>

                </div>

                <div
                  className="
                    rounded-full
                    border border-[var(--teal)]/20
                    bg-[var(--teal)]/10
                    px-4 py-2
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-teal
                  "
                >
                  Live Monitoring
                </div>

              </div>
              <div className="mt-10">

  <input
    type="text"

    placeholder="Search reports..."

    value={searchTerm}

    onChange={(e) =>
      setSearchTerm(e.target.value)
    }

    className="
      w-full
      rounded-2xl
      border border-white/10
      bg-white/[0.03]
      px-5 py-4
      text-sm
      text-white
      outline-none
      backdrop-blur-md
      placeholder:text-white/30
      focus:border-[var(--teal)]/30
    "
  />

</div>
              <div className="mt-10 flex flex-wrap gap-3">

  {[
    "ALL",
    "UNDER REVIEW",
    "MONITORING",
    "ESCALATED",
    "RESOLVED",
  ].map((status) => (

    <button
      key={status}

      onClick={() =>
        setSelectedStatus(status)
      }

      className={`
        rounded-xl
        border
        px-4 py-2
        text-sm
        transition-all
        duration-300

        ${
          selectedStatus === status
            ? "border-[var(--teal)] bg-[var(--teal)]/10 text-teal"
            : "border-white/10 bg-white/[0.03] text-white/60 hover:border-[var(--teal)]/20"
        }
      `}
    >
      {status}
    </button>

  ))}

</div>

              <div className="mt-12 space-y-6">

                {filteredReports.map((report: any) => (

                  <div
  key={report._id}

  onClick={() =>
    setSelectedReport(report)
  }

  className="
    cursor-pointer
    rounded-[28px]
    border border-white/10
    bg-black/20
    p-6
    transition-all duration-300
    hover:border-[var(--teal)]/20
  "
>

                    <div className="flex flex-wrap items-center justify-between gap-4">

                      <div>

                        <span
                          className="
                            text-[11px]
                            uppercase
                            tracking-[0.2em]
                            text-white/30
                          "
                        >
                          Fraud Investigation
                        </span>

                        <h3 className="mt-3 text-2xl">
                          {report.scamType}
                        </h3>

                      </div>

                      <div className="flex gap-3">

                        <div
                          className="
                            rounded-full
                            border border-yellow-500/20
                            bg-yellow-500/10
                            px-3 py-1
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-yellow-200
                          "
                        >
                          {report.severity}
                        </div>

                        <div
                          className={`
                            rounded-full
                            px-3 py-1
                            text-[10px]
                            uppercase
                            tracking-[0.2em]

                            ${
                              report.status === "ESCALATED"
                                ? "bg-red-500/20 text-red-300 border border-red-500/20"
                                : report.status === "MONITORING"
                                ? "bg-yellow-500/20 text-yellow-200 border border-yellow-500/20"
                                : report.status === "RESOLVED"
                                ? "bg-green-500/20 text-green-300 border border-green-500/20"
                                : "bg-[var(--teal)]/10 text-teal border border-[var(--teal)]/15"
                            }
                          `}
                        >
                          {report.status}
                        </div>

                      </div>

                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">

                      {[
                        "Threat Correlation",
                        "Community Signals",
                        "Infrastructure Scan",
                      ].map((tag) => (

                        <span
                          key={tag}
                          className="
                            rounded-full
                            border border-white/10
                            bg-white/[0.03]
                            px-3 py-1
                            text-xs
                            text-white/45
                          "
                        >
                          {tag}
                        </span>

                      ))}

                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">

                      <button
  onClick={(e) => {

    e.stopPropagation();

    updateStatus(
      report._id,
      "ESCALATED"
    );
  }}

  className="
    rounded-xl
    border border-red-500/20
    bg-red-500/10
    px-4 py-2
    text-sm
    text-red-200
    backdrop-blur-md
    transition-all
    duration-300
    hover:border-red-400/40
    hover:bg-red-500/15
  "
>
  Escalate
</button>

                     <button
  onClick={(e) => {

    e.stopPropagation();

    updateStatus(
      report._id,
      "MONITORING"
    );
  }}

  className="
    rounded-xl
    border border-yellow-500/20
    bg-yellow-500/10
    px-4 py-2
    text-sm
    text-yellow-100
    backdrop-blur-md
    transition-all
    duration-300
    hover:border-yellow-400/40
    hover:bg-yellow-500/15
  "
>
  Monitor
</button>

                     <button
  onClick={(e) => {

    e.stopPropagation();

    updateStatus(
      report._id,
      "RESOLVED"
    );
  }}

  className="
    rounded-xl
    border border-[var(--teal)]/20
    bg-[var(--teal)]/10
    px-4 py-2
    text-sm
    text-teal
    backdrop-blur-md
    transition-all
    duration-300
    hover:border-[var(--teal)]/40
    hover:bg-[var(--teal)]/15
  "
>
  Resolve
</button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Side Panel */}
          <div className="space-y-6 lg:col-span-4">

            <div
              className="
                rounded-[32px]
                border border-white/10
                bg-[#071018]
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
                Administrative Controls
              </span>

              <div className="mt-8 space-y-4">

                {[
                  "Approve Company Verification",
                  "Escalate Fraud Campaign",
                  "Block Recruiter Identity",
                  "Review Community Reports",
                  "Monitor Threat Infrastructure",
                ].map((item) => (

                  <div
                    key={item}
                    className="
                      flex items-center justify-between
                      rounded-2xl
                      border border-white/10
                      bg-black/20
                      px-4 py-4
                      transition-all duration-300
                      hover:border-[var(--teal)]/20
                    "
                  >

                    <span className="text-sm text-white/65">
                      {item}
                    </span>

                    <span className="text-teal">→</span>

                  </div>

                ))}

              </div>

            </div>

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
                Security Layer
              </span>

              <p
                className="
                  mt-6
                  leading-[1.9]
                  text-white/65
                "
              >
                Administrative operations are protected through
                controlled moderation workflows, isolated
                intelligence review systems, and monitored
                escalation infrastructure.
              </p>

            </div>

          </div>

        </div>

      </div>

{selectedReport && (

  <div
    className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/70
      backdrop-blur-sm
      p-6
    "
  >

    <div
      className="
        w-full max-w-2xl
        rounded-[32px]
        border border-white/10
        bg-[#071018]
        p-8
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-teal
            "
          >
            Threat Investigation
          </span>

          <h2 className="mt-4 text-4xl">
            {selectedReport.scamType}
          </h2>

        </div>

        <button
          onClick={() =>
            setSelectedReport(null)
          }

          className="
            rounded-xl
            border border-white/10
            px-4 py-2
            text-sm
            text-white/60
            transition-all duration-300
            hover:border-[var(--teal)]/20
          "
        >
          Close
        </button>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div>

          <p className="text-sm text-white/40">
            Company
          </p>

          <h3 className="mt-2 text-xl">
            {selectedReport.company}
          </h3>

        </div>

        <div>

          <p className="text-sm text-white/40">
            Severity
          </p>

          <h3 className="mt-2 text-xl">
            {selectedReport.severity}
          </h3>

        </div>

        <div>

          <p className="text-sm text-white/40">
            Status
          </p>

          <h3 className="mt-2 text-xl">
            {selectedReport.status}
          </h3>

        </div>

        <div>

          <p className="text-sm text-white/40">
            Reported By
          </p>

          <h3 className="mt-2 text-xl">
            {selectedReport.reportedBy}
          </h3>

        </div>

      </div>

      <div className="mt-10">

        <p className="text-sm text-white/40">
          Investigation Notes
        </p>

        <p
          className="
            mt-4
            leading-[1.9]
            text-white/65
          "
        >
          {selectedReport.description}
        </p>

      </div>

    </div>

  </div>

)}
    </main>
  );
}