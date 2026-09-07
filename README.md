#  Conecta Tutor

Colaboradores:

•	ALEX DOS SANTOS DUTRA
•	ADRIEL XAVIER PEREIRA DA SILVA
•	CHRISTYAN ROBERTO SILVA
•	GABRIEL GOMES CAMILO
•	HUGO VIANA DE OLIVEIRA
•	ROBERTO LUAN LIMA DA SILVA

O *Conecta Tutor* é uma plataforma que tem como objetivo conectar alunos com dificuldades em determinadas matérias e professores voluntários. O projeto foca em uma experiência simples, funcional e direta.

**Funcionalidades Principais:**

- *Sistema de Autenticação:* Login e cadastro diferenciado para alunos e professores.
- *Agendamento de Aulas:* Alunos podem escolher tutores por matéria, datas e horários disponíveis.
- *Filtro de Busca:* O aluno filtra os tutores por matéria antes de escolher um horário.
- *Disponibilidade Dinâmica:* O professor cadastra e remove os próprios horários livres, que saem da lista assim que agendados.
- *Validação de Conflito:* O sistema impede que dois alunos agendem o mesmo horário com o mesmo professor.
- *Gestão de Aulas:* Professores podem aceitar solicitações e enviar links (convites) para aulas online e materiais didáticos.
- *Contador de Pendências:* O painel do professor exibe um indicador com a quantidade de solicitações ainda não aceitas.
- *Chat por Aula:* Aluno e professor trocam mensagens simples dentro de cada aula agendada.
- *Interação e Feedback:* Campos para descrição de dúvidas, envio de atividades e avaliação por estrelas.
- *Certificação em PDF:* Emissão de certificado de conclusão em um arquivo PDF real, gerado pelo próprio navegador.

**Tecnologias Utilizadas**

Este projeto utiliza o "trio fundamental" do desenvolvimento web, sem frameworks:

* *HTML5:* Estrutura semântica do projeto.
* *CSS3:* Layout responsivo utilizando Flexbox e variáveis nativas.
* *JavaScript (ES6+):* Lógica de negócio, manipulação de DOM e persistência de dados.
* *LocalStorage:* Banco de dados local para manter as informações salvas no navegador.
* *jsPDF (via CDN):* Geração do certificado em PDF direto no navegador.

**Estrutura de Arquivos**

O código JavaScript é dividido em módulos, um por funcionalidade, para facilitar o trabalho em equipe:

```
js/
 ├── agendamento.js      -> filtro de tutores e agendamento com validação de conflito
 ├── certificado.js      -> emissão de certificado em PDF e contador de pendências
 ├── chat.js             -> chat simples entre aluno e professor por aula
 ├── core.js             -> dados, navegação, autenticação e renderização base
 └── disponibilidade.js  -> cadastro de horários livres pelo professor
video/
 └── video_conectatutor.mp4 -> vídeo de apresentação do projeto (1:05)
index.html
style.css
```

* Existem 3 tutores fictícios cadastrados na plataforma para testar as funcionalidades:

- Eng. Ana Souza - ana@conecta.com - senha: 123
- Dra. Elen Silva - elen@conecta.com - senha: 123
- Professor Marcos Oliveira - marcos@conecta.com - senha: 123

Os alunos não são fixos na plataforma. Para testar o fluxo de aluno, basta clicar em "Criar Conta" e criar uma nova conta. Sugestão de contas para teste (ou crie a sua):

- Lucas Gonçalves - lucas@gmail.com - senha: 123
- Pedro Silva - pedrosilva@gmail.com - senha: 123

**Como rodar o projeto**

Como o projeto utiliza apenas tecnologias front-end nativas, você não precisa instalar dependências:

Clone o repositório:

git clone https://github.com/AlexDutra89/projeto-integrador-senac.git

Depois, é só abrir o arquivo `index.html` no navegador (ou usar a extensão Live Server do VS Code).

**Acesso online**

Link do protótipo publicado: https://alexdutra89.github.io/projeto-integrador-senac/
