export const loginUser = async(req, res) => {
    try {
        const { token, user } = req;
        user.loggedIn = true
        console.log('users logged in successfully', 'question2::controller.js');
        return res.status(200).json({
            user,
            token,
            message: 'Login successful'
        });
    } catch (error) {
        console.log('An error occurred', error.message);
    }
}

export const fundWallet = async(req, res) => {
    try {
        const { body, user } = req;
        user.wallet.amount += body.amount;
        return res.status(200).json({
            user,
            message: 'wallet funded successfully'
        })
    } catch (error) {
        console.log('An error occurred', error.message);
    }
}

export const getWallet = async(req, res) => {
    try {
        const { user } = req;
        return res.status(200).json({
            ballance: user.wallet.amount,
            message: 'ballance retrieved successfully'
        });
    } catch (error) {
        console.log('An error occurred', error.message);
    }
}

export const logoutUser = async(req, res) => {
    const { user } = req;
    user.loggedIn = false
    return res.status(200).json({
        message: 'Logged out successfully'
    });
}