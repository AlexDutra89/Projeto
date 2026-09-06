/* =========================================================================
   CHAT.JS — Integrante C
   Chat simples por aula. Cada aula guarda um array "mensagens".
   renderChat é chamado tanto pela tela do aluno quanto do professor.
   ========================================================================= */

function renderChat(aula, origem) {
    const mensagens = aula.mensagens || [];
    const listaHtml = mensagens.length
        ? mensagens.map(m => `<div class="chat-msg"><strong>${m.remetente}:</strong> ${m.texto} <small>(${m.data})</small></div>`).join('')
        : '<p style="color:#999; margin:0;">Nenhuma mensagem ainda.</p>';

    return `
        <div class="chat-box">
            <strong>Chat da aula</strong>
            <div class="chat-lista">${listaHtml}</div>
            <textarea id="chat-${origem}-${aula.id}" placeholder="Escrever mensagem..."></textarea>
            <button class="btn-sec" onclick="enviarMensagem(${aula.id}, '${origem}')">Enviar mensagem</button>
        </div>`;
}

function enviarMensagem(aulaId, origem) {
    const campo = document.getElementById(`chat-${origem}-${aulaId}`);
    const texto = campo.value.trim();
    if (!texto) return;

    const aula = todasAulas.find(a => a.id === aulaId);
    if (!aula.mensagens) aula.mensagens = [];

    aula.mensagens.push({
        remetente: sessao.nome,
        texto,
        data: new Date().toLocaleString('pt-BR')
    });

    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));

    if (origem === 'aluno') renderAulasAluno();
    else renderPainelProfessor();
}
