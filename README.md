# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

TODO:

[x] - Handle error with pg documentation
[ ] - Handle concurrency
[ ] - Add JWT Token
[x] - Create middleware to validate data types needed
[x] - Refactor all the requests to return same object structure
[ ] - Create tests with jest

Passagem pagamento_status
0 = Reservada
1 = Criada e aguardando pagamento
2 = Pago
