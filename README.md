<div align="center">

# 🏮 Lampião Guia

**Informação, respeito e comunidade.**

*Portal colaborativo de avaliações de estabelecimentos e serviços pela comunidade LGBTQIA+.*

[Sobre o projeto](#sobre-o-projeto) · [Funcionalidades](#funcionalidades) · [Tecnologias](#tecnologias)

</div>

---

## Sobre o projeto

O **Lampião Guia** é uma aplicação web para consultar e compartilhar avaliações de estabelecimentos e serviços sob a perspectiva da comunidade LGBTQIA+.

**Um guia feito pela comunidade, para a comunidade.** Essa é a ideia que orienta o projeto: as pessoas contribuem com suas próprias experiências e ajudam outras a encontrar informações relevantes.

A proposta é tornar mais acessíveis informações sobre experiências de atendimento, respeito à identidade de gênero, inclusão e acolhimento. Em vez de declarar que um lugar é necessariamente seguro para todas as pessoas, o portal apresenta **relatos e notas de usuários**, que ajudam a comunidade a tomar decisões mais informadas.

O nome homenageia o jornal brasileiro *Lampião da Esquina* (1978–1981), uma referência histórica da imprensa e da visibilidade LGBTQIA+ no Brasil.

O projeto foi desenvolvido como trabalho final da formação **Recode - Transforma Futuros**, com foco principal no **ODS 10 — Redução das Desigualdades** e diálogo com o **ODS 5 — Igualdade de Gênero**.

## Funcionalidades

### Para a comunidade

- Criar uma conta, entrar no sistema, consultar e editar o próprio perfil.
- Excluir a própria conta.
- Explorar estabelecimentos aprovados e pesquisar por nome.
- Consultar detalhes e avaliações de um estabelecimento.
- Publicar, editar e excluir as próprias avaliações.
- Sugerir novos estabelecimentos para análise da moderação.

### Para a administração

- Analisar sugestões de estabelecimentos pendentes.
- Aprovar ou rejeitar sugestões.
- Cadastrar e editar estabelecimentos.
- Arquivar estabelecimentos, retirando-os da listagem pública de aprovados.

> **Observação:** arquivar um estabelecimento não é o mesmo que excluí-lo definitivamente do banco de dados.

### Critérios de avaliação

Cada avaliação atribui notas de **1 a 5** para cinco aspectos:

1. Respeito à identidade de gênero, nome social e pronomes.
2. Ausência de discriminação no atendimento.
3. Inclusão e diversidade no ambiente.
4. Acolhimento e segurança percebida.
5. Atenção e resolução de demandas.

Também é possível adicionar um comentário à avaliação.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, React Router 7, Vite 8, JavaScript e CSS |
| Backend | Java 21, Spring Boot 4, Spring Web MVC, Spring Data JPA e Spring Security |
| Banco de dados | MySQL |
| Gerenciamento de dependências | npm (frontend) e Maven Wrapper (backend) |

## Estrutura do repositório

```text
lampiao-guia/
├── backend/                 # API REST em Java / Spring Boot
├── db/
│   └── schema.sql           # Criação do banco e das tabelas
├── frontend/                # Interface em React / Vite
└── README.md
```

## Banco de dados e regras importantes

- **Usuários:** contas comuns e administrativas.
- **Serviços:** registros com estados `pendente`, `aprovado`, `rejeitado` ou `arquivado`.
- **Avaliações:** notas para cinco critérios e comentário opcional.
- Um mesmo usuário pode publicar apenas **uma avaliação por estabelecimento**, conforme a restrição de unicidade do banco.
- Ao excluir uma conta pela interface atual, suas avaliações permanecem associadas ao estabelecimento, mas o vínculo com o usuário é removido (`ON DELETE SET NULL`). Isso não garante anonimização de qualquer informação pessoal que tenha sido escrita voluntariamente em comentários.

## Estado do projeto e limitações

**Status: MVP acadêmico em desenvolvimento.**

O sistema demonstra integração entre React, API Java e MySQL e apresenta funcionalidades de CRUD, avaliações e moderação. Entretanto, a autenticação/autorização **ainda não está preparada para produção**: o frontend mantém dados básicos da conta na sessão do navegador, e a proteção de operações sensíveis precisa ser reforçada no backend com autenticação e autorização efetivas.

## Contexto acadêmico

Projeto final da formação **Recode - Transforma Futuros**, relacionado à inclusão, à participação da comunidade e à redução das desigualdades (ODS 10).

## Autoria

Desenvolvido por **Jorge Eduardo**.

---

<div align="center">

**Lampião Guia** · Informação, respeito e comunidade.

</div>
