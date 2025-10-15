function money(n){
  return n.toLocaleString("es-AR", {style:"currency", currency:"ARS", maximumFractionDigits:0});
}

function setupPromo(sectionId, calcFn){
  const sec = document.getElementById(sectionId);
  const prod = sec.querySelector(".prod");
  const qty  = sec.querySelector(".qty");
  const sub  = sec.querySelector(".sub");
  const disc = sec.querySelector(".disc");
  const tot  = sec.querySelector(".tot");

  function update(){
    const price = Number(prod.value || 0);
    const q = Math.max(1, Number(qty.value || 1));
    const subtotal = price * q;
    const discount = calcFn(price, q, subtotal);
    const total = subtotal - discount;
    sub.textContent  = money(subtotal);
    disc.textContent = money(discount);
    tot.textContent  = money(total);
  }

  prod.addEventListener("change", update);
  qty.addEventListener("input", update);
  update();
}

function promo50Segundo(price, q){
  const pares = Math.floor(q / 2);
  return pares * price * 0.5;
}
function promo3x2(price, q){
  const trios = Math.floor(q / 3);
  return trios * price;
}
function promo10Desde300(price, q, subtotal){
  return subtotal >= 300000 ? subtotal * 0.10 : 0;
}

document.addEventListener("DOMContentLoaded", () => {
  setupPromo("p1", promo50Segundo);
  setupPromo("p2", promo3x2);
  setupPromo("p3", promo10Desde300);
});
