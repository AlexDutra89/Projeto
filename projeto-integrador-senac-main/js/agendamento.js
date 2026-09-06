/* =========================================================================
   AGENDAMENTO.JS — Integrante B
   Filtro de tutores por matéria + agendamento com validação de conflito.
   ========================================================================= */

function preencherFiltroMaterias() {
    const select = document.getElementById('filtro-materia');
    const materiasUnicas = [...new Set(professores.map(p => p.materia))];
    select.innerHTML = '<option value="todas">Todas</option>' +
        materiasUnicas.map(m => `<option value="${m}">${m}</option>`).join('');
}

function renderTutores(filtroMateria) {
    const lista = filtroMateria && filtroMateria !== 'todas'
        ? professores.filter(p => p.materia === filtroMateria)
        : professores;

    document.getElementById('lista-tutores').innerHTML = lista.map(p => {
        const livres = horariosLivres(p.id); // função vive em disponibilidade.js
        const opcoesHorario = livres.length
            ? livres.map(h => `<option value="${h.id}">${h.data} às ${h.hora}</option>`).join('')
            : '';

        return `
        <div style="border-bottom:1px solid #eee; padding:10px;">
            <strong>${p.nome}</strong> (${p.materia})<br>
            ${livres.length
                ? `<select id="slot-${p.id}">${opcoesHorario}</select>
                   <button onclick="agendar(${p.id})">Agendar</button>`
                : `<p style="color:#999;">Sem horários disponíveis no momento.</p>`
            }
        </div>`;
    }).join('');
}

function agendar(profId) {
    const p = professores.find(prof => prof.id === profId);
    const select = document.getElementById('slot-' + profId);
    if (!select || !select.value) return alert("Não há horário selecionado.");

    const slotId = Number(select.value);
    const slot = todasDisponibilidades.find(d => d.id === slotId);
    if (!slot) return alert("Esse horário não existe mais. Atualize a página.");

    // Validação de conflito: garante que não existe outra aula no mesmo
    // professor/data/hora (proteção extra além do horário sair da lista)
    const conflito = todasAulas.some(a =>
        a.profId === profId && a.data === slot.data && a.hora === slot.hora && a.status !== 'Cancelada'
    );
    if (conflito) {
        alert("Esse horário acabou de ser ocupado por outro aluno. Escolha outro.");
        return;
    }

    todasAulas.push({
        id: Date.now(), profId: p.id, profNome: p.nome, aluno: sessao.nome,
        data: slot.data, hora: slot.hora, status: 'Pendente', material: '', entrega: '',
        avaliacao: 0, comentarioAluno: '', feedback: '', invite: '', duvidas: '',
        certificado: '', mensagens: []
    });
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));

    removerDisponibilidade(slotId); // função vive em disponibilidade.js

    alert("Solicitado!");
    mostrarAba('historico');
}