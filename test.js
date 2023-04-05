function getJwtToken() {
    return sessionStorage.getItem("hasura-jwt-token")
}

function setJwtToken(token) {
    sessionStorage.setItem("jwt", token)
}
document.getElementById("loginbutton").onclick = ()=>{
    //console.log("JWT: ",getJwtToken());
    getToken()
}

function getToken() {
    let name = document.getElementsByName("uname")[0].value
    let pwd = document.getElementsByName("psw")[0].value
    //console.log("name:",name," pwd:",pwd)
    let encoded = btoa(name+':'+pwd)
    console.log("encoded: ",encoded);
    fetch("https://zone01normandie.org/api/auth/signin", {
        method: 'POST',
        headers: {
            mode: 'cors',
            Authorization: `Basic ${encoded}`,
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{console.log(data);})
}