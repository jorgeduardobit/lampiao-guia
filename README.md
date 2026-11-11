# Lampião Guia

Portal de avaliações de serviços voltado à comunidade LGBTQIA+. As pessoas compartilham relatos de atendimento e ajudam outras a encontrar lugares que respeitam sua identidade.

O nome é uma homenagem ao jornal *Lampião da Esquina* (1978 a 1981), um dos pioneiros da imprensa LGBT brasileira.

Projeto final da formação Recode, alinhado às ODS 5 (Igualdade de Gênero) e ODS 10 (Redução das Desigualdades).

## Como funciona

- Usuários comuns se cadastram, buscam serviços, leem avaliações e publicam as suas.
- Usuários comuns também podem sugerir novos serviços, que ficam pendentes até o administrador aprovar ou rejeitar.
- O administrador cadastra serviços diretamente e modera as sugestões.

### Critérios de avaliação

Cada avaliação recebe nota de 1 a 5 em:

1. Respeito à identidade de gênero, nome social e pronomes
2. Ausência de discriminação no atendimento
3. Inclusão e diversidade no ambiente
4. Acolhimento e segurança
5. Atenção e resolução

## Funcionalidades (CRUDs)

| Entidade | Operações |
|---|---|
| Usuário | criar conta, consultar perfil, editar dados e credenciais, excluir a própria conta |
| Serviço | cadastrar ou sugerir, listar e pesquisar, atualizar, remover ou arquivar |
| Avaliação | publicar, consultar, editar a própria, excluir a própria |

Ao excluir a conta, o usuário escolhe se suas avaliações são apagadas ou se permanecem no portal sem autor.

## Tecnologias

- Banco de dados: MySQL
- Back-end: Java
- Front-end: ReactJS

## Estrutura do repositório

```
db/         script de criação do banco (schema.sql)
backend/    API em Java
frontend/   aplicação em React
```

## Banco de dados

Para criar o banco localmente:

```bash
mysql -u root -p < db/schema.sql
```

## Status

Em desenvolvimento.
