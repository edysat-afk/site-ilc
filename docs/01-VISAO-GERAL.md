# ILC – Infraestrutura e Logística Conectada
## Documentação de Engenharia Reversa & Reconstrução

> **Gerado em:** Abril/2026  
> **Versão:** 1.0  
> **Propósito:** Base para reconstrução completa do site ilclog.com em stack moderna

---

## 1. VISÃO GERAL DA EMPRESA

### Identidade
- **Nome Completo:** ILC – Infraestrutura e Logística Conectada
- **Domínio Atual:** https://ilclog.com
- **Segmento:** Consultoria, Treinamento e Inteligência em Infraestrutura & Logística
- **Sede:** Centro Empresarial Norte, Sl 233/235 – SRTVN Qd. 701, Conj. C, Brasília/DF – CEP: 70719903

### Missão
Desenvolver e transmitir conhecimento sobre infraestrutura e logística nos modais hidroviário, ferroviário e rodoviário, com perspectiva integrada de infraestrutura no cenário doméstico e internacional.

### Visão
Ser referência em soluções logísticas integradas, inteligentes e eficazes, com profissionais e produtos customizados que atendam às necessidades dos clientes.

### Valores
- Avanço do conhecimento
- Desenvolvimento sustentável
- Inovação tecnológica com qualidade

---

## 2. LIDERANÇA / EQUIPE

| Nome | Cargo | Formação/Background | Telefone |
|------|-------|---------------------|----------|
| Adalberto Tokarski | Diretor Executivo (CEO) | Engenheiro Civil, MBA Regulação (FGV), 15+ anos ANTAQ | (61) 99942-1123 |
| Edeon Vaz Ferreira | Diretor Financeiro (CFO) | Administrador de Empresas, 40+ anos logística agronegócio | (61) 98111-9889 |
| Fabianne Ferreira | Gerente Comercial | — | (61) 99325-9222 |

**E-mail comercial:** gerencia.comercial@ilclog.com

---

## 3. PÚBLICO-ALVO

- Empresas de infraestrutura
- Fundos de investimento
- Empresas de consultoria
- Instituições governamentais
- Profissionais de logística e infraestrutura (participantes do Mastermind)

---

## 4. TECNOLOGIA ATUAL (PLATAFORMA ORIGINAL)

| Componente | Tecnologia Identificada |
|-----------|------------------------|
| CMS | **WordPress** (confirmado via sitemap `/wp-sitemap-*.xml`) |
| Formulários | **WPForms Lite** (plugin WordPress) |
| Autenticação | WordPress native login + password reset |
| Proteção de conteúdo | Área de membros (login obrigatório para acesso ao Mastermind) |
| Hospedagem | Não identificada |
| Frontend | Tema WordPress customizado |

**Limitações identificadas na plataforma atual:**
- WordPress monolítico (difícil de escalar e manter)
- Sem CMS headless
- Sem API RESTful estruturada
- Área de membros limitada ao ecossistema WordPress
- Performance dependente de plugins
- SEO e Core Web Vitals potencialmente comprometidos por tema pesado
