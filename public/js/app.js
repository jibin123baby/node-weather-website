const weatherForm= document.querySelector('form');
const search= document.querySelector('input');
const messageOne= document.querySelector('#messageOne');
const messageTwo= document.querySelector('#messageTwo');
const messageThree= document.querySelector('#messageThree');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    messageOne.textContent= 'Loading...';
    messageTwo.textContent= '';
    messageThree.textContent='';

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent= data.error;
        }else{
            messageOne.textContent= data.location;
            messageTwo.textContent=data.forecast;
            messageThree.textContent="Humidity "+data.humidity;
        }
    });
});
})