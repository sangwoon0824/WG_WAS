//document.getElementById("amount_sign").style.left = (document.querySelector("progress").value / 60) + "%";
//document.getElementById("count").innerHTML += document.querySelector("progress").value;

document.getElementById("minus").addEventListener("click", function () {
  if (document.getElementById("input_amount").value > 1)
    document.getElementById("input_amount").value =
      parseInt(document.getElementById("input_amount").value) - 1;
});

document.getElementById("plus").addEventListener("click", function () {
  if (document.getElementById("input_amount").value < 10)
    document.getElementById("input_amount").value =
      parseInt(document.getElementById("input_amount").value) + 1;
});
