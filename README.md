# Viajá — Plataforma de Visualização de Dados do Setor Aéreo

> Sistema web para análise e visualização de registros de voos brasileiros, composto por três repositórios que trabalham em conjunto via Docker Compose.

---

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      docker-compose.yaml                    │
│                       (web-app/)                            │
│                                                             │
│  ┌───────────────┐   ┌───────────────┐   ┌──────────────┐   │
│  │   web-app     │   │  java-service │   │    bd-config │   │
│  │  (Node.js)    │   │  (Java/Maven) │   │  (MySQL 8.0) │   │
│  │  porta 3333   │   │  porta 8080   │   │  porta 3307  │   │
│  └──────┬────────┘   └──────┬────────┘   └──────┬───────┘   │
│         │                   │                   │           │
│         └───────────────────┴───────────────────┘           │
│                       docker compose                        │
└─────────────────────────────────────────────────────────────┘
```

| Repositório | Tecnologia | Container | Função |
|---|---|---|---|
| `web-app` | Node.js + Express | `viaja-web` | Servidor web + frontend |
| `java-service` | Java 21 + Maven | `viaja-jar` | ETL: baixa dados do S3 e insere no banco |
| `bd-config` | MySQL 8.0 | `viaja-mysql` | Banco de dados e scripts SQL |

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados
- [Git](https://git-scm.com/) para clonar os repositórios
- Credenciais AWS com acesso ao bucket `s3-viaja-arquivos` (necessário para o `java-service`)

---

## Estrutura de Repositórios

Os três repositórios devem ser clonados como pastas irmãs no mesmo diretório pai:

```
pasta-raiz/
├── web-app/          ← contém o docker-compose.yaml
├── java-service/
└── bd-config/
```

O `docker-compose.yaml` (localizado em `web-app/`) referencia os outros dois com caminhos relativos (`../bd-config/` e `../java-service/`).

---

## Como Executar com Docker (recomendado)

### 1. Clone os três repositórios

```bash
git clone <url-do-web-app>
git clone <url-do-java-service>
git clone <url-do-bd-config>
```

### 2. Configure as variáveis de ambiente

Crie ou edite o arquivo `.env` dentro de `web-app/`, copiando o `.env.dev` como base:

```bash
cp web-app/.env.dev web-app/.env
```

Adicione também as credenciais AWS — obrigatórias para o `java-service` baixar o arquivo do S3:

```bash
# Em web-app/.env, adicione:
AWS_ACCESS_KEY_ID=sua_chave
AWS_SECRET_ACCESS_KEY=sua_chave_secreta
AWS_SESSION_TOKEN=seu_token   # se usar credenciais temporárias
```

### 3. Faça o build do java-service

Antes de subir o Docker Compose, o JAR do serviço Java precisa estar compilado:

```bash
cd java-service
mvn clean package -DskipTests
cd ..
```

### 4. Suba os containers

```bash
cd web-app
docker-compose up --build
```

O Docker Compose vai:
1. Criar e inicializar o banco MySQL (`viaja-mysql`) com o script `bd-config/script-viaja-v3.sql`
2. Aguardar o banco estar saudável (healthcheck)
3. Subir a aplicação Node.js (`viaja-web`) na porta `3333`
4. Subir o serviço Java (`viaja-jar`) na porta `8080`, que executará o ETL automaticamente

### 5. Acesse a aplicação

```
http://localhost:3333
```

Para parar os containers:

```bash
docker-compose down
```

Para parar e remover os volumes (apaga os dados do banco):

```bash
docker-compose down -v
```

---

## Executar em Desenvolvimento (sem Docker)

### web-app

```bash
cd web-app
npm install
npm run dev     # inicia com nodemon (hot-reload)
```

Configure o arquivo `.env.dev` com as credenciais do banco local antes de iniciar.

### java-service

```bash
cd java-service
mvn clean package -DskipTests
java -jar target/java-service-1.0-SNAPSHOT.jar
```

Edite `db.properties` com os dados de conexão do banco local.

---

## Serviços e Portas

| Serviço | Container | Porta (host → container) | Descrição |
|---|---|---|---|
| Web App  | `viaja-web`   | `3333 → 3333` | Frontend + API REST |
| Java ETL | `viaja-jar`   | `8080 → 8080` | Carga de dados do S3 |
|   MySQL  | `viaja-mysql` | `3307 → 3306` | Banco de dados |

---

## Repositórios

### `web-app`

Aplicação principal com frontend e backend em Node.js + Express.

```
web-app/
├── app.js                  # Ponto de entrada, configuração do Express
├── dockerfile
├── docker-compose.yaml     # Orquestração dos três serviços
├── public/                 # Frontend estático (HTML, CSS, JS)
│   ├── index.html
│   └── pages/              # dashboard, login, cadastro, calendário, hotéis...
└── src/
    ├── controllers/        # Lógica de negócio
    ├── models/             # Queries SQL
    ├── routes/             # Definição das rotas da API
    └── database/           # Configuração da conexão MySQL
```

**Rotas disponíveis na API:**

| Rota | Descrição |
|---|---|
| `GET /`           | Página inicial |
| `/usuarios`       | Gerenciamento de usuários |
| `/empresa`        | Dados de empresa |
| `/dashboardGeral` | Dashboard com visão geral |
| `/dashboardMicro` | Dashboard detalhado por empresa |
| `/hoteis`         | Dados de hotéis |
| `/calendario`     | Eventos e calendário |
| `/params`         | Parâmetros gerais |

### `java-service`

Serviço ETL que baixa um arquivo Excel de um bucket S3 da AWS, processa os registros de voo e insere os dados no banco MySQL.

```
java-service/
├── Dockerfile
├── pom.xml
├── db.properties           # Configuração de conexão com o banco
└── src/main/java/
    ├── Main.java                          # Ponto de entrada do ETL
    ├── client/S3Provider.java             # Cliente AWS S3
    ├── dataLoader/
    │   ├── reader/ExcelRegistroVooReader  # Leitura do Excel com Apache POI
    │   ├── service/RegistroVooService     # Filtragem e transformação
    │   └── util/
    ├── database/
    │   ├── config/DB.java                 # Pool de conexões JDBC
    │   └── model/dao/                     # Camada de acesso a dados
    ├── entity/RegistroVoo.java            # Entidade de registro de voo
    └── logger/
        ├── AppLogger.java                 # Log4j2
        └── SlackNotifier.java             # Notificações via Slack
```

O serviço notifica o status de cada etapa via Slack. Para configurar a integração, consulte o arquivo `SETUP_SLACK.md`.

### `bd-config`

Contém todos os artefatos relacionados ao banco de dados.

```
bd-config/
├── script-viaja-v3.sql     # Script principal (usado pelo Docker Compose)
├── bd-dev.sql              # Script de desenvolvimento
├── querys-dashboard.sql    # Queries usadas no dashboard
└── der-v11.mwb             # Diagrama Entidade-Relacionamento (MySQL Workbench)
```

**Principais tabelas:**

| Tabela | Descrição |
|---|---|
| `empresa` | Empresas cadastradas na plataforma |
| `usuario` | Usuários vinculados às empresas |
| `eventosRegistrados` | Eventos do calendário por empresa |
| `registro_voo` | Base histórica de 10 anos de voos brasileiros |

---

## Variáveis de Ambiente

### web-app (`.env` / `.env.dev`)

| Variável | Descrição | Exemplo |
|---|---|---|
| `DB_HOST` | Host do banco de dados | `127.0.0.1` / `db` (Docker) |
| `DB_DATABASE` | Nome do banco | `viaja_dev` |
| `DB_USER` | Usuário do banco | `root` |
| `DB_PASSWORD` | Senha do banco | `123456` |
| `DB_PORT` | Porta do banco | `3306` |
| `APP_PORT` | Porta da aplicação | `3333` |
| `APP_HOST` | Host da aplicação | `0.0.0.0` |

### java-service (via Docker Compose ou ambiente)

| Variável | Descrição |
|---|---|
| `DB_HOST` | Host do banco |
| `DB_PORT` | Porta do banco |
| `DB_DATABASE` | Nome do banco |
| `DB_USER` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `AWS_ACCESS_KEY_ID` | Chave de acesso AWS |
| `AWS_SECRET_ACCESS_KEY` | Chave secreta AWS |
| `AWS_SESSION_TOKEN` | Token de sessão AWS (temporário) |

---

## Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend Web | Node.js 18, Express 4, mysql2 |
| ETL | Java 21, Maven, Apache POI, AWS SDK v2 |
| Banco de Dados | MySQL 8.0 |
| Containerização | Docker, Docker Compose |
| Monitoramento | Log4j2, Slack Webhooks |

---

## Desenvolvido por

São Paulo Tech School / Bandtec Digital School