export const getBasicAuth = () => {
    const user = localStorage.getItem('user')
    
    console.log(`Basicauth: ${JSON.stringify({
        auth: user
    })}`);

    console.log(`Basicauth2: ${user}`);

    const { username, password } = JSON.parse(user);
    
    
    return {
        auth: { username, password }
    }
}