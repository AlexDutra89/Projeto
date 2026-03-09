const professores = [{ id: 1, nome: "Prof. Marcos Oliveira", email: "marcos@conecta.com", senha: "123", materia: "Java" }];
let alunos = JSON.parse(localStorage.getItem('bd_alunos')) || [];
let todasAulas = JSON.parse(localStorage.getItem('bd_aulas')) || [];
let sessao = null;

function alternarAuth() { document.getElementById('login-box').classList.toggle('hidden'); document.getElementById('reg-box').classList.toggle('hidden'); }
function mostrarAba(aba) {
    document.getElementById('aba-busca').classList.toggle('hidden', aba !== 'busca');
    document.getElementById('aba-historico').classList.toggle('hidden', aba !== 'historico');
    if(aba === 'historico') renderAulasAluno();
}

function fazerLogin() {
    const e = document.getElementById('l-email').value;
    const s = document.getElementById('l-senha').value;
    const prof = professores.find(p => p.email === e && p.senha === s);
    const aluno = alunos.find(a => a.email === e && a.senha === s);
    if (prof) { sessao = prof; document.getElementById('auth-section').classList.add('hidden'); document.getElementById('prof-dash').classList.remove('hidden'); document.getElementById('prof-nome-txt').innerText = prof.nome; renderPainelProfessor(); }
    else if (aluno) { sessao = aluno; document.getElementById('auth-section').classList.add('hidden'); document.getElementById('aluno-dash').classList.remove('hidden'); document.getElementById('aluno-nome-txt').innerText = aluno.nome; renderTutores(); }
    else { alert("Login inválido"); }
}

function renderTutores() {
    document.getElementById('lista-tutores').innerHTML = professores.map(p => `
        <div class="item-solicitacao"><strong>${p.nome}</strong> (${p.materia})<br>
        <input type="date" id="data-${p.id}"><select id="hora-${p.id}"><option value="09:00">09:00</option></select>
        <button onclick="agendar(${p.id})">Agendar</button></div>`).join('');
}

function agendar(id) {
    const p = professores.find(prof => prof.id === id);
    const d = document.getElementById('data-'+id).value;
    todasAulas.push({ id: Date.now(), profId: p.id, profNome: p.nome, aluno: sessao.nome, data: d, status: 'Pendente', avaliacao: 0, feedback: '', certificado: '', duvidas: '', entrega: '' });
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Aula solicitada!"); mostrarAba('historico');
}

function renderAulasAluno() {
    document.getElementById('lista-aulas-aluno').innerHTML = todasAulas.filter(a => a.aluno === sessao.nome).map(a => `
        <div class="item-solicitacao"><strong>Tutor: ${a.profNome}</strong><br>
        Status: ${a.status}<br>Certificado: ${a.certificado || 'Aguardando'}<br>
        <div class="estrelas">${[1,2,3,4,5].map(n => <span onclick="setNota(${a.id}, ${n})">${n <= (a.avaliacao||0) ? '★' : '☆'}</span>).join('')}</div>
        <p>Feedback do prof: ${a.feedback || 'Aguardando'}</p></div>`).join('');
}

function setNota(id, nota) { todasAulas.find(a => a.id === id).avaliacao = nota; localStorage.setItem('bd_aulas', JSON.stringify(todasAulas)); renderAulasAluno(); 

}
function renderPainelProfessor() { /* Vazio por enquanto para o Commit 5 */ }
function salvarCadastro() { alunos.push({ nome: document.getElementById('r-nome').value, email: document.getElementById('r-email').value, senha: document.getElementById('r-senha').value });
localStorage.setItem('bd_alunos', JSON.stringify(alunos));
alternarAuth(); }