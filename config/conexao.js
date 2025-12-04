import mongose from 'mongoose';

const url = 
"mongodb+srv://nicoli:postgres@cluster0.bbble9d.mongodb.net/"

const conexao = await mongose.connect(url)
export default conexao;