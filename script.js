const professores = [
    { id: 1, nome: "Prof. Marcos Oliveira", email: "marcos@conecta.com", senha: "123", materia: "Java" },
    { id: 2, nome: "Dra. Elen Silva", email: "elen@conecta.com", senha: "123", materia: "Web" },
    { id: 3, nome: "Eng. Ricardo Santos", email: "ricardo@conecta.com", senha: "123", materia: "Redes" }
];

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

    if (prof) {
        sessao = prof;
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('prof-dash').classList.remove('hidden');
        document.getElementById('prof-nome-txt').innerText = prof.nome;
        renderPainelProfessor();
    } else if (aluno) {
        sessao = aluno;
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('aluno-dash').classList.remove('hidden');
        document.getElementById('aluno-nome-txt').innerText = aluno.nome;
        renderTutores();
    } else {
        alert("Login inválido");
    }
}

function salvarCadastro() {
    const nome = document.getElementById('r-nome').value;
    const email = document.getElementById('r-email').value;
    const senha = document.getElementById('r-senha').value;
    
    if(!nome || !email || !senha) return alert("Preencha todos os campos");

    alunos.push({ nome, email, senha });
    localStorage.setItem('bd_alunos', JSON.stringify(alunos));
    alert("Cadastro realizado!");
    alternarAuth();
}

function renderTutores() {
    document.getElementById('lista-tutores').innerHTML = professores.map(p => `
        <div style="border-bottom:1px solid #eee; padding:10px;">
            <strong>${p.nome}</strong> (${p.materia})<br>
            <input type="date" id="data-${p.id}">
            <select id="hora-${p.id}">
                <option value="09:00">09:00</option>
                <option value="14:00">14:00</option>
                <option value="20:00">20:00</option>
            </select>
            <button onclick="agendar(${p.id})">Agendar</button>
        </div>
    `).join('');
}

function agendar(id) {
    const p = professores.find(prof => prof.id === id);
    const d = document.getElementById('data-'+id).value;
    const h = document.getElementById('hora-'+id).value;
    if(!d) return alert("Data obrigatória!");
    
    todasAulas.push({ 
        id: Date.now(), profId: p.id, profNome: p.nome, aluno: sessao.nome, 
        data: d, hora: h, status: 'Pendente', material: '', entrega: '', 
        avaliacao: 0, comentarioAluno: '', feedback: '', invite: '', duvidas: '', certificado: '' 
    });
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Solicitado!"); 
    mostrarAba('historico');
}

function renderAulasAluno() {
    const minhasAulas = todasAulas.filter(a => a.aluno === sessao.nome);
    document.getElementById('lista-aulas-aluno').innerHTML = minhasAulas.map(a => `
        <div class="card" style="border:1px solid #eee;">
            <strong>${a.data} às ${a.hora}</strong> - Tutor: ${a.profNome} - 
            <strong style="color:${a.status === 'Confirmada' ? 'var(--success)' : 'orange'}">${a.status}</strong><br>
            
            ${a.invite ? `<div class="invite-box"><strong>Link/Invite da Aula:</strong><br>${a.invite}</div>` : ''}
            ${a.certificado ? `<div class="cert-box">🎓 Certificado Disponível:<br>${a.certificado}</div>` : ''}
            
            <div class="${a.material ? 'mat-verde' : ''}" style="margin-top:10px;">Material: ${a.material || 'Aguardando professor...'}</div>
            
            <textarea id="duv-${a.id}" placeholder="Dúvidas para o professor...">${a.duvidas || ''}</textarea>
            <button class="btn-sec" onclick="salvarDuvidas(${a.id})">Salvar Dúvidas</button>

            <textarea id="entre-${a.id}" style="margin-top:15px;" placeholder="Entregar atividade aqui...">${a.entrega || ''}</textarea>
            <button onclick="enviarEntrega(${a.id})">Enviar Entrega</button>
            
            <div class="estrelas">
                ${[1,2,3,4,5].map(n => `<span onclick="setNota(${a.id}, ${n})" style="color:${n <= (a.avaliacao||0) ? '#fbbf24' : '#ccc'}">★</span>`).join('')}
            </div>
            <textarea id="coment-${a.id}" placeholder="Seu feedback para o professor...">${a.comentarioAluno || ''}</textarea>
            <button class="btn-sec" onclick="enviarAvaliacao(${a.id})">Enviar Feedback</button>

            ${a.feedback ? `<div class="feedback-box"><strong>Feedback do Professor:</strong><br>${a.feedback}</div>` : ''}
        </div>
    `).join('');
}

function setNota(aulaId, nota) {
    const aula = todasAulas.find(a => a.id === aulaId);
    if(aula) { aula.avaliacao = nota; renderAulasAluno(); }
}

function salvarDuvidas(id) {
    todasAulas.find(a => a.id === id).duvidas = document.getElementById('duv-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Dúvidas enviadas!");
}

function enviarEntrega(id) {
    todasAulas.find(a => a.id === id).entrega = document.getElementById('entre-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Entrega enviada!");
}

function enviarAvaliacao(id) {
    todasAulas.find(a => a.id === id).comentarioAluno = document.getElementById('coment-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Avaliação registrada!");
}

function renderPainelProfessor() {
    const solicitacoes = todasAulas.filter(a => a.profId === sessao.id);
    document.getElementById('lista-solicitacoes').innerHTML = solicitacoes.map(a => `
        <div class="card">
            <strong>Aluno: ${a.aluno}</strong> | <strong>${a.data} às ${a.hora}</strong><br>
            <p style="background:#f1f5f9; padding:5px; border-radius:4px;"><strong>Dúvidas:</strong> ${a.duvidas || 'Nenhuma.'}</p>
            
            ${a.status === 'Pendente' ? 
                `<button onclick="aceitar(${a.id})">Aceitar Aula</button>` : 
                `<div class="status-confirmado"><span>✅</span> Aula Confirmada</div>`
            }<br>
            
            <input type="text" id="inv-${a.id}" placeholder="Invite (ID/Senha Zoom/Meet)" value="${a.invite || ''}">
            <button onclick="enviarInvite(${a.id})" style="background:#0ea5e9">Salvar Invite</button>

            <input type="text" id="mat-${a.id}" placeholder="Link material didático" value="${a.material || ''}">
            <button onclick="enviarMaterial(${a.id})" style="background:#666">Enviar Material</button>
            
            <input type="text" id="cert-${a.id}" placeholder="Link ou Código do Certificado" value="${a.certificado || ''}">
            <button onclick="emitirCertificado(${a.id})" style="background:#eab308; color:black;">Emitir Certificado</button>
            
            <p>Entrega: <em>${a.entrega || 'Vazio'}</em></p>
            <textarea id="feed-${a.id}" placeholder="Feedback...">${a.feedback || ''}</textarea>
            <button onclick="enviarFeedback(${a.id})">Enviar Feedback</button>
            <hr>
            <small>Avaliação: ${'★'.repeat(a.avaliacao || 0)} - ${a.comentarioAluno || ''}</small>
        </div>
    `).join('');
}

function aceitar(id) {
    todasAulas.find(a => a.id === id).status = 'Confirmada';
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    renderPainelProfessor();
}

function enviarInvite(id) {
    todasAulas.find(a => a.id === id).invite = document.getElementById('inv-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Invite salvo!");
}

function enviarMaterial(id) {
    todasAulas.find(a => a.id === id).material = document.getElementById('mat-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Material enviado!");
    renderPainelProfessor();
}

function enviarFeedback(id) {
    todasAulas.find(a => a.id === id).feedback = document.getElementById('feed-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Feedback enviado!");
    renderPainelProfessor();
}

function emitirCertificado(id) {
    todasAulas.find(a => a.id === id).certificado = document.getElementById('cert-'+id).value;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Certificado emitido!");
    renderPainelProfessor();
}
