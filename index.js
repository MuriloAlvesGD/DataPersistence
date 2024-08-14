const fs = require('fs');
const csvParser = require('csv-parser');
const {createObjectCsvWriter } = require('csv-writer');


const alunos = [
    { nome: "Evelyn" },
    { nome: "Fábio" },
    { nome: "Felipe" },
    { nome: "Jessy" },
    { nome: "Matheus Clemente" },
    { nome: "Mateus Patricio" },
    { nome: "Renata" },
    { nome: "Tiago" },
    { nome: "Will" }
];

// Criar o writer para escrever no arquivo alunos.csv
const csvWriter = createObjectCsvWriter({
    path: 'alunos.csv',
    header: [
        { id: 'nome', title: 'Nome' }
    ]
});

// Escrever os dados no arquivo CSV
csvWriter.writeRecords(alunos)
    .then(() => {
        console.log('Arquivo alunos.csv criado com sucesso!');
    });


const questoes = [

    { numero: 1, descricao: "O que é tipagem dinâmica em JavaScript? Como ela difere da tipagem estática?" },
    { numero: 2, descricao: "Qual é a diferença entre as palavras-chave var, let e const em JavaScript? Explique." },
    { numero: 3, descricao: "Crie um programa que solicita ao usuário a temperatura em graus Celsius e a converte para Fahrenheit." },
    { numero: 4, descricao: "Quais são os tipos de operadores que podem ser utilizados em JavaScript? Justifique." },
    { numero: 5, descricao: "Crie um programa que verifica se uma pessoa é elegível para um empréstimo com base em sua renda mensal e idade e pontuação de crédito." },
    { numero: 6, descricao: "Crie uma página HTML que solicita o nome do usuário e exibe uma mensagem de boas-vindas na própria página usando innerHTML." },
    { numero: 7, descricao: "Por que utilizar funções em JavaScript? Explique e defina a sintaxe." },
    { numero: 8, descricao: "Quais são os tipos de funções que podem ser aplicadas em projetos JS?" },
    { numero: 9, descricao: "Crie um exemplo baseado em funções em arquivos JS." }
];

function sortearQuestoesParaAlunos(alunos, questoes) {
    return alunos.map(aluno => {
        let indiceAleatorio = Math.floor(Math.random() * questoes.length);
        let questaoSorteada = questoes[indiceAleatorio];
        return { nome: aluno.nome, questao: questaoSorteada.numero, descricao: questaoSorteada.descricao };
    });
}

let alunosRead = []

fs.createReadStream('alunos.csv')
    .pipe(csvParser())
    .on('data', (row) => {
        alunosRead.push({ nome: row.Nome });
    })
    .on('end', () => {
        const resultado = sortearQuestoesParaAlunos(alunosRead, questoes);
        salvarResultadoEmTxt(resultado);
    });

function salvarResultadoEmTxt(resultado) {
    const writer = fs.createWriteStream('resultado.txt');

    resultado.forEach(item => {
        writer.write(`Aluno: ${item.nome}\n`);
        writer.write(`Questão ${item.questao}: ${item.descricao}\n\n`);
    });

    writer.end(() => {
        console.log('Resultado salvo em resultado.txt');
    });
}