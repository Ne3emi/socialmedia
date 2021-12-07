import axios from 'axios'
export default class Search{
  constructor(){
    //dom
    this.injectHtml()
    this.searchIcon=document.querySelector('.header-search-icon')
    this.closeIcon=document.querySelector('.close-live-search')
    this.overlay=document.querySelector('.search-overlay')
    this.inputField=document.getElementById("live-search-field")
    this.resultsArea=document.querySelector('.live-search-results')
    this.loaderLoading=document.querySelector('.circle-loader')
    this.typeTimer
    this.prevValue=''
    this.events()
  }
  events(){
  //events
  this.searchIcon.addEventListener('click',(e)=>{
   e.preventDefault()
   
   //this.overlay.classList.add('search-overlay--visible')
   this.openOverlay()
    
  })
  this.closeIcon.addEventListener('click',()=>{
    this.closeOverlay()
 //this.overlay.classList.remove('search-overlay--visible')
    
  })
  this.inputField.addEventListener('keyup',()=>{
    
    this.loadingResults()
  })
  }
  
  //methods
  closeOverlay(){
    this.overlay.classList.remove('search-overlay--visible')
  }
  openOverlay(){
    this.overlay.classList.add('search-overlay--visible')
    setTimeout(() => this.inputField.focus(), 50)
   
   
  }
  loadingResults(){
    let value = this.inputField.value;
    if (value==''){
      this.hideSpinning()
      this.hideResults()
     
    }
    if (value!=''&&value!=this.prevValue){
      clearTimeout(this.typeTimer)
      this.spinning()
     this.typeTimer= setTimeout(()=>{
        this.sendRequest()
      },750)
    }
    this.prevValue=value
    
    
  }
  sendRequest(){
    axios.post('/search',{searchTerm:this.inputField.value}).then((results) =>{
      
      
      
      this.resultsHtml(results.data)
      
    } ).catch((err)=>{
      alert(err)
    })
  }
  showResults(){
    this.resultsArea.classList.add('live-search-results--visible')
  }
  hideResults(){
    this.resultsArea.classList.remove('live-search-results--visible')
  }
 hideSpinning(){
   this.loaderLoading.classList.remove("circle-loader--visible")
 }
  resultsHtml(posts){
    if(posts.length){
      
      this.resultsArea.innerHTML=`
       <div class="list-group shadow-sm">
      <div class="list-group-item active">
      <strong>Search Results</strong> (${posts.length} items found)</div>
       
          ${posts.map((x) =>{
         
          let date = new Date(x.createdData)
          return `<a href="/post/${x._id}" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>${x.title}</strong>
                  <span class="text-muted small">by ${x.author.username} </span>
                </a>`
          } ).join('')}
       
              
              
                    
              </div>`
    }else{
      this.resultsArea.innerHTML=`<p>No results found</p>`
    }
    this.hideSpinning()
    this.showResults()
  }
  spinning(){
    this.loaderLoading.classList.add("circle-loader--visible")
    
  }
  
  injectHtml(){
    document.body.insertAdjacentHTML('beforeend',`<div class="search-overlay">
        <div class="search-overlay-top shadow-sm">
          <div class="container container--narrow">
            <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
            <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
            <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
          </div>
        </div>
    
        <div class="search-overlay-bottom">
          <div class="container container--narrow py-3">
            <div class="circle-loader"></div>
            <div class="live-search-results"></div>
            </div>
        </div>
      </div>`)
  }
  
}


