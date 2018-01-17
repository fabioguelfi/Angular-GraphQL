import Sequelize from "sequelize"
import casual from "casual";
import _ from "lodash";

const db = new Sequelize('compra_materiais', null, null, {
    dialect: 'sqlite',
    storage: './compras.sqlite'
})  

const ClienteModel = db.define('cliente', {
    nome: { type: Sequelize.STRING }
})

const MaterialModel = db.define('material', {
    nome: { type: Sequelize.STRING } 
})

const CompraModel = db.define('compra', {
    data: { type: Sequelize.DATE }
})

const UserModel = db.define('user', {
    nome: {type: Sequelize.STRING},
    senha: {type : Sequelize.STRING}
})

ClienteModel.hasMany(CompraModel)
MaterialModel.hasMany(CompraModel)

casual.seed(123)
db.sync({force: true}).then(() => { 
    _.lodash(10, () => {
        return ClienteModel.create({
            nome: casual.name,
        }).then(() => {
            return MaterialModel.create({
                nome: casual.color_name,
            })
        })
    })

    UserModel.create({
        nome: 'nome',
        senha: 'senha',
    })

 })


const Cliente = db.models.Cliente
const Material = db.models.Material
const Compra = db.models.Compra
const User = db.models.User

export { Cliente, Material, Compra, User}
