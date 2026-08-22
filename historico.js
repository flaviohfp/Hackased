var usuarioLogado = sessionStorage.getItem('usuario');
if (!usuarioLogado) {
  window.location.href = 'login.html';
}

var atendentes = [
  { id: 1, nome: 'Maria Santos', total: 15 },
  { id: 2, nome: 'Carlos Mendes', total: 12 },
  { id: 3, nome: 'Ana Lima', total: 8 }
];

var todasMsgs = {
  1: [
    {
      plat: 'whatsapp',
      cliente: 'João Silva',
      msg: 'Olá! Gostaria de saber mais sobre os produtos.',
      resp: 'Olá João! Claro, temos diversos produtos disponíveis.',
      data: '2024-11-26 09:30',
      atendente: 'Maria Santos',
      status: 'resolved'
    },
    {
      plat: 'whatsapp',
      cliente: 'Pedro Almeida',
      msg: 'Preciso de ajuda com meu pedido #1234.',
      resp: 'Oi Pedro! Vou verificar agora.',
      data: '2024-11-26 11:00',
      atendente: 'Maria Santos',
      status: 'pending'
    }
  ],
  2: [
    {
      plat: 'instagram',
      cliente: '@ana_costa',
      msg: 'Qual o prazo de entrega para São Paulo?',
      resp: 'Olá Ana! O prazo é de 5 a 7 dias úteis.',
      data: '2024-11-26 10:15',
      atendente: 'Carlos Mendes',
      status: 'resolved'
    },
    {
      plat: 'facebook',
      cliente: 'Roberto Souza',
      msg: 'Não recebi confirmação do pedido.',
      resp: 'Vou verificar para você.',
      data: '2024-11-25 18:20',
      atendente: 'Carlos Mendes',
      status: 'pending'
    }
  ],
  3: [
    {
      plat: 'whatsapp',
      cliente: 'Fernanda Costa',
      msg: 'Bom dia! Queria fazer um pedido.',
      resp: 'Bom dia! Claro, como posso ajudar?',
      data: '2024-11-26 08:15',
      atendente: 'Ana Lima',
      status: 'resolved'
    }
  ]
};

var msgsAtual = [];
var atendenteAtualId = 1;
var filtroPlataforma = 'all';

function configurarInterface() {
  var cabecalho = document.querySelector('.chat-header');
  var linksFiltro = document.querySelectorAll('[data-platform]');

  for (var i = 0; i < linksFiltro.length; i++) {
    linksFiltro[i].onclick = function(e) {
      e.preventDefault();
      filtroPlataforma = this.getAttribute('data-platform');
      for (var j = 0; j < linksFiltro.length; j++) linksFiltro[j].classList.remove('active');
      this.classList.add('active');
      mostrar();
    };
  }

  if (usuarioLogado === 'gestor') {
    var menuAtendentes = '<div class="mb-3"><label class="form-label" for="selectAtendente">Atendente:</label><select class="form-select" id="selectAtendente">';
    for (var a = 0; a < atendentes.length; a++) {
      menuAtendentes += '<option value="' + atendentes[a].id + '">' + atendentes[a].nome + ' (' + atendentes[a].total + ' conversas)</option>';
    }
    menuAtendentes += '</select></div>';

    var divStats = cabecalho.querySelector('.row.g-3.mb-3');
    divStats.insertAdjacentHTML('beforebegin', menuAtendentes);

    document.getElementById('selectAtendente').onchange = function() {
      atendenteAtualId = parseInt(this.value, 10);
      carregarMensagens();
    };

    document.getElementById('messagesList').addEventListener('click', function(e) {
      var botao = e.target.closest('.btn-editar');
      if (botao) editarMensagem(botao.getAttribute('data-index'));
    });
  }
}

function carregarMensagens() {
  msgsAtual = todasMsgs[atendenteAtualId] || [];
  atualizarStats();
  mostrar();
}

function atualizarStats() {
  var whats = 0;
  var insta = 0;
  var face = 0;
  var resol = 0;
  var pend = 0;

  for (var i = 0; i < msgsAtual.length; i++) {
    if (msgsAtual[i].plat === 'whatsapp') whats++;
    if (msgsAtual[i].plat === 'instagram') insta++;
    if (msgsAtual[i].plat === 'facebook') face++;
    if (msgsAtual[i].status === 'resolved') resol++;
    if (msgsAtual[i].status === 'pending') pend++;
  }

  document.getElementById('whatsappCount').textContent = whats;
  document.getElementById('instagramCount').textContent = insta;
  document.getElementById('resolvedCount').textContent = resol;
  document.getElementById('pendingCount').textContent = pend;
  document.getElementById('whatsappBadge').textContent = whats;
  document.getElementById('instagramBadge').textContent = insta;
  document.getElementById('facebookBadge').textContent = face;
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function mensagensFiltradas() {
  if (filtroPlataforma === 'all') return msgsAtual;
  return msgsAtual.filter(function(msg) {
    return msg.plat === filtroPlataforma;
  });
}

function mostrar() {
  var container = document.getElementById('messagesList');
  var lista = mensagensFiltradas();
  var termo = document.getElementById('searchInput').value.toLowerCase();

  if (termo) {
    lista = lista.filter(function(m) {
      return (m.cliente + ' ' + m.msg + ' ' + m.resp + ' ' + m.atendente).toLowerCase().indexOf(termo) >= 0;
    });
  }

  if (lista.length === 0) {
    container.innerHTML = '<div class="no-messages"><i class="bi bi-inbox"></i><h5>Nenhuma mensagem encontrada</h5></div>';
    return;
  }

  var html = '';
  for (var i = 0; i < lista.length; i++) {
    var m = lista[i];
    var indiceOriginal = msgsAtual.indexOf(m);
    var icone = 'bi-whatsapp';
    if (m.plat === 'instagram') icone = 'bi-instagram';
    if (m.plat === 'facebook') icone = 'bi-facebook';

    var statusTexto = m.status === 'resolved' ? 'Resolvido' : 'Pendente';
    var statusClass = m.status === 'resolved' ? 'status-resolved' : 'status-pending';

    html += '<div class="message-card ' + m.plat + '">';
    html += '<div class="d-flex justify-content-between align-items-start gap-3 mb-3">';
    html += '<div class="d-flex align-items-center gap-3 flex-wrap">';
    html += '<span class="platform-badge ' + m.plat + '"><i class="bi ' + icone + '"></i> ' + m.plat.charAt(0).toUpperCase() + m.plat.slice(1) + '</span>';
    html += '<h5 class="customer-name mb-0">' + escaparHtml(m.cliente) + '</h5>';
    html += '</div>';
    html += '<span class="badge ' + statusClass + '">' + statusTexto + '</span>';
    html += '</div>';
    html += '<div class="message-content">';
    html += '<div class="message-text"><strong>Mensagem:</strong><p>' + escaparHtml(m.msg) + '</p></div>';
    html += '<div class="message-text"><strong>Resposta:</strong><p>' + escaparHtml(m.resp) + '</p></div>';
    html += '</div>';
    html += '<div class="message-footer">';
    html += '<span class="footer-item"><i class="bi bi-person-circle"></i> ' + escaparHtml(m.atendente) + '</span>';
    html += '<span class="footer-item"><i class="bi bi-clock"></i> ' + escaparHtml(m.data) + '</span>';

    if (usuarioLogado === 'gestor') {
      html += '<button class="btn btn-sm btn-outline-primary btn-editar" data-index="' + indiceOriginal + '"><i class="bi bi-pencil"></i> Editar</button>';
    }

    html += '</div>';
    html += '</div>';
  }

  container.innerHTML = html;
}

function editarMensagem(index) {
  var m = msgsAtual[index];
  if (!m) return;

  var novaResp = prompt('Editar resposta:', m.resp);
  if (novaResp && novaResp.trim()) {
    msgsAtual[index].resp = novaResp.trim();
    mostrar();
    alert('Resposta atualizada com sucesso!');
  }
}

document.getElementById('searchInput').oninput = mostrar;

configurarInterface();
carregarMensagens();
