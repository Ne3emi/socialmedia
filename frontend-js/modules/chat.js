/*export default class Chat {
  constructor() {
    alert('does it work')
    
  }
}
*/


export default class Chat{
  constructor (){
    
    this.firstTime=false
    
    this.chatIcon = document.querySelector('.header-chat-icon')
    this.chatBox=document.querySelector('#chat-wrapper')
    this.injectHtml()
    this.closeChat=document.querySelector('.chat-title-bar-close')
    this.chatField=document.querySelector('#chatField')
    this.chatForm=document.querySelector('#chatForm')
    this.chatLog=document.querySelector('#chat')
    this.events()
   // alert('does this work')
    
  }
  //events
  events(){
    //alert('does this work')
    this.chatIcon.addEventListener('click',() =>{ this.showChat()} )
    this.closeChat.addEventListener('click',() => this.hideChat() )
    this.chatForm.addEventListener('submit',(e) => {
      e.preventDefault()
      this.sendMsgToServer()
    })
  }
  
  
  //methods
  showChat(){
    if(!this.firstTime){
      this.startConnection()
    }
    
    this.chatBox.classList.add('chat--visible')
    this.firstTime=true
  }
  startConnection(){
   // alert('connection started')
    this.socket = io()
    this.receiveMsgFromServer()
  }
  sendMsgToServer(){
    this.socket.emit('msgFromBrowser',{message:this.chatField.value})
    this.chatLog.insertAdjacentHTML('beforeend',`  <div class="chat-self">
        <div class="chat-message">
          <div class="chat-message-inner">
            ${this.chatField.value}
          </div>
        </div>
        <img class="chat-avatar avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128">
      </div>`)
    this.chatField.value=''
    this.chatField.focus()
    
  }
  receiveMsgFromServer(){
    this.socket.on('msgFromServer',(data) =>{
     // alert(data.message)
      this.chatLog.insertAdjacentHTML('beforeend',`<div class="chat-other">
              <a href="/profile/fuck"><img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"></a>
              <div class="chat-message"><div class="chat-message-inner">
                <a href="/profile/fuck"><strong>fuck:</strong></a>
                ${data.message}
              </div></div>
            </div>`)
    } )
  }
  hideChat(){
    this.chatBox.classList.remove('chat--visible')
  }
  injectHtml(){
    this.chatBox.innerHTML=`
     <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>
    <div id="chat" class="chat-log"></div>
    
    <form id="chatForm" class="chat-form border-top">
      <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
    </form>
    `
  }
}
