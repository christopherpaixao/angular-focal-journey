# Material de Estudo — Signals no Angular

> Cobre os commits `77a8b3b..d1f362d` (6 commits) e o guia oficial: https://angular.dev/guide/signals

---

## 1. O que foi estudado (resumo por commit)

| Commit | Tema | Arquivos principais |
|---|---|---|
| `c949685` | `OnPush` + `AsyncPipe` | `change-detection/change-detection.ts` |
| `d0fb1fd` | Estado com `BehaviorSubject` (o "jeito RxJS", ponto de partida para entender por que signals) | `state-management/state-management.ts` |
| `d24a71d` | Writable signals + implementação caseira `mySignal` | `signals/writeable-signals/*`, `my-signal.ts` |
| `61cc818` | `set()` e `update()` | `writeable-signals.ts` |
| `b531902` | `computed()` + `effect()` (exercício) | `signals/computed-signals/*` |
| `d1f362d` | `linkedSignal()` | `signals/linked-signals/*` |

Também foram registradas as rotas `writeable-signals` e `linked-signals` em `app.routes.ts` (a rota `''` agora aponta para `LinkedSignals`).

### 1.1 OnPush + AsyncPipe (`c949685`)
- Antes: `counter` era uma propriedade mutada em `setInterval`. Com `OnPush` a view **não** atualiza, porque nenhum evento/input/markForCheck disparou a detecção.
- Depois: `counter$ = interval(1000)` e `{{ counter$ | async }}`. O `AsyncPipe` assina o Observable e chama `markForCheck()` a cada emissão, então o `OnPush` atualiza.
- Lição: `OnPush` só verifica o componente quando (a) um `@Input` muda por referência, (b) um evento do template dispara, (c) um `AsyncPipe` emite, (d) um **signal lido no template** muda, ou (e) `markForCheck`/`detectChanges` é chamado manualmente.

### 1.2 Estado com BehaviorSubject (`d0fb1fd`)
- `a$`, `b$` = `BehaviorSubject` (têm valor atual, `.value`, e emitem ao se inscrever).
- `sum$ = combineLatest([a$, b$]).pipe(map(...))` = estado derivado.
- `firstValueFrom(sum$)` para ler o valor atual de forma assíncrona (por isso `incA` é `async`).
- O exemplo `options$` + `selectedKey$` mostra o **problema de glitch**: ao trocar `options$` e depois `selectedKey$`, `combineLatest` emite um estado intermediário inconsistente (`options = {m,c,y}` com `key = 'b'` → `undefined`). A solução usada foi `debounceTime(0)`, uma gambiarra.
- Esse é exatamente o problema que `linkedSignal` resolve de forma declarativa (seção 5).

### 1.3 Writable signals (`d24a71d`, `61cc818`)
- `mySignal<T>(value)` implementa à mão o contrato de um signal: uma **função** que retorna o valor, com métodos `set` e `update` anexados. Serve para entender que signal = getter function + setters.
  - Limitação: ele **não é reativo** (não notifica ninguém). O signal real do Angular mantém uma lista de consumidores e um contador de versão.
- Versão real: `signal(42)`, `signal('Signals')`; `.set(10)` e `.update(v => v + 1)`.

### 1.4 Computed + effect (`b531902`)
- `sum = computed(() => firstNumber() + secondNumber())`.
- Os métodos limitam cada número a 10 e usam `set`/`update`.
- `effect` no construtor loga os dois signals sempre que qualquer um mudar.

### 1.5 Linked signal (`d1f362d`)
- `products = signal(['Apple','Banana','Cherry'])`.
- `selectedProduct = linkedSignal({ source: products, computation: (products, previous) => ... })`: mantém a seleção se o item ainda existe, senão volta para o primeiro.
- `next/prevProduct` usam `update` sobre o linkedSignal (ele é gravável!), com aritmética modular para circular a lista.

---

## 2. Signals — conceitos (angular.dev/guide/signals)

Um signal é um **wrapper em torno de um valor que notifica consumidores interessados quando esse valor muda**. Ele é lido chamando-o como função, e é assim que o Angular rastreia dependências.

```ts
const count = signal(0);
console.log(count()); // lê (e registra dependência se estiver num contexto reativo)
```

Contextos reativos (onde leituras viram dependências): templates, `computed`, `effect`, `linkedSignal`.

### 2.1 Writable signals
```ts
const count = signal(0);
count.set(3);                     // valor direto
count.update(v => v + 1);         // calculado a partir do anterior
```
- `asReadonly()` expõe uma versão somente-leitura (encapsulamento em services):
```ts
private readonly _count = signal(0);
readonly count = this._count.asReadonly();
```
- **Igualdade**: por padrão `Object.is`. Mutar um array/objeto no lugar **não** notifica; crie nova referência (`[...arr, x]`) ou passe `{ equal: fn }`.

### 2.2 Computed signals
```ts
const doubleCount = computed(() => count() * 2);
```
- **Somente leitura**: não existe `.set` em computed.
- **Lazy**: só calcula na primeira leitura.
- **Memoizado**: cacheia até alguma dependência mudar.
- **Dependências dinâmicas**: só os signals realmente lidos na última execução são rastreados:
```ts
const text = computed(() => showCount() ? `Count: ${count()}` : 'Nada');
// se showCount() é false, mudar count NÃO recalcula
```
- Boa prática: use `computed` para valores derivados do template em vez de métodos (que rodam a cada detecção).

### 2.3 Effects
Para **efeitos colaterais** em APIs não reativas (log, localStorage, canvas, integração com libs).
```ts
effect(() => console.log(`user=${user()} counter=${counter()}`));
```
- Roda ao menos uma vez e re-executa quando qualquer signal lido mudar.
- Precisa de **contexto de injeção** (construtor, inicializador de campo) ou passar `injector`.
- `untracked(() => ...)` ou `untracked(signal)` evita criar dependência:
```ts
effect(() => console.log(user(), untracked(counter)));
```
- O contexto reativo vale só para código **síncrono**. Leia os signals **antes** de qualquer `await`:
```ts
effect(async () => {
  const theme = this.theme();          // rastreado
  const data = await fetchUserData();
  console.log(theme, data);            // theme() aqui NÃO seria rastreado
});
```
- Não use effect para propagar estado (signal → signal). Para isso use `computed` ou `linkedSignal`.

### 2.4 Signals e OnPush
Quando um signal é lido no template de um componente `OnPush`, o Angular o rastreia como dependência e marca o componente para atualização quando ele mudar. Não precisa de `markForCheck` nem `async`.

### 2.5 Utilitários de tipo
`isSignal(x)`, `isWritableSignal(x)`.

---

## 3. Linked signals (angular.dev/guide/signals/linked-signal)

`linkedSignal` é um signal **gravável cujo valor é derivado de outro estado**: recalcula quando a fonte muda (como `computed`), mas pode também receber `set`/`update` (como `signal`).

**Forma curta:**
```ts
selectedOption = linkedSignal(() => this.shippingOptions()[0]);
```

**Forma completa com `previous`:**
```ts
selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
  source: this.shippingOptions,
  computation: (newOptions, previous) =>
    newOptions.find(o => o.id === previous?.value.id) ?? newOptions[0],
});
```
- `previous.source` = valor anterior da fonte; `previous.value` = valor anterior do linkedSignal. Em geral, na primeira execução `previous` é `undefined`.
- Aceita `{ equal }` para controlar quando considerar "mudou":
```ts
linkedSignal(() => activeUser(), { equal: (a, b) => a.id === b.id });
```

### Quando usar cada um
| Preciso de... | Use |
|---|---|
| Estado independente e editável | `signal` |
| Valor derivado, só leitura | `computed` |
| Valor derivado **que o usuário também pode sobrescrever** (e que reseta quando a fonte muda) | `linkedSignal` |
| Efeito colateral fora do Angular | `effect` |

---

## 4. Comparando RxJS vs Signals (o que você viu na prática)

| | BehaviorSubject / RxJS | Signals |
|---|---|---|
| Ler valor atual | `.value` ou `firstValueFrom` | `sig()` |
| Escrever | `.next(v)` | `.set(v)` / `.update(fn)` |
| Derivar | `combineLatest + map` | `computed` |
| Template | `async` pipe | `sig()` direto |
| Glitches (estado intermediário) | Sim (precisou de `debounceTime(0)`) | Não: computed é síncrono e consistente |
| Assíncrono/streams/tempo | Excelente | Não é o foco (use RxJS; há `toSignal`/`toObservable` para interop) |

Regra prática: **signals para estado síncrono e derivado da UI; RxJS para eventos, tempo e I/O.**

---

## 5. Os exemplos do repo, comentados

### `LinkedSignals` — resolve o problema do `selectedValue$`
No exemplo RxJS, trocar as opções e a chave separadamente gerava um estado inválido. Com `linkedSignal`, a seleção **sempre** é válida para a lista atual (ou volta ao primeiro item).

### `ComputedSignals`
`sum` nunca é escrito diretamente; muda sozinho quando `firstNumber`/`secondNumber` mudam. O `effect` apenas observa.

### `WriteableSignals`
`mySignal` vs `signal`: troque os comentários para ver que o `mySignal` até lê/escreve, mas a view não é notificada.

---

## 6. Pontos de atenção no seu código (para revisar)

1. `linked-signals.ts`: `previus` → `previous` (typo, funciona mas confunde).
2. `linked-signals.ts`: `addProduct` usa `PRODUCTS[prods.length]`; depois de 13 itens retorna `undefined` e adiciona `undefined` à lista. Limite o botão ou valide.
3. `linked-signals.ts`: `removeProduct` com lista vazia deixa `products()[0]` = `undefined` e `nextProduct` faz `% 0` → `NaN`. Trate lista vazia.
4. `LinkedSignals` não declara `changeDetection: OnPush`, ao contrário dos outros componentes de signals. Em projetos com signals, o padrão recomendado é `OnPush`.
5. `computed-signals.ts`: a lógica "só incrementa se < 10" está duplicada; extraia um helper.
6. `state-management.ts`: os `BehaviorSubject` nunca completam e há `subscribe(console.log)` sem unsubscribe no construtor. Em app real, use `takeUntilDestroyed()`.
7. `my-signal.ts`: `result.set` é adicionado a uma arrow function; funciona em JS, mas por isso o tipo `MyWriteableSignal` precisa ser forçado. Útil só como estudo.
8. `change-detection.html`: o comentário diz que o pipe `async` "extrai o valor do observable" e, mais importante, também dispara `markForCheck`.

---

## 7. Exercícios para fixar

1. Reescreva `StateManagement` (`a$`, `b$`, `sum$`) usando `signal` + `computed`, sem `firstValueFrom`.
2. Reescreva `options$/selectedKey$/selectedValue$` com `signal` + `linkedSignal` (ou `computed`) e remova o `debounceTime(0)`.
3. Crie um service com `private _items = signal<Item[]>([])`, exponha `items = _items.asReadonly()` e `total = computed(...)`.
4. Faça um `effect` que grava `items` no `localStorage`. Depois discuta: isso deveria ser um effect?
5. Faça `selectedProduct` com `computation` que preserve a seleção mesmo quando a lista é reordenada (por id, não por string).
6. Use `toSignal(interval(1000))` no `ChangeDetection` e compare com `AsyncPipe`.
7. Crie um `signal` com objeto e demonstre por que `obj.mutate`/mutação direta não notifica; corrija com `update(o => ({...o, x}))`.

## 8. Perguntas de revisão

- Por que um signal é lido como função?
- Qual a diferença entre `set` e `update`?
- O que significa `computed` ser lazy e memoizado?
- Por que mudar `count` não recalcula o `computed` quando `showCount()` é false?
- Por que ler um signal depois de um `await` dentro de um `effect` não cria dependência?
- Quando `linkedSignal` é melhor que `computed`? E que `effect + set`?
- Qual igualdade os signals usam por padrão e como mudar?
- Como um signal no template faz o `OnPush` atualizar?

## 9. Próximos passos sugeridos (seguindo o guia oficial)

`input()`, `output()`, `model()` (signal inputs) → `viewChild()/contentChild()` → `resource()`/`httpResource()` → interop RxJS (`toSignal`, `toObservable`) → `effect` avançado (`afterRenderEffect`) → Signal Forms.
