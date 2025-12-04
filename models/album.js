import conexao from '../config/conexao.js';

const albumSchema = conexao.Schema({
    titulo: {type: String, require: true},
    compositor: {type: String},
    genero: {type: String},
    dataDeLancamento: {type: Date},
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }}

})



const album = conexao.model('album', albumSchema);
export default album;
