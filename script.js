
const professores = [
    { id: 1, nome: "Prof. Marcos Oliveira", email: "marcos@conecta.com", senha: "123", materia: "Java" }
];

let alunos = JSON.parse(localStorage.getItem('bd_alunos')) || [];
let todasAulas = JSON.parse(localStorage.getItem('bd_aulas')) || [];
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

    if (prof) {
        sessao = prof;
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('prof-dash').classList.remove('hidden');
        document.getElementById('prof-nome-txt').innerText = prof.nome;
    } else if (aluno) {
        sessao = aluno;
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('aluno-dash').classList.remove('hidden');
        document.getElementById('aluno-nome-txt').innerText = aluno.nome;
        renderTutores();
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

function renderTutores() {
    document.getElementById('lista-tutores').innerHTML = professores.map(p => `
        <div style="border: 1px solid #eee; padding:10px; margin-bottom:10px; border-radius:8px;">
            <strong>${p.nome}</strong> (${p.materia})<br>
            <input type="date" id="data-${p.id}">
            <select id="hora-${p.id}"><option value="09:00">09:00</option><option value="14:00">14:00</option></select>
            <button onclick="agendar(${p.id})">Agendar</button>
        </div>
    `).join('');
}

function agendar(id) {
    const p = professores.find(prof => prof.id === id);
    const d = document.getElementById('data-'+id).value;
    const h = document.getElementById('hora-'+id).value;
    if(!d) return alert("Escolha uma data!");
    
    todasAulas.push({ 
        id: Date.now(), profId: p.id, profNome: p.nome, aluno: sessao.nome, 
        data: d, hora: h, status: 'Pendente' 
    });
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Aula solicitada com sucesso!");
}