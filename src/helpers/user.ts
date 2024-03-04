import bcrypt from 'bcrypt';

// Esta función toma una contraseña y devuelve la contraseña encriptada
const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export { hashPassword };