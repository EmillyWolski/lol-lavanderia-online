export class Pessoa {

    constructor(
        public id: number = 0,
        public cpf: string = "",
        public nome: string = "",
        public email: string = "",
        public cep: string = "",
        public rua: string = "",
        public cidade: string = "",
        public estado: string = "",
        public telefone: number = 0,
        public senha: string = "",
    ){
        
    }
}
