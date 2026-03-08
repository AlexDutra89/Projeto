
const professores = [
    { id: 1, nome: "Prof. Marcos Oliveira", email: "marcos@conecta.com", senha: "123", materia: "Java" }
];

let alunos = JSON.parse(localStorage.getItem('bd_alunos')) || [];
let sessao = null;


function alternarAuth() {
    document.getElementById('login-box').classList.toggle('hidden');
    document.getElementById('reg-box').classList.toggle('hidden');
}


function fazerLogin() {
    const e = document.getElementById('l-email').value;
    const s = document.getElementById('l-senha').value;
    
    const prof = professores.find(p => p.email === e && p.senha === s);
    const aluno = alunos.find(a => a.email === e && a.senha === s);

    if (prof || aluno) {
        alert("Login realizado com sucesso! (Dashboard em breve)");
    } else {
        alert("Usuário não encontrado.");
    }
}


function salvarCadastro() {
    const nome = document.getElementById('r-nome').value;
    const email = document.getElementById('r-email').value;
    const senha = document.getElementById('r-senha').value;

    if(!nome || !email || !senha) return alert("Preencha tudo!");

    alunos.push({ nome, email, senha });
    localStorage.setItem('bd_alunos', JSON.stringify(alunos));
    alert("Cadastro concluído!");
    alternarAuth();
}