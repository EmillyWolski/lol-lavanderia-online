package br.net.lol_lavanderia.crud.model;

public class Cliente {
  private long id;
  private String nome;
  private String email;
  private String senha;
  private String cpf;
  private String endereco;
  private String telefone;

  public Cliente(long id, String nome, String email, String senha, String cpf, String endereco, String telefone) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.endereco = endereco;
    this.telefone = telefone;
  }

  // Getters e Setters
  public String getCpf() {
    return cpf;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
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
