const fs = require('fs');
const { Ticket } = require('./ticket');

class TicketControl{

  constructor(){
    
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    let data = require('../data/data.json');

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }


  }



  /**
   * Método que aumenta en 1 el ultimo ticket
   */
  siguiente(){
    this.ultimo += 1;

    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();

    return `Ticket -> ${this.ultimo}`;
  }


  /**
   * Método para obtener el último ticket
   */
  getUltimoTicket(){
    return `Ticket -> ${this.ultimo}`;
  }


  /**
   * Método para obtener los ultimos 4 tickets
   */
  getUltimos4(){
    return this.ultimos4;
  }



  /**
   * Método para atender ticket
   */
  atenderTicket( escritorio ){

    if (this.tickets.length === 0) {
      return 'No hay tickets';
    }

    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();//Elimina la primera posición del arreglo

    //nuevo ticket para atender
    let atenderTicket = new Ticket(numeroTicket, escritorio);
    this.ultimos4.unshift(atenderTicket);//Agrega el ticket al inicio del arreglo

    if( this.ultimos4.length > 4 ){
      this.ultimos4.splice(-1,1); //Borra el último
    }

    console.log('Últimos 4');
    console.log(this.ultimos4);

    this.grabarArchivo();

    return atenderTicket;

  }




  /**
   * Método para reiniciar conteo de tickets
   */
  reiniciarConteo(){
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    console.log('Se ha inicializado el sistema');
    this.grabarArchivo();

  }


  /**
   * Método para grabar en el archivo json
   */
  grabarArchivo(){
    let jsonData = {
        ultimo: this.ultimo,
        hoy: this.hoy,
        tickets: this.tickets,
        ultimos4: this.ultimos4
    };

    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);

  }





}//Fin de la clase


module.exports = {
  TicketControl
}