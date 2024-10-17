export const loginUser = async (credentials) => {
  // Simulating an API call to authenticate the user
  const { email, password } = credentials;

  // Replace the following lines with actual API call
  if (email === 'vas@gmail.com' && password === '123456') {
      return { email }; // Simulate successful login
  } else {
      throw new Error('Invalid credentials');
  }
};