# Sistema de Atendimento Multicanal

Projeto desenvolvido para o **Hackased**, competição em que grupos foram desafiados por jurados da **IXC** a propor uma solução para um problema antigo da empresa. Minha equipe criou este protótipo de central unificada de mensagens e conquistou o **2º lugar** na competição.

## Sobre o projeto

O site simula uma plataforma de atendimento ao cliente que centraliza conversas vindas de diferentes canais, como WhatsApp, Instagram, Facebook e Telegram. A ideia é reduzir a perda de mensagens, facilitar a rotina dos atendentes e dar mais visibilidade para gestores acompanharem o histórico dos atendimentos.

Em vez de cada colaborador precisar alternar entre várias redes sociais e aplicativos, a interface concentra os contatos em um único painel, com troca rápida de canal, conversa ativa, envio de mensagens e histórico consultável.

## Finalidade

O objetivo do projeto foi prototipar uma solução simples e visual para um cenário real de atendimento: empresas que recebem mensagens por muitos canais diferentes acabam tendo dificuldade para organizar demandas, acompanhar respostas e manter um histórico confiável.

O sistema foi pensado para dois perfis principais:

- **Atendente:** acompanha conversas e responde clientes em uma interface única.
- **Gestor:** visualiza históricos, filtra canais, acompanha status e pode editar respostas registradas.

## Funcionalidades

- Login demonstrativo com perfis de atendente e gestor.
- Painel de conversas separado por plataforma.
- Troca dinâmica entre WhatsApp, Instagram, Facebook e Telegram.
- Área de chat com mensagens recebidas e enviadas.
- Envio de novas mensagens pela interface.
- Busca por conversas.
- Página de histórico com estatísticas por canal.
- Filtros por plataforma no histórico.
- Busca dentro do histórico.
- Edição de resposta no perfil de gestor.
- Layout responsivo com Bootstrap.

## Tecnologias utilizadas

- **HTML5** para estrutura das páginas.
- **CSS3** para estilos personalizados e responsividade.
- **JavaScript** para interação, autenticação simulada, filtros e renderização dinâmica.
- **Bootstrap 5** para grid, componentes e utilitários visuais.
- **Bootstrap Icons** para ícones da interface.
- **Session Storage** para simular sessão de usuário no navegador.

## Como executar

Como o projeto é estático, não precisa instalar dependências.

1. Abra o arquivo `login.html` no navegador.
2. Faça login com uma das contas de demonstração.
3. Navegue entre o painel de mensagens e o histórico.

### Contas de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Atendente | `usuario@atendente.com` | `123` |
| Gestor | `usuario@gestor.com` | `123` |

## Estrutura do projeto

```text
.
├── index.html       # Painel principal de atendimento
├── script.js        # Interações do painel de mensagens
├── historico.html   # Página de histórico dos atendimentos
├── historico.js     # Filtros, estatísticas e edição do histórico
├── login.html       # Tela de login
├── login.js         # Autenticação simulada
├── style.css        # Estilos globais
└── README.md
```

## Observações

Este projeto é um protótipo front-end criado para apresentação em hackathon. Os dados são simulados no próprio JavaScript, sem banco de dados ou integração real com APIs das redes sociais. A proposta principal foi demonstrar a experiência, o fluxo de atendimento e o valor da centralização dos canais.
