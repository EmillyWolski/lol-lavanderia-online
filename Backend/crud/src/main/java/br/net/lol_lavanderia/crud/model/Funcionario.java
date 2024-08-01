package br.net.lol_lavanderia.crud.model;

public class Funcionario {
  private long id;
  private String nome;
  private String email;
  private String senha;
  private String dataNascimento;

  public Funcionario(long id, String nome, String email, String senha, String dataNascimento) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataNascimento = dataNascimento;
  }

  // Getters e Setters
  public String getDataNascimento() {
    return dataNascimento;
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

  public void setDataNascimento(String dataNascimento) {
    this.dataNascimento = dataNascimento;
  }
}
