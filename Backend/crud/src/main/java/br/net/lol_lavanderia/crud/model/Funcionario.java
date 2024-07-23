package br.net.lol_lavanderia.crud.model;

public class Funcionario extends Pessoa {
  private String dataNascimento;

  public Funcionario(String nome, String email, String senha, String dataNascimento) {
    super(nome, email, senha);
    this.dataNascimento = dataNascimento;
  }

  // Getters e Setters
  public String getDataNascimento() {
    return dataNascimento;
  }

  public void setDataNascimento(String dataNascimento) {
    this.dataNascimento = dataNascimento;
  }
}
