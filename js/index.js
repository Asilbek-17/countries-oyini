const elTitle = document.querySelector(".savol-js");
const elText = document.querySelectorAll(".variantlar");
const elAnswerList = document.querySelector(".answer-list");
const elCountText = document.querySelector('.savollarsoni-js')
const elTime = document.querySelector('.time')
let countriesArr = [{}];

let topilganJavob = 0;
let savollar = 10;


shuffle(countriesArr);
function shuffle(arr) {
    let current = arr?.length,
    temp,
    random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        
        current--;
        
        temp = arr[current];
        
        arr[current] = arr[random];
        
        arr[random] = temp
    }
    
    return arr
}

function renderSymbolsTitle (arr) {
    elTitle.textContent =  arr[0].name.common;
    elTitle.dataset.id = arr[0].name.common;
}

function renderSymbols(arr) {
    arr.forEach(itm => {
        const newText = document.createElement("p");
        
        newText.classList.add("text");
        
        newText.innerHTML = itm?.capital;
        newText.dataset.id = itm.name.common;
        // elScoreOneText.textContent = `Score : ${scoreOne}`;
        // elScoreText.textContent = `Attemp : ${attemp}`;
        
        elAnswerList.appendChild(newText);
    })
}

async function getCountries(url) {
    try {
        const rec = await fetch(url);
        
        const data = await rec.json();
        
        shuffle(data);
        
        let a = data?.splice(0 , 4);
        renderSymbols(a);
        shuffle(a);
        renderSymbolsTitle(a);
        
        
    } catch (error) {
        console.log(error);
    }
}

let i = 16;

let myinterval =  setInterval(function(){
    i -= 1;
    elTime.innerHTML = i;
    
    if(i == 0 || savollar == 0) {
        clearInterval(myinterval)
        const newBtn = document.createElement('button');
        const newBox = document.createElement('div');
        const newText = document.createElement('p');

        
        newBtn.innerHTML = 'New Game';
        newText.innerHTML = "To'g'ri javoblar soni: " + topilganJavob;


        newBtn.classList = 'buttun-new';
        newBox.classList = 'box-new';
        newText.classList = 'text-new';
        
        newBox.appendChild(newBtn);
        newBox.appendChild(newText);
        document.body.appendChild(newBox);

        
        

        
        newBtn.addEventListener('click', function(){
            window.location.reload()
        })
    } 
}, 1000)




elAnswerList.addEventListener('click', function(evt){
    const target = evt.target;
    console.log(target);
    
    
    if(target.dataset.id == elTitle.textContent){
        
        target.classList.add('green');
        
        i = 16;    
        topilganJavob += 1;
        savollar -= 1;
        elCountText.innerHTML = savollar;
        
        
        if(topilganJavob == 10) {
            console.log('galabaa');
        }
        
        setTimeout(function(){
            getCountries("https://restcountries.com/v3.1/all")
            elAnswerList.innerHTML = ''
        }, 500)
        
    } else {

        target.classList.add('red');

        i = 16;    
        savollar -= 1;
        elCountText.innerHTML = savollar;

        setTimeout(function(){
            getCountries("https://restcountries.com/v3.1/all")
            elAnswerList.innerHTML = ''
        }, 500)
    }
})





getCountries("https://restcountries.com/v3.1/all")




















