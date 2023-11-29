const app = require('./app');
require('/dotenv').config();

const Port = process.env.PORT;

app.listen(PORT,() => console.log( `Server running on port ${PORT}`));