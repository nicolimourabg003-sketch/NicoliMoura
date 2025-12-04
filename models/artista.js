import conexao from '../config/conexao.js';

const artistaSchema = conexao.Schema({
    nome: {type: String, require: true},
    nacionalidade: {type: String},
    dataDeNascimento: {type: Date},
    salario: {type: Number},
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }}
})


const artista = conexao.model('artista', artistaSchema);
export default artista;
