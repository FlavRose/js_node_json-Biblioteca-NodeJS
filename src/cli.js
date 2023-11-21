/* Aula Node.js:*/

// Criando o código que vai fazer a manipulação das informações que iremos passar pela linha de comando do terminal e "jogar" ela pro restante da aplicação, ou seja, uma CLI (Interface de Linha de Comando)

//----------------------------------------------------//------------------------------------------------------//

// Importando a Lib Chalk
import chalk from 'chalk';

// Importando a Lib FS(FileSystem)
import fs from 'fs';

// Impotando a função pegaArquivo() do index.js para utiliza-la nesse arquivo cli.js
import pegaArquivo from './index.js';

// Importando a função listaValidada() do http-validacao.js para utiliza-la nesse aquivo cli.js
import listaValidada from './http-validacao.js';

//----------------------------------------------------//------------------------------------------------------//

const caminho = process.argv;
// process é um objeto do próprio node
// argv (Valores de Argumento)

async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(
            chalk.yellow('lista validada'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('lista de links'),
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

//----------------------------------------------------//------------------------------------------------------//

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === 'valida'; // Dessa forma "valida" vai ser sempre true ou false

    try {
        fs.lstatSync(caminho);
    } catch (erro){
        if (erro.code === 'ENOENT') {
            console.log(chalk.red('arquivo ou diretório não existente'));
            return;
        }
    }

    if(fs.lstatSync(caminho).isFile()) { // .isFile() é um método que retorna true ou false, não precisa parametro
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) { // .isDirectory() também é um método que retorna true ou false
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo);
        })
    }
}
// Puxando a função pegaArquivo(); passando como parametro a const caminho no índice [2]
// pegaArquivo(caminho[2]);

processaTexto(caminho);
