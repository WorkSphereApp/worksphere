import React from "react";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4">
        By using WorkSphere, you agree to the following terms:
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Access is provided on a lifetime license basis per purchase.</li>
        <li>Users must provide accurate information during registration.</li>
        <li>
          WorkSphere is licensed for business use only. Reselling or sharing
          login access is prohibited.
        </li>
        <li>
          SJH Tech reserves the right to suspend accounts found in violation of
          fair usage.
        </li>
      </ul>
      <p>
        For any clarifications, contact{" "}
        <strong>dhanasekaransjh6@gmail.com</strong>.
      </p>
    </div>
  );
}
