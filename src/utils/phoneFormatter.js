/**
 * Utility for formatting and restricting phone number input to digits only (+998 XX XXX XX XX)
 */

export const handlePhoneKeyDown = (e) => {
  // Allow system keys: Backspace, Delete, Tab, Arrow keys, Enter, Ctrl/Cmd shortcuts (copy, paste, select all)
  if (
    ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Enter", "Home", "End"].includes(e.key) ||
    e.ctrlKey ||
    e.metaKey
  ) {
    return;
  }

  // Strictly block any key that is not a numeric digit (0-9)
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};

export const formatUzbekPhone = (value) => {
  if (!value) return "+998";

  // Strip all non-digit characters
  let digits = value.replace(/\D/g, "");

  // If user clears almost everything, keep +998 prefix
  if (digits.length <= 3) {
    return "+998";
  }

  // Ensure it starts with 998
  if (!digits.startsWith("998")) {
    digits = "998" + digits;
  }

  // Cap at 12 digits (998 + 9 digits of Uzbekistan phone number)
  digits = digits.slice(0, 12);

  let formatted = "+998";
  const rest = digits.slice(3);

  if (rest.length > 0) {
    formatted += " " + rest.slice(0, 2);
  }
  if (rest.length > 2) {
    formatted += " " + rest.slice(2, 5);
  }
  if (rest.length > 5) {
    formatted += " " + rest.slice(5, 7);
  }
  if (rest.length > 7) {
    formatted += " " + rest.slice(7, 9);
  }

  return formatted;
};
