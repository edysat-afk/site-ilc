# Diretrizes de Design Atual (3D) – ILC

## Objetivo visual

Elevar o padrão estético das páginas para uma linguagem digital premium, mantendo legibilidade e performance:

- profundidade visual por perspectiva e camadas;
- superfícies translúcidas (glassmorphism) para blocos de destaque;
- contraste alto para leitura institucional;
- hierarquia clara para conteúdo técnico e corporativo.

---

## Princípios de UI

1. **Profundidade controlada**
   - usar `perspective`, `rotateX/rotateY`, sombras suaves e gradientes.

2. **Componentes em camadas**
   - hero com plano de fundo dinâmico + objetos 3D + card informativo.

3. **Leitura primeiro**
   - tipografia limpa e espaçamento amplo para textos longos.

4. **Consistência institucional**
   - manter identidade visual sóbria, sem excesso de efeitos decorativos.

---

## Seções prioritárias para evolução

1. Home (hero 3D + serviços + trilhas)
2. Mastermind (cards de trilhas e sessões com estado visual)
3. Serviços (blocos com destaque de valor e CTA)
4. Contato (formulário premium com feedback visual)

---

## Diretrizes de implementação técnica

- usar CSS moderno para efeitos 3D antes de bibliotecas pesadas;
- ativar animações somente quando agregarem compreensão;
- garantir fallback para dispositivos móveis;
- respeitar `prefers-reduced-motion` na próxima fase de refinamento.

---

## Estado atual no projeto

- Home da aplicação em `src/app/page.tsx` já segue base visual 3D;
- estilos globais em `src/app/globals.css` incluem:
  - malha de fundo,
  - blocos com perspectiva,
  - cards inclinados,
  - gradientes e camada translúcida.

Protótipos da pasta `prototype/` permanecem como baseline funcional para migração de conteúdo.