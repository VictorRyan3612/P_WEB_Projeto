const userService = require('../services/userService')

module.exports = {
   login: async (req, res) => {
      const { email, password } = req.body;

      try {
         const user = await userService.buscarUsuario(email, password);

         if (user) {
            return res.status(200).json(user);
         }

         return res.status(401).json({ message: 'Credenciais inválidas' });
      } catch (error) {
         console.error('Erro ao autenticar usuário:', error);
         return res.status(500).json({ message: 'Erro interno do servidor' });
      }
   }
};
