//Referencias al Html

const lblOnline   = document.querySelector('#lblOnline');
const lblOffnline = document.querySelector('#lblOffnline');
const txtMensaje  = document.querySelector('#txtMensaje'); 
const btnEnviar   = document.querySelector('#btnEnviar');



const socket= io();


socket.on('connect', ()=>{
    //console.log('Cliente conectado');
    lblOffnline.style.display= 'none';
    lblOnline.style.display = '';
});


socket.on('disconnect', () => {
    //  console.log('Cliente desconectado');
    lblOffnline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje-server',(payload)=>{
    console.log(payload);
});


btnEnviar.addEventListener('click',()=>{
    const mensaje= txtMensaje.value;
    const payload={
        mensaje,
        id:'1234',
        fecha: new Date().getTime()
    }
    socket.emit( 'enviar-mensaje', payload, (id)=>{
        console.log(id);
    });
});