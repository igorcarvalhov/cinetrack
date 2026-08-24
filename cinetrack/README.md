🔗 **[Acesse o projeto ao vivo](https://cinetrack-coral-ten.vercel.app)**

# 🎬 CineTrack

Aplicativo web para buscar filmes e séries e organizá-los em listas pessoais (favoritos, quero assistir, assistidos). Projeto desenvolvido para prática e portfólio, com autenticação de usuários e persistência de dados em tempo real.

## ✨ Funcionalidades

- 🔐 Autenticação de usuários (cadastro e login)
- 🔍 Busca de filmes em tempo real via API do TMDB
- 🎞️ Listagem de filmes populares
- ⭐ Salvar filmes em lista pessoal
- 🗑️ Remover filmes da lista pessoal
- 🔒 Rotas protegidas (lista pessoal só acessível autenticado)
- 📱 Interface responsiva

## 🛠️ Tecnologias

- **React** + **TypeScript**
- **Vite** — build tool
- **React Router DOM** — navegação entre páginas
- **Supabase** — autenticação e banco de dados (PostgreSQL)
- **TMDB API** — dados de filmes e séries
- **CSS puro** — estilização

## 📁 Estrutura do projeto

- **src/**
- **components/** → componentes reutilizáveis (Navbar, MovieCard)
- **pages/** → páginas da aplicação (Login, Home, MinhaLista)
- **hooks/** → hooks customizados (useAuth, useFavorites)
- **services/** → integrações externas (Supabase, TMDB)
- **context/** → Context API (autenticação)
- **ypes/** → tipagens TypeScript

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js instalado
- Conta gratuita no [Supabase](https://supabase.com)
- Chave de API do [TMDB](https://www.themoviedb.org/documentation/api)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/igorcarvalhov/cinetrack.git
cd cinetrack
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com suas próprias chaves:
```VITE_TMDB_TOKEN=seu_token_aqui
```
```VITE_SUPABASE_URL=sua_url_aqui
```
```VITE_SUPABASE_ANON_KEY=sua_key_aqui
```

4. No Supabase, crie uma tabela `favorites` com as colunas:

| Coluna | Tipo |
|---|---|
| id | int8 (primary key) |
| user_id | uuid |
| movie_id | int8 |
| movie_title | text |
| poster_path | text |
| status | text |
| created_at | timestamp (default now()) |

Ative Row Level Security (RLS) na tabela, restringindo acesso a `user_id = auth.uid()`.

5. Rode o projeto:
```bash
npm run dev
```

6. Acesse `http://localhost:5173`

## 📌 Próximos passos

- [ ] Deploy em produção (Vercel)
- [ ] Testes automatizados
- [ ] Filtro por status na lista pessoal (favorito / quero assistir / assistido)

## 👤 Autor

Desenvolvido por Igor Carvalho como projeto de portfólio, durante o curso de Análise e Desenvolvimento de Sistemas.
