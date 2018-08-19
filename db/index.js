const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL)
const express = require('express')
const port = 5000 || process.env.PORT;
const path = require('path')

//App
const app = express();
app.listen(port, ()=>{
    console.log(`I am listening to port ${port}`)
})

app.use('/dist',express.static(path.join(__dirname, `..`, `/dist`)))

app.get('/',(req, res, next) =>{
    res.sendFile(path.join(__dirname, `..`,`index.html`))
})

app.get('/users', async (req, res, next)=>{
    try {
        res.send(await User.findAll({
            include: {
                model: UserThing,
                include: [Thing]
            }
        }))
    } catch(err){
        next(err)
    }
})






// Models
const User = conn.define('user', {
    name: Sequelize.STRING
})

const Thing = conn.define('thing', {
    name: Sequelize.STRING
})

const UserThing = conn.define('userthing', {})


const syncandseed = async () => {

    await conn.sync({force: true});

    const[moe,larry,shep,joe,curly] = await Promise.all([
        User.create({name: 'moe'}),
        User.create({name: 'larry'}),
        User.create({name: 'shep'}),
        User.create({name: 'joe'}),
        User.create({name: 'curly'}),
    ]);

    const [foo, bazz] = await Promise.all([
            Thing.create({name:'foo'}),
            Thing.create({name:'bazz'})
        ]);

    await Promise.all([
            UserThing.create({userId: moe.id, thingId: foo.id}),
            UserThing.create({userId: moe.id, thingId: foo.id}),
            UserThing.create({userId: shep.id, thingId: bazz.id}),
            UserThing.create({userId:larry.id, thingId: bazz.id}),
            UserThing.create({userId: larry.id, thingId: bazz.id}),
            UserThing.create({userId: larry.id, thingId: foo.id}),
        ])
}

syncandseed();

User.hasMany(UserThing)
Thing.hasMany(UserThing)
UserThing.belongsTo(User)
UserThing.belongsTo(Thing)

