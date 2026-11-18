function money(n){return "₹"+Number(n||0).toFixed(2)}
function recalcBill(){
 const rows=[...document.querySelectorAll(".bill-row")]; let subtotal=0;
 rows.forEach(row=>{
   const qty=Number(row.querySelector(".qty")?.value||0);
   const price=Number(row.querySelector(".price")?.value||0);
   const line=qty*price; subtotal+=line;
   row.querySelector(".line-total").textContent=money(line);
 });
 const discount=Number(document.getElementById("discount")?.value||0);
 document.getElementById("subtotal").textContent=money(subtotal);
 document.getElementById("discount-view").textContent=money(discount);
 document.getElementById("grand-total").textContent=money(Math.max(0,subtotal-discount));
}
function setupBillRow(row){
 const select=row.querySelector(".product-select");
 select.addEventListener("change",()=>{
   const opt=select.selectedOptions[0];
   row.querySelector(".available").textContent=opt?.dataset.stock||"-";
   row.querySelector(".price").value=opt?.dataset.price||0;
   recalcBill();
 });
 row.querySelectorAll(".qty,.price").forEach(el=>el.addEventListener("input",recalcBill));
 row.querySelector(".remove-row").addEventListener("click",()=>{
   const rows=document.querySelectorAll(".bill-row");
   if(rows.length>1) row.remove(); else {select.value="";row.querySelector(".available").textContent="-";row.querySelector(".qty").value=1;row.querySelector(".price").value=0;}
   recalcBill();
 });
}
document.addEventListener("DOMContentLoaded",()=>{
 const first=document.querySelector(".bill-row");
 if(first) setupBillRow(first);
 const add=document.getElementById("add-row");
 if(add) add.addEventListener("click",()=>{
   const body=document.getElementById("bill-rows");
   const row=body.querySelector(".bill-row").cloneNode(true);
   row.querySelector(".product-select").value="";
   row.querySelector(".available").textContent="-";
   row.querySelector(".qty").value=1;
   row.querySelector(".price").value=0;
   row.querySelector(".line-total").textContent=money(0);
   body.appendChild(row);setupBillRow(row);
 });
 document.getElementById("discount")?.addEventListener("input",recalcBill);
 recalcBill();
});
