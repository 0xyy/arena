import * as express from "express";
import "express-async-errors";
import { engine } from "express-handlebars";
import { handleError } from "./utils/errors";
import { homeRouter } from "./routers/home";
import { warriorRouter } from "./routers/warrior";
import { hallOfFameRouter } from "./routers/hall-of-fame";
import { arenaRouter } from "./routers/arena";
import "./utils/db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/hall-of-fame', hallOfFameRouter);
app.use('/arena', arenaRouter);

app.use(handleError);

app.listen(3000, '127.0.0.1',() => {
    console.log('Spying on http://localhost:3000');
});