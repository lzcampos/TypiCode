var url = 'https://jsonplaceholder.typicode.com/';

var inputPesquisa = document.getElementById('campoPesquisa');
var btnPesquisa = document.getElementById('botaoPesquisa');
var dinamicTable = document.getElementById('dinamicTable');
var mensagens = document.getElementsByClassName('mensagens')[0];


btnPesquisa.addEventListener('click', () => {
    var selectOrigem = document.getElementsByClassName('selectOrigem')[0];
    eraseMensagens();
    let secaoConvertida = convertSection(selectOrigem);
    if (secaoConvertida != 0) {
        let newUrl = url.concat(secaoConvertida);
        fetch(newUrl)
            .then((response) => response.json())
            .then((json) => generateTable(json))
    } else {
        var mensagem = document.createElement('h2');
        mensagem.appendChild(document.createTextNode("Por favor selecione uma origem!"));
        mensagens.appendChild(mensagem);
    }

});

function eraseMensagens() {
    if (mensagens.childElementCount > 0) {
        for (let i = 0; i <= mensagens.childElementCount; i++) {
            mensagens.childNodes[i].style = "display:none";
        }
    }
}

function geraMensagemResultado(codigo){
    let mensagem = document.createElement('h1');
    switch(codigo){
        case 1:{
            mensagem.appendChild(document.createTextNode("Exibindo todos os posts"));
            break;
        }
        case 2:{
            mensagem.appendChild(document.createTextNode("Exibindo todos os álbuns"));
            break;
        }
        case 3:{
            mensagem.appendChild(document.createTextNode("Exibindo a lista de To Do's do usuário 1"));
            break;
        }
        case 4:{
            mensagem.appendChild(document.createTextNode("Exibindo todos os posts do usuário "+inputPesquisa.value));
            break;
        }
        case 5:{
            mensagem.appendChild(document.createTextNode("Exibindo todos os álbuns do usuário "+inputPesquisa.value));
            break;
        }
        case 6:{
            mensagem.appendChild(document.createTextNode("Exibindo todos os To Do's do usuário "+inputPesquisa.value));
            break;
        }
    }
    mensagens.appendChild(mensagem);
}

function convertSection(selectOrigem) {
    if (inputPesquisa.value == "") {
        criaSugestao(selectOrigem.selectedIndex);
        switch (selectOrigem.selectedIndex) {
            case 1: {
                geraMensagemResultado(1);
                return "posts";
                break;
            }
            case 2: {
                geraMensagemResultado(2);
                return "albums";
                break;
            }
            case 3: {
                geraMensagemResultado(3);
                return "users/1/todos";
                break;
            }
            default: {
                return 0;
                break;
            }
        }
    } else {
        switch(selectOrigem.selectedIndex){
            case 1:{
                geraMensagemResultado(4);
                return "users/" + inputPesquisa.value + "/posts";
                break;
            }
            case 2:{
                geraMensagemResultado(5);
                return "users/" + inputPesquisa.value + "/albums";
                break;
            }
            case 3:{
                geraMensagemResultado(6);
                return "users/" + inputPesquisa.value + "/todos";
                break;
            }
            default:{
                return 0;
                break;
            }
        }
    }
}

function criaSugestao(numeroSugestao) {
    let mensagem = document.createElement('h3');
    switch (numeroSugestao) {
        case 1: {
            mensagem.appendChild(document.createTextNode("Sugestão: Para ver a lista de posts de um usuário"
                + " específico, digite seu ID na caixa de pesquisa"));
            break;
        }
        case 2: {
            mensagem.appendChild(document.createTextNode("Sugestão: Para ver a lista de álbuns de um usuário"
                + " específico, digite seu ID na caixa de pesquisa"));
            break;
        }
        case 3: {
            mensagem.appendChild(document.createTextNode("Sugestão: Para ver a lista de To Do's de um usuário"
                + " específico, digite seu ID na caixa de pesquisa"));
            break;
        }
        case 4:{
            mensagem.appendChild(document.createTextNode("Por favor, selecione uma origem."));
            break;
        }
    }
    mensagens.appendChild(mensagem);
}



function translateKey(key) {
    if (key == "userId") {
        return "ID do usuário";
    } else if (key == "id") {
        return "ID do elemento";
    } else if (key == "title") {
        return "Título";
    } else if (key == "body") {
        return "Conteúdo";
    } else if (key == "completed") {
        return "Tarefa completa";
    }
}

function eraseTable() {
    for (let i = 0; i <= dinamicTable.childElementCount; i++) {
        dinamicTable.childNodes[i].style = "display:none";
    }
}

function generateTable(json) {

    let table = document.createElement("table");
    let header = document.createElement("tr");
    let keys = Object.keys(json[0]);

    eraseTable();

    for (let i = 0; i < keys.length; i++) {
        let column = document.createElement("th");
        column.appendChild(document.createTextNode(translateKey(keys[i])));
        header.appendChild(column);
    }

    dinamicTable.appendChild(header);
    for (let i = 0; i < json.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < keys.length; j++) {
            let cell = document.createElement("td");
            cell.appendChild(document.createTextNode(json[i][keys[j]]));
            row.appendChild(cell);
        }
        dinamicTable.appendChild(row);
    }


}

window.addEventListener('load', () =>{
    let newUrl = url.concat("posts");
    geraMensagemResultado(1);
    fetch(newUrl)
            .then((response) => response.json())
            .then((json) => generateTable(json))
});