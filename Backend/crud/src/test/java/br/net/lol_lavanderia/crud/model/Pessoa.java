package br.net.lol_lavanderia.crud.model;

public class Pessoa {

  private int idPessoa;
  private String nome;
  private String cpf;
  private String email;
  private String endereco;
  private String senha;
  private String telefone;
  private int tipoPessoa;

  public Pessoa() {
    super();
  }

  public Pessoa(int idPessoa, String nome, String cpf, String email, String endereco, String senha, String telefone) {
    super();
    this.idPessoa = idPessoa;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.endereco = endereco;
    this.senha = senha;
    this.telefone = telefone;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getEndereco() {
    return endereco;
  }

  public void setEndereco(String endereco) {
    this.endereco = endereco;
  }

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }

  public int getTipoPessoa() {
    return tipoPessoa;
  }

  public void setTipoPessoa(int tipoPessoa) {
    this.tipoPessoa = tipoPessoa;
  }

  public int getIdPessoa() {
    return idPessoa;
  }

  public void setIdPessoa(int idPessoa) {
    this.idPessoa = idPessoa;
  }
}
