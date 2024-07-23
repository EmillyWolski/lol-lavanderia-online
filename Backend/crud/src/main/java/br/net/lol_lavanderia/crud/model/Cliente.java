package br.net.lol_lavanderia.crud.model;

public class Cliente extends Pessoa {
  private String cpf;
  private String endereco;
  private String telefone;

  public Cliente(String nome, String email, String senha, String cpf, String endereco, String telefone) {
    super(nome, email, senha);
    this.cpf = cpf;
    this.endereco = endereco;
    this.telefone = telefone;
  }

  // Getters e Setters
  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public String getEndereco() {
    return endereco;
  }

  public void setEndereco(String endereco) {
    this.endereco = endereco;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }
}
