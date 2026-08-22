// Elementos principais da interface
var btnEnviar = document.getElementById('sendButton');
var inputMsg = document.getElementById('messageInput');
var areaMsg = document.querySelector('.chat-messages');
var plataformas = document.querySelectorAll('.platform-link');
var gruposConversa = document.querySelectorAll('.conversation-group');
var itensConversa = document.querySelectorAll('.conversation-item');
var cabecalhoChat = document.querySelector('.chat-header');
var campoBusca = document.querySelector('input[type="search"]');
var btnSair = document.getElementById('logoutButton');
var chatAtualId = '1';

var usuarioLogado = sessionStorage.getItem('usuario');
if (!usuarioLogado) {
  window.location.href = 'login.html';
}

var chats = {
  1: {
    nome: 'João Silva',
    plataforma: 'WhatsApp',
    status: 'Online',
    foto: 'https://ui-avatars.com/api/?name=Joao+Silva&background=25D366&color=fff',
    msgs: [
      { tipo: 'received', txt: 'Olá! Boa tarde!', hora: '10:25' },
      { tipo: 'received', txt: 'Gostaria de saber mais sobre os produtos disponíveis.', hora: '10:26' },
      { tipo: 'received', txt: 'Vocês fazem entrega?', hora: '10:26' },
      { tipo: 'sent', txt: 'Olá João! Claro, temos vários produtos disponíveis.', hora: '10:28' },
      { tipo: 'sent', txt: 'Sim, fazemos entrega em toda a cidade!', hora: '10:28' },
      { tipo: 'received', txt: 'Perfeito! Qual o prazo de entrega?', hora: '10:30' },
      { tipo: 'sent', txt: 'O prazo é de 2 a 3 dias úteis para a sua região.', hora: '10:31' },
      { tipo: 'received', txt: 'Ótimo! Vou fazer o pedido então.', hora: '10:32' }
    ]
  },
  5: {
    nome: 'Carlos Mendes',
    plataforma: 'WhatsApp',
    status: 'Digitando...',
    foto: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=25D366&color=fff',
    msgs: [
      { tipo: 'received', txt: 'Tem disponível em outras cores?', hora: 'Seg 14:20' },
      { tipo: 'sent', txt: 'Temos sim. Posso te enviar as opções disponíveis agora.', hora: 'Seg 14:22' }
    ]
  },
  6: {
    nome: 'Julia Costa',
    plataforma: 'Instagram',
    status: 'Online',
    foto: 'https://ui-avatars.com/api/?name=Julia+Costa&background=E4405F&color=fff',
    msgs: [
      { tipo: 'received', txt: 'Adorei o produto!', hora: '11:20' },
      { tipo: 'sent', txt: 'Que bom que gostou! Quer fazer o pedido?', hora: '11:25' }
    ]
  },
  7: {
    nome: 'Rafael Alves',
    plataforma: 'Instagram',
    status: 'Ativo há 5min',
    foto: 'https://ui-avatars.com/api/?name=Rafael+Alves&background=E4405F&color=fff',
    msgs: [
      { tipo: 'received', txt: 'Vi seu post, como faço pedido?', hora: '10:45' },
      { tipo: 'sent', txt: 'Olá! Você pode fazer pelo direct ou WhatsApp.', hora: '10:50' }
    ]
  },
  8: {
    nome: 'Lucia Ferreira',
    plataforma: 'Facebook',
    status: 'Online',
    foto: 'https://ui-avatars.com/api/?name=Lucia+Ferreira&background=1877F2&color=fff',
    msgs: [
      { tipo: 'received', txt: 'Preciso de mais informações.', hora: '12:00' },
      { tipo: 'sent', txt: 'Claro! O que gostaria de saber?', hora: '12:05' }
    ]
  },
  9: {
    nome: 'Bruno Souza',
    plataforma: 'Telegram',
    status: 'Online',
    foto: 'https://ui-avatars.com/api/?name=Bruno+Souza&background=0088cc&color=fff',
    msgs: [
      { tipo: 'received', txt: 'Olá, tudo bem?', hora: '13:15' },
      { tipo: 'sent', txt: 'Tudo Ótimo! E voc??', hora: '13:20' }
    ]
  }
};

function detalhesPlataforma(plataforma) {
  if (plataforma === 'Instagram') return { icone: 'instagram', cor: 'danger' };
  if (plataforma === 'Facebook') return { icone: 'facebook', cor: 'primary' };
  if (plataforma === 'Telegram') return { icone: 'telegram', cor: 'info' };
  return { icone: 'whatsapp', cor: 'success' };
}

function criarElemento(tag, className, texto) {
  var elemento = document.createElement(tag);
  if (className) elemento.className = className;
  if (texto) elemento.textContent = texto;
  return elemento;
}

for (var i = 0; i < plataformas.length; i++) {
  plataformas[i].onclick = function(e) {
    e.preventDefault();
    var plat = this.getAttribute('data-platform');

    for (var j = 0; j < plataformas.length; j++) plataformas[j].classList.remove('active');
    this.classList.add('active');

    for (var k = 0; k < gruposConversa.length; k++) gruposConversa[k].classList.add('d-none');

    var grupoSelecionado = document.querySelector('.conversation-group[data-platform="' + plat + '"]');
    if (grupoSelecionado) {
      grupoSelecionado.classList.remove('d-none');
      var primeiraConversa = grupoSelecionado.querySelector('.conversation-item');
      if (primeiraConversa) primeiraConversa.click();
    }
  };
}

for (var c = 0; c < itensConversa.length; c++) {
  itensConversa[c].onclick = function() {
    for (var j = 0; j < itensConversa.length; j++) itensConversa[j].classList.remove('active');
    this.classList.add('active');

    var badge = this.querySelector('.badge');
    if (badge) badge.remove();

    chatAtualId = this.getAttribute('data-chat-id');
    mostrarChat(chatAtualId);
  };
}

function mostrarChat(id) {
  var chat = chats[id];
  if (!chat) return;

  var detalhes = detalhesPlataforma(chat.plataforma);
  var corStatus = chat.status.indexOf('Online') >= 0 || chat.status.indexOf('Digitando') >= 0 ? 'success' : 'secondary';

  cabecalhoChat.innerHTML = '';
  var wrapper = criarElemento('div', 'd-flex align-items-center justify-content-between');
  var info = criarElemento('div', 'd-flex align-items-center');
  var img = criarElemento('img', 'rounded-circle me-3');
  img.src = chat.foto;
  img.width = 50;
  img.height = 50;
  img.alt = 'Avatar de ' + chat.nome;

  var textos = criarElemento('div');
  textos.appendChild(criarElemento('h5', 'mb-0', chat.nome));
  var meta = criarElemento('small', 'text-muted');
  meta.innerHTML = '<i class="bi bi-' + detalhes.icone + ' text-' + detalhes.cor + '"></i> ' + chat.plataforma + ' &bull; <span class="text-' + corStatus + '">' + chat.status + '</span>';
  textos.appendChild(meta);

  info.appendChild(img);
  info.appendChild(textos);

  var acoes = criarElemento('div');
  acoes.innerHTML = '<button class="btn btn-sm btn-outline-secondary me-2" title="Chamada de voz"><i class="bi bi-telephone"></i></button><button class="btn btn-sm btn-outline-secondary me-2" title="Chamada de vídeo"><i class="bi bi-camera-video"></i></button><button class="btn btn-sm btn-outline-secondary" title="Mais opções"><i class="bi bi-three-dots-vertical"></i></button>';

  wrapper.appendChild(info);
  wrapper.appendChild(acoes);
  cabecalhoChat.appendChild(wrapper);

  areaMsg.innerHTML = '<div class="message-date text-center mb-3"><span class="badge bg-light text-dark">Hoje</span></div>';
  for (var i = 0; i < chat.msgs.length; i++) adicionarMsg(chat.msgs[i].txt, chat.msgs[i].tipo, chat.msgs[i].hora, chat.foto);
  areaMsg.scrollTop = areaMsg.scrollHeight;
}

function adicionarMsg(texto, tipo, hora, foto) {
  var div = criarElemento('div', 'message ' + tipo);

  if (tipo === 'received') {
    var img = criarElemento('img', 'rounded-circle me-2');
    img.src = foto;
    img.width = 35;
    img.height = 35;
    img.alt = 'Avatar do cliente';
    div.appendChild(img);
  }

  var bolha = criarElemento('div', 'message-bubble');
  bolha.appendChild(criarElemento('p', 'mb-1', texto));

  var horario = criarElemento('small', 'text-muted');
  horario.textContent = hora;
  if (tipo === 'sent') horario.insertAdjacentHTML('beforeend', ' <i class="bi bi-check-all text-primary"></i>');

  bolha.appendChild(horario);
  div.appendChild(bolha);
  areaMsg.appendChild(div);
  areaMsg.scrollTop = areaMsg.scrollHeight;
}

btnEnviar.onclick = function() {
  var texto = inputMsg.value.trim();
  if (!texto) return;

  var agora = new Date();
  var hora = String(agora.getHours()).padStart(2, '0') + ':' + String(agora.getMinutes()).padStart(2, '0');
  adicionarMsg(texto, 'sent', hora);

  if (chats[chatAtualId]) chats[chatAtualId].msgs.push({ tipo: 'sent', txt: texto, hora: hora });

  inputMsg.value = '';
  inputMsg.focus();
};

inputMsg.onkeydown = function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnEnviar.click();
  }
};

campoBusca.oninput = function() {
  var termo = this.value.toLowerCase();

  for (var i = 0; i < itensConversa.length; i++) {
    var nome = itensConversa[i].querySelector('h6').textContent.toLowerCase();
    var msg = itensConversa[i].querySelector('p').textContent.toLowerCase();
    itensConversa[i].style.display = nome.indexOf(termo) >= 0 || msg.indexOf(termo) >= 0 ? 'flex' : 'none';
  }
};

if (btnSair) {
  btnSair.onclick = function(e) {
    e.preventDefault();
    sessionStorage.removeItem('usuario');
    window.location.href = 'login.html';
  };
}

mostrarChat(chatAtualId);
