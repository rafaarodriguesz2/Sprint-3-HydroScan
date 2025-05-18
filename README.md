<<<<<<< HEAD
<img src="https://user-images.githubusercontent.com/46379117/189931169-9df7b283-bf43-4af4-8154-b1669862090e.png" width="1000px">

_Data Acquisition Arduino API = API Arduino para Aquisição de Dados_

<hr>

# Como usar

1. Certifique-se de que o Arduino está em funcionamento e capturando dado do sensor, seja ele analógico ou digital.

1. Clone este repositório em sua máquina.

1. Acesse o arquivo **main.js** e parametrize:

- Gostaria de efetuar a inserção dos dados capturados no Banco de Dados? **Linha 11 - HABILITAR_OPERACAO_INSERIR;**

- Para configurar as credenciais do banco de dados: adicione as credenciais para inserção no banco MySQL (**Linhas 22 - 26**) e ajuste seu INSERT para que esteja de acordo com a tabela que receberá as medidas (**Linhas 66 e 67**).

4. Acesse o local deste repositório no terminal (GitBash ou VSCode) e execute os comandos abaixo:

```
npm i
``` 
_O comando acima irá instalar as bibliotecas necessárias para o funcionamento da API. As bibliotecas a serem instaladas estão listadas no arquivo **package.json** então é muito importante que este não seja alterado. Será criada uma nova pasta/diretório chamado **node_modules** quando o comando for finalizado, que é onde as bibliotecas estão localizadas. Não altere a pasta/diretório._

```
npm start
``` 

_O comando acima irá iniciar sua API e efetuar os comandos de acordo com a sua parametrização feita nos passos anteriores._

5. Para "ver" sua API funcionando você pode visualizar os gráficos das capturas sendo exibidos no seu navegador pelo caminho **http://localhost:3300** ou efetuando SELECT no seu Banco de Dados, caso tenha optado por inseri-los.

6. Caso queira parar a API, tecle **CTRL+C** no terminal em que a API está rodando.
# Relatorio_arduino
=======

# HydroScan - Sistema de Monitoramento para Usinas Hidrelétricas  

HydroScan é um projeto acadêmico desenvolvido como parte da disciplina de **Pesquisa e Inovação I**, no curso de **Ciência da Computação** da **SPTech School**. O projeto tem como foco o desenvolvimento de um sistema informativo e visual para gerenciamento de dados relacionados a usinas hidrelétricas, abordando desde o cadastro das usinas até a exibição de dados operacionais em gráficos.

---

## Objetivo do Projeto

> [!INFO]
> O setor de energia elétrica é essencial para o desenvolvimento de um país, e as usinas hidrelétricas têm papel central na geração dessa energia.  
> Com isso em mente, o HydroScan foi idealizado como uma ferramenta para facilitar o monitoramento e gestão dessas usinas, oferecendo:
> 
> - Visualização de dados operacionais como volume de água, energia gerada e nível dos reservatórios;
> - Cadastro das usinas e seus responsáveis técnicos;
> - Análises rápidas por meio de dashboards visuais e gráficos dinâmicos;
> - Organização centralizada de informações relevantes para o setor hidrelétrico.

---

## Funcionalidades

> [!INFO]
> O HydroScan já conta com as seguintes funcionalidades implementadas:
> 
> - Página inicial com apresentação do sistema;
> - Cadastro e listagem de usinas hidrelétricas;
> - Cadastro de responsáveis técnicos vinculados às usinas;
> - Dashboard com gráficos de monitoramento utilizando Chart.js;
> - Validação de dados nos formulários;
> - Autenticação de usuários com controle de acesso;
> - Backend funcional com persistência em banco de dados MySQL;
> - API desenvolvida em Node.js com rotas seguras.

---

## Tecnologias Utilizadas

> [!INFO]
> - **HTML5**: Estruturação do conteúdo.  
> - **CSS3**: Estilização e layout das páginas.  
> - **JavaScript**: Comportamento da interface, manipulação de dados e gráficos.  
> - **Chart.js**: Biblioteca para renderização de gráficos interativos.  
> - **MySQL**: Persistência dos dados em banco relacional.  
> - **Node.js e Express**: Backend para cadastro, autenticação e integração com o banco.

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/rafaarodriguesz2/Sprint-2-HydroScan.git
cd Sprint-2-HydroScan
```

---

## Protótipo no Tinkercad

> [!NOTE]
> Este projeto também foi pensado considerando um cenário físico.  
> Um protótipo eletrônico pode ser acessado através do seguinte link:

[Ver protótipo no Tinkercad (simulação)](https://www.tinkercad.com/things/foaG9tKUlGJ-hydroscan)  
![prototipo](https://github.com/user-attachments/assets/54ccfc66-5cbc-4fa6-84b2-8d92d0fa3517)

---

## Próximos Passos

> [!IMPORTANT]
> - Melhorias na responsividade e acessibilidade;  
> - Implementação de painel administrativo com permissões avançadas;  
> - Integração com APIs externas para dados hidrológicos em tempo real.

---

## Sobre o Projeto

Este projeto simula um sistema de apoio à gestão de empresas do setor hidrelétrico. Com base em um cenário realista, aplicamos conceitos de front-end, modelagem de dados, autenticação de usuários e visualização interativa. O HydroScan oferece uma base sólida para expansão e customização.

---

## Créditos

**Curso:** Ciência da Computação  
**Instituição:** SPTech School  
**Disciplina:** Pesquisa e Inovação I  

> [!NOTE]
> **Integrantes do grupo:**  
> - Leandro Akio Takahashi  
> - Gabriel Furtado  
> - Gustavo Soares  
> - Rafael Alonso  
> - Kheyla Thais  

---

## Licença

> [!WARNING]
> Este projeto é de uso educacional e sem fins comerciais.  
> Todos os direitos reservados aos autores.
>>>>>>> b3796e2a100ae5dff713d00c515fdb14dd4cf25f
