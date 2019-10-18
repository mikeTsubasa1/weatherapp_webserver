console.log("client side js loaded!!");
// fetch(`http://localhost:3000/weather?address=boston`).then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const location1 = document.querySelector(`input[name='location']`);
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const locationValue = location1.value;
    console.log(locationValue); 
    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${locationValue}`).then((response)=>{
        response.json().then((data)=>{
            console.log(data);
            if(data.message)
            {
                message1.textContent = 'Had some issues in contacting the weather service.below is the error';
                message2.textContent = data.message;
            }
            else{
                message1.textContent = 'Weather Result';
                message2.textContent = data.summary;
            }
        })
    })

})