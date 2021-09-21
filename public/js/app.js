

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    message1.textContent = 'Loading....'
    message2.textContent = ''
    const location = search.value
    fetch(`http://localhost:5000/weather?address=${location}`).then((result) => {
        result.json().then((data) => {
            // console.log(data)
            if(data.error){
                message1.textContent = data.error  
            }
            else{
                message1.textContent = data.location 
                message2.textContent = data.forecast 
            }
            
            
        })
        // console.log(result)
    }).catch((error) => {
        // console.log(error)
        message2.textContent = error 
    })
    // console.log(location)
})