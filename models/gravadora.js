import conexao from '../config/conexao.js';

const gravadoraSchema = conexao.Schema({
    nome: {type: String, require: true},
    sede: {type: String},
    website: {type: String}
})


const gravadora = conexao.model('gravadora', gravadoraSchema);
export default gravadora;
