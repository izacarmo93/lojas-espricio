const bcrypt = require ("bcrypt");

let senha = 'Senha-123';

const saltRounds = 10;

const senhaCriptografada = bcrypt.hashSync(senha, saltRounds); 

console.log('Senha Original:', senha);
console.log('Senha Criptografada:', senhaCriptografada);

const senhaValida = bcrypt.compareSync(senha, senhaCriptografada);

if (senhaValida) {
    console.log('senha válida!');
} else{
    console.log('senha invalida!');
}
