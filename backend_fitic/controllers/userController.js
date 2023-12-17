const User = require('../models/User');
const InvoiceUser = require('../models/InvoiceUser');

const bcrypt = require('bcrypt');

const { blacklistedTokens } = require('../middleware/authMiddleware');

/**User functions */

async function getAllUsers(req, res) {
  try {
      const users = await User.find();
     

      res.json(users);
  } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      res.status(500).json({ error: 'Error al obtener todos los usuarios' });
  }
}

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

async function searchUsers(req, res) {
  try {
      const searchTerm = req.body.searchTerm;

      // Escapar caracteres especiales en el término de búsqueda
      const escapedSearchTerm = escapeRegExp(searchTerm);

      // Crear una expresión regular para buscar coincidencias en cualquier parte del nombre y apellido
      const regex = new RegExp(`.*${escapedSearchTerm}.*`, 'i');

      // Buscar usuarios que coincidan con la expresión regular
      const users = await User.find({
          $or: [
              { name: regex },
              { lastname: regex }
          ]
      });

      res.json(users);
  } catch (error) {
      console.error('Error al realizar la búsqueda de usuarios:', error);
      res.status(500).json({ error: 'Error al realizar la búsqueda de usuarios' });
  }
}

//Crea 


async function getUserProfile(req, res) {
    try {
        console.log(req.user)
        const user = await User.findById(req.user.id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener información del usuario' });
    }
}

async function checkAllInvoicesPaid(req, res) {
    try {
      const userId = req.user.id;
      const unpaidInvoices = await InvoiceUser.find({ userId, state: 'notpayed' });
      console.log(unpaidInvoices)
  
      if (unpaidInvoices.length === 0) {
        res.status(200).json({ allPaid: true });
      } else {
        res.status(200).json({ allPaid: false, unpaidInvoices });
      }
    } catch (error) {
      console.error('Error al verificar el estado de las facturas:', error);
      res.status(500).json({ error: 'Error al verificar el estado de las facturas' });
    }
  }
  
  async function updateUserProfile(req, res) {
    try {
        const userId = req.user.id;
        console.log("id usuario a editar antes: ", userId);

        const { username, email, name, lastname, weight, height } = req.body;

        //verificar que los campos no esten vacios
        if (!username || !email || !name || !lastname || !weight || !height) {

            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        

        const user = await User.findById(userId);
        console.log("usuario a editar antes: ", user);


        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (typeof weight === 'number' && typeof height === 'number') {
            user.weight = weight;
            user.height = height;
        } else {
            return res.status(400).json({ error: 'Los valores de peso y altura deben ser números' });
        }

        // Verificar si los valores han cambiado antes de realizar la actualización
        if (user.username !== username ||
            user.email !== email ||
            user.name !== name ||
            user.lastname !== lastname) {
            
            user.username = username;
            user.email = email;
            user.name = name;
            user.lastname = lastname;

            console.log("usuario a editar despues: ", user);

            await user.save();

            console.log("usuario guardado ", user);
        }

        res.json(user);
    } catch (error) {
        console.error('Error al actualizar información del usuario:', error);
        res.status(500).json({ error: 'Error al actualizar información del usuario' });
    }
}



async function changePassword(req, res) {
    try {
        const userId = req.user.id;
        const { password } = req.body;
        console.log("id_user: ",userId)
        const user = await User.findById(userId);

        console.log("usuario cambio pass: ", user)

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    
        user.password = hashedPassword;
        await user.save();

        res.json(user);

    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
}

   async function isPasswordValid(req, res) {
    try {
      const userId = req.user.id;
      const password = req.query.password;
      console.log(userId + " " + password);
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      res.json({ isPasswordValid });
    } catch (error) {
      res.status(500).json({ error: 'Error al verificar la contraseña' });
    }
  }


async function deleteAccount(req, res) {
  try {
    const userName = req.params.userName;

    // Busca al usuario por su nombre de usuario
    const user = await User.findOne({ username: userName });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Elimina al usuario
    await user.deleteOne();

    res.json({ message: 'Cuenta de usuario eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    res.status(500).json({ error: 'Error al eliminar la cuenta' });
  }
}

module.exports = {
  isPasswordValid,
  deleteAccount,
};




async function logout(req, res) {
    try {
        const token =  req.header('Authorization');
        blacklistedTokens.add(token);
        
        res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ error: 'Error al cerrar sesión' });
    }
}


module.exports = {
    getAllUsers,
    getUserProfile,
   isPasswordValid,
    checkAllInvoicesPaid,
    updateUserProfile,
    changePassword,
    deleteAccount,
    logout,
    searchUsers
};
