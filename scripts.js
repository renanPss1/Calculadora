const textoOperacaoAnterior = document.querySelector("#previous-operation");
const textoOperacaoAtual = document.querySelector("#current-operation");
const botoes = document.querySelectorAll("#buttons-container button");

class Calculadora {
  constructor(textoOperacaoAnterior, textoOperacaoAtual) {
    this.textoOperacaoAnterior = textoOperacaoAnterior;
    this.textoOperacaoAtual = textoOperacaoAtual;
    this.operacaoAtual = "";
  }

  // Adiciona dígito à tela da calculadora
  adicionarDigito(digito) {
    console.log(digito);
    // Verifica se o número já tem um ponto
    if (digito === "." && this.textoOperacaoAtual.innerText.includes(".")) {
      return;
    }

    this.operacaoAtual = digito;
    this.atualizarTela();
  }

  // Processa todas as operações da calculadora
  processarOperacao(operacao) {
    // Verifica se o valor atual está vazio
    if (this.textoOperacaoAtual.innerText === "" && operacao !== "C") {
      // Muda a operação
      if (this.textoOperacaoAnterior.innerText !== "") {
        this.mudarOperacao(operacao);
      }
      return;
    }

    // Obtém os valores atuais e anteriores
    let valorOperacao;
    let anterior = +this.textoOperacaoAnterior.innerText.split(" ")[0];
    let atual = +this.textoOperacaoAtual.innerText;

    switch (operacao) {
      case "+":
        valorOperacao = anterior + atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "-":
        valorOperacao = anterior - atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "*":
        valorOperacao = anterior * atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "/":
        valorOperacao = anterior / atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "DEL":
        this.processarOperacaoDel();
        break;
      case "CE":
        this.processarLimparOperacaoAtual();
        break;
      case "C":
        this.processarLimparOperacao();
        break;
      case "=":
        this.processarOperacaoIgual();
        break;
      default:
        return;
    }
  }

  // Muda os valores na tela da calculadora
  atualizarTela(
    valorOperacao = null,
    operacao = null,
    atual = null,
    anterior = null
  ) {
    if (valorOperacao === null) {
      // Adiciona o número ao valor atual
      this.textoOperacaoAtual.innerText += this.operacaoAtual;
    } else {
      // Verifica se o valor é zero, se for, apenas adiciona o valor atual
      if (anterior === 0) {
        valorOperacao = atual;
      }
      // Adiciona o valor atual ao anterior
      this.textoOperacaoAnterior.innerText = `${valorOperacao} ${operacao}`;
      this.textoOperacaoAtual.innerText = "";
    }
  }

  // Muda a operação matemática
  mudarOperacao(operacao) {
    const operacoesMatematicas = ["*", "-", "+", "/"];

    if (!operacoesMatematicas.includes(operacao)) {
      return;
    }

    this.textoOperacaoAnterior.innerText =
      this.textoOperacaoAnterior.innerText.slice(0, -1) + operacao;
  }

  // Apaga um dígito
  processarOperacaoDel() {
    this.textoOperacaoAtual.innerText =
      this.textoOperacaoAtual.innerText.slice(0, -1);
  }

  // Limpa a operação atual
  processarLimparOperacaoAtual() {
    this.textoOperacaoAtual.innerText = "";
  }

  // Limpa todas as operações
  processarLimparOperacao() {
    this.textoOperacaoAtual.innerText = "";
    this.textoOperacaoAnterior.innerText = "";
  }

  // Processa uma operação
  processarOperacaoIgual() {
    let operacao = this.textoOperacaoAnterior.innerText.split(" ")[1];

    this.processarOperacao(operacao);
  }
}

const calc = new Calculadora(textoOperacaoAnterior, textoOperacaoAtual);

botoes.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const valor = e.target.innerText;

    if (+valor >= 0 || valor === ".") {
      console.log(valor);
      calc.adicionarDigito(valor);
    } else {
      calc.processarOperacao(valor);
    }
  });
});
