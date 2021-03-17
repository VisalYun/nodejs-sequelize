const express = require('express');

const { sequelize, Case } = require('./models')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/cases', async (req, res) => {
    console.log(req.body);
    const { province, new_case, new_recover_case }  = req.body;

    try{
        const added_case = await Case.create({ 
            province,
            new_case,
            new_case,
            new_recover_case,
            new_recover_case
        });
        return res.json(added_case);
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
});

app.get('/cases', async (req, res) => {
    try {
        const cases = await Case.findAll();
        return res.json(cases);
    }catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

app.put('/cases', async (req, res) => {
    const { province, new_case, new_recover_case }  = req.body;

    const query_case = await Case.findOne({ where: { province: province } });
    const new_total_case = parseInt(query_case.total_case) + parseInt(new_case);
    const added_new_case = parseInt(query_case.new_case) + parseInt(new_case);
    const added_recover_case = parseInt(query_case.recover_case) + parseInt(new_recover_case);
    const added_new_recover_case = parseInt(query_case.new_recover_case) + parseInt(new_recover_case);
    try{
        const updated_case = await Case.update({ 
            province: province,
            total_case: new_total_case,
            new_case: added_new_case,
            recover_case: added_recover_case,
            new_recover_case: added_new_recover_case
        }, { where: { province: province } });
        return res.json(updated_case);
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
});

app.listen({ port: 5000 }, async () => {
    console.log('Server up on port 5000');
    await sequelize.authenticate();
    console.log('DB connected!');
})