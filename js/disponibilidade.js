/* =========================================================================
   DISPONIBILIDADE.JS — Integrante A
   O professor cadastra os horários livres. O aluno só vê o que existe aqui.
   Quando um horário é agendado, ele sai desta lista (ver agendamento.js).
   ========================================================================= */

function horariosLivres(profId) {
    return todasDisponibilidades.filter(d => d.profId === profId);
}

function adicionarDisponibilidade() {
    const data = document.getElementById('disp-data').value;
    const hora = document.getElementById('disp-hora').value;
    if (!data) return alert("Escolha uma data!");

    const jaExiste = todasDisponibilidades.some(
        d => d.profId === sessao.id && d.data === data && d.hora === hora
    );
    if (jaExiste) return alert("Esse horário já está cadastrado.");

    todasDisponibilidades.push({ id: Date.now(), profId: sessao.id, data, hora });
    localStorage.setItem('bd_disponibilidade', JSON.stringify(todasDisponibilidades));
    renderDisponibilidade();
}

function removerDisponibilidade(id) {
    todasDisponibilidades = todasDisponibilidades.filter(d => d.id !== id);
    localStorage.setItem('bd_disponibilidade', JSON.stringify(todasDisponibilidades));
    renderDisponibilidade();
}

function renderDisponibilidade() {
    const meus = horariosLivres(sessao.id);
    document.getElementById('lista-disponibilidade').innerHTML = meus.length
        ? meus.map(d => `
            <div class="disponibilidade-item">
                ${d.data} às ${d.hora}
                <button class="btn-sec" style="width:auto; padding:4px 10px;" onclick="removerDisponibilidade(${d.id})">Remover</button>
            </div>`).join('')
        : '<p style="color:#999;">Nenhum horário cadastrado ainda.</p>';
}
