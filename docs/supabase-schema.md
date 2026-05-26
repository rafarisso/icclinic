# Supabase Schema Planejado

Este documento descreve a base futura para persistência do painel interno da IC Clinic. Nenhuma tabela foi criada nesta etapa.

## Segurança

- Ativar RLS em todas as tabelas expostas.
- Nunca expor service role no frontend.
- Guardar fotos de pacientes em Storage privado.
- Exigir consentimento explícito para fotos e simulações.
- Preferir URLs assinadas para visualização interna.

## patients

| Campo | Tipo sugerido |
| --- | --- |
| id | uuid primary key |
| name | text |
| phone | text |
| email | text |
| birth_date | date |
| created_at | timestamptz |

## patient_photos

| Campo | Tipo sugerido |
| --- | --- |
| id | uuid primary key |
| patient_id | uuid references patients(id) |
| image_url | text |
| type | text check original, before, after, simulation |
| consent_given | boolean |
| created_at | timestamptz |

## procedures

| Campo | Tipo sugerido |
| --- | --- |
| id | uuid primary key |
| name | text |
| category | text |
| description | text |
| active | boolean |

## patient_timeline

| Campo | Tipo sugerido |
| --- | --- |
| id | uuid primary key |
| patient_id | uuid references patients(id) |
| procedure_id | uuid references procedures(id) |
| date | date |
| notes | text |
| status | text check planned, done, follow_up |
| created_at | timestamptz |

## ai_simulations

| Campo | Tipo sugerido |
| --- | --- |
| id | uuid primary key |
| patient_id | uuid nullable references patients(id) |
| original_image_url | text |
| simulated_image_url | text |
| selected_procedures | text[] |
| intensity | text check natural, moderado, marcante |
| disclaimer_accepted | boolean |
| created_at | timestamptz |

