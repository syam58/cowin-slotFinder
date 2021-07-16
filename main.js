
let districts_url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/17'


var url_states = 'https://cdn-api.co-vin.in/api/v2/admin/location/states' ;

const pin_input = document.getElementById("pin-input");

const pin_btn = document.getElementById("pin-submit-btn");

let districts_container = document.getElementById("myDiv");

let centre_card = document.getElementById('main_card');


let buttons = document.querySelectorAll('state_btn');

let buttonsContainer = document.getElementById("stateDiv");

let today, d, m, y;
today = new Date();
d = today.getDate();
m = today.getMonth() + 1;
y = today.getFullYear();
today = `${d}-${m}-${y}`;


//fetch data by pincode

pin_btn.addEventListener('click' , () => {
  
  
  
  let pincode = pin_input.value;

  
  centre_card.innerHTML = "";
  if(pincode !== "" && pincode.length == 6){
    
    
    getCenter(pincode);
    
    
  }else{
    console.log("Pincode not found");
  }
});

//pincode function
function getCenter(pincode){

  var url_pin = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${today}` ;
  
  centre_card.innerHTML = '';
 //console.log("start");
 let loader = document.getElementById('loader')
 loader.classList.remove("hidden");
 
  fetch(url_pin).then(response => response.json()).then(data => {
      
      let slot_centers = []
      let center_details = {}
  
      
     if(data.centers.length > 0){
  
       //console.log(data.centers)
       data.centers.forEach(function(center){
           
           let center_details = {
             "name" :center.name,
             "address":center.address,"fee":center.fee_type,
             "slots":[]
           };
           
           
            slot_centers.push(center_details);
           
           let session_details = []
          //console.log(center);
          if (center.sessions.length > 0) {
             center.sessions.forEach(function(session){
               
               //console.log(session.date);
               
               if (session.available_capacity_dose1 > 0 || session.available_capacity_dose2 > 0) {
                 
                 let session_date = {
                 "date":session.date,"dose1":session.available_capacity_dose1,"dose2":session.available_capacity_dose2
               }; center_details['slots'].push(session_date);
    
                 
                 
               }else{
                 
                 
                 //console.log("No slots available");
               }
               
             })
             
            //console.log(center.sessions);
          
          }else{
            
            console.log("No sessions found");
          }
          //console.log(session_date);
          
          
          
       })
       
       
       //console.log(session_details);
       
     }else{
       
       //pincode not found error
       console.log("No centers found");
     }
     
    
     slot_centers = slot_centers.filter(hospital => hospital.slots.length != 0 )
     
     if (slot_centers.length > 0) {
        
         //console.log(slot_centers);
         
         slot_centers.map(center => {
           console.log(center);
            function tableData (data){
             return `<tr><td>${data.date}</td><td>${data.dose1}</td><td>${data.dose2}</td></tr>`;
              
            } 
            
            
            
            let tableHead = `<table class="table"><thead class="thead-dark"><tr><th scope="col">Date</th><th scope="col">Dose 1</th><th scope="col">Dose 2</th></tr></thead><tbody> `;
            
            let tableEnd = ` </tbody></table>`;
            
            
            centre_card.innerHTML += `<div class="card"><h3 class="text-primary p-2 text-center"><span>${center.name}</span></h3><div class = "card-body" ><p>${center.address}</p><p> Fee type: <span class="text-white  fee ${center.fee == "Paid" ? 'bg-warning' : 'bg-success'} p-2">${center.fee}</span></p> </div>
            ${tableHead}
            ${center.slots.map(tableData).join("")}
            ${tableEnd}
            </div>`
           
         })
         
         //console.log("done");
         loader.classList.add("hidden");
         
     }else{
       
       loader.classList.add("hidden");
       
       centre_card.innerHTML += `
           <h3 class="">Wait for new vaccine </h3>`

       //console.log("Wait for vaccine");
     }
       
});
};










//districts fetching

fetch(districts_url).then(response => response.json()).then(data => {
  
   
   //console.log(data.districts);
    buttonsContainer.innerHTML += data.districts.map(function(district){
      //console.log(district)
      
      return `
      <button class="btns btn btn-primary " onclick="getdistrictSession(${district.district_id})">${district.district_name}</button>`
      
    }).join('')
   
      
});

//district details function

function getdistrictSession(districtId){

  let session_districts = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${today}`
  
  centre_card.innerHTML = '';
 //console.log("start");
 let loader = document.getElementById('loader')
 loader.classList.remove("hidden");
 
  fetch(session_districts).then(response => response.json()).then(data => {
      
      let slot_centers = []
      let center_details = {}
  
      
     if(data.centers.length > 0){
  
       //console.log(data.centers)
       data.centers.forEach(function(center){
           
           let center_details = {
             "name" :center.name,
             "address":center.address,"fee":center.fee_type,
             "slots":[]
           };
           
           
            slot_centers.push(center_details);
           
           let session_details = []
          //console.log(center);
          if (center.sessions.length > 0) {
             center.sessions.forEach(function(session){
               
               //console.log(session.date);
               
               if (session.available_capacity_dose1 > 0 || session.available_capacity_dose2 > 0) {
                 
                 let session_date = {
                 "date":session.date,"dose1":session.available_capacity_dose1,"dose2":session.available_capacity_dose2
               }; center_details['slots'].push(session_date);
    
                 
                 
               }else{
                 
                 
                 //console.log("No slots available");
               }
               
             })
             
            //console.log(center.sessions);
          
          }else{
            
            console.log("No sessions found");
          }
          //console.log(session_date);
          
          
          
       })
       
       
       //console.log(session_details);
       
     }else{
       
       //pincode not found error
       console.log("No centers found");
     }
     
    
     slot_centers = slot_centers.filter(hospital => hospital.slots.length != 0 )
     
     if (slot_centers.length > 0) {
        
         //console.log(slot_centers);
         
         slot_centers.map(center => {
           console.log(center);
            function tableData (data){
             return `<tr><td>${data.date}</td><td>${data.dose1}</td><td>${data.dose2}</td></tr>`;
              
            } 
            
            
            
            let tableHead = `<table class="table"><thead class="thead-dark"><tr><th scope="col">Date</th><th scope="col">Dose 1</th><th scope="col">Dose 2</th></tr></thead><tbody> `;
            
            let tableEnd = ` </tbody></table>`;
            
            
            centre_card.innerHTML += `<div class="card"><h3 class="text-primary p-2 text-center"><span>${center.name}</span></h3><div class = "card-body" ><p>${center.address}</p><p> Fee type: <span class="text-white  fee ${center.fee == "Paid" ? 'bg-warning' : 'bg-success'} p-2">${center.fee}</span></p> </div>
            ${tableHead}
            ${center.slots.map(tableData).join("")}
            ${tableEnd}
            </div>`
           
         })
         
         //console.log("done");
         loader.classList.add("hidden");
         
     }else{
       
       loader.classList.add("hidden");
       
       centre_card.innerHTML += `
           <h3 class="">Wait for new vaccine </h3>`

       //console.log("Wait for vaccine");
     }
    
     
     
     
     
       
});
};




