import React from "react";

import dashboard from "../assets/dashboard.png";
import staff from "../assets/staff.png";
import stafflog from "../assets/stafflog.png";
import attendance from "../assets/attendance.png";
import tasks from "../assets/tasks.png";
import addtask from "../assets/addtask.png";
import mobile from "../assets/mobile.png";
import reminders from "../assets/reminders.png";
import register from "../assets/register.png";
import wareminder from "../assets/wareminder.png";

const sectionImageClass = "rounded shadow-lg mb-6 object-contain mx-auto";
const imageSizeClass = "max-w-[1000px] w-full max-h-[600px] h-auto";

export default function Home() {
  const handlePayment = async () => {
  try {
    const res = await fetch("/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000000 }),
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: data.amount,
  currency: data.currency,
  name: "WorkSphere",
  description: "Test Transaction",
  order_id: data.id,
  handler: function (response) {
    alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
  },
};

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment Error:", err);
    alert("Error creating payment order.");
  }
};

  const Section = ({ id, title, emoji, description, children }) => (
    <section id={id} className="max-w-5xl mx-auto px-6 py-4">
      <h2 className="text-2xl font-bold mb-2">
        {emoji} {title}
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">{description}</p>
      {children}
    </section>
  );

  return (
    <div className="font-sans bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      {/* HEADER */}
      <header className="w-full p-4 shadow bg-white dark:bg-gray-900 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl text-black-500">All-in-one Staff and Task Management</h1>
        <nav className="space-x-6 text-sm font-medium">
          {["intro", "register", "dashboard", "pricing", "download", "faq"].map((link) => (
  <a
    key={link}
    href={`#${link}`}
    className="hover:text-blue-600 transition-colors"
  >
    {link.charAt(0).toUpperCase() + link.slice(1)}
  </a>
))}
        </nav>
      </header>

      {/* INTRO */}
      <section
        id="intro"
        className="max-w-5xl mx-auto px-6 py-16 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">WorkSphere App - All-in-One Staff & Task Management</h1>
        <p className="mb-4 text-lg">A secure, multi-tenant SaaS platform that helps businesses track attendance, manage tasks, and send reminders — all in one place.</p>
        <p className="text-gray-600 dark:text-gray-300">🌍 Trusted by IT firms, marketing agencies, CA offices, consultancies, educational institutions, startups, and HR teams worldwide.</p>
      </section>

      {/* REGISTER */}
      <Section
        id="register"
        title="Register Your Firm"
        emoji="🔧"
        description="The starting point for every new customer. Each firm creates its own secure workspace — all data, staff records, and attendance logs are stored separately for privacy."
      >
	<h3 className="text-1xl font-bold mb-4">Features:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Firm Name, Email, Password → Create your unique firm account.</li>
          <li>Optional Email Reminder Settings → Enter your EmailJS credentials to automate reminders for tasks and attendance.</li>
	<li>Secure Authentication → Powered by Supabase Auth, with password reset and recovery options.</li>
        </ul>
	<h3 className="text-1xl font-bold mb-4">Why it matters:</h3>
	<p className="text-gray-600 dark:text-gray-300 mb-4">You don’t just “sign up”; you create a private workspace for your company, where only your staff can log in.</p>
        <img
          src={register}
          alt="Register"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
      </Section>

      {/* DASHBOARD */}
      <Section
        id="dashboard"
        title="Dashboard"
        emoji="📊"
        description="Your command center for business activity. One glance shows you tasks, attendance trends, and staff activity.">
	<h3 className="text-1xl font-bold mb-4">Features:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Task Completion Overview → See how many tasks are pending, in progress, or completed.</li>
          <li>Daily Attendance Snapshot → Monitor who’s signed in, signed off, or working remotely.</li>
	<li>Responsive Design → Adjusts to mobile devices for quick updates on the go.</li>
        </ul>
	<h3 className="text-1xl font-bold mb-4">Why it matters:</h3>
	<p className="text-gray-600 dark:text-gray-300 mb-4">Cuts through clutter — no need to click through multiple pages to check what’s happening in your company today.</p>
        <img
          src={dashboard}
          alt="Dashboard"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
        <img
          src={mobile}
          alt="Mobile Dashboard"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
      </Section>

      {/* STAFF */}
      <Section
        id="staff"
        title="Manage Staff"
        emoji="👥"
        description="The HR control room — manage your workforce efficiently."
      >
	<h3 className="text-1xl font-bold mb-4">Features:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Add/Update/Delete Staff → Maintain up-to-date records for every employee.</li>
          <li>Upload Profile Images → Helps identify staff quickly in attendance and task views.</li>
	<li>Export to PDF or Excel → Share reports with HR, payroll, or auditors.</li>
	<li>Staff Log View → See staff history and changes over time.</li>
        </ul>
	<h3 className="text-1xl font-bold mb-4">Why it matters:</h3>
	<p className="text-gray-600 dark:text-gray-300 mb-4">Keeps all employee data in one place, with easy reporting for compliance and internal reviews.</p>
        <img
          src={staff}
          alt="Staff Management"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
        <img
          src={stafflog}
          alt="Staff Log"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
      </Section>

      {/* ATTENDANCE */}
      <Section
        id="attendance"
        title="Attendance Tracker"
        emoji="⏰"
        description="Real-time attendance & location tracking to keep work hours transparent."
      >
	<h3 className="text-1xl font-bold mb-4">Features:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Sign-In / Sign-Off → Record workday start and end.</li>
          <li>Lunch Break Tracking → Know when staff are away and back.</li>
	<li>Work Status → “In Office” or “Remote” with exact time.</li>
	<li>Location Map → Pinpoints where remote sign-ins happen.</li>
        </ul>
	<h3 className="text-1xl font-bold mb-4">Why it matters:</h3>
	<p className="text-gray-600 dark:text-gray-300 mb-4">Eliminates time fraud, ensures fair work-hour records, and improves accountability.</p>
        <img
          src={attendance}
          alt="Attendance"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
      </Section>

      {/* TASKS */}
      <Section
        id="tasks"
        title="Task Management"
        emoji="📆"
        description="Assign, monitor, and complete tasks without endless email chains."
      >
	<h3 className="text-1xl font-bold mb-4">Features:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Task Assignment → Assign to specific staff with due dates.</li>
          <li>Detailed Descriptions → Include task instructions, priorities, and attachments.</li>
          <li>Status Updates → Track progress from “Pending” to “Completed.”</li>
	<li>Add Attachments → Upload files, images, or documents with the task.</li>
        </ul>
	<h3 className="text-1xl font-bold mb-4">Why it matters:</h3>
	<p className="text-gray-600 dark:text-gray-300 mb-4">Keeps everyone aligned and ensures nothing falls through the cracks.</p>
        <img
          src={tasks}
          alt="Tasks"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
        <img
          src={addtask}
          alt="Add Task"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
      </Section>

      {/* REMINDERS */}
      <Section
        id="reminders"
        title="Email & WhatsApp Reminders"
        emoji="📤"
        description="Stay connected with smart communication tools built into the app."
      >
	<h3 className="text-1xl font-bold mb-4">Features:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Email Reminders via SMTP → Works with EmailJS for professional-looking automated emails.</li>
          <li>WhatsApp Reminder Links → Pre-filled templates make sending quick reminders easy.</li>
	<li>Custom Templates → Personalize message content for different teams or situations.</li>
        </ul>
	<h3 className="text-1xl font-bold mb-4">Why it matters:</h3>
	<p className="text-gray-600 dark:text-gray-300 mb-4">Boosts productivity and ensures deadlines are met — even for remote teams.</p>
        <img
          src={reminders}
          alt="Reminders"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
        <img
          src={wareminder}
          alt="WA Reminder"
          className={`${sectionImageClass} ${imageSizeClass}`}
        />
      </Section>

      {/* PRICING */}
      <Section
        id="pricing"
        title=" Lifetime Access — ₹10,000 One-Time"
        emoji="💳"
        description="Instead of monthly fees, WorkSphere is a one-time investment."
      >
	<h3 className="text-1xl font-bold mb-4">What you get:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Full access to all features forever.</li>
          <li>No user limit for your firm.</li>
          <li>Free updates and improvements.</li>
        </ul>
        <p className="mb-6 text-center">₹10,000 one-time payment per firm</p>
        <button
          onClick={handlePayment}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto">💳 Pay ₹10,000 — Lifetime Access</button>
        <p className="mt-3 text-sm text-center text-gray-500">
          * Secure payments powered by Razorpay
        </p>
      </Section>

      {/* DOWNLOAD */}
      <Section
        id="download"
        title="Multi-Platform Downloads"
        emoji="🏢"
        description="WorkSphere runs on Android, Windows, and Web — access your workspace from anywhere."
      >
        <ul className="list-disc ml-6 mb-4">
          <li>📱 Android APK</li>
          <li>🖥️ Windows EXE</li>
        </ul>
        <p className="italic text-yellow-500">
          Web version will be available only to paid firms.
        </p>
      </Section>


      {/* FAQ */}
      <Section id="faq" title="FAQ" emoji="❓">
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Is this a cloud-based app?</strong> Yes, fully hosted.
          </li>
          <li>
            <strong>Do you support dark mode?</strong> Yes.
          </li>
          <li>
            <strong>Is my firm's data private?</strong> Yes, 100% isolated by
            firm ID.
          </li>
          <li>
            <strong>Is this free?</strong> No, ₹10,000 one-time payment per
            firm.
          </li>
        </ul>
      </Section>
    </div>
  );
}