const logout = () => {
    localStorage.removeItem('usuario');
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = '/';
};

export default logout;