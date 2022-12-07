import { Router } from 'express';
const router = Router();
import { join } from 'path';

router.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(join(__dirname, '..', 'views','index.html'));
});

export default router;