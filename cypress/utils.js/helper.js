export const generateUserData = (baseUser) => {
    const timestamp = Date.now();
    return {
        ...baseUser,
        name: `${baseUser.name} ${timestamp}`,
        email: `qa_test_${timestamp}@gmail.com`,
    };
};
