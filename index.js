import { Voice, neru } from 'neru-alpha';
const router = neru.Router();

const init = async () => {
    const session = neru.createSession();
    const voice = new Voice(session);
    await voice.onVapiAnswer('onCall').execute();
};

init();

router.post('/onCall', async (req, res) => {
    const session = neru.createSession();
    const voice = new Voice(session);

    voice.onVapiEvent(req.body.uuid, 'onEvent').execute();

    const ncco = [
        {
            action: 'talk',
            text: "Hi! This call was answered by NeRu.",
        }
    ];
    res.json(ncco);
});

router.post('/onEvent', async (req, res) => {
    console.log('event status is: ', req.body.status);
    console.log('event direction is: ', req.body.direction);

    res.sendStatus(200);
});

export { router };
