import './styles.css';
import Chart from 'chart.js/auto';
import moment from 'moment';

let baseUrl="https://api.github.com/users/";
let mayUserName="abdo0302";

                //get may  data for aside bar
// img flag de side bar                
let flag_sid=document.querySelector('.flag_sid')                
//img may avatar                
let image_aside=document.querySelectorAll('.image_aside')               
//h3 may name
let name_aside=document.querySelector('.name_aside')
//spn may bio
let bio_aside=document.querySelector('.bio_aside')
// spn may Followers
let Followers_aside=document.querySelector('.Followers_aside')
//spn may Following
let Following_aside=document.querySelector('.Following_aside')
//spn may Public Repos
let PublicRepos_aside=document.querySelector('.PublicRepos_aside')
// spn may Twitter
let Twitter_aside=document.querySelector('.Twitter_aside')
//spn may Blog
let Blog=document.querySelector('.Blog')
//
let text_Memober=document.querySelector('.text_Memober')

let all_language=[]
let language=[]
let namber_de_lang={}


fetch(baseUrl+mayUserName)
.then((response)=>response.json())
.then((responseDta)=>{
    loading.style.display="none"

           //git emojis
    fetch('https://api.github.com/emojis')
    .then((repons)=>repons.json())
    .then((resDta)=>{
        if(resDta[responseDta.company]==undefined){
            //flag in company null
            flag_sid.src=resDta.triangular_flag_on_post
        }else{
            //flag in company yas
            flag_sid.src=resDta[responseDta.company]
        }
    })
          //may name
    name_aside.textContent=responseDta.name
    //img may avatar 
    for(let i=0;i<image_aside.length;i++){
        image_aside[i].src=responseDta.avatar_url
    }
           //spn may bio
    if(responseDta.bio==null){
        bio_aside.textContent=''
    }else{
        bio_aside.textContent=responseDta.bio
    }
    // spn may Followers
    Followers_aside.textContent=responseDta.followers
    //spn may Following
    Following_aside.textContent=responseDta.following
    //spn may Public Repos
    PublicRepos_aside.textContent=responseDta.public_repos
    // spn may Twitter
    if(responseDta.twitter_username==null){
        Twitter_aside.textContent=''
    }else{
        Twitter_aside.onclick=function(){
            window.open('https://twitter.com/'+responseDta.twitter_username, "_blank")
        }
    }
    //spn may Blog
    if(responseDta.blog==""){
        Blog.textContent=''
    }else{
        Blog.onclick=function(){
            window.open(responseDta.blog, "_blank")
        }
    }
    const updatedMoment = moment(responseDta.updated_at, "YYYY-MM-DDTHH:mm:ssZ");
    const createdMoment = moment(responseDta.created_at, "YYYY-MM-DDTHH:mm:ssZ");
    const timeDifference = updatedMoment.diff(createdMoment);
    const formattedDifference = moment.duration(timeDifference).humanize(true);
    text_Memober.textContent=formattedDifference;

})


     //data de repostre
let contenar_all_repo=document.querySelector('.all_repo')

function mayRepos() {
    language.length=0
    namber_de_lang.length=0
    all_language.length=0
    fetch(baseUrl+mayUserName+"/repos")
    .then((repos)=>repos.json())
    .then((repo)=>{
        repo.forEach(element=> {

                    //contenar_repo
            let contenar_repo=document.createElement('div')
            contenar_repo.className='w-5/12 flex flex-col gap-1 p-4 rounded-2xl border-2 border-neutral-200 bg-neutral-50'
            contenar_all_repo.appendChild(contenar_repo)
            //tetle repo
            let contenar_tetle_repo=document.createElement('div')
            contenar_tetle_repo.className='flex justify-between'
            contenar_repo.appendChild(contenar_tetle_repo)

            // h3 tetle repo
            let tetle_repo=document.createElement('h3')
            tetle_repo.className='text-md text-blue-700 w-10/12 font-semibold  cursor-pointer'
            tetle_repo.textContent=element.name
            contenar_tetle_repo.appendChild(tetle_repo)

            //icont type de repo
            let type_repo=document.createElement('span')
            type_repo.className='w-9 h-6 public bg-white p-1 rounded-full border border-zinc-300'
            type_repo.style.fontSize='10px'
            type_repo.textContent='Public'
            contenar_tetle_repo.appendChild(type_repo)

            //description repo
            let description_repo=document.createElement('h3')
            description_repo.className='text-xs font-semibold text-gray-500 w-fit cursor-pointer'
            if(element.description==null){
                description_repo.textContent='There is no description'
            }else{
                description_repo.textContent=element.description
            }
            contenar_repo.appendChild(description_repo)

            //taype_div
            let taype_div=document.createElement('div')
            taype_div.className='flex items-center gap-2'
            contenar_repo.appendChild(taype_div)

            //longe de rebo
            let log_rebo=document.createElement('span')
            log_rebo.className='text-xs text-gray-500'
            log_rebo.textContent=element.language
            taype_div.appendChild(log_rebo)

            //contenar Updated de repo
            let contenar_Updated=document.createElement('div')
            contenar_Updated.className='flex justify-center text-xs mt-auto'
            contenar_repo.appendChild(contenar_Updated)

            //update_repo
            let update_repo=document.createElement('span')
            update_repo.className='text-xs text-stone-800'
            update_repo.style.fontSize='10px'
            update_repo.textContent='Updated '+moment(element.updated_at, "YYYYMMDD").fromNow()
            contenar_Updated.appendChild(update_repo)

            if(element.language!==null){
                language.push(element.language)
            }
            all_language=[...new Set(language)]
        });
    })
}
mayRepos()


//function onkeydown end debounce
let contenar_profile=document.querySelector('.contenar_profile')

let inputSerch=document.querySelector('.inputSerch')
const debounceUpdate=debounce((Text)=>{
    contenar_all_repo.innerHTML=''
    if(Text==''){
        mayUserName="abdo0302"
        mayRepos()
        data_de_profile()
    }else{
        mayUserName=Text
        mayRepos()
        data_de_profile()
    }
})
inputSerch.addEventListener("keyup",(e)=>{
    debounceUpdate(e.target.value)
})

inputSerch.onfocus=function(){
    contenar_repos.style.display='block'
    contenar_profile.style.display='none'
}

function debounce(callback,delay=1500) {
    let timeout;
    return (...args)=>{
        clearTimeout(timeout)
        timeout=setTimeout(() => {
            callback(...args)
        }, delay);
    }
}

// data peifile
let image_profile_insights=document.querySelector('.image_profile_insights')
let name_de_search=document.querySelector('.name_de_search')
let bio_search=document.querySelector('.bio_search')
let namber_de_reops_search=document.querySelector('.namber-de-reops_search')
let flag_search=document.querySelector('.flag_search')

let contenar_de_log=document.querySelector('.contenar_de_log')
//gei dat de profile insights
function data_de_profile() {
    fetch(baseUrl+mayUserName)
    .then((r)=>r.json())
    .then((re)=>{
        image_profile_insights.src=re.avatar_url
        name_de_search.textContent=re.name
        bio_search.textContent=re.bio
        namber_de_reops_search.textContent=re.public_repos
        fetch('https://api.github.com/emojis',requestOptions)
        .then((e)=>e.json())
        .then((s)=>{
            if(s[re.company]==undefined){
                //flag in company null
                flag_search.src=s.triangular_flag_on_post
            }else{
                //flag in company yas
                flag_search.src=s[re.company]
            }
        })
                     
        contenar_de_log.innerHTML=''
        let tetr=document.createElement('h3')
            tetr.textContent='Longuages'
            tetr.className='text-md font-semibold text-blue-600 cursor-pointer mb-3 text-center'
            contenar_de_log.appendChild(tetr)
        for(let i=0;i<all_language.length;i++){
            let contenar_de_language=document.createElement('div')
            contenar_de_language.className='flex items-center mr-16 gap-2'
            contenar_de_log.appendChild(contenar_de_language)

            let sercale=document.createElement('div')
            sercale.className='w-1 h-0.5 bg-black rounded-full'
            contenar_de_language.appendChild(sercale)

            let log=document.createElement('span')
            log.textContent=all_language[i]
            log.className='text-xs text-gray-500'
            contenar_de_language.appendChild(log)


            namber_de_lang[all_language[i]]=0
        }
        
       // console.log(all_language)
        for(let t=0;t<language.length;t++){
            namber_de_lang[language[t]]+=1
        }
        //console.log(namber_de_lang)

const ctx = document.getElementById('myChart');
let ar=[]
let arcolor=[]
ar.length=0
arcolor.length=0

language.length
let pourcentage_lang=[]
 
for(let i=0;i<all_language.length;i++){
    ar.push(namber_de_lang[all_language[i]])
    pourcentage_lang.push((namber_de_lang[all_language[i]]/language.length)*100)
    switch (all_language[i]) {
        case 'SCSS':
            arcolor.push("rgb(15 23 42)")
            break;
        case 'CSS':
            arcolor.push("rgb(82 82 91)")
            break;    
        case 'C':
            arcolor.push("rgb(252 165 165)")
            break;
        case 'HTML':
            arcolor.push("rgb(234 88 12)")
            break;
        case 'JavaScript':
            arcolor.push("rgb(245 158 11)")
            break;
        case 'C++':
            arcolor.push("rgb(254 240 138)")
            break;    
        case 'Python':
            arcolor.push("rgb(132 204 22)")
            break;
        case 'Go':
            arcolor.push("rgb(74 222 128)")
            break; 
        case 'PHP':
            arcolor.push("rgb(94 234 212)")
            break;
        case 'Shell':
            arcolor.push("rgb(103 232 249)")
            break;    
        case 'PowerShell':
            arcolor.push("rgb(30 64 175)")
            break;
        case 'Ruby':
            arcolor.push("rgb(245 243 255)")
            break;
        case 'Lua':
            arcolor.push("rgb(107 33 168)")
            break;
        case 'Stylus':
            arcolor.push("rgb(74 4 78)")
            break;    
        case 'Vim Script':
            arcolor.push("rgb(252 165 165)")
            break;
        case 'Objective-C':
            arcolor.push("rgb(244 114 182)")
            break;
        case 'Swift':
            arcolor.push("rgb(80 7 36)")
            break;
        case 'Smarty':
            arcolor.push("rgb(251 113 133)")
            break;    
        case 'Jupyter Notebook':
            arcolor.push("rgb(76 5 25)")
            break; 
        default:
            break;
    }
}
console.log(pourcentage_lang)
let log_search=document.querySelector('.log_search')
ar.filter((e,i)=>{
    if(e=== Math.max(...ar)){
        log_search.textContent=all_language[i]
    }})

if (window.myChart instanceof Chart) {
    window.myChart.destroy();
}
              // chart pie
window.myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: all_language,
        datasets: [{
            label: '# of Votes',
            data: ar,
            backgroundColor: arcolor,
            hoverOffset: 4
        }]
    },
    
});


//card 2   radar
if (window.myChart2 instanceof Chart) {
    window.myChart2.destroy();
}
const ctx2 = document.getElementById('myChart2');
                // chart line
window.myChart2 = new Chart(ctx2, {
    type: 'line',
    data:{
        labels: all_language,
        datasets: [{
            label: 'My First Dataset',
            data: pourcentage_lang,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
});
    })
}

//button profile insights
let x=true
let contenar_repos=document.querySelector('.contenar_repos')
let button_insights=document.querySelector('.button_insights')
button_insights.onclick=function(){
    if(x){
        contenar_repos.style.display='none'
        contenar_profile.style.display='flex'
        button_insights.textContent='Back to repository'
        data_de_profile()
        x=false
    }else{
        contenar_repos.style.display='block'
        contenar_profile.style.display='none'
        button_insights.textContent='profile Insights'
        mayRepos()
        data_de_profile()
        x=true
    }
    
}


// returne to home
function c() {
    contenar_repos.style.display='block'
    contenar_profile.style.display='none'
    inputSerch.value=''
    contenar_all_repo.innerHTML=''
    mayUserName="abdo0302"
        mayRepos()
        data_de_profile()
}
let returne_home=document.querySelector('.returne_home')
let returne_hom=document.querySelector('.returne_hom')
returne_home.onclick=function(){
    c()
}
returne_hom.onclick=function(){
    c()
}


// button return top
//scroll contenat repo
let button_return_top=document.querySelector('.button_return_top')
contenar_repos.onscroll=function(){
    if(contenar_repos.scrollTop > 20){
        button_return_top.style.display='block'
        
    }else{
        button_return_top.style.display='none'
       
    }
}

//scroll contenat profile
contenar_profile.onscroll=function(){
    if(contenar_profile.scrollTop > 20){
        button_return_top.style.display='block'
        
    }else{
        button_return_top.style.display='none'
       
    }
}

// return to top
button_return_top.onclick=function(){
    contenar_repos.scrollTo({
        left:0,
        top:0,
        behavior:"smooth"
    })
    contenar_profile.scrollTo({
        left:0,
        top:0,
        behavior:"smooth"
    })
}


let Show_pictures=document.querySelector('.Show_pictures')
let picture_show=document.querySelector('.picture_show')
image_aside[0].onclick=function(){
    Show_pictures.style.display='flex'
    picture_show.src=image_aside[0].src

}

Show_pictures.onclick=function(){
    Show_pictures.style.display='none'
}

image_profile_insights.onclick=function(){
    Show_pictures.style.display='flex'
    picture_show.src=image_profile_insights.src
}



