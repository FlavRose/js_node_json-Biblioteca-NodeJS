import chalk from "chalk";

//----------------------------------------------------//------------------------------------------------------//

// Gerando uma lista de URLs
function extraiLinks (arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join()) 
}
// .map() é um método do JS para mapear objetos
// Object.values para extrair apenas os valores de um objetos
// .join() é um método de Array para concatenar, ele pega o conteúdo de um Array e converte em string

//----------------------------------------------------//------------------------------------------------------//

// EXEMPLO de como utilizar a API fetch:
async function checaStatus (listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try{
                const response = await fetch(url);
                return `${response.status} - ${response.statusText}`;
            } catch (erro) {
                return manejaErros(erro);
            }
        })
    )
    return arrStatus;
}
// fetch trabalha com promessas
// .all() ele é capaz de receber uma lista de Promessas pendentes, resolver todas essas promessas e retornar uma lista pra nós de Promessas resolvidas

//----------------------------------------------------//------------------------------------------------------//

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

//----------------------------------------------------//------------------------------------------------------//

// Função exportada do arquivo cli.js
export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}
