import { Voice, neru } from 'neru-alpha';
import express from 'express';

const app = express();
const port = process.env.NERU_APP_PORT;

const init = async () => {
    const session = neru.createSession();
    const voice = new Voice(session);
    await voice.onVapiAnswer('onCall').execute();
};

init();

app.use(express.json());

app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});

app.post('/onCall', async (req, res) => {
    const session = neru.createSession();
    const voice = new Voice(session);

    voice.onVapiEvent({ vapiUUID: req.body.uuid, callback: 'onEvent'}).execute();

    const ncco = [
        {
            action: 'talk',
            text: "Hi! This call was answered by NeRu.",
        }
    ];
    res.json(ncco);
});

app.post('/onEvent', async (req, res) => {
    console.log('event status is: ', req.body.status);
    console.log('event direction is: ', req.body.direction);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
