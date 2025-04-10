import React, { useState } from "react";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      alert("Success! You've been subscribed to our newsletter.");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-md bg-white border border-light-blue-shade-300 focus:outline-none focus:ring-2 focus:ring-light-blue-shade-500 dark:bg-dark-blue-shade-700 dark:border-dark-blue-shade-600"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 font-medium rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400 disabled:opacity-50"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
      <p className="text-xs text-light-blue-shade-600 dark:text-dark-blue-shade-300">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}

export default NewsletterForm;