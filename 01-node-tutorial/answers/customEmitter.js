const EventEmitter = require("events");  
const emitter = new EventEmitter();   
emitter.on('responce', () => {
    console.log(`data received`)
});
emitter.on('responce', () => {
    console.log(`some other logic here`)
});

emitter.emit('responce','john',34)