import express from 'express'
import exphbs from 'express-handlebars'
import appRouter from './routes/views.routes.js'
import cookieParser from "cookie-parser";
import path from 'path'

const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT || 4005

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//Static Files
app.use(express.static(path.join(__dirname, "src/public")))


// Configuración de handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src/views/layouts"),
    extname: ".hbs",
  }),
);

//configuración de express-uploads

//Rutas
app.use('/', appRouter)

app.listen(PORT, ()=>{
    console.log(`🚀 Server Running on port http://localhost:${PORT}`)
})