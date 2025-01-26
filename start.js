const express = require('express');
const sass = require('sass');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/styles/:file', (req, res, next) => {
  const scssFile = path.join(__dirname, 'src', 'styles', req.params.file);

  try {
    const result = sass.renderSync({
      file: scssFile,
      outputStyle: 'compressed',
    });
    res.type('text/css').send(result.css);
  } catch (error) {
    console.error('Error in SCSS:', error.message);
    res.status(500).send('Error in SCSS');
  }
});

app.use(express.static(path.join(__dirname, 'src')));

app.listen(PORT, () => {
  console.log(`The server is running: http://localhost:${PORT}`);
});