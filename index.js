var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var language = {
	ES: [
		'Digite la altura de el arbol:',
		'Dato incorrecto, asegurece de colocar solo numero.'
	],
	EN: [
		'Enter the height of the tree:',
		'Incorrect data, Be sure to enter only number.'
	]
}

var messages = [];

class Nodo {
	constructor(dat, izq, der) {
		this.dato = (dat) ? dat : null;
		this.izq = (izq) ? izq : null;
		this.der = (der) ? der : null;
	}
}

main();

var rootNode = new Nodo();

function main() {
	mode()
		.then( async () => {
			const h = await height();
			if(h == 0) process.exit(0);
			console.log("La altura es: " + h);

			await figo(rootNode, h);
			console.log( JSON.stringify(rootNode));

		})
		.catch(() => {process.exit(0)});

}

function figo(raiz, h){
	raiz.dato = h;
	return new Promise( (resolve, reject) => {
		if(h > 1){
			raiz.izq = new Nodo(h-2);
			figo(raiz.izq, h-2);
	
			raiz.der = new Nodo(h-1);
			figo(raiz.der, h-1);
		}
		resolve();
	})
}

function height(){
	return new Promise(resolve => {
		rl.question(messages[0], res => {
			if(!isNaN(res) && parseInt(res) > 0){
				resolve(parseInt(res));
			}else{
				resolve(0);
			}
			rl.pause();
		})
	})
}

function mode() {
	return new Promise((resolve, rej) => {
		rl.question(
			"Selecciona tu idioma - Select your language: \n 1.Español \n 2.English \n",
			(res) => {
				if (isNaN(res) || parseInt(res) > 2 || parseInt(res) < 1) {
					console.error(language.EN[1]);
					console.error(language.ES[1]);
					rej();
				} else {
					
					messages = (parseInt(res) == 1) ? language.ES : language.EN;
					resolve();
				}

				rl.pause();
			}
		)
	})
}

// raiz = new Nodo(3);
// console.log(raiz);
