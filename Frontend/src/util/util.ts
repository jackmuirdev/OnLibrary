function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

function currencyFormat(amount: number) {
  return "£" + (amount / 100).toFixed(2); 
}

function inDevelopment() {
  alert("This feature is in development");
}

export { getCookie, currencyFormat, inDevelopment };