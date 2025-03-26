import { Component } from '@angular/core';

@Component({
	selector: 'home',
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	images = ['malta1.webp', 'londres1.jpg'];
	//Realmente deberias hacer un get de los viajes ya aqui para poner ya las imagenes reales, titulos, descripciones y no tener q ponerlas a mano o otras diferentes
}
