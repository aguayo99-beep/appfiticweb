const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configToVerify = require('../config/config');
const User = require('../models/User');

const jwtToVerify = require('jsonwebtoken');
const config = require('../config/config');

const blacklistedTokens = new Set();


async function register(req, res) {
  try {
    const { username, password, email, name, lastname, weight, height, isAdmin } = req.body;
    console.log(req.body);

    //verificar si estan vacios los datos
   /** if (!username || !password || !email || !name || !lastname || !weight || !height) {
      return res.status(400).json({ error: 'Por favor ingrese todos los campos' });
    }*/

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      name,
      lastname,
      weight,
      height,
      isAdmin: isAdmin !== undefined ? isAdmin : false,
    });

    console.log(user);

    await user.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar al usuario' });
  }
}



async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: true });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: true});
    }

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin, 
    };

    const token = jwt.sign(payload, config.secretKey, { expiresIn: '5h' });
    
    console.log("Token creado: ", token);
    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}


async function checkIsAdmin(req, res) {
  try {
    const user = req.user;
    console.log(user);

    if (user.isAdmin) {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar si el usuario es administrador' });
  }
}


async function checkEmailExists(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar la existencia del correo' });
  }
}


async function checkUsernameExists(req, res) {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar la existencia del usuario' });
  }
}



async function checkToken(req, res) {
  try {
    const token = req.headers.authorization;

    if (!token || token == null) {
      res.json({ isCorrect: false });
      return;
    }
    
    jwt.verify(token, config.secretKey, (error, decoded) => {
      if (error) {
        res.json({ isCorrect: false });
      } else {
        res.json({ isCorrect: true });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el token' });
  }
}



/**async function verifyToken(req, res) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ isCorrect: false });
  }

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ isCorrect: false });
  }

  console.log("Token enviado al servidor: ", token);

  try {
    const decoded = jwtToVerify.verify(token, configToVerify.secretKey);

    return true; 
  } catch (error) {
    res.status(401).json({ isCorrect: false, error: 'Token de autorización inválido' });
    return false;
  }
}
**/
module.exports = {
  register,
  login,
  checkEmailExists,
  checkUsernameExists,
  checkIsAdmin, 
  checkToken
  
};
