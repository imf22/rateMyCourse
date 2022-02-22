/*
ADD YOUR CLIENT-SIDE CODE FOR search.html HERE
*/

let button = document.getElementById("submit");
let msg = document.getElementById("message");


button.addEventListener("click", function(){    
    let dropdown = document.getElementById("genre");
    let genre =  dropdown.options[dropdown.selectedIndex].value
    

    console.log(`Genre: ${genre}`)
    
	fetch(`http://localhost:3000/search?genre=${genre}`)
    .then(response => response.json())
	.then(data => {
		console.log("Data:", data.rows);
        
        let table = document.getElementById("books");

        if (msg.childNodes.length !== 0){
            msg.removeChild(msg.firstChild);
        }

        if (table.childNodes !== 0){
            while (table.firstChild !== null){
                table.removeChild(table.firstChild);
            }
        }

        if (data.rows.length === 0 )
        {
            msg.appendChild(document.createTextNode("No books found"));
        } 
        else {
            for (let entry of data["rows"]){
                let newTr = document.createElement("tr");
                let newTd1 = document.createElement("td");
                let newTd2 = document.createElement("td");
                let newTd3 = document.createElement("td");
        
                newTd1.textContent= entry["title"];
                newTd2.textContent= entry["genre"];
                if (entry["quality"]){
                    newTd3.textContent= 'Yes';
                }
                else{
                    newTd3.textContent= 'No';
                }
        
                newTr.appendChild(newTd1);
                newTr.appendChild(newTd2);
                newTr.appendChild(newTd3);

                table.appendChild(newTr);
            }
        }
	})
})