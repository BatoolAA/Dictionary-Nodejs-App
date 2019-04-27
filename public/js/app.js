console.log("static js file")

function fetchDefinition(){
    const textBox = document.getElementById("txtWord")
    const word = textBox.value
    textBox.value = ""

    const url = 'http://localhost:3000/search?word=' + word

    fetch(url).then((response) => {
        return response.json()
    }).then((res) => {
        if(res.error){
            console.log(res.error)
        }
        else{
            document.getElementById('h1Word').textContent = res.data.word
            document.getElementById('h3Def').textContent = res.data.definition
        }
    }).catch((e) => {
        console.log(res.data)
    })
}