export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Misty";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "mistyf";
  }

  // If the query asks to add numbers (e.g. "What is 80 plus 22?")
  // extract numeric tokens and return their sum.
  const lower = query.toLowerCase();
  if (lower.includes("plus") || lower.includes(" add ") || lower.includes("added")) {
    const matches = query.match(/-?\d+(?:\.\d+)?/g);
    if (matches && matches.length > 0) {
      const nums = matches.map((s) => parseFloat(s));
      const sum = nums.reduce((a, b) => a + b, 0);
      // Return integer without trailing .0 when possible
      if (Number.isInteger(sum)) return String(sum);
      return String(sum);
    }
  }

  // If the query asks for the largest of a list of numbers, extract numbers
  // and return the largest. This handles queries like:
  // "Which of the following numbers is the largest: 69, 22, 64?"
  if (lower.includes("largest")) {
    // Find all numbers in the string, including negatives and decimals
    const matches = query.match(/-?\d+(?:\.\d+)?/g);
    if (matches && matches.length > 0) {
      const nums = matches.map((s) => parseFloat(s));
      const max = nums.reduce((a, b) => (a > b ? a : b), -Infinity);
      // If integer, return without decimal point
      if (Number.isInteger(max)) return String(max);
      return String(max);
    }
  }

  
  return "";
}
