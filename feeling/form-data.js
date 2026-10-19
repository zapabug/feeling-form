// Feeling Madeira - office tasks questionnaire (PT-PT).
// Copy this folder for another business and edit only this file.
window.FORM = {
  storeKey: 'feeling-form-v1',
  pageTitle: 'Questionário',
  title: 'Tarefas do escritório: o que dá para automatizar?',
  byline: 'Para Feeling Madeira Tours & Walks · de zapa',
  introHtml: 'Quero perceber quanto do vosso trabalho diário o assistente de WhatsApp pode fazer <strong>bem e com segurança</strong>: o assistente trata do que são dados e regras, e as pessoas ficam com o que precisa de decisão. Isto <strong>não é uma proposta</strong>, é só para perceber o vosso dia a dia.',
  hintHtml: 'Uma palavra ou uma frase chega. O que escreverem fica guardado neste navegador até enviarem. No fim, carreguem em <strong>Enviar por WhatsApp</strong> e escolham a conversa comigo.',
  whoLabel: 'Quem está a preencher?',
  whoPlaceholder: 'O vosso nome',
  tasksTitle: 'As tarefas',
  tasksIntro: 'A frase em cinzento é como eu vejo a tarefa hoje. Onde há "(?)" não tenho a certeza, corrijam à vontade nas notas.',
  questionsTitle: 'Algumas perguntas',
  messageTitle: 'Tarefas Feeling: respostas',

  tasks: [
    ['Responder a pedidos de informação no WhatsApp', 'O assistente já responde'],
    ['Dar preços e totais para o grupo', 'O assistente já calcula, com os preços do site'],
    ['Dias em que cada tour se realiza', 'Vem do site, mas há dias errados (ver relatório)'],
    ['Receber um pedido de reserva', 'O assistente prepara o pedido; o escritório confirma com um clique'],
    ['Perguntas que o assistente não sabe responder', 'O assistente pergunta ao escritório e pode memorizar a resposta'],
    ['Avarias e manutenção das viaturas', 'O assistente lê os grupos da equipa e regista'],
    ['Saber quantos lugares ainda há num tour', 'Feito à mão (o escritório sabe)'],
    ['Combinar o local e a hora de recolha', 'Feito à mão. Com a vossa lista de locais habituais, o assistente pode sugerir o mais próximo a partir do que o cliente indicar (hotel, cruzamento, número da porta)'],
    ['Lembrete ao cliente na véspera, com a hora de recolha', 'Não é feito (?)'],
    ['Cancelar um tour (tempo, segurança) e avisar todos os clientes', 'Feito à mão, um a um (?)'],
    ['Folha de serviço diária', 'Em papel, depois fotografada'],
    ['Enviar aos motoristas o trabalho do dia', 'Pelo WhatsApp, à mão'],
    ['Motoristas avisam de algo fora do normal (cliente que não aparece, deixado noutro sítio)', 'Sem registo fixo (?)'],
    ['Receber o pagamento', 'Pela loja do site (PayPal ou transferência)'],
    ['Faturas', ''],
    ['Listas para o seguro', ''],
    ['Manter o site atualizado (preços, dias, tours)', 'Feito à mão'],
  ],

  questions: [
    { key: 'q1', label: '1. Que tarefas faltam nesta lista?', short: 'Tarefas em falta' },
    { key: 'q2', label: '2. Qual é a tarefa que mais tempo vos tira, ou que mais vos chateia?', short: 'O que mais tempo tira' },
    { key: 'q3', label: '3. Onde chegam as reservas hoje? (site, WhatsApp, telefone, GetYourGuide, Viator, hotéis, agências…)', short: 'Onde chegam as reservas' },
    { key: 'q5', label: '4. Há alguma tarefa que nunca querem que seja automática?', short: 'Nunca automatizar' },
  ],

  // null to leave the section out
  pickups: {
    title: 'Locais de recolha habituais',
    intro: 'Hotéis onde vão buscar os clientes e pontos de encontro. Para cada um: nome, morada ou referência (cruzamento, número da porta, edifício conhecido) e a hora habitual de recolha.',
    name: 'Nome do local', namePh: 'ex.: Hotel Savoy Palace',
    time: 'Hora habitual', timePh: 'ex.: West 08:50, East 09:00',
    where: 'Morada ou referência', wherePh: 'ex.: paragem em frente, Av. do Infante 56',
    add: '+ Adicionar local', remove: 'Remover',
    noPickupLabel: 'Há zonas ou ruas onde não fazem recolha?',
    noPickupShort: 'Sem recolha',
  },

  ui: {
    who: 'Quem faz', whoPh: 'escritório, motorista, gerente…',
    time: 'Tempo', timePh: 'ex.: 30 min/dia',
    auto: 'Automatizar?', choices: ['Sim', 'Não', 'Talvez'],
    notes: 'Notas', notesPh: 'o que nos devemos lembrar',
    filledBy: 'Preenchido por',
    send: 'Enviar por WhatsApp', copy: 'Copiar respostas',
    opening: 'A abrir o WhatsApp… escolham a conversa comigo e carreguem em enviar.',
    tooLong: 'As respostas são longas: carreguem em "Copiar respostas" e colem na conversa comigo.',
    copied: 'Copiado! Colem na conversa comigo no WhatsApp.',
    copyFailed: 'Não foi possível copiar automaticamente.',
  },
};
