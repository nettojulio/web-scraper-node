# Web Scraper

Está vaga possui um case como desafio.

- [x] Acessar o site abaixo e coletar os dados de todos os notebooks Lenovo
- [x] Ordenando do mais barato para o mais caro.
- [x] Armazená-los num formato serializável, como arquivo JSON ou tabela em banco de dados MySQL local, local ou remoto, para deixar mais otimizado.
- [x] É interessante que o seu código possa ser executado em diferentes ambientes, daí a recomendação de um gerenciador de dependências para o seu projeto, como um requirements.txt para um exemplo de código Python ou package.json para um projeto JavaScript..
- [x] Criar um repositório no GitHub e nos enviar o link.

Link do site: <https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops>

Não há prazo mínimo para entrega, mas o desejável é o quanto antes. Deixamos dois dias de tolerância caso haja interesse no aperfeiçoamento do desafio, mas não deixe de apresentar o que já foi construído dentro de 7 dias.

---

## Execução

1. Após clonar, instale as dependências do projeto:
   <br>

    ```bash
    npm install
    ```

    Opcional: Execute o docker-compose que acompanha um banco de dados integrado ao projeto.
   <br>

    ```bash
    docker-compose -f docker-compose.yaml up -d
    ```

2. Execute o comando abaixo para iniciar o projeto:
   <br>

    ```bash
    npm run start
    ```

3. Acesse <http://localhost:3000/swagger> e efetue requisições para os endpoins:
    <br>
    **GET** - Retorna todos os elementos definidos na busca: [Link 1](http://localhost:3000/swagger/#/default/get_)
    <br>
    **PUT** - Atualiza todos os elementos definidos na busca (JSON e Banco de Dados): [Link 2](http://localhost:3000/swagger/#/default/put_)
    <br>
    **DELETE** - Apaga todos os elementos definidos na busca (JSON e Banco de Dados): [Link 3](http://localhost:3000/swagger/#/default/delete_)
