import { createServer } from 'http';

import express from 'express'
const app = express();
// importar os modelos
import artista from '../models/artista.js';
import musica from '../models/musica.js';
import album from '..musica.js';
import gravadora from './models/gravadora.js';


app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

//Upload
import multer from "multer"

const storage = multer.memoryStorage();
const upload = multer({ storage });

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Converte o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '../public'))



//rotas
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/artista/lst', async (req, res) => {
    const ArtistaEncontrados = await artista.find();
    res.render("artista/lst", { artista: ArtistaEncontrados });
})

app.post('/artista/lst', async (req, res) => {
  //busca as marcas no banco de dados
   const pesquisa = req.body.pesquisa; 
    const artistaEncontrados = await artista.find(
      {
        nome:{$regex:pesquisa}
      }
    );
    res.render("artista/lst", { artista: artistaEncontrados });
})


app.get('/artista/add', (req, res) => {
    res.render("artista/add");
})

app.post('/artista/add/ok', async (req, res) => {
  const { nome, nacionalidade, dataDeNascimento, salario} = req.body;
  await artista.create({ nome, nacionalidade, dataDeNascimento, salario});
  res.render('artista/addok', { nome, nacionalidade, dataDeNascimento, salario });
})

app.get('/artista/del/:id', async (req, res) => {
  await artista.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/artista/lst');
});


app.post('/musica/lst', async (req, res) => {
  //busca as marcas no banco de dados
   const pesquisa = req.body.pesquisa; 
    const musicaEncontrados = await musica.find(
      {
        titulo:{$regex:pesquisa}
      }
    );
    res.render("musica/lst", { musica: musicaEncontrados });
})

app.get('/musica/lst', async (req, res) => {
    const musicaEncontrados = await musica.find();
    res.render("musica/lst", { musica: musicaEncontrados });
})

app.get('/musica/add', (req, res) => {
    res.render("musica/add")
})

app.post('/musica/add/ok', async(req, res) => {
  await musica.create(req.body);
  const compositor = req.body.compositor;
  const titulo = req.body.titulo;
  const genero = req.body.genero ; 
  const duracao = req.body.duracao
  
  res.render('musica/addok', {compositor, titulo, genero, duracao});
});

app.get('/musica/del/:id', async (req, res) => {
  await musica.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/musica/lst');
});


app.post('/album/lst', async (req, res) => {
  //busca as marcas no banco de dados
   const pesquisa = req.body.pesquisa; 
    const albumEncontrados = await album.find(
      {
        titulo:{$regex:pesquisa}
      }
    );
    res.render("album/lst", { album: albumEncontrados });
})

app.get('/album/lst', async (req, res) => {
    const albumEncontrados = await album.find();
    res.render("album/lst", { album: albumEncontrados });
})

app.get('/album/add', (req, res) => {
    res.render("album/add")
})
app.post('/album/add/ok', upload.single("foto"), async (req, res) => {
    await album.create({
        titulo: req.body.titulo,
        compositor: req.body.compositor,
        genero: req.body.genero,
        dataDeLancamento: req.body.dataDeLancamento,
        foto: req.file.buffer
    });

    // Passar os dados diretamente de req.body para renderizar
    res.render('album/addok', {
        titulo: req.body.titulo,
        compositor: req.body.compositor,
        genero: req.body.genero,
        dataDeLancamento: req.body.dataDeLancamento
    });
});

app.get('/album/del/:id', async (req, res) => {
  await album.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/album/lst');
});


app.post('/gravadora/lst', async (req, res) => {
  //busca as marcas no banco de dados
   const pesquisa = req.body.pesquisa; 
    const gravadoraEncontrados = await gravadora.find(
      {
        nome:{$regex:pesquisa}
      }
    );
    res.render("gravadora/lst", { gravadora: gravadoraEncontrados });
})

app.get('/gravadora/lst', async (req, res) => {
    const gravadoraEncontrados = await gravadora.find();
    res.render("gravadora/lst", { gravadora: gravadoraEncontrados });
})

app.get('/gravadora/add', (req, res) => {
    res.render("gravadora/add")
})

app.post('/gravadora/add/ok', async(req, res) => {
  await gravadora.create(req.body);
  const nome = req.body.nome;
  const sede = req.body.sede;
  const website = req.body.website 
  
  res.render('gravadora/addok', {nome, sede, website});
});

app.get('/gravadora/del/:id', async (req, res) => {
  await gravadora.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/gravadora/lst');
});

app.get('/gravadora/del/:id', async (req, res) => {
  await gravadora.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/gravadora/lst');
});



// ========= SITE ========

app.get('/site', async (req, res) => {
  
  res.render('site/index');
});

app.listen(3033)