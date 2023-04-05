

function displayxp(xptab){
    let width = xpsvg.clientWidth -100
    let height = xpsvg.clientHeight-100
    let cx = 55
    let cyd = height+50
    let cy = 0
    let marginx = width / xptab.length
    let pathd ="M"
    //let path2 = "M"
    polyline = document.getElementById("polyline")
    polyline.setAttribute('points',cx+','+cy+50+" "+cx+","+(height+60)+" " + (width+50)+","+(height+60))
    xaxis = document.getElementById("xaxis")
    xaxis.setAttribute('x',width/2)
    xaxis.setAttribute('y',height+80)
    closex = document.getElementById("closeX")
    closex.setAttribute("cx",width+70)
    xcross = document.getElementById("xcross")
    xcross.setAttribute('d',"M "+(width+60)+","+10+" l 20,20 M "+(width+80)+",10 l -20,20")
    gtotalxp.innerHTML =""
    gdetailxp.innerHTML = ""
    pathsvg.innerHTML = ""
    for (let i in xptab){
      let group = document.createElementNS(svgns,'g')
      let text = document.createElementNS(svgns,'text')
      let circled = document.createElementNS(svgns, 'circle')
      cyd -= xptab[i].amount / totalXP * height 
      text.setAttribute("font-size","12px")
      text.setAttribute("stroke-width","0") 
      text.setAttribute("fill","var(--red)") 
      text.setAttribute("text-anchor","middle")
      text.setAttribute("x", cx)
      text.setAttribute("y",cyd)
      text.setAttribute("opacity","1")
      let date = xptab[i].createdAt.split('T')[0]
      let xpamount = (xptab[i].amount/1000).toFixed(2)
      text.innerHTML = "<tspan text-anchor='middle' x=" + cx + " dy=" + -30 + ">"+ date + "</tspan><tspan text-anchor='middle' x=" + cx +" dy=" + 15 + ">+"+ xpamount +" kB</tspan>"
      circled.setAttribute('cx',cx)
      circled.setAttribute('cy',cyd) 
      circled.setAttribute('r',2) 
      circled.setAttribute('fill', "transparent")
      circled.setAttribute('stroke', "white") 
      circled.setAttribute('stroke-width','2')
      if (i!=0) {
        group.classList="hoverlabel"
        text.setAttribute("opacity","0")
      }
      group.appendChild(circled)
      group.appendChild(text)
      gtotalxp.appendChild(group)
      if (i==0) pathd += cx + ',' + cyd
      else pathd += 'L' + cx + ',' + cyd
      let circle = document.createElementNS(svgns, 'circle')
      circle.setAttribute('cx',cx)
      cy = height - xptab[i].amount / totalXP * height + 50
      circle.setAttribute('cy',cy) 
      circle.setAttribute('r',2) 
      circle.setAttribute('fill', "transparent")
      circle.setAttribute('stroke', "white") 
      circle.setAttribute('stroke-width','2')
      gdetailxp.appendChild(circle)
      cx += marginx
    }
    pathsvg.setAttribute('d',pathd)
    pathsvg.setAttribute('stroke',"#000")
    pathsvg.setAttribute('stroke-width',"2")
    pathsvg.setAttribute('fill','none')
    xpsvg.appendChild(pathsvg)
    xpsvg.appendChild(gtotalxp)
    xpsvg.appendChild(gdetailxp)
    let totalxp = document.getElementById("totalxp")
    totalxp.setAttribute('x',width/2)
    totalxp.setAttribute('y',100)
    totalxp.innerHTML = " Total XP: "+ Math.round(totalXP/1000) + " kB"
}
  

function displayAudit(auditupTab,auditdownTab) {
  let auwidth = auditsvg.clientWidth -100
  let auheight = auditsvg.clientHeight-100
  let cx = 55
  let cyd = auheight+50
  let cy = 0
  let maxy = Math.max(auditDown,auditUp)
  let pathd ="M"
  let path2 = "M"
  let patha = "M"
  aupolyline = document.getElementById("auditpolyline")
  aupolyline.setAttribute('points',cx+','+(cy+50)+" "+cx+","+(auheight+60)+" " + (auwidth+50)+","+(auheight+60))
  xaxis = document.getElementById("auditxaxis")
  xaxis.setAttribute('x',auwidth/2)
  xaxis.setAttribute('y',auheight+80)
  closex = document.getElementById("auditcloseX")
  closex.setAttribute("cx",auwidth+70)
  xcross = document.getElementById("auditxcross")
  xcross.setAttribute('d',"M "+(auwidth+60)+","+10+" l 20,20 M "+(auwidth+80)+",10 l -20,20")
  gauditdown.innerHTML = ''
  gauditup.innerHTML = ''
  pathdown.innerHTML = ''
  pathup.innerHTML = ''
  
  for (let i in auditdownTab){
    let group = document.createElementNS(svgns,'g')
    let text = document.createElementNS(svgns,'text')
    let circled = document.createElementNS(svgns, 'circle')
    let marginx = auwidth / auditdownTab.length

    cyd -= auditdownTab[i].amount / maxy * auheight 
    text.setAttribute("font-size","12px")
    text.setAttribute("stroke-width","0") 
    text.setAttribute("fill","var(--red6)") 
    text.setAttribute("text-anchor","middle")
    text.setAttribute("x", cx)
    text.setAttribute("y",cyd)
    text.setAttribute("opacity","1")
    let date = auditdownTab[i].createdAt.split('T')[0]
    let auditdown = (auditdownTab[i].amount/1000).toFixed(2)
    text.innerHTML = "<tspan text-anchor='middle' x=" + cx + " dy=" + -30 + ">"+ date + "</tspan><tspan text-anchor='middle' x=" + cx +" dy=" + 15 + ">-"+ auditdown +" kB</tspan>"
    circled.setAttribute('cx',cx)
    circled.setAttribute('cy',cyd) 
    circled.setAttribute('r',2) 
    circled.setAttribute('fill', "transparent")
    circled.setAttribute('stroke', "white") 
    circled.setAttribute('stroke-width','2')
    if (i!=0) {
      group.classList="hoverlabel"
      text.setAttribute("opacity","0")
    }
    group.appendChild(circled)
    group.appendChild(text)
    gauditdown.appendChild(group)
    if (i==0) pathd += cx + ',' + cyd
    else pathd += 'L' + cx + ',' + cyd
    cx += marginx
  }
  cx = 55
  cyd = auheight+50
  cy = 0
  for (let i in auditupTab){
    let group = document.createElementNS(svgns,'g')
    let text = document.createElementNS(svgns,'text')
    let circled = document.createElementNS(svgns, 'circle')
    let marginx = auwidth / auditupTab.length

    cyd -= auditupTab[i].amount / maxy * auheight 
    text.setAttribute("font-size","12px")
    text.setAttribute("stroke-width","0") 
    text.setAttribute("fill","var(--green)") 
    text.setAttribute("text-anchor","middle")
    text.setAttribute("x", cx)
    text.setAttribute("y",cyd)
    text.setAttribute("opacity","1")
    let date = auditupTab[i].createdAt.split('T')[0]
    let auditup = (auditupTab[i].amount/1000).toFixed(2)
    text.innerHTML = "<tspan text-anchor='middle' x=" + cx + " dy=" + -30 + ">"+ date + "</tspan><tspan text-anchor='middle' x=" + cx +" dy=" + 15 + ">+"+ auditup +" kB</tspan>"
    circled.setAttribute('cx',cx)
    circled.setAttribute('cy',cyd) 
    circled.setAttribute('r',2) 
    circled.setAttribute('fill', "transparent")
    circled.setAttribute('stroke', "white") 
    circled.setAttribute('stroke-width','2')
    if (i!=0) {
      group.classList="hoverlabel"
      text.setAttribute("opacity","0")
    }
    group.appendChild(circled)
    group.appendChild(text)
    gauditup.appendChild(group)
    if (i==0) path2 += cx + ',' + cyd
    else path2 += 'L' + cx + ',' + cyd
    cx += marginx
  }
  // display audit ratio
  cx = 55
  cyd = auheight+50
  cy = 0
  for (let i in auditTab){
    let group = document.createElementNS(svgns,'g')
    let text = document.createElementNS(svgns,'text')
    let circled = document.createElementNS(svgns, 'circle')
    let marginx = auwidth / auditTab.length
    let auditUpratio = 0
    let auditDownratio = 0
    let ratio = 1
    cyd -= auditTab[i].amount / maxy * auheight 
    text.setAttribute("font-size","12px")
    text.setAttribute("stroke-width","0") 
    text.setAttribute("fill","var(--green)") 
    text.setAttribute("text-anchor","middle")
    text.setAttribute("x", cx)
    text.setAttribute("y",cyd)
    text.setAttribute("opacity","1")
    let date = auditTab[i].createdAt.split('T')[0]
    if (auditTab[i].type == "up") auditUpratio += auditTab[i].amount
    else auditDownratio += auditTab[i].amount
    if (auditUpratio != 0 && auditDownratio != 0) ratio = auditUpratio / auditDownratio
    text.innerHTML = "<tspan text-anchor='middle' x=" + cx + " dy=" + -30 + ">"+ date + "</tspan><tspan text-anchor='middle' x=" + cx +" dy=" + 15 + ">+"+ ratio +" kB</tspan>"
    circled.setAttribute('cx',cx)
    circled.setAttribute('cy',cyd) 
    circled.setAttribute('r',2) 
    circled.setAttribute('fill', "transparent")
    circled.setAttribute('stroke', "white") 
    circled.setAttribute('stroke-width','2')
    if (i!=0) {
      group.classList="hoverlabel"
      text.setAttribute("opacity","0")
    }
    group.appendChild(circled)
    group.appendChild(text)
    gauditratio.appendChild(group)
    if (i==0) patha += cx + ',' + cyd
    else patha += 'L' + cx + ',' + cyd
    cx += marginx
  }
  pathdown.setAttribute('d',pathd)
  pathdown.setAttribute('stroke',"red")
  pathdown.setAttribute('stroke-width',"2")
  pathdown.setAttribute('fill','none')
  pathup.setAttribute('d',path2)
  pathup.setAttribute('stroke',"green")
  pathup.setAttribute('stroke-width',"2")
  pathup.setAttribute('fill','none')
  pathratio.setAttribute('d',patha)
  pathratio.setAttribute('stroke',"red")
  pathratio.setAttribute('stroke-width',"2")
  pathratio.setAttribute('fill','none')
  auditsvg.appendChild(pathdown)
  auditsvg.appendChild(pathup)
  auditsvg.appendChild(pathratio)

  auditsvg.appendChild(gauditdown)
  auditsvg.appendChild(gauditup)
  let audits = document.getElementById("audits")
  audits.setAttribute('x',auwidth/2)
  audits.setAttribute('y',100)
  audits.innerHTML = "<tspan text-anchor='middle' fill='var(--green4)' x="+ auwidth/2 + " dy=" + -30 + "> Audits UP: "+ (auditUp/1000000).toFixed(2) + " MB</tspan><tspan text-anchor='middle' fill='red' x="+ auwidth/2 + " dy=" + 45 + "> Audits Down: "+ (auditDown/1000000).toFixed(2) + " MB</tspan><tspan text-anchor='middle' fill='orange' x="+ auwidth/2 + " dy=" + 45 + "> Audits ratio: "+ (auditUp/auditDown).toFixed(1) + "</tspan>" 
}

function displayskills(skillstab) {
  let skillsdivs = document.createElement('div')
  skillsdivs.className = "skillsdivs"
  skillsdivs.id = "skillsdivs"
  let skillsdiv = document.createElement('div')
  skillsdiv.className = "skillsdiv"
  let title = document.createElement('span')
  title.className = ("skillsdivtitle")
  title.innerHTML = "Skills"
  skillsdivs.appendChild(title)
  let skillimg = document.createElement('img')
  skillimg.className = "skillimg"
  skillimg.id = "skillimg"
  skillsdivs.appendChild(skillimg)
  for (let skill in skillstab){
    let divskill = document.createElement('div')
    divskill.className = "divskill"
    let spanskill = document.createElement('span')
    spanskill.innerText = skill
    divskill.appendChild(spanskill)
    let skilldiv = document.createElement('div')
    skilldiv.className = "animated-progress"
    let spanprogress = document.createElement('span')
    spanprogress.setAttribute('data-progress',skillstab[skill])
    spanprogress.style.width = skillstab[skill]+"%"
    spanprogress.innerText = skillstab[skill]+"%"
    skilldiv.appendChild(spanprogress)
    divskill.appendChild(skilldiv)
    skillsdiv.appendChild(divskill)
  }
  skillsdivs.appendChild(skillsdiv)
  document.getElementsByClassName("main")[0].appendChild(skillsdivs)
  skillsdivs.style.display = "none"
  // document.getElementsByClassName("animated-progress span").foreach(function () {
  //   $(this).animate(
  //     {
  //       width: $(this).attr("data-progress") + "%",
  //     },
  //     1000
  //   );
  //   $(this).text($(this).attr("data-progress") + "%");
  // });
}