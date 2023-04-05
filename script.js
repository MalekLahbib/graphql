// let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMzcyIiwiaWF0IjoxNjgwNjE2NjU0LCJpcCI6IjgwLjEyLjkyLjQ5LCAxNzIuMTguMC4yIiwiZXhwIjoxNjgwNzAzMDU0LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1jYW1wdXNlcyI6Int9IiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiIxMzcyIiwieC1oYXN1cmEtdG9rZW4taWQiOiI5YTk2YTJjYy00YWFlLTQ2ZjYtOGQ1Zi1kZWUzYTAzNDIzZDEifX0.rnl0VHwNu5EZ1dMxIJRPDib7uDAei35i4SBf4A4a3mg"
// localStorage.setItem("token",token)
url = "https://zone01normandie.org/api/graphql-engine/v1/graphql"
let token 
//localStorage.clear()
let main = `<div class="main" id="main">
<div class="welcome" id="welcome" style="position: relative"></div>
<div class="buttons">
  <div id="xpbutton" class="bouton" cursor="pointer" title="click to see details.">
    Total XP :&nbsp
  </div>
  <div id="lvlbutton" class="bouton">
    Level : 
  </div>
  <div id="auditbutton" class="bouton" title="click to see details.">
    Audit ratio :&nbsp
  </div>
  <div id="skillsbutton" class="bouton" title="click to see details.">
    Skills 
  </div>
</div>
<svg id="xpsvg">
  <defs>
    <marker id="arrowheadxp" markerWidth="10" markerHeight="7" 
    refX="0" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" />
    </marker>
    <marker id="yarrowheadxp" markerWidth="10" markerHeight="7" 
    refX="0" refY="3.5" orient="auto-start-reverse">
      <polygon points="0 0, 0 7,10 3.5" />
    </marker>
  </defs>
  <polyline id="polyline" points="55,50 55,750 950,750" fill="none" shape-rendering="crispEdges" stroke="#444" stroke-width="2" marker-start="url(#yarrowheadxp)" marker-end="url(#arrowheadxp)"></polyline>
  <text id="xaxis" x="450" y="770" fill="#000" font-family="Arial" font-size="14px" text-anchor="middle">Time</text>
  <text class="yaxis" x="40" y="400" fill="#000" font-family="Arial" font-size="14px" text-anchor="middle" style="writing-mode: tb;">XP amount</text>
  <text id="totalxp" x="400" y="200" fill="#000" font-family="Arial" font-size="32px" font-weight="700" text-anchor="middle"></text>
  <g onclick="{document.querySelector('svg').setAttribute('visibility','hidden')}">
    <circle id="closeX" cx="970" cy="20" r="20"  cursor="pointer">
      <title>Click to close!</title>
    </circle>
    <path id="xcross" d="M 950,0 l 40,40 M 1000,-10 l -50,50" stroke="red" stroke-width="2" cursor="pointer"/>
  </g>
</svg>
<svg id="auditsvg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
    refX="0" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" />
    </marker>
    <marker id="yarrowhead" markerWidth="10" markerHeight="7" 
    refX="0" refY="3.5" orient="auto-start-reverse">
      <polygon points="0 0, 0 7,10 3.5" />
    </marker>
  </defs>
  <polyline id="auditpolyline" points="55,50 55,750 950,750" fill="none" shape-rendering="crispEdges" stroke="#444" stroke-width="2" marker-start="url(#yarrowhead)" marker-end="url(#arrowhead)"></polyline>
  <text id="auditxaxis" x="450" y="770" fill="#000" font-family="Arial" font-size="14px" text-anchor="middle">Time</text>
  <text class="audityaxis" x="40" y="400" fill="#000" font-family="Arial" font-size="14px" text-anchor="middle" style="writing-mode: tb;">Audits</text>
  <text id="audits" x="400" y="200" fill="#000" font-family="Arial" font-size="32px" font-weight="700" text-anchor="middle"></text>
  <g onclick="{getElementById('auditsvg').setAttribute('visibility','hidden')}">
    <circle id="auditcloseX" cx="970" cy="20" r="20"  cursor="pointer">
      <title>Click to close!</title>
    </circle>
    <path id="auditxcross" d="M 950,0 l 40,40 M 1000,-10 l -50,50" stroke="red" stroke-width="2" cursor="pointer"/>
  </g>
</svg>
</div>`

let logincontain = ` <div class="logincontainer" id="logincontainer" >
<div width="100%">
    <label for="uname"><b>Username:</b></label>
    <input type="text" id="uname" placeholder="Enter Username" name="uname" required>
</div>
<div width="100%">
    <label for="psw"><b>Password:  </b></label>
    <input type="password" id="pwd" placeholder="Enter Password" name="psw" required>
</div>
<button type="submit" id="loginbutton" cursor="pointer">Login</button>
</div>`

if (localStorage.getItem("token")==undefined) {
  console.log("pas de token.");
  document.body.innerHTML += logincontain
  //logincontainer.style.display="flex"
  document.getElementById("disconnect-btn").style.display="none"
  document.getElementById("loginbutton").onclick = ()=>{
    //console.log("login");
    getToken()
  }
  //logincontainer.style.filter = 'none'
} else {
  // let logincontainer = document.getElementById("logincontainer")
  // logincontainer.style.display="none"
  //console.log(document.cookie);
  document.body.innerHTML+= main
  recursiveRequest(url)
}


function getToken() {
  let start = Date.now()
  let name = document.getElementsByName("uname")[0].value
  let pwd = document.getElementsByName("psw")[0].value
  //console.log("name:",name," pwd:",pwd)
  let encoded = btoa(name+':'+pwd)
  //console.log("encoded: ",encoded);
  fetch("https://cors-anywhere.herokuapp.com/https://zone01normandie.org/api/auth/signin", {
      method: 'POST',
      headers: {
          Authorization: `Basic ${encoded}`,
      }
  }).then((response)=>{
    console.log(Math.floor((Date.now()-start) / 1000));

    console.log(response);
    return response.json()
  }, (error)=>console.log("erreur response", error)
  ).then((data)=>{
    console.log(Math.floor((Date.now()-start) / 1000));
    if (data.error != undefined) {
      console.log("bad login or password");
      document.getElementById("uname").style.border = "2px solid red"
      document.getElementById("pwd").style.border = "2px solid red"
      document.getElementById("logincontainer").innerHTML += "<div style='color: red;'>bad login or password</div>"
      setTimeout(()=>{location.reload()},1500)
    }
    else {
      token = data
      localStorage.setItem("token",data)
      document.getElementById("logincontainer").remove()
      document.body.innerHTML+= main
      document.getElementById("disconnect-btn").style.display="default"
      recursiveRequest(url)
    }
  }, (response)=>console.log("erreur: ",response))
}

var transactions = []
var user
function recursiveRequest(url) {
  token = localStorage.getItem("token")
  console.log("token: ",token);
  fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: token && {
        Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          
          user{
            firstName
            lastName
            attrs
            id
            login
          }
          transaction(where: {eventId: {_eq: 32}}, order_by: {createdAt: asc}) {
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
    return res.json()
  }).then((data)=>{
    console.log(data);
    transactions.push(...data.data.transaction)
    user = data.data.user
    console.log("transactions: ",transactions);
    console.log("user :",user);
    //document.cookie = 'name: graphql; max-age= 86400;'
    dataAnalyse(transactions,user)
  });
}
  function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    console.log(cookies.length);
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.from(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
//deleteAllCookies()
// document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
// document.requestFullscreen();


const svgns = "http://www.w3.org/2000/svg";


let gtotalxp = document.createElementNS(svgns,'g')
let gdetailxp = document.createElementNS(svgns,'g')
let pathsvg = document.createElementNS(svgns,'path')
let gauditup = document.createElementNS(svgns,'g')
let gauditdown = document.createElementNS(svgns,'g')
let gauditratio = document.createElementNS(svgns,'g')
let pathup = document.createElementNS(svgns,'path')
let pathdown = document.createElementNS(svgns,'path')
let pathratio = document.createElementNS(svgns,'path')


var totalXP = 0;
let auditUp = 0;
let auditDown = 0;
let auditTab = []

var dataAnalyse = (result,user) => {
  document.getElementById("nom-prenom").innerText = user[0].firstName + " " + user[0].lastName
  document.getElementById("welcome").innerText = 'Welcome, ' + user[0].firstName + " " + user[0].lastName + '!'
  // let count = 0;
  // let res =[]
  // for (let i=0; i<result.length;i++){
  //   if (result[i].type == "xp") {
  //     for (let j=i+1;j<result.length;j++){
  //       if (result[j].type == "xp" && result[i].path == result[j].path && !result[i].path.includes("checkpoint")) {
  //         if (result[i].amount < result[j].amount){
  //           result[i]= {}
  //           break
  //         } else {
  //           result[j]={}
  //         }
  //       }
  //     }
  //   }
  // }
  
  let level = 0
  let xptab = []
  let auditupTab = []
  let auditdownTab = []
  let skillstab = {}
  let ratio = 0
  let ratioTab = []
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
      auditTab.push(data)
      ratio = auditUp / auditDown
      ratioTab.push(ratio.toFixed(1))
    }else if (data.type == "down"){
      auditDown += data.amount
      auditdownTab.push(data)
      auditTab.push(data)
    }else if (data.type == "level"){
      if (data.amount > level) level = data.amount
    }else if (data.type.includes("skill")) {
      key = data.type.split("skill_")[1]
      if (skillstab[key] == undefined || skillstab[key] < data.amount)  skillstab[key] = data.amount
    }   
  } 
  
  console.log(ratioTab);
  function findmax(tab) {
    let max = 0
    for (n of tab){
      if (n!= Infinity && n>max) max = n
    }
    return max
  }
  let max = findmax(ratioTab)
  //console.log(max);
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
  document.getElementById("disconnect-btn").onclick= ()=>{
    localStorage.clear()
    location.reload()
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
}
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

