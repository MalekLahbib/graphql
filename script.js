
var result = []
var recursiveRequest = (url,offset = 0) => 
  fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          
          transaction(where: {_and: [{user: {id: {_eq: 1372}}}]}, offset: ${offset}, order_by: {createdAt: asc}) {
            user{
              id
              login
            }
            createdAt
            amount
            type
            path
            object {
              id
              name
              type
            }
          }
        }
        `
      })
  }).then((res) => {
    return res.json();
  }).then((data)=>{
    // console.log(data);
    result.push(...data.data.transaction)
    if (data.data.transaction.length==50) {
      offset += 50
      // console.log(offset, ", res = ",dat);
      recursiveRequest(url,offset);
    } else {
      console.log(result);
      dataAnalyse(result)
    }
  });

url = "https://zone01normandie.org/api/graphql-engine/v1/graphql"

recursiveRequest(url,0)


const svgns = "http://www.w3.org/2000/svg";
let xpsvg = document.getElementById("xpsvg")
let auditsvg = document.getElementById("auditsvg")
xpsvg.setAttribute("visibility", "hidden")
auditsvg.setAttribute("visibility", "hidden")

let gtotalxp = document.createElementNS(svgns,'g')
let gdetailxp = document.createElementNS(svgns,'g')
let pathsvg = document.createElementNS(svgns,'path')
let gauditup = document.createElementNS(svgns,'g')
let gauditdown = document.createElementNS(svgns,'g')
let pathup = document.createElementNS(svgns,'path')
let pathdown = document.createElementNS(svgns,'path')

var totalXP = 0;
let auditUp = 0;
let auditDown = 0;
let skilldisp = false
var dataAnalyse = (result) => {
  document.getElementById("nom-prenom").innerText = result[0].user.login
  document.getElementById("welcome").innerText = 'Welcome, ' + result[0].user.login + '!'
  // let count = 0;
  let res =[]
  for (let i=0; i<result.length;i++){
    if (result[i].type == "xp") {
      for (let j=i+1;j<result.length;j++){
        if (result[j].type == "xp" && result[i].path == result[j].path && !result[i].path.includes("checkpoint")) {
          if (result[i].amount < result[j].amount){
            result[i]= {}
            break
          } else {
            result[j]={}
          }
        }
      }
    }
  }
  
  let level = 0
  let xptab = []
  let auditupTab = []
  let auditdownTab = []
  let skillstab = {}
  for (let data of result){
    if (Object.keys(data).length == 0) continue;
    //if (_.isEmpty(data)) console.log("vide");
    if (data.type=="xp") {
      if (data.path.includes("/rouen/div-01") && data.path.split('/').length<6) {
        // console.log(data);
        totalXP += data.amount
        xptab.push(data)
      }
    } else if (data.type =="up"){
      auditUp += data.amount
      auditupTab.push(data)
    }else if (data.type == "down"){
      auditDown += data.amount
      auditdownTab.push(data)
    }else if (data.type == "level"){
      if (data.amount > level) level = data.amount
    }else if (data.type.includes("skill")) {
      key = data.type.split("skill_")[1]
      if (skillstab[key] == undefined || skillstab[key] < data.amount)  skillstab[key] = data.amount
      
    }   
  } 
  
  // console.log(skillstab);
  // console.log("totalXP : ",totalXP);
  // console.log(auditUp, auditDown);
  document.getElementById("xpbutton").innerHTML += Math.round(totalXP/1000) + " kB" 
  document.getElementById("lvlbutton").innerHTML += level
  // document.getElementById("welcome").innerHTML += "<br>" + "Audits DOWN: " + (auditDown/1000000).toFixed(2) + "MB"
  document.getElementById("auditbutton").innerHTML += (auditUp/auditDown).toFixed(1)

  
  displayxp(xptab)
  displayAudit(auditupTab, auditdownTab)
  displayskills(skillstab)
  window.addEventListener("resize",()=>{
    displayxp(xptab)
    displayAudit(auditupTab, auditdownTab)
    displayskills(skillstab)
  })
  
}

document.getElementById("xpbutton").addEventListener("click", ()=>{
  xpsvg.setAttribute("visibility","default")
})
document.getElementById("auditbutton").addEventListener("click", ()=>{
  auditsvg.setAttribute("visibility","default")
})

document.getElementById("skillsbutton").addEventListener("click", ()=>{
  let skillsdivs = document.getElementById("skillsdivs")
  skillsdivs.style.display = "flex"
  document.getElementById("skillimg").addEventListener("click", ()=>{
    let skillsdivs = document.getElementById("skillsdivs")
    skillsdivs.style.display = "none"
  })
})

// then(function (data) {
//     // Do something with data
//     console.log("data: ",data);
//     // var total = 0
//     // data.data.transaction.forEach(element => {
//     //   total += element["amount"]
//     //   document.body.innerHTML += element["amount"] + '<br>'
//     // });
//     // console.log('total',total);
//   });

