import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById,getUserBalance } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const Userrouter = express.Router();

Userrouter.post('/register', registerUser);
Userrouter.post('/login',loginUser);
Userrouter.get('/balance', verifyJWT, getUserBalance);
Userrouter.get('/', getAllUsers);
Userrouter.get('/:id', verifyJWT ,getUserById);
Userrouter.put('/:id', verifyJWT, updateUserById);
Userrouter.delete('/:id', verifyJWT, deleteUserById);
export default Userrouter;