export class Usuario {
  constructor(
    public id: number = 0,
    public nome: string = '',
    public email: string = '',
    public senha: string = '',
    public cpf: string = '',
    public cep: string = '',
    public rua: string = '',
    public cidade: string = ' ',
    public estado: string = '',
    public telefone: string = '',
    public dataNascimento: string = '',
    public perfil: string = '' // Pode ser "CLIENTE" ou "FUNCIONARIO"
  ) {}
}
