const professores = [{ id: 1, nome: "Prof. Marcos Oliveira", email: "marcos@conecta.com", senha: "123", materia: "Java" }];
let alunos = JSON.parse(localStorage.getItem('bd_alunos')) || [];
let todasAulas = JSON.parse(localStorage.getItem('bd_aulas')) || [];
let sessao = null;

function alternarAuth() { 
    document.getElementById('login-box').classList.toggle('hidden');
     document.getElementById('reg-box').classList.toggle('hidden'); 
    }

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

    if (prof) { 
        sessao = prof; document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('prof-dash').classList.remove('hidden');
        document.getElementById('prof-nome-txt').innerText = prof.nome; renderPainelProfessor(); 
    }
    else if (aluno) {
        sessao = aluno;
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('aluno-dash').classList.remove('hidden');
        document.getElementById('aluno-nome-txt').innerText = aluno.nome;
        renderTutores(); 
    }
    else {
         alert("Login inválido"); 
        }
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
    todasAulas.push({ id: Date.now(), profId: p.id, profNome: p.nome, aluno: sessao.nome, data: d, hora: h, status: 'Pendente', material: '', duvidas: '', entrega: '' });
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Aula solicitada!"); mostrarAba('historico');
}

function renderAulasAluno() {
    document.getElementById('lista-aulas-aluno').innerHTML = todasAulas.filter(a => a.aluno === sessao.nome).map(a => `
        <div class="item-solicitacao">
            <strong>${a.data}</strong> - Tutor: ${a.profNome} (${a.status})<br>
            <textarea id="duv-${a.id}" placeholder="Dúvidas para o professor...">${a.duvidas}</textarea>
            <button onclick="salvarDuvidas(${a.id})">Salvar Dúvidas</button>
            <textarea id="entre-${a.id}" placeholder="Entregar atividade aqui...">${a.entrega}</textarea>
            <button onclick="enviarEntrega(${a.id})">Enviar Entrega</button>
            <p>Material: ${a.material || 'Aguardando'}</p>
        </div>
    `).join('');
}

function salvarDuvidas(id) {
    todasAulas.find(a => a.id === id).duvidas = document.getElementById('duv-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Dúvidas salvas!"); 
}
function enviarEntrega(id) { 
    todasAulas.find(a => a.id === id).entrega = document.getElementById('entre-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Entrega enviada!"); 
    }
function renderPainelProfessor() {
    document.getElementById('lista-solicitacoes').innerHTML = todasAulas.filter(a => a.profId === sessao.id).map(a => `
        <div class="item-solicitacao">
            <strong>Aluno: ${a.aluno}</strong><br>Dúvida: ${a.duvidas}<br>Entrega: ${a.entrega}<br>
            ${a.status === 'Pendente' ? <button onclick="aceitar(${a.id})">Aceitar</button> : '✅ Confirmada'}
            <input type="text" id="mat-${a.id}" value="${a.material}">
            <button onclick="enviarMaterial(${a.id})">Enviar Material</button>
        </div>
    `).join('');
}

function aceitar(id) {
    todasAulas.find(a => a.id === id).status = 'Confirmada';
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    renderPainelProfessor(); 
}
function enviarMaterial(id) {
    todasAulas.find(a => a.id === id).material = document.getElementById('mat-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    renderPainelProfessor(); }
function salvarCadastro() {
     alunos.push({ nome: document.getElementById('r-nome').value, email: document.getElementById('r-email').value, senha: document.getElementById('r-senha').value });
      localStorage.setItem('bd_alunos', JSON.stringify(alunos))
       alternarAuth();
     }