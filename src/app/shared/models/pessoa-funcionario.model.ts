export class PessoaFuncionario {
    constructor(
      public id: number = 0,
      public nome: string = '',
      public email: string = '',
      public senha: string = '',
      public confirmarSenha: string = '',
      public dataNascimento: Date = new Date()
    ) {}
  }
  
