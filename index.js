document.getElementById("calculateBtn").addEventListener("click", function () {
  var principal = parseFloat(document.getElementById("principal").value);
  var rate = parseFloat(document.getElementById("rate").value);
  var time = parseFloat(document.getElementById("time").value);

  var simpleInterest = (principal * rate * time) / 100;
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = `<p>Simple Interest: ${simpleInterest.toFixed(
    2
  )}</p>`;
});
