/* =========================================================================
   CERTIFICADO.JS — Integrante D
   Contador de pendências no painel do professor + certificado em PDF real
   usando a biblioteca jsPDF (carregada via CDN no index.html).
   ========================================================================= */

function atualizarBadgePendentes(solicitacoes) {
    const pendentes = solicitacoes.filter(a => a.status === 'Pendente').length;
    const badge = document.getElementById('badge-pendentes');
    badge.innerText = pendentes;
    badge.classList.toggle('hidden', pendentes === 0);
}

function emitirCertificado(id) {
    const aula = todasAulas.find(a => a.id === id);
    aula.certificado = `Emitido em ${new Date().toLocaleDateString('pt-BR')}`;
    localStorage.setItem('bd_aulas', JSON.stringify(todasAulas));
    alert("Certificado emitido! O aluno já pode baixar o PDF.");
    renderPainelProfessor();

    gerarPDF(aula);
}

function baixarCertificadoPDF(id) {
    const aula = todasAulas.find(a => a.id === id);
    gerarPDF(aula);
}

function gerarPDF(aula) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Certificado de Conclusão", 105, 40, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Certificamos que ${aula.aluno}`, 105, 70, { align: "center" });
    doc.text(`concluiu 1h de aula de tutoria com ${aula.profNome}`, 105, 80, { align: "center" });
    doc.text(`realizada em ${aula.data} às ${aula.hora}.`, 105, 90, { align: "center" });

    doc.setFontSize(11);
    doc.text(`Emitido em ${new Date().toLocaleDateString('pt-BR')} - Conecta Tutor`, 105, 120, { align: "center" });

    doc.save(`certificado-${aula.aluno}.pdf`);
}