
function handleSubmit(event) {
    let formText = document.getElementById('test-url').value

    if(Client.checkUrl(formText)) {

    const response  = await fetch ("/api", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(formText)
        }).then(res => res.json())
        .then(data => {
          document.getElementById("polarity").innerHTML = data.polarity;
          document.getElementById("subjectivity").innerHTML =
            data.subjectivity;
          document.getElementById("confidence").innerHTML =
            data.polarity_confidence;
          document.getElementById("irony").innerHTML =
            data.irony;
            document.getElementById("agreement").innerHTML =
            data.agreement;
        });
    } 
    else {
        alert('Seems like an invalid URL, please try with a valid URL.');
    }
}


// API response output (https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response)
const polarityChecker = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEW':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}

export { handleSubmit }
export { polarityChecker }