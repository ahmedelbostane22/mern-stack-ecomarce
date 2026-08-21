import express, { response } from 'express';
import { registerUser } from '../services/user_services';
import { loginUser } from '../services/user_services';
const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await registerUser({ firstName, lastName, email, password });
    res.status(result.statuscode).json({ message: result.message, data: result.data });
  } catch (error: any) {
    res.status(400).json({ message: error.message 
    , error:error


    });

  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(result.statuscode).json({ message: result.message, data: result.data });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;