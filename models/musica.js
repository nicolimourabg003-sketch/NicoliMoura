import conexao from '../config/conexao.js';

const musicaSchema = conexao.Schema({
    titulo: {type: String, require: true},
    compositor: {type: String},
    genero: {type: String},
    duracao: {type: String}
})


const musica = conexao.model('musica', musicaSchema);
export default musica;
