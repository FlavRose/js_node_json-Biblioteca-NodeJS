/* Aula Node.js:*/

/* Importando Libs, Tratando erros, Utilizando GitIgnore, Vendo Códigos Síncronos e Assíncronos e formas de coda-los, Utilizando a Ferramenta RegEx, Criando uma CLI (Interface de Linha de Comando), criando listas de URLs, Utilizando uma API do node chamada fetch, Fazendo a Verificação dos Links e Validando os Links */

//----------------------------------------------------//------------------------------------------------------//

// Importando uma Biblioteca nativa do node.js chamada --> fs(FileSystem) <-- Para utilizar um método que serve para ler um arquivo de fora do arquivo.js
import fs from "fs";
// Por ser uma Biblioteca nativa do node, não precisa ser instalada

// Importando uma Biblioteca do NPM chamada --> CHALK <-- Serve para adicionar cores aos seus console.log(), assim tornando a leitura/entendimento do terminal mais facilitada e bonitinha, cheia de cores pra destinguir cada coisa
import chalk from "chalk";
// Como não é uma Biblioteca nativa, é preciso fazer a instalação (Libs podem ser instaladas via terminal)
// Versão instalada: npm install chalk@5.0.1 --salve-exact

// LEMBRETE: Para que as importações do NPM funcionem, é preciso "alertar" o arquivo.json também!! Para isso, nesse exemplo de código aqui, adicionei um --> type: "module", <-- no Objeto com name: "2708-node-lib-md" no arquivo: package.json

console.log(chalk.cyan('Aula Node.JS'));
// Exemplo de Estilização do nosso terminal com o Chalk

//----------------------------------------------------//------------------------------------------------------//

// Função que extrai os Links a partir do MarkDown -> RegEx
function extraiLinks (texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; // gm --> modificador global
    const capturas = [...texto.matchAll(regex)]; // Operador de Espalhamento [... ]
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'não há links no arquivo'; // Operador Ternário
//  RegEx (Regular Expressions)
//  Exemplo de MarkDown RegEx usado no codigo: \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
}

//----------------------------------------------------//------------------------------------------------------//

// Função de tratamento de erros ocasionais
function trataErro(erro) {
    console.log(erro); // Para ver o Objeto Error no terminal
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}
// Informando um novo erro para o Objeto Error do JS

//----------------------------------------------------//------------------------------------------------------//

// Trabalhando com async/await (código assíncrono)
// Puxando um arquivo.md para este arquivo.js com a função pegaArquivo();
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = "utf-8";
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

export default pegaArquivo;
// Exportando a função pegaArquivo(); desse arquivo index.js para poder utiliza-lá no arquivo cli.js

//----------------------------------------------------//------------------------------------------------------//

// EXEMPLOS:

// Refatorando a função para uma outra forma de codigo assíncrono / promises com .then()
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = "utf-8";
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto))) // a função .then() serve para encadear codigo assíncrono
//         .catch(trataErro);
// }
// Junto com o .then() o JS tem uma outra função que trabalha também pra pegar erros de forma assíncrona, que é o .catch()
// Função Call-Back são funções que recebem uma outra função como parametro

//----------------------------------------------------//------------------------------------------------------//

// Função síncrona:
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = "utf-8";
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro) { // Caso ocorra um erro inesperado, ao invés de informar o texto, irá informar o erro
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto)); // Dando console.log() para verificar no terminal se funcionou
//     });
// }
