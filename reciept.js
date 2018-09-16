
let cart = [];


function r(){
    if(cart.length>0){
        cart.pop();
        document.getElementById("table").deleteRow(cart.length+1);

        let nitems = document.getElementById("n-items");
            
        nitems.innerHTML = cart.length;
        let tprice = document.getElementById("total_price");
        tprice.innerHTML = "$"+(cart.length*1.00);
    }
}

function clearTable(){
	while(cart.length > 0){
	cart.pop();
        document.getElementById("table").deleteRow(cart.length+1);

        let nitems = document.getElementById("n-items");
            
        nitems.innerHTML = cart.length;
        let tprice = document.getElementById("total_price");
        tprice.innerHTML = "$"+(cart.length*1.00);
	}
}

function display() {

        let item = String(document.getElementById("result").innerHTML);

        if(item != "..."){
            cart.push(item);
            fruitName = cart[cart.length-1];
            var table = document.getElementById("table");
            let row = table.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = fruitName;
            cell2.innerHTML = "N/A";
            cell3.innerHTML = "$1.00";


            let nitems = document.getElementById("n-items");
            
            nitems.innerHTML = cart.length;

            let tprice = document.getElementById("total_price");
            tprice.innerHTML = "$"+(cart.length*1.00);
        }
}