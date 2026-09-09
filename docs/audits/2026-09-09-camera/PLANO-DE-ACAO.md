# Plano de ação — câmera completa e publicação verificável

Este plano decorre dos fatos em [README.md](README.md). As etapas 1–6 registram
a primeira correção; a separação proposta na etapa 2 foi posteriormente
rejeitada pelo usuário. A etapa 8 restaura a composição aprovada; publicação e
conferência física permanecem pendentes.

## Ordem proposta

1. **Concluído — consolidar a versão corrigida.** Revisar as alterações locais existentes,
   removendo o recorte de 64% e confirmando que o GLB continua com o mesmo hash
   e 28 meshes. A composição deve ser avaliada na versão que será commitada.
   Não basta modificar `localhost` e esperar que o Vercel já esteja atualizado.
2. **Substituído — reservar espaço separado para a câmera.** Em largura estreita, organizar texto
   e canvas em áreas de layout que não se sobreponham. O canvas não deve ocupar
   uma porcentagem absoluta da seção por trás do texto. Para telas baixas,
   avaliar texto em fluxo normal e uma área visual sticky independente, com
   atribuição acessível. Manter as peças originais e o movimento reversível.
3. **Concluído — calcular o enquadramento completo.** Usar os limites das meshes no estado
   montado, explodido e nas rotações amostradas para escolher centro, distância
   e margem. Centralizar em função do volume real do objeto e do canvas.
   Evitar novos valores de escala/distância escolhidos apenas por um screenshot.
   Preservar a geometria; respeitar a exigência de todas as peças presentes.
4. **Concluído — unificar os breakpoints e atualizar no resize.** Usar o mesmo critério de
   layout no CSS e no JavaScript. Recalcular enquadramento ao mudar tamanho do
   canvas, orientação, idioma e altura do texto. Atualizar os limites do
   ScrollTrigger quando a composição mudar. Validar o caminho desktop → celular
   e o caminho inverso, além de cargas novas em cada largura.
5. **Concluído no artefato local — verificar o resultado real.** Executar a matriz abaixo sobre exportação
   atual em Firefox e Chromium. Registrar os vértices fora do canvas, as caixas
   de texto/canvas e screenshots. A contagem de 28 meshes é necessária, mas não
   substitui a inspeção de corte e sobreposição.
6. **Concluído — publicar a versão validada e conferir o domínio público.** Fazer commit
   das correções revisadas; enviar a `main` e confirmar qual commit o Vercel
   implantou. Repetir a auditoria no domínio público. Conferir `clip-path: none`
   e o enquadramento novo no CSS/JS realmente entregue, usando sessão nova.
   O êxito do build não substitui essa conferência após publicação.
7. **Pendente — confirmar no dispositivo.** Josué verifica Firefox no Motorola G17 Android
   e a janela/painel no Dell Linux Mint, comparando com a exportação aprovada.
   Registrar orientação, idioma, tamanho disponível, versão do navegador e
   evidência visual. Só então fechar #7, junto das verificações físicas de
   desempenho previstas no plano mobile.
8. **Concluído localmente — restaurar a composição aprovada.** Manter a câmera
   centralizada como fundo atrás do texto, sem coluna exclusiva nem zoom de
   montagem. Preservar todas as peças e a camada do texto acima do canvas.
9. **Pendente — publicar a correção de escopo.** Após autorização, fazer commit
   e push, aguardar o Vercel e repetir a auditoria no domínio público antes do
   teste físico.

## Matriz mínima de aprovação

| Dimensão | Casos |
| --- | --- |
| Larguras CSS | 320, 390, 639, 640, 680, 704, 705, 834, 1440 |
| Alturas críticas | 650 e 844 no telefone; 1194 no tablet; paisagem |
| Idioma | Inglês e português |
| Estado da câmera | Explodido, intermediário, montado, rolagem de volta |
| Rotação | Vários ângulos durante um ciclo completo |
| Interação | Carregar, redimensionar, girar aparelho, mudar idioma |
| Navegador | Firefox e Chromium; depois Firefox Android real |
| Acessibilidade | Redução de movimento mantém fallback e conteúdo acessíveis |

## Critérios de conclusão

- As 28 meshes originais continuam no arquivo e na cena carregada.
- Nenhuma parte sai do canvas nos estados e rotações verificados. Partes
  naturalmente atrás de outras no conjunto montado não devem ser confundidas
  com corte de viewport.
- Nenhuma borda superior, inferior ou lateral do objeto é cortada por CSS,
  canvas, seção ou tela disponível.
- Título, descrição, crédito e contato permanecem legíveis e acessíveis; a
  câmera tem presença visual suficiente sem ocupar o espaço desses elementos.
- A rolagem monta e desmonta o mesmo conjunto; resize não reaplica parâmetros
  antigos de outro breakpoint.
- O domínio do Vercel entrega a versão aprovada e o Motorola confirma o efeito.

## Responsabilidades

O agente pode implementar os ajustes, medir a cena, testar exportações,
documentar e preparar o commit. A publicação segue a autorização do usuário.
Josué pode acompanhar a reprodução com o Console descrito na auditoria e
fornecer a conferência física do Motorola. Nenhum novo download de câmera ou
edição das peças no Blender é necessário para corrigir os fatos encontrados.
