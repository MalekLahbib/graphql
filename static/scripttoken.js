
showgraphQLdata()

function showgraphQLdata() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMzcyIiwiaWF0IjoxNjgwNTE2MDkxLCJpcCI6IjgwLjEyLjkyLjQ5LCAxNzIuMTguMC4yIiwiZXhwIjoxNjgwNjAyNDkxLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1jYW1wdXNlcyI6Int9IiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiIxMzcyIiwieC1oYXN1cmEtdG9rZW4taWQiOiJmMjI1ZDhjYy1jZTA1LTRlM2YtYjc4Mi01YWEyYzk2MjU4ODkifX0.TGEWmUCeS05SucdK4HklkwO7hzG4aQmV7Ldup2Gf_Ds"
  const query = `
  query {
    user {
      firstName
      lastName
      attrs
    }
    transaction(
      where: {_and: [{type: {_eq: "xp"}}, {eventId: {_eq: 32}}]}
      order_by: {createdAt: desc}
    ) {
      amount
      type
      createdAt
      object {
        id
        name
      }
    }
  }
  `;
  fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: token && {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
          query
      })
  }).then(function (response) {
      responseClone = response.clone(); // 2
      return response.json();
    })
    .then(function (data) {
      // Do something with data
      console.log(data);
    //   data.data.user.forEach(element => {
        
    //     document.body.innerHTML += '<br>' + element["results"]
    //   });
      var total = 0
      data.data.user.forEach(element => {
        document.getElementById("nom-prenom").innerText = element["firstName"] + '  ' + element["lastName"]
        document.getElementById("welcome").innerText = 'Welcome, ' + element["firstName"] + '  ' + element["lastName"] + '!'
      });
      main = document.getElementsByClassName("main")[0]
      data.data.transaction.forEach(element => {
        total += element["amount"]
        linedisp = document.createElement('div')
        linedisp.className = 'linedisp w100'
        linedispelem = document.createElement('div')
        linedispelem.className = 'linedispelem'
        linedispelem.innerHTML = element["object"]["name"]
        linedisp.appendChild(linedispelem) 
        linedispelem = document.createElement('div')
        linedispelem.className = 'linedispelem'
        linedispelem.innerHTML = element["amount"]
        linedisp.appendChild(linedispelem) 
        linedispelem = document.createElement('div')
        linedispelem.className = 'linedispelem'
        date = element["createdAt"].split('T')
        linedispelem.innerHTML = date[0] + ' at ' + date[1].split('.')[0]
        linedisp.appendChild(linedispelem) 
        
        main.appendChild(linedisp)
      })
      console.log('total',total);
    }, function (rejectionReason) { // 3
        console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
        responseClone.text() // 5
        .then(function (bodyText) {
            console.log('Received the following instead of valid JSON:', bodyText); // 6
        });
    });
  
}
